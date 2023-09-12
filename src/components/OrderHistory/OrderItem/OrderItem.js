import styles from './OrderItem.module.css'

function OrderItem({order, handleSetModal}) {
    
    return (
        <div className={styles.root} onClick={() => handleSetModal(true, order)}>
            <div className={styles.header}>Заказ №{order.order_id}</div>
            <img className={styles.icon} src={process.env.PUBLIC_URL + '/assets/Group 48.svg'} alt=''/>
            <div className={styles.price}>Итог: {new Intl.NumberFormat('ru-RU', {style: 'currency', currency: 'RUB', minimumFractionDigits: 0}).format(order.price/100)}</div>
        </div>
    );
}

export default OrderItem