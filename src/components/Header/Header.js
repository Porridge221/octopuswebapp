import styles from './Header.module.css'
import {Link, useNavigate} from 'react-router-dom'
import useTelegram from '../../hooks/useTelegram';

function Header({path, current}) {
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
            <Link className={styles.CartLink} to='/cart'>
                <svg width="31" height="24" viewBox="0 0 31 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="Group 25">
                        <path id="Vector 16" className={styles.icon} d="M8.19672 8.92H2L4.65574 23H26.7869L29 8.92H22.8033M8.19672 8.92H22.8033M8.19672 8.92C8.19672 8.92 7.14286 0.999992 15.2787 1C23.4145 1.00001 22.8033 8.92 22.8033 8.92" stroke="#424242" stroke-width="2"/>
                    </g>
                </svg>
            </Link>
        </div>
    );
}

export default Header