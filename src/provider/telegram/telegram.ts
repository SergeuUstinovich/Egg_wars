declare global {
  interface Window {
    Telegram: any;
  }
}

export const useTelegram = () => {
  const tg = window.Telegram.WebApp;
  const userName = tg?.initData?.user?.username;
  const tg_id = tg?.initData?.userId
  return { tg, userName, tg_id };
};
