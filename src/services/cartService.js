import useTelegram from "../hooks/useTelegram";

let cartData;

function CartService({isUpdate, isSet, setUserData}) {
    const {initData} = useTelegram();
    
    const fetchCart = () => {
        console.log('CartService');
        console.log(isUpdate);
        return isUpdate ? fetch("https://octopus-vape.ru/carts/1", {method: 'GET', headers: {'Content-Type': 'application/json', 'Telegram-Data': initData,}})
          .then(response => {
            return response.json()
          })
          .then(data => {
            cartData = data;
            isSet && setUserData(data);
            return data;
        }) : cartData;

        
    }

    return isUpdate ? fetchCart : cartData;
    
}

export default CartService;