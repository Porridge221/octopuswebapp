import useTelegram from '../../../hooks/useTelegram';
import styles from './AccountItem.module.css'
import {Link} from 'react-router-dom'

function AccountItem() {
    const {user} = useTelegram();
    
    return (
        <div className={styles.root}>
            <Link className={styles.AccountImageBox} to='/account'>
                <div className={styles.AccountImage}/>
            </Link>
            <div className={styles.UserBox} >
                <div className={styles.AccountBlock}>
                    <div style={{width: '100%', display: 'flex', flexDirection: 'row'}}>
                        <div className={styles.AccountName}>{user?.username}</div>
                        <span className={styles.AccountStatus}>Бронзовый</span>
                    </div>
                    <Link className={styles.CartLink} to='/cart'>
                        <img className={styles.CartButton} src={process.env.PUBLIC_URL + '/assets/Group 25.svg'} alt=''/>
                    </Link>
                </div>
                <div className={styles.PointsCount}>354 балла</div>
            </div>
        </div>
    );
}

export default AccountItem