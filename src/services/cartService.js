// import useTelegram from "../hooks/useTelegram";

let cartData;

// function CartService({isUpdate, isSet, setUserData}) {
function CartService({isUpdate, data}) {
    // const {initData} = useTelegram();
    
    // const fetchCart = () => {
    //     console.log('CartService');
    //     console.log(isUpdate);
    //     return isUpdate ? fetch("https://octopus-vape.ru/carts/1", {method: 'GET', headers: {'Content-Type': 'application/json', 'Telegram-Data': initData,}})
    //       .then(response => {
    //         return response.json()
    //       })
    //       .then(data => {
    //         cartData = data;
    //         console.log('In Set User');
    //         isSet && setUserData(data);
    //         return data;
    //     }) : cartData;
    // }
    // // need cartData return
    // console.log(cartData);

    isUpdate && (cartData = data)

    return cartData;
    
}

export default CartService;