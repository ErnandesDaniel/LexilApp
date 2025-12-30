import { Form, Input, InputNumber, Modal } from "antd";
import React, { DispatchWithoutAction, useCallback, useEffect, useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { getLevelsQueryKey, useCreateLevel, useUpdateLevel } from "@/api/levels";

interface FormValues {
  name: string;
  interval_minutes: number;
  interval_hours: number;
  interval_days: number;
}

const FORM_INITIAL_VALUES: FormValues = {
  name: '',
  interval_minutes: 0,
  interval_hours: 0,
  interval_days: 0,
};

interface AddEditLevelModalProps {
  isOpen: boolean;
  onClose: DispatchWithoutAction;
  levelId?: string; // если null - создание, иначе редактирование
  initialValues?: Partial<FormValues>;
}

const AddEditLevelModal = ({ onClose, isOpen, levelId, initialValues }: AddEditLevelModalProps) => {

  const [form] = Form.useForm<FormValues>();

  const { interval_minutes, interval_hours, interval_days, name } = Form.useWatch(({ interval_minutes, interval_hours, interval_days, name }) => ({
    interval_minutes,
    interval_hours,
    interval_days,
    name
  }), form) || FORM_INITIAL_VALUES;

  const { mutateAsync: createLevel, isPending: isPendingCreate } = useCreateLevel();
  const { mutateAsync: updateLevel, isPending: isPendingUpdate } = useUpdateLevel();

  const isPending = isPendingCreate || isPendingUpdate;

  const onCloseCallback = useCallback(() => {
    if (!isPending) {
      onClose();
    }
  }, [onClose, isPending]);

  const queryClient = useQueryClient();

  const levelsQueryKey = getLevelsQueryKey();

  const handleSubmit = useCallback(async () => {
    const values = form.getFieldsValue();
    try {
      if (levelId) {
        await updateLevel({
          id: levelId,
          data: values,
        });
      } else {
        await createLevel(values);
      }
      await queryClient.invalidateQueries({ queryKey: levelsQueryKey });
      await queryClient.refetchQueries({ queryKey: levelsQueryKey });
      onClose();
    } catch (error) {
      console.error('Error saving level:', error);
    }
  }, [createLevel, updateLevel, levelId, form, onClose, queryClient, levelsQueryKey]);

  useEffect(() => {
    if (isOpen && initialValues) {
      form.setFieldsValue(initialValues);
    } else if (isOpen) {
      form.resetFields();
      form.setFieldsValue(FORM_INITIAL_VALUES);
    }
  }, [isOpen, initialValues, form]);

  const modalButtonCommonProps = useMemo(() => ({
    disabled: isPending || !name || (interval_minutes === 0 && interval_hours === 0 && interval_days === 0),
  }), [name, interval_minutes, interval_hours, interval_days, isPending]);

  return (
    <Modal
      open={isOpen}
      title={levelId ? 'Редактировать уровень' : 'Добавить уровень'}
      onOk={handleSubmit}
      onCancel={onCloseCallback}
      okText={levelId ? 'Сохранить' : 'Добавить'}
      cancelText='Отмена'
      confirmLoading={isPending}
      destroyOnHidden={true}
      okButtonProps={modalButtonCommonProps}
      cancelButtonProps={modalButtonCommonProps}
    >
      <Form form={form} initialValues={initialValues || FORM_INITIAL_VALUES}>
        <Form.Item
          name='name'
          label='Название'
          rules={[{ required: true, message: 'Введите название уровня' }]}
        >
          <Input placeholder="Например: Уровень 4" />
        </Form.Item>

        <Form.Item label='Интервал'>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <Form.Item name='interval_minutes' noStyle>
              <InputNumber min={0} placeholder="Минуты" />
            </Form.Item>
            <span>мин</span>
            <Form.Item name='interval_hours' noStyle>
              <InputNumber min={0} placeholder="Часы" />
            </Form.Item>
            <span>час</span>
            <Form.Item name='interval_days' noStyle>
              <InputNumber min={0} placeholder="Дни" />
            </Form.Item>
            <span>дн</span>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddEditLevelModal;
