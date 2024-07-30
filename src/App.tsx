import { lazy, Suspense } from "react";
import { useTelegram } from "./provider/telegram/telegram";
import "./styles/global/App.scss";
import { Route, Routes } from "react-router-dom";
import ReferalLink from "./components/ReferalLink/ReferalLink";


const Layout = lazy(() => import("./pages/Layout/Layout"));
const Upgrade = lazy(() => import("./pages/Upgrade/Upgrade"));
const Friends = lazy(() => import("./pages/Friends/Friends"));
const Airdrop = lazy(() => import("./pages/Airdrop/Airdrop"));
const Guilds = lazy(() => import("./pages/Guilds/Guilds"));
const Leaders = lazy(() => import("./pages/Leaders/Leaders"));
const Tasks = lazy(() => import("./pages/Tasks/Tasks"));
const Boosters = lazy(() => import("./pages/Boosters/Boosters"));

function App() {
  useTelegram().tg.expand();
  return (
    <>
      <Suspense fallback={<div>Loading</div>}>
        <Routes>
          <Route path={'/'} element={<Layout />}>
            <Route path={"friends"} element={<Friends />} />
            <Route path={"leaders"} element={<Leaders />} />
            <Route path={"airdrop"} element={<Airdrop />} />
            <Route path={"guilds"} element={<Guilds />} />
            <Route path={"upgrades"} element={<Upgrade />} />
            <Route path={"tasks"} element={<Tasks />} />
            <Route path={"boosters"} element={<Boosters />} />
            <Route path={"/:start"} element={<ReferalLink />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
