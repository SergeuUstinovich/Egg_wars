import { Suspense, useEffect } from "react";
import Layout from "./components/Layout/Layout";
import { useTelegram } from "./provider/telegram/telegram";
import "./styles/global/App.scss";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import GameField from "./components/GameField/GameField";

function App() {
  const {tg} = useTelegram()
  useTelegram().tg.disableVerticalSwipes()
  useEffect(() => {
    tg.ready();
    tg.expand();
  }, [])
  const location = useLocation()
  const navigate = useNavigate()
  useEffect(() => {
    if(location.pathname === '/') {
      tg.BackButton.hide()
    } else {
      tg.BackButton.show()
      tg.BackButton.onClick(() => {
        navigate(-1)
      })
    }
  }, [location.pathname])

  return (
    <>
      <Suspense fallback={<div>Loading</div>}>
        <Routes>
          <Route path={'/'} element={<Layout />}>
            <Route path={"friends"} element={<div className='friend'>Ntfrf</div>} />
          </Route>
        </Routes>
      </Suspense>
      
    </>
  );
}

export default App;
