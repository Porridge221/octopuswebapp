import useTelegram from '../../../hooks/useTelegram';
import styles from './AccountItem.module.css'
import { BsCart3 } from "react-icons/bs";

function AccountItem() {
    const {user} = useTelegram();
    
    return (
        <div className={styles.root}>
            <div className={styles.AccountImage}/>
            <div className={styles.UserBox} >
                <div className={styles.AccountBlock}>
                    <span className={styles.AccountName}>Debora222211SdSDsdfsdgsgsfsddsfsdddddddddddddddddddddddddddddddd{user?.username}</span>
                    <span className={styles.AccountStatus}>Бронзовый</span>
                    <img className={styles.CartButton} src={process.env.PUBLIC_URL + '/assets/Group 25.svg'} alt=''/>
                </div>
                <div className={styles.PointsCount}>354 балла</div>
            </div>
        </div>
    );
}

export default AccountItem