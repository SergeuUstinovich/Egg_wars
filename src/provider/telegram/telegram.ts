declare global {
  interface Window {
    Telegram: any;
  }
}

export const useTelegram = () => {
  const tg = window.Telegram.WebApp;
  const userName = tg?.initDataUnsafe?.user?.username;
  const tg_id = tg.initDataUnsafe.user.tg_id
  return { tg, userName, tg_id };
};
