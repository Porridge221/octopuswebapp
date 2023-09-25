import useTelegram from "../hooks/useTelegram";

var cartData;

// function CartService({isUpdate, isSet, setUserData}) {
function CartService({isUpdate, data, isInit}) {
    const {initData} = useTelegram();
    
    if (isInit) {
        fetch("https://octopus-vape.ru/carts/1", {method: 'GET', headers: {'Content-Type': 'application/json', 'Telegram-Data': initData,}})
          .then(response => {
            return response.json()
          })
          .then(data => {
            cartData = data;
            // console.log('In Set User');
            // isSet && setUserData(data);
            // return data;
        })
    }
    // need cartData return

    isUpdate && (cartData = data)

    return cartData;
    
}

export default CartService;