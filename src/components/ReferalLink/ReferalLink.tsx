// import { useLocation, useParams } from "react-router-dom";
// import ModalRoute from "../../ui/ModalRoute/ModalRoute";
// import style from'./ReferalLink.module.scss'
// import { useQuery } from "@tanstack/react-query";
// import { useTelegram } from "../../provider/telegram/telegram";
// import { addFriends } from "../../api/userInfo";
// import { queryClient } from "../../api/queryClient";
// import { useEffect, useState } from "react";

// function ReferalLink() {
//     const { tg_id } = useTelegram();
//     let query = new URLSearchParams(useLocation().search);
//     console.log(query)
//     let startParam = query.get('start');
//     const [idRef, setIdRef] = useState('')


//     const addFriendQuery = useQuery({
//         queryKey: ['friend'],
//         queryFn: () => addFriends(tg_id, idRef),
//         enabled: !!tg_id && !!idRef
//     }, queryClient)

//     useEffect(() => {
//         if(startParam) {
//             setIdRef(startParam)
//         }
//     }, [startParam])

//     useEffect(() => {
//         console.log(idRef)
//     }, [idRef])

//     return (
//         <ModalRoute>
//             <div className={style.color}>Реферал: {idRef}</div>
//             {/* {addFriendQuery.error && (<div className={style.color}>{addFriendQuery.error.message}</div>)} */}
//          </ModalRoute> 
        
//     )
// }

// export default ReferalLink