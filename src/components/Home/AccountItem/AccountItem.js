import useTelegram from '../../../hooks/useTelegram';
import styles from './AccountItem.module.css'
import { BsCart3 } from "react-icons/bs";

function AccountItem() {
    const {user} = useTelegram();
    
    return (
        <div className={styles.root}>
            <div className={styles.AccountImage}/>
            <div>
                <div className={styles.AccountBlock}>
                    <span className={styles.AccountName}>Debora222211SdSD{user?.username}</span>
                    <span className={styles.AccountStatus}>Бронзовый</span>
                </div>
                <div className={styles.PointsCount}>354 балла</div>
            </div>
            <BsCart3 className={styles.CartButton}/>
        </div>
    );
}

export default AccountItem