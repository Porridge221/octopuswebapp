import useTelegram from '../../../hooks/useTelegram';
import styles from './AccountItem.module.css'
import {Link} from 'react-router-dom'

function AccountItem() {
    const {user} = useTelegram();
    
    return (
        <div className={styles.root}>
            <Link className={styles.CartLink} to='/account'>
                <div className={styles.AccountImage}/>
            </Link>
            <div className={styles.UserBox} >
                <div className={styles.AccountBlock}>
                    <span className={styles.AccountName}>{user?.username}</span>
                    <span className={styles.AccountStatus}>Бронзовый</span>
                    <img className={styles.CartButton} src={process.env.PUBLIC_URL + '/assets/Group 25.svg'} alt=''/>
                </div>
                <div className={styles.PointsCount}>354 балла</div>
            </div>
        </div>
    );
}

export default AccountItem