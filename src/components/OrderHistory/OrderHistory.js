import styles from './OrderHistory.module.css'
import OrderItem from './OrderItem/OrderItem';
import {Link, useNavigate} from 'react-router-dom'
import useTelegram from '../../hooks/useTelegram';

function OrderHistory() {
    const {tg} = useTelegram();
    const navigate = useNavigate();

    tg.onEvent('backButtonClicked', () => navigate('/home'));
    tg.BackButton.show();


    const orders = [
        {id: 1312414, price: '655'},
        {id: 212414, price: '10850'},
    ]

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
            <div className={styles.OrderList} >
                <OrderItem order={orders[0]}/>
                <OrderItem order={orders[0]}/>
                <OrderItem order={orders[0]}/>
                <OrderItem order={orders[1]}/>
                <OrderItem order={orders[1]}/>
                <OrderItem order={orders[1]}/>
                <OrderItem order={orders[1]}/>
                <OrderItem order={orders[1]}/>
                <OrderItem order={orders[0]}/>
                <OrderItem order={orders[0]}/>
                <OrderItem order={orders[0]}/>
                <OrderItem order={orders[1]}/>
                <OrderItem order={orders[1]}/>
                <OrderItem order={orders[1]}/>
                <OrderItem order={orders[1]}/>
                <OrderItem order={orders[1]}/>
            </div>
        </div>
    );
}

export default OrderHistory
