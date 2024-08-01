import { lazy, Suspense } from "react";
import "./styles/global/App.scss";
import { Route, Routes } from "react-router-dom";


const Layout = lazy(() => import("./pages/Layout/Layout"));
const Upgrade = lazy(() => import("./pages/Upgrade/Upgrade"));
const Friends = lazy(() => import("./pages/Friends/Friends"));
const Airdrop = lazy(() => import("./pages/Airdrop/Airdrop"));
const Guilds = lazy(() => import("./pages/Guilds/Guilds"));
const Leaders = lazy(() => import("./pages/Leaders/Leaders"));
const Tasks = lazy(() => import("./pages/Tasks/Tasks"));
const Boosters = lazy(() => import("./pages/Boosters/Boosters"));

function App() {
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
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
