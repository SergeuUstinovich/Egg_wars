declare global {
  interface Window {
    Telegram: any;
  }
}

export const useTelegram = () => {
  const tg = window.Telegram.WebApp;
  // const userName = tg?.initDataUnsafe?.user?.username;
  // const tg_id = tg?.initDataUnsafe?.user?.id;
  const tg_id = '1234567'
  const userName = 'Serge'
  // const refId = '7654321'
  return { tg, userName, tg_id };
};
