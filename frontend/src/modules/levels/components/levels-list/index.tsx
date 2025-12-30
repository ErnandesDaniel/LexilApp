'use client';
import React, { Fragment, useCallback, useMemo } from 'react';
import { useGetLevels } from "@/api/levels";
import type { Level } from "@/api/dto";
import '@/modules/levels/components/levels-list/index.scss';
import clsx from 'clsx';
import { MouseEvent as MouseEventType } from 'react';
import { Dropdown, Modal, Button, Flex } from 'antd';
import type { MenuProps } from 'antd';
import ConditionalRender from "@/components/conditional-render";
import { useBoolean } from "usehooks-ts";
import { ItemType } from "antd/es/menu/interface";
import { isNil } from "lodash-es";
import AddEditLevelModal from "@/modules/levels/components/add-edit-level-modal";
import DeleteLevelConfirmationModal from "@/modules/levels/components/delete-level-confirmation-modal";

const LevelsList = () => {
  const { data: levels, isLoading: isLoadingLevels } = useGetLevels();

  const {
    setTrue: setTrueOpenDeleteModal,
    setFalse: setFalseCloseDeleteModal,
    value: isOpenDeleteModal,
  } = useBoolean();

  const {
    setTrue: setTrueOpenAddModal,
    setFalse: setFalseCloseAddModal,
    value: isOpenAddModal,
  } = useBoolean();

  const {
    setTrue: setTrueOpenEditModal,
    setFalse: setFalseCloseEditModal,
    value: isOpenEditModal,
  } = useBoolean();

  const [selectedLevelId, setSelectedLevelId] = React.useState<string | undefined>();
  const [selectedLevelName, setSelectedLevelName] = React.useState<string | undefined>();

  const [editInitialValues, setEditInitialValues] = React.useState<{
    interval_minutes: number;
    interval_hours: number;
    interval_days: number;
  }>();

  const handleAddLevelClick = useCallback(() => {
    setTrueOpenAddModal();
  }, [setTrueOpenAddModal]);

  const onClickDropdownStopPropagation = useCallback(
    (e: MouseEventType<HTMLDivElement, MouseEvent>) => {
      e.stopPropagation();
    },
    []
  );

  const onOpenDeleteModal = useCallback<Exclude<MenuProps['onClick'], undefined>>(
    (event) => {
      event.domEvent.stopPropagation();
      const level = levels?.find((l) => l.id === event.key);
      setSelectedLevelId(event.key);
      setSelectedLevelName(level?.name);
      setTrueOpenDeleteModal();
    },
    [levels, setTrueOpenDeleteModal]
  );

  const onOpenEditModal = useCallback<Exclude<MenuProps['onClick'], undefined>>(
    (event) => {
      event.domEvent.stopPropagation();
      const level = levels?.find((l) => l.id === event.key);
      setSelectedLevelId(event.key);
      setEditInitialValues({
        interval_minutes: level?.interval_minutes || 0,
        interval_hours: level?.interval_hours || 0,
        interval_days: level?.interval_days || 0,
      });
      setTrueOpenEditModal();
    },
    [levels, setTrueOpenEditModal]
  );

  const items: ItemType[] = useMemo(
    () => [
      {
        key: 'edit',
        label: 'Редактировать',
        onClick: onOpenEditModal,
      },
      {
        key: 'delete',
        danger: true,
        label: 'Удалить',
        onClick: onOpenDeleteModal,
      },
    ],
    [onOpenEditModal, onOpenDeleteModal]
  );

  const formatInterval = (level: Level) => {
    const parts = [];
    if (level.interval_days) parts.push(`${level.interval_days} дн`);
    if (level.interval_hours) parts.push(`${level.interval_hours} час`);
    if (level.interval_minutes) parts.push(`${level.interval_minutes} мин`);
    return parts.join(', ') || '0 мин';
  };

  return (
    <Fragment>
      <Flex vertical gap={16}>
        <Button type="primary" onClick={handleAddLevelClick}>
          Добавить уровень
        </Button>

        <div className="levels_items">
          <ConditionalRender condition={isLoadingLevels}>
            <div className="loading">Loading levels...</div>
          </ConditionalRender>
          <ConditionalRender condition={!isLoadingLevels}>
            {levels?.map((level) => (
              <div key={level.id} className={clsx('level_item')}>
                <div className="level_info">
                  <span className="level_name">{level.name}</span>
                  <span className="level_interval">{formatInterval(level)}</span>
                </div>

                <Dropdown
                  menu={{
                    items: items.map((item) => ({
                      ...item,
                      key: level.id,
                    })),
                  }}
                  trigger={['click']}
                >
                  <div
                    className="menu_dots_container"
                    onClick={onClickDropdownStopPropagation}
                  >
                    <div className="menu_dots">
                      <div className="menu_dot"></div>
                      <div className="menu_dot"></div>
                      <div className="menu_dot"></div>
                    </div>
                  </div>
                </Dropdown>
              </div>
            ))}
          </ConditionalRender>
        </div>
      </Flex>

      <AddEditLevelModal
        onClose={setFalseCloseAddModal}
        isOpen={isOpenAddModal}
      />
      <AddEditLevelModal
        onClose={setFalseCloseEditModal}
        isOpen={isOpenEditModal}
        levelId={selectedLevelId}
        initialValues={editInitialValues}
      />
      <DeleteLevelConfirmationModal
        onClose={setFalseCloseDeleteModal}
        isOpen={isOpenDeleteModal}
        levelId={selectedLevelId}
        levelName={selectedLevelName}
      />
    </Fragment>
  );
};

export default LevelsList;
