import { useEffect, useState} from "react"
import useTelegram from "./useTelegram";

let userData = null;

function useUser(isUpdate) {
    const {initData} = useTelegram();
    const [user_data, setUser] = useState();

    const fetchData = () => {
        fetch("https://octopus-vape.ru/users/1", {method: 'GET', headers: {'Content-Type': 'application/json', 'Telegram-Data': initData,}})
          .then(response => {
            return response.json()
          })
          .then(data => {
            setUser(data);
            userData = data;
            console.log(data);
          })
      }
    
    useEffect(() => {
        (isUpdate || !userData) &&  fetchData();
    // eslint-disable-next-line
    }, [])

    return  userData;
    
}

export default useUser;