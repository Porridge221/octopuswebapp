import useTelegram from '../../../hooks/useTelegram';
import styles from './AccountItem.module.css'
import {Link} from 'react-router-dom'

function AccountItem({user_data}) {
    const {user} = useTelegram();
    // const user_data = useUser();
    
    return (
        <div className={styles.root}>
            <Link className={styles.AccountImageBox} to='/account'>
                <div className={styles.AccountImage}/>
            </Link>
            <div className={styles.UserBox} >
                <div className={styles.AccountBlock}>
                    <div style={{width: '100%', display: 'flex', flexDirection: 'row'}}>
                        <div className={styles.AccountName}>{user?.username}</div>
                        <span className={styles.AccountStatus}>{user_data !== undefined && user_data.user.discount_group}</span>
                    </div>
                    <Link className={styles.CartLink} to='/cart'>
                        <img className={styles.CartButton} src={process.env.PUBLIC_URL + '/assets/Group 25.svg'} alt=''/>
                    </Link>
                </div>
                <div className={styles.PointsCount}>{user_data !== undefined && user_data.user.discount_points} баллов</div>
            </div>
        </div>
    );
}

export default AccountItem