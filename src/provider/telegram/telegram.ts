declare global {
  interface Window {
    Telegram: any;
  }
}

export const useTelegram = () => {
  const tg = window.Telegram.WebApp;
  const userName = tg?.initDataUnsa?.user?.username;
  const tg_id = tg?.initDataUnsafe?.user?.ID;
  return { tg, userName, tg_id };
};
