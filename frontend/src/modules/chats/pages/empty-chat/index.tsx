'use client'
import React, {useCallback, useState} from 'react';
import { useRouter } from 'next/navigation';
import '@/modules/chats/pages/empty-chat/index.scss';

import { usePostChats, usePostChatsChatIdMessages } from "@/api";
import Textarea from "@/modules/chats/components/textarea";

const EmptyChat = () => {
  const router = useRouter();
  const [messageInput, setMessageInput] = useState<string>('');

  const {isPending: isPendingCreateChat, mutateAsync: createChat} = usePostChats();
  const {mutateAsync: sendMessage} = usePostChatsChatIdMessages();

  const handleMessageChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessageInput(e.target.value);
  },[setMessageInput]);

  const handleSendMessage = useCallback(async () => {
    if (messageInput.trim()) {
      try {

        const newChat = await createChat({
            data:{
                initial_message:messageInput
            }
        });
        router.push(`/chats/${newChat.id}`)
        setMessageInput('');
      } catch (error) {
        console.error('Failed to create chat or send message:', error);
      }
    }
  },[messageInput, createChat, router, sendMessage, setMessageInput]);

  const hasValidMessage = messageInput.trim().length > 0;

  return (
    <div className="empty_chat_page">
        <Textarea
            value={messageInput}
            onChange={handleMessageChange}
            onSend={handleSendMessage}
            isSendDisabled={!hasValidMessage || isPendingCreateChat}
        />
    </div>
  );
};

export default EmptyChat;