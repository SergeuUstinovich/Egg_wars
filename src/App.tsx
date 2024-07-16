import { Suspense } from "react";
import Layout from "./components/Layout/Layout";
import { useTelegram } from "./provider/telegram/telegram";
import "./styles/global/App.scss";
import { Route, Routes } from "react-router-dom";
import GameField from "./components/GameField/GameField";

function App() {
  useTelegram().tg.expand();
  return (
    <>
      <Suspense fallback={<div>Loading</div>}>
        <Routes>
          <Route path={'*'} element={<Layout />}>
            <Route path={"friends"} element={<div className='friend'>Ntfrf</div>} />
          </Route>
        </Routes>
      </Suspense>
      
    </>
  );
}

export default App;
