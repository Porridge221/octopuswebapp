import styles from './Header.module.css'
import {Link, useNavigate} from 'react-router-dom'
import useTelegram from '../../hooks/useTelegram';

function Header({path, current}) {
    const {tg} = useTelegram();
    const navigate = useNavigate();

    tg.onEvent('backButtonClicked', () => navigate(-1));
    tg.BackButton.show();

    const results = [];

    path.forEach(el => {
        results.push(<span key={el} className={styles.textPrev}>{el + ' > '}</span>);
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