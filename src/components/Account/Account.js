import styles from './Account.module.css'
import LoyaltyInfo from '../LoyaltyInfo/LoyaltyInfo'
import FilterModal from '../Category/FilterModal/FilterModal';
import useTelegram from '../../hooks/useTelegram';
import { useState } from 'react';
import {useNavigate} from 'react-router-dom'

import modalStyles from './Modal.module.css';
import {AiOutlineClose} from "react-icons/ai";
import Input from 'react-phone-number-input/input'
import useUser from '../../hooks/useUser';


function Account() {
    const user_data = useUser(false);

    const [modalActive, setModalActive] = useState(false);

    const [phoneNumber, setPhoneNumber] = useState();

    const [selectedCity, setSelectedCity] = useState('Владивосток');

    const {user, tg} = useTelegram();
    const navigate = useNavigate();

    tg.onEvent('backButtonClicked', () => navigate('/home'));
    tg.BackButton.show();

    const discountLevel = {"Новый клиент": [3, '#f5d098']}
    
    return (
        <div className={styles.root}>
            <div className={styles.Header} >
                <img className={styles.icon} src={process.env.PUBLIC_URL + '/assets/AccountImage.png'} alt=''/>
            </div>
            <span className={styles.UserName}>{user?.username}</span>
            <div className={styles.UserDiscountBox}>
                <span className={styles.UserDiscount}>{user_data !== undefined && discountLevel[user_data.user.discount_group][0]}% от заказа на ваш счет</span>
            </div>
            <div className={styles.UserInfoBox}>
                <p style={{margin: '2px 0', marginBottom: '5px', fontWeight: '800'}}>
                    <span style={{fontWeight: '800'}}>Статус: </span><span style={{color: user_data !== undefined && discountLevel[user_data.user.discount_group][1]}}>{user_data !== undefined && user_data.user.discount_group}</span>
                </p>
                <p style={{margin: '2px 0', marginBottom: '5px'}}>
                    <span style={{fontWeight: '800'}}>Телефон: </span><span>{user_data !== undefined && user_data.user.phone}</span>
                </p>
                <p style={{margin: '2px 0', marginBottom: '5px'}}>
                    <span style={{fontWeight: '800'}}>Город: </span><span>{user_data !== undefined && (user_data.user.city_id=== 1 ? "Владивосток" : user_data.user.city_id=== 2 ? "Артем" : "Южно-Сахалинск")}</span>
                </p>
            </div>
            <div className={styles.AddInfoBox}>
                <div className={styles.AddInfoBoxMain}>
                    <div className={styles.InfoIconBox} ><div className={styles.InfoIcon} >i</div></div>
                    <span className={styles.AddInfoText}>Для подтверждения заказов необходимо указать свой номер телефона и город.</span>
                </div>
                <div style={{'display':'flex', 'justifyContent': 'center'}}><div className={styles.AddInfoButton} onClick={() => setModalActive(true)}>Добавить инфо</div></div>
            </div>
            <LoyaltyInfo />
            <FilterModal active={modalActive} setActive={setModalActive}>
            <div style={{'width': '70vw', 'overflowX': 'hidden','overflowY': 'auto', backgroundColor: 'var(--tg-theme-secondary-bg-color)'}}>
                <div className={modalStyles.Header}>
                    <span className={modalStyles.HeaderLabel}>Регистрация</span>
                    <AiOutlineClose className={modalStyles.CloseButton} onClick={() => setModalActive(false)} />
                </div>
                <div className={modalStyles.VerticalBox}>
                <span>Для подтверждения брони на заказ необходимо указать свой номер телефона.</span>
                    <div className={modalStyles.NumberBox}>
                        <span style={{margin: '0 0', textAlign: 'center'}}>+7 | </span><Input className={modalStyles.NumberInput}
                            country="RU"
                            international
                            value={phoneNumber}
                            onChange={setPhoneNumber}/>
                    </div>
                    <span>Укажите город. Так пункты выдачи заказов будут отображаться корректно.</span>
                    <select className={modalStyles.Select} value={selectedCity} onChange={e => setSelectedCity(e.target.value)} >
                        <option value="Владивосток">Владивосток</option>
                        <option value="Артем">Артем</option>
                        <option value="Южно-Сахалинск">Южно-Сахалинск</option>
                    </select>
                </div>
            </div>
            <div className={modalStyles.ConfirmButton} /*onClick={fetchData}*/>Подтвердить</div>
            </FilterModal>
        </div>
    );
}

export default Account