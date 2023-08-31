import OrderItem from "./OrderItem/OrderItem"
import styles from "./OrderList.module.css"
import { BsArrowDown } from "react-icons/bs";

function OrderList() {
    const orders = [
        {id: 1312414, price: '655'},
        {id: 212414, price: '10850'},
    ]

    return (
        <div className={styles.root}>
            <div className={styles.header}>Мои заказы</div>
            <div className={styles.orderList}>
                <OrderItem order={orders[0]}/>
                <OrderItem order={orders[1]}/>
            </div>
            <div className={styles.orderHistoryRef}>
                <span className={styles.orderHistoryHeaderText}>Перейти к </span>
                <span className={styles.orderHistoryHeaderText + ' ' + styles.orderHistoryHeaderLink}>истории заказов</span>
                <div><BsArrowDown className={styles.orderHistoryButton}/></div>
            </div>
        </div>
    )


}

export default OrderList