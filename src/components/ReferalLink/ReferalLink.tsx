import { useParams } from "react-router-dom";
import ModalRoute from "../../ui/ModalRoute/ModalRoute";
import style from'./ReferalLink.module.scss'
import { useQuery } from "@tanstack/react-query";
import { useTelegram } from "../../provider/telegram/telegram";
import { addFriends } from "../../api/userInfo";
import { queryClient } from "../../api/queryClient";

function ReferalLink() {
    const { tg_id, refId } = useTelegram();
    const { start } = useParams();

    const addFriendQuery = useQuery({
        queryKey: ['friend'],
        queryFn: () => addFriends(tg_id, refId),
        enabled: !!tg_id && !!refId
    }, queryClient)

    return (
        <ModalRoute>
            <div className={style.color}>Реферал: {start}</div>
            {/* {addFriendQuery.error && (<div className={style.color}>{addFriendQuery.error.message}</div>)} */}
        </ModalRoute>
        
    )
}

export default ReferalLink