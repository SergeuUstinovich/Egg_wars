import { useParams } from "react-router-dom";
import ModalRoute from "../../ui/ModalRoute/ModalRoute";
import style from'./ReferalLink.module.scss'

function ReferalLink() {

    const { start } = useParams();

    return (
        <ModalRoute>
            <div className={style.color}>Реферал: {start}</div>
        </ModalRoute>
        
    )
}

export default ReferalLink