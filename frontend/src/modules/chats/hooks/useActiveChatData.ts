import useActiveChatId from "@/modules/chats/hooks/useActiveChatId";
import {isNil} from "lodash-es";
import {useGetChats} from "@/api";

const useActiveChatData=()=>{
    const activeChatId = useActiveChatId();


    const {data: chatsList, isLoading: isLoadingChatsList} = useGetChats();

    if(!isNil(activeChatId)){

        const activeChat=chatsList?.find(({id})=>id === activeChatId);

        return activeChat;

    }

    return undefined;
};

export default useActiveChatData;