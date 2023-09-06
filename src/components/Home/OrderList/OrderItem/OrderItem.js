import styles from './OrderItem.module.css'

function OrderItem({order}) {
    
    return (
        <div className={styles.root}>
            <img className={styles.icon} src={process.env.PUBLIC_URL + '/assets/Group 48.svg'} alt=''/>
            <div className={styles.Info} >
                <div className={styles.header}>Заказ №{order.id}</div>
                <div className={styles.price}>Итог: {new Intl.NumberFormat('ru-RU', {style: 'currency', currency: 'RUB', minimumFractionDigits: 0}).format(order.price)}</div>
            </div>
        </div> 
    );
}

export default OrderItem