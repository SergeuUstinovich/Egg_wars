declare global {
  interface Window {
    Telegram: any;
  }
}

export const useTelegram = () => {
  const tg = window.Telegram.WebApp;

  const userName = tg?.initDataUnsafe?.user?.username;
  const tg_id = tg?.initDataUnsafe?.user?.id;
  // const tg_id = "123252";
  // const userName = "byngra";
  // const idRef = '87654321'
  return { tg, userName, tg_id };
};
