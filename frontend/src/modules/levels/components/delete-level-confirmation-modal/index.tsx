import { Modal } from "antd";
import React, { useMemo } from "react";
import { useDeleteLevel } from "@/api/levels";
import { useQueryClient } from "@tanstack/react-query";
import { getLevelsQueryKey } from "@/api/levels";

interface DeleteLevelConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  levelId?: string;
  levelName?: string;
}

const DeleteLevelConfirmationModal = ({
  onClose,
  isOpen,
  levelId,
  levelName,
}: DeleteLevelConfirmationModalProps) => {
  const { mutateAsync: deleteLevel, isPending: isPendingDelete } = useDeleteLevel();

  const queryClient = useQueryClient();
  const levelsQueryKey = getLevelsQueryKey();

  const onDeleteLevel = async () => {
    try {
      if (levelId) {
        await deleteLevel(levelId);
        await queryClient.invalidateQueries({ queryKey: levelsQueryKey });
        await queryClient.refetchQueries({ queryKey: levelsQueryKey });
      }
    } finally {
      onClose();
    }
  };

  const modalButtonCommonProps = useMemo(
    () => ({
      disabled: isPendingDelete,
    }),
    [isPendingDelete]
  );

  return (
    <Modal
      open={isOpen}
      title="Удалить уровень?"
      onOk={onDeleteLevel}
      onCancel={onClose}
      okText="Удалить"
      cancelText="Отмена"
      confirmLoading={isPendingDelete}
      okButtonProps={{ danger: true, ...modalButtonCommonProps }}
      cancelButtonProps={modalButtonCommonProps}
    >
      <p>
        Вы уверены, что хотите удалить уровень "{levelName}"? Это действие
        необратимо.
      </p>
    </Modal>
  );
};

export default DeleteLevelConfirmationModal;
