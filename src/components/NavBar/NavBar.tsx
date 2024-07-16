import { Link, useLocation } from "react-router-dom"
import { Button } from "../../ui/Button"
import style from './NavBar.module.scss'
import imgGuilds from '../../assets/img/guilds.png'
import imgFriends from '../../assets/img/friends.png'
import imgAttack from '../../assets/img/attack.png'
import imgLeaders from '../../assets/img/leaders.png'
import imgAirdrop from '../../assets/img/airdrop.png'

const arrLinkNav = [
    {
        text: 'Guilds',
        path: '/guilds',
        img: imgGuilds
    },
    {
        text: 'Friends',
        path: '/friends',
        img: imgFriends
    },
    {
        text: 'Attack!',
        path: '/',
        img: imgAttack
    },
    {
        text: 'Leaders',
        path: '/leaders',
        img: imgLeaders
    },
    {
        text: 'Airdrop',
        path: '/airdrop',
        img: imgAirdrop
    },
]


function NavBar() {

    const location = useLocation()

    return (
      <ul className={style.list}>
        {arrLinkNav.map((item) => (
          <li className={location.pathname === item.path ? `${style.item} ${style.active}` : style.item} key={item.path}>
              <Link to={item.path}>
                <div className={style.link}>
                    <img className={style.img} src={item.img} alt={item.text} />
                    <p className={style.descr}>{item.text}</p>
                </div>
              </Link>
          </li>
        ))}
      </ul>
    );
}

export default NavBar