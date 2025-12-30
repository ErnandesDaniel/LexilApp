import {Form, Input, Modal} from "antd";
import React, {DispatchWithoutAction, useCallback, useMemo} from "react";
import {getGetChatsQueryKey, usePatchChatsChatId} from "@/api";
import {useQueryClient} from "@tanstack/react-query";

interface FormValues {
    newChatName: string;
}

const FORM_INITIAL_VALUES: FormValues={
    newChatName: '',
};

interface ChangeChatNameProps {
  isOpen: boolean;
  onClose: DispatchWithoutAction;
  activeChatId?: string;
}

const ChangeChatName = ({ onClose, isOpen, activeChatId}: ChangeChatNameProps) => {

    const [form] = Form.useForm<FormValues>();

    const {newChatName} = Form.useWatch(({newChatName})=>({
        newChatName
    }), form) ?? {
        newChatName:'',
    };

    const {mutateAsync: changeChatName, isPending: isPendingChangeChatName}=usePatchChatsChatId();

    const onCloseCallback=useCallback(()=>{
        if(!isPendingChangeChatName){
            onClose();
        }
    },[onClose, isPendingChangeChatName])

    const queryClient=useQueryClient();

    const getChatsQueryKey =getGetChatsQueryKey();

    const changeChatNameOnClick=useCallback(async ()=>{

        const newChatName=form.getFieldValue('newChatName');

        try{
            await changeChatName({chatId: activeChatId ?? '',data:{
                    title:newChatName
                }
            });
            await queryClient.invalidateQueries({queryKey: getChatsQueryKey});
            await queryClient.refetchQueries({queryKey: getChatsQueryKey});
        }finally{
            onClose();
        }

    },[changeChatName, activeChatId, form, onClose, queryClient, getChatsQueryKey]);

    const modalButtonCommonProps= useMemo(()=>({
        disabled:isPendingChangeChatName || newChatName?.length ==0,
    }), [newChatName, isPendingChangeChatName]);


return (

    <Modal
        open={isOpen}
        title='Переименовать чат?'
        onOk={changeChatNameOnClick}
        onCancel={onCloseCallback}
        okText='Изменить'
        cancelText='Отмена'
        confirmLoading={isPendingChangeChatName}
        destroyOnHidden={true}
        okButtonProps={modalButtonCommonProps}
        cancelButtonProps={modalButtonCommonProps}
    >

<Form form={form} initialValues={FORM_INITIAL_VALUES}>

    <Form.Item name='newChatName'>
        <Input
            placeholder="type new chat name..."
        />
    </Form.Item>

</Form>

</Modal>

)

}

export default ChangeChatName;