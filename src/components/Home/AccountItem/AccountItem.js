import useTelegram from '../../../hooks/useTelegram';
import styles from './AccountItem.module.css'
import {Link} from 'react-router-dom'
import { useEffect, useState } from 'react';
import CartButton from '../../CartButton/CartButton';
import CartService from '../../../services/cartService';

function AccountItem({user_data}) {
    const {user} = useTelegram();
    // const user_data = useUser();

    const [imageVar, setImageVar] = useState(process.env.PUBLIC_URL + "/assets/octopus_big1.jpg")
    
    useEffect(() => {
        user?.photo_url !== undefined && user?.photo_url !== "" && setImageVar(user.photo_url)
    }, [user])
        
    return (
        <div className={styles.root}>
            <Link className={styles.AccountImageBox} to='/account'>
                {/* <div className={styles.AccountImage}/> */}
                <img className={styles.AccountImage} src={imageVar} alt='' onError={(ev) => setImageVar(process.env.PUBLIC_URL + "/assets/octopus_big1.jpg")}/>
            </Link>
            <Link className={styles.UserBox} to='/account'>
                <div className={styles.AccountBlock}>
                    <div style={{width: '100%', display: 'flex', flexDirection: 'row', overflow: 'hidden'}}>
                        <div className={styles.AccountName}>{user_data?.user?.name}</div>
                        <span className={styles.AccountStatus}>{user_data !== undefined && user_data?.user?.discount_group === 'No discount' ? 'Bronze Card' : user_data?.user?.discount_group}</span>
                    </div>
                </div>
                <div className={styles.PointsCount}>Ваши баллы: {user_data !== undefined && user_data?.user?.discount_group === 'No discount' ? 'Новый клиет' : user_data?.user?.discount_points}</div>
            </Link>
            <CartButton cart_data={CartService({isUpdate: false, isInit: false})}/>
        </div>
    );
}

export default AccountItem