const tg = window.Telegram.WebApp;

function useTelegram() {

    return {
        user: tg.initDataUnsafe?.user
    }
}

export default useTelegram