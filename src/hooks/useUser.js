import { useEffect, useState} from "react"

let userData;

function useUser(isUpdate) {
    const [user_data, setUser] = useState()

    const fetchData = () => {
        fetch("http://localhost:8000/users/1", {method: 'GET', headers: {'Content-Type': 'application/json'}})
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