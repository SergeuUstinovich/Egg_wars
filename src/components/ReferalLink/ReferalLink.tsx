import { useParams } from "react-router-dom";
import ModalRoute from "../../ui/ModalRoute/ModalRoute";
import style from'./ReferalLink.module.scss'
import { useQuery } from "@tanstack/react-query";
import { useTelegram } from "../../provider/telegram/telegram";
import { addFriends } from "../../api/userInfo";
import { queryClient } from "../../api/queryClient";

function ReferalLink() {
    const { tg_id } = useTelegram();
    const { start } = useParams();

    const addFriendQuery = useQuery({
        queryKey: ['friend'],
        queryFn: () => {
            if (typeof tg_id === 'string' && typeof start === 'string') {
                return addFriends(tg_id, start);
            } else {
                // Вы можете обработать эту ситуацию по-своему. Например, вы можете вернуть ошибку или значение по умолчанию.
                throw new Error('tg_id or start is not a string');
            }
        },
        enabled: !!tg_id && !!start
    }, queryClient)

    return (
        <ModalRoute>
            <div className={style.color}>Реферал: {start}</div>
            {/* {addFriendQuery.error && (<div className={style.color}>{addFriendQuery.error.message}</div>)} */}
        </ModalRoute>
        
    )
}

export default ReferalLink