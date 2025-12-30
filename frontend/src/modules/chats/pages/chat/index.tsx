'use client'
import React, {Fragment, useCallback, useState} from 'react';
import isNil from 'lodash-es/isNil'
import '@/modules/chats/pages/chat/index.scss';

import {useGetChatsChatIdMessages, usePostChatsChatIdMessages} from "@/api";
import useActiveChatId from "@/modules/chats/hooks/useActiveChatId";

import ConditionalRender from "@/components/conditional-render";
import Textarea from "@/modules/chats/components/textarea";
import useActiveChatData from "@/modules/chats/hooks/useActiveChatData";

const Chat = () => {
  const [messageInput, setMessageInput] = useState<string>('');
  const activeChatId=useActiveChatId();

  const {mutateAsync: sendMessage} = usePostChatsChatIdMessages();

  const {data: messagesList, isLoading: isLoadingMessagesList} = useGetChatsChatIdMessages(
      activeChatId ?? '',
    undefined,
    {query:{
                enabled: !isNil(activeChatId)
        }
    }
  );

  const handleMessageChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessageInput(e.target.value);
  },[setMessageInput]);

  const handleSendMessage = useCallback(async () => {
    if (messageInput.trim()) {
      try {
        await sendMessage({
          chatId: activeChatId ?? '',
          data: { content: messageInput }
        });
        setMessageInput('');
      } catch (error) {
        console.error('Failed to send message:', error);
      }
    }
  },[messageInput, sendMessage,activeChatId, messageInput, setMessageInput]);

  const hasValidMessage = messageInput.trim().length > 0;

  const activeChatData=useActiveChatData();

  const chatIsLoading=activeChatData?.is_loading;

    return (
    <div className="chat_page">



    <div className="chat_header">
      <div className="chat_title">{activeChatData?.title}</div>
    </div>

    <div className="messages_area">

          <ConditionalRender condition={isLoadingMessagesList}>
              <div className="loading">Loading messages...</div>
          </ConditionalRender>

          <ConditionalRender condition={!isLoadingMessagesList && !isNil(messagesList) && messagesList?.length>0}>
              {

                  messagesList?.map((message) => (
                      <div key={message.id} className={`message ${message.user_id ? 'user' : 'bot'}`}>
                          <div className="message_text">{message.content}</div>
                          <div className="message_time">
                              {new Date(message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                      </div>
                  ))
              }
          </ConditionalRender>
      </div>

    <Textarea
        value={messageInput}
        onChange={handleMessageChange}
        onSend={handleSendMessage}
        isSendDisabled={!hasValidMessage || chatIsLoading}
    />
    </div>
  );
};

export default Chat;