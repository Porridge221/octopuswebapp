let tg = window.Telegram.WebApp;

function useTelegram() {

    // function testhandler(object){
    //     if (!tg.isExpanded){
    //         tg.expand()
    //     }
    // }

    // tg.onEvent('viewportChanged', testhandler)

    return {
        user: tg.initDataUnsafe?.user,
        initData: tg.initData,
        tg
    }
}

export default useTelegram;