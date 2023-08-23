const tg = window.Telegram.WebApp;

function useTelegram() {

    return {
        user: tg.initDataUnsafe?.user,
        initData: tg.initData,
        tg
    }
}

export default useTelegram;