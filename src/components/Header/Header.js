import styles from './Header.module.css'
import {Link, useNavigate} from 'react-router-dom'
import useTelegram from '../../hooks/useTelegram';
import CartButton from '../CartButton/CartButton'
import CartService from '../../services/cartService'

function Header({path, current, cartData}) {
    const {tg} = useTelegram();
    const navigate = useNavigate();

    // tg.onEvent('backButtonClicked', () => navigate('/home'));
    // tg.BackButton.show();

    const results = [];

    const routs = {
        'Главная': ['/home', 0],
        'Каталог': ['/home/categories', 0],
        'Жидкости': ['/home/categories/6', 6],
        'JUUL Type': ['/home/categories/1', 1],
        'Pod Системы': ['/home/categories/2', 2],
        'Аккумуляторы': ['/home/categories/3', 3],
        'Аксессуары': ['/home/categories/4', 4],
        'Жевательный табак': ['/home/categories/5', 5],
        'Одноразовые системы': ['/home/categories/7', 7],
        'Расходники': ['/home/categories/8', 8],
        'Устройства': ['/home/categories/9', 9],
    }

    path.forEach(el => {
        results.push(<Link key={el} className={styles.textPrev} to={routs[el][0]} state={routs[el][1]}>{el + ' > '}</Link>);
    });
    
    return (
        <div className={styles.root}>
            <div>
                {results}
                {/* <span className={styles.textPrev}>Главная {'> '}</span> */}
                <span className={styles.textCurrent}>{current}</span>
            </div>
            <CartButton cart_data={cartData}/>
        </div>
    );
}

export default Header