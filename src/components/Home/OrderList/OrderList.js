import OrderItem from "./OrderItem/OrderItem"
import styles from "./OrderList.module.css"
import { BsArrowDown } from "react-icons/bs";
import {Link} from 'react-router-dom'

function OrderList() {
    const orders = [
        {id: 1312414, price: '655'},
        {id: 212414, price: '10850'},
    ]

    return (
        <div className={styles.root}>
            <div className={styles.Header} >
                <span >Мои заказы</span>
                <Link className={styles.orderHistoryRef} to='/history'>
                    <span className={styles.orderHistoryButton}>История заказов</span>
                </Link>
            </div>
            <div className={styles.orderList}>
                <OrderItem order={orders[0]}/>
                <OrderItem order={orders[1]}/>
            </div>
        </div>
    )


}

export default OrderList