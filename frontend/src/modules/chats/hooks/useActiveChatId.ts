
import { useParams } from 'next/navigation';

const useActiveChatId=()=>{
    const params = useParams<{id: string | undefined}>();
    const activeChatId = params.id;
    return activeChatId;
};

export default useActiveChatId;