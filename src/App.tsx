import Layout from "./components/Layout/Layout";
import { useTelegram } from "./provider/telegram/telegram";
import "./styles/global/App.scss";

function App() {
  useTelegram().tg.expand();
  return (
    <>
      <Layout />
    </>
  );
}

export default App;
