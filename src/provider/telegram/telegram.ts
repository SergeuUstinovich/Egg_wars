declare global {
  interface Window {
    Telegram: any;
  }
}

export const useTelegram = () => {
  const tg = window.Telegram.WebApp;
  // const userName = tg?.initDataUnsafe?.user?.username;
  // const tg_id = tg?.initDataUnsafe?.user?.id
  tg.expand();
  tg.isVerticalSwipesEnabled() 
  const tg_id = '12345'
  const userName = 'Сергей'
  return { tg, userName, tg_id };
};
