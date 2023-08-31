import styles from './OrderItem.module.css'

function OrderItem({order}) {
    
    return (
        <div className={styles.root}>
           <div className={styles.header}>Заказ №{order.id}</div>
           <img className={styles.icon} src={process.env.PUBLIC_URL + '/assets/Group 48.svg'}/>
           <div className={styles.price}>Итог: {new Intl.NumberFormat('ru-RU', {style: 'currency', currency: 'RUB', minimumFractionDigits: 0}).format(order.price)}</div>
        </div> 
    );
}

export default OrderItem