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
        'Главная': '/home',
        'Каталог': '/home/categories',
        'Жидкость': '/home/categories/1'
    }

    path.forEach(el => {
        results.push(<span key={el} className={styles.textPrev} onClick={() => navigate(routs[el])}>{el + ' > '}</span>);
    });
    
    return (
        <div className={styles.root}>
            <div>
                {results}
                {/* <span className={styles.textPrev}>Главная {'> '}</span> */}
                <span className={styles.textCurrent}>{current}</span>
            </div>
            <Link className={styles.CartLink} to='/cart'>
                <img className={styles.icon} src={process.env.PUBLIC_URL + '/assets/Group 25.svg'} alt=''/>
            </Link>
        </div>
    );
}

export default Header