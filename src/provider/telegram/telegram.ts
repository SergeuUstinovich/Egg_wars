declare global {
  interface Window {
    Telegram: any;
  }
}

export const useTelegram = () => {
  const tg = window.Telegram.WebApp;
  const userName = tg?.initDataUnsafe?.user?.username;
  return { tg, userName };
};
