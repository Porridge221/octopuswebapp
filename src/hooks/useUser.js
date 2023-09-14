import { useEffect, useState} from "react"
import useTelegram from "./useTelegram";

let userData;

function useUser(isUpdate) {
    const {initData} = useTelegram();
    const [user_data, setUser] = useState();

    const fetchData = () => {
        fetch("https://45.153.69.113/users/1", {method: 'GET', headers: {'Content-Type': 'application/json', 'Telegram-Data': initData,}})
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
        isUpdate &&  fetchData();
    // eslint-disable-next-line
    }, [])

    return  userData;
    
}

export default useUser;