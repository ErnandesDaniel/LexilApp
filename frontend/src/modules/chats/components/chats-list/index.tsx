'use client'
import React, {Fragment, useCallback, useMemo} from 'react';
import { useRouter } from 'next/navigation';
import {getGetChatsQueryKey, useDeleteChatsChatId, useGetChats} from "@/api";
import '@/modules/chats/components/chats-list/index.scss';
import useActiveChatId from "@/modules/chats/hooks/useActiveChatId";
import clsx from 'clsx';
import  {  MouseEvent as  MouseEventType} from 'react'
import {Dropdown, Modal} from 'antd';
import type { MenuProps } from 'antd';
import ConditionalRender from "@/components/conditional-render";
import {Button, Flex, Form, Input} from 'antd';
import {useBoolean} from "usehooks-ts";
import {ItemType} from "antd/es/menu/interface";
import {isNil} from "lodash-es";
import {useQueryClient} from "@tanstack/react-query";
import ChangeChatName from "@/modules/chats/components/chats-list/components/change-chat-name";

interface FormValues {
    searchChatName: string;
}

const FORM_INITIAL_VALUES: FormValues={
    searchChatName: '',
};

const ChatsList= () => {

  const router = useRouter();

  const [form] = Form.useForm<FormValues>();

  const {searchChatName} = Form.useWatch(({searchChatName})=>({
      searchChatName
  }), form) ?? {
      searchChatName:'',
  };

  const activeChatId=useActiveChatId();

  const handleChatClick = useCallback((id: string) => ()=>{
      router.push(`/chats/${id}`);
  },[router]);

  const {data: chatsList, isLoading: isLoadingChatsList} = useGetChats();

  const handleNewChatClick = useCallback(() => {
    router.push('/chats');
  },[router]);

  const filteredChats = useMemo(()=>chatsList?.filter((chat) =>
      chat.title.toLowerCase().includes(searchChatName?.toLowerCase())
  ),[chatsList, searchChatName]);


  const onClickDropdownStopPropagation=useCallback((e: MouseEventType<HTMLDivElement, MouseEvent>)=>{
      e.stopPropagation()
  },[]);

  const {setTrue: openDeleteModal, setFalse:closeDeleteModal, value: isOpenDeleteModal}=useBoolean();

  const {setTrue: openChangeChatNameModal, setFalse:closeDeleteChangeChatNameModal, value: isOpenChangeChatNameModal}=useBoolean();

  const onOpenDeleteChatModal=useCallback<Exclude<MenuProps['onClick'], undefined>>((event)=>{
      event.domEvent.stopPropagation();
      openDeleteModal();
  },[openDeleteModal]);

  const onOpenChangeChatNameModal=useCallback<Exclude<MenuProps['onClick'], undefined>>((event)=>{
        event.domEvent.stopPropagation();
        openChangeChatNameModal();
    },[openDeleteModal]);

  const items: ItemType[] =useMemo(()=> [
      {
          key: '1',
          label: 'Переименовать',
          onClick: onOpenChangeChatNameModal
      },
      {
          key: '2',
          danger: true,
          label: 'Удалить',
          onClick: onOpenDeleteChatModal
      },
  ],[]);

  const {mutateAsync: deleteChat, isPending: isPendingDeleteChat}=useDeleteChatsChatId();

  const queryClient=useQueryClient();

  const getChatsQueryKey =getGetChatsQueryKey();

  const onDeleteChat=useCallback(async ()=>{
      try {
          if (!isNil(activeChatId)) {
              await deleteChat({chatId: activeChatId});
              await queryClient.invalidateQueries({queryKey: getChatsQueryKey});
              await queryClient.refetchQueries({queryKey: getChatsQueryKey});
          }
      }finally{
          closeDeleteModal();
          router.push(`/chats`);
      }
  },[deleteChat, closeDeleteModal, queryClient, router]);

  const modalButtonCommonProps= useMemo(()=>({
      disabled:isPendingDeleteChat,
  }), [isPendingDeleteChat]);


  return (

    <Fragment>

    <Form form={form} initialValues={FORM_INITIAL_VALUES} className="chats_list">

      <Flex vertical gap={16}>
          <Button type="primary" onClick={handleNewChatClick}>
              New Chat
          </Button>

          <Form.Item name='searchChatName'>
              <Input
                  placeholder="Search chats..."
              />
          </Form.Item>

      <div className="chat_items">
          <ConditionalRender condition={isLoadingChatsList}>
              <div className="loading">Loading chats...</div>
          </ConditionalRender>
          <ConditionalRender condition={!isLoadingChatsList}>
              {
                  filteredChats?.map((chat) => (
                      <div
                          key={chat.id}
                          className={clsx('chat_item',{
                              active_chat: activeChatId === chat.id,
                              loading_chat: chat.is_loading
                          })}
                          onClick={handleChatClick(chat.id)}
                      >
                          <span className="chat_title">{chat.title}</span>
                          {chat.is_loading && <div className="loading_indicator"></div>}

                          <Dropdown menu={{ items }} trigger={['click']}>
                              <div className="menu_dots_container" onClick={onClickDropdownStopPropagation}>
                                  <div className="menu_dots">
                                    <div className="menu_dot"></div>
                                    <div className="menu_dot"></div>
                                    <div className="menu_dot"></div>
                                  </div>
                              </div>
                          </Dropdown>
                      </div>
                  ))
              }

          </ConditionalRender>
      </div>

      </Flex>

    </Form>

     <Modal
         open={isOpenDeleteModal}
         title='Удалить чат?'
         onOk={onDeleteChat}
         onCancel={closeDeleteModal}
         okText='Удалить'
         cancelText='Отмена'
         confirmLoading={isPendingDeleteChat}
         okButtonProps={modalButtonCommonProps}
         cancelButtonProps={modalButtonCommonProps}
     />

     <ChangeChatName
        onClose={closeDeleteChangeChatNameModal}
        isOpen={isOpenChangeChatNameModal}
        activeChatId={activeChatId}

     />

    </Fragment>

  );
};

export default ChatsList;