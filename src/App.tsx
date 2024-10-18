import { lazy, Suspense } from "react";
import "./styles/global/App.scss";
import { Route, Routes } from "react-router-dom";
import { useTelegram } from "./provider/telegram/telegram";
import { ArmyItem } from "./components/ArmyList/ArmyItem";

const Layout = lazy(() => import("./pages/Layout/Layout"));
const Upgrade = lazy(() => import("./pages/Upgrade/Upgrade"));
const Friends = lazy(() => import("./pages/Friends/Friends"));
const Airdrop = lazy(() => import("./pages/Airdrop/Airdrop"));
const Guilds = lazy(() => import("./pages/Guilds/Guilds"));
const Leaders = lazy(() => import("./pages/Leaders/Leaders"));
const Tasks = lazy(() => import("./pages/Tasks/Tasks"));
const Boosters = lazy(() => import("./pages/Boosters/Boosters"));
const Army = lazy(() => import("./pages/Army/Army"));
const Passive = lazy(() => import("./pages/Passive/Passive"));
const Special = lazy(() => import("./pages/Special/Special"));
const Awards = lazy(() => import("./pages/Awards/Awards"));

function App() {
  useTelegram().tg.expand();
  useTelegram().tg.disableVerticalSwipes();
  useTelegram().tg.setHeaderColor("#000", "#fff");
  return (
    <>
      <Suspense fallback={<div>Loading</div>}>
        <Routes>
          <Route path={"/"} element={<Layout />}>
            {/* <Route path={"awards"} element={<Awards />} /> */}
            <Route path={"friends"} element={<Friends />} />
            <Route path={"leaders"} element={<Leaders />} />
            <Route path={"airdrop"} element={<Airdrop />} />
            <Route path={"guilds"} element={<Guilds />} />
            <Route path={"/upgrades"} element={<Upgrade />}>
              <Route path={"army"} element={<Army />}>
                <Route path={"unit/:id"} element={<ArmyItem />} />
              </Route>
              <Route path={"passive"} element={<Passive />} />
              <Route path={"special"} element={<Special />} />
            </Route>
            <Route path={"tasks"} element={<Tasks />} />
            <Route path={"boosters"} element={<Boosters />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
