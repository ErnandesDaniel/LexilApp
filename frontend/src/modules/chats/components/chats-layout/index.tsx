'use client'
import type { PropsWithChildren } from "react";
import ChatList from "@/modules/chats/components/chats-list";
import '@/modules/chats/components/chats-layout/index.scss';

const ChatsLayout = ({ children }: PropsWithChildren) => {

    return (
        <div className="chats_layout">
            <ChatList/>
            <div className="chat_content">
                {children}
            </div>
        </div>
    );
};

export default ChatsLayout;