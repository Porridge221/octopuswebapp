import useTelegram from '../../../hooks/useTelegram';
import styles from './AccountItem.module.css'
import {Link} from 'react-router-dom'

function AccountItem({user_data}) {
    const {user} = useTelegram();
    // const user_data = useUser();
    
    return (
        <div className={styles.root}>
            <Link className={styles.AccountImageBox} to='/account'>
                {/* <div className={styles.AccountImage}/> */}
                <img className={styles.AccountImage} src={user?.photo_url === undefined ? (process.env.PUBLIC_URL + "/assets/AccountImage.png") : user.photo_url} alt=''/>
            </Link>
            <Link className={styles.UserBox} to='/account'>
                <div className={styles.AccountBlock}>
                    <div style={{width: '100%', display: 'flex', flexDirection: 'row'}}>
                        <div className={styles.AccountName}>{user?.username}</div>
                        <span className={styles.AccountStatus}>{user_data !== undefined && user_data.user.discount_group}</span>
                    </div>
                </div>
                <div className={styles.PointsCount}>Баллы: {user_data !== undefined && user_data.user.discount_points}</div>
            </Link>
            <Link className={styles.CartLink} to='/cart'>
                <svg width="31" height="24" viewBox="0 0 31 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="Group 25">
                        <path id="Vector 16" className={styles.CartButton} d="M8.19672 8.92H2L4.65574 23H26.7869L29 8.92H22.8033M8.19672 8.92H22.8033M8.19672 8.92C8.19672 8.92 7.14286 0.999992 15.2787 1C23.4145 1.00001 22.8033 8.92 22.8033 8.92" stroke="#424242" stroke-width="2"/>
                    </g>
                </svg>
                {/* <img className={styles.CartButton} src={process.env.PUBLIC_URL + '/assets/Group 25.svg'} alt=''/> */}
            </Link>
        </div>
    );
}

export default AccountItem