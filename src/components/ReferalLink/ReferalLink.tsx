import { useLocation, useParams } from "react-router-dom";
import ModalRoute from "../../ui/ModalRoute/ModalRoute";
import style from'./ReferalLink.module.scss'
import { useQuery } from "@tanstack/react-query";
import { useTelegram } from "../../provider/telegram/telegram";
import { addFriends } from "../../api/userInfo";
import { queryClient } from "../../api/queryClient";
import { useEffect } from "react";

// function ReferalLink() {
//     const { tg_id } = useTelegram();
    

//     return (
//         // <ModalRoute>
//             // {/* <div className={style.color}>Реферал: {start}</div> */}
//             // {/* {addFriendQuery.error && (<div className={style.color}>{addFriendQuery.error.message}</div>)} */}
//         // {/* </ModalRoute> */}
        
//     )
// }

// export default ReferalLink