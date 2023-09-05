import styles from './OrderHistory.module.css'
import OrderItem from './OrderItem/OrderItem';
import {Link, useNavigate} from 'react-router-dom'
import useTelegram from '../../hooks/useTelegram';
import { useEffect, useState } from "react";

function OrderHistory() {
    const {tg, initData} = useTelegram();
    const navigate = useNavigate();

    const [result, setItems] = useState([]);

    tg.onEvent('backButtonClicked', () => navigate('/home'));
    tg.BackButton.show();

    const fetchData = () => {
        fetch("http://localhost:8000/orders/1", {method: 'GET', headers: {'Content-Type': 'application/json', 'Authorization': initData}})
          .then(response => {
            return response.json()
          })
          .then(data => {
            setItems(data);
          })
    }

    useEffect(() => {

        fetchData();
    
        // axios({url: "http://localhost:8000/variants", method: "GET", headers: {'Telegram-Data': initData}}).then((resp) => {
        //   const allItems = resp.data;
        //   setItems(allItems);
        // });
    
        // eslint-disable-next-line
    }, [])

    return (
        <div className={styles.root}>
            <div className={styles.Header}>
                <span className={styles.Label}>История заказов</span>
                <Link className={styles.CatalogLink} to='/home/categories/'>
                    <div className={styles.CatalogButton}>Выбрать и заказать</div>
                </Link>
            </div>
            {/* <div className={styles.EmptyBox} >
                <img className={styles.icon} src={process.env.PUBLIC_URL + '/assets/emptyHistory.svg'} alt=''/>
                <span className={styles.EmptyLabel}>История заказов пуста {':('}</span>
            </div> */}
            {result.length > 0 ? (<div className={styles.OrderList} >
                {result.map(order => (
                    <OrderItem key={order.order_id} order={order}/>
                ))}
            </div>) : (<div className={styles.EmptyBox} >
                <img className={styles.icon} src={process.env.PUBLIC_URL + '/assets/emptyHistory.svg'} alt=''/>
                <span className={styles.EmptyLabel}>История заказов пуста {':('}</span>
            </div>)}
        </div>
    );
}

export default OrderHistory
