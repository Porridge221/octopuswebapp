import styles from './Account.module.css'
import LoyaltyInfo from '../LoyaltyInfo/LoyaltyInfo'
import FilterModal from '../Category/FilterModal/FilterModal';
import useTelegram from '../../hooks/useTelegram';
import { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom'

import modalStyles from './Modal.module.css';
import {AiOutlineClose} from "react-icons/ai";
import Input from 'react-phone-number-input/input'
import useUser from '../../hooks/useUser';


function Account() {
    const [user_data, setUserData] = useState();
    const [updateScreen, setUpdateScreen] = useState(1);

    const [modalActive, setModalActive] = useState(false);

    const [phoneNumber, setPhoneNumber] = useState();

    const [selectedCity, setSelectedCity] = useState(user_data?.user?.city_id ===  1 ? 'Владивосток' : user_data?.user?.city_id === 2 ? 'Артем' : user_data?.user?.city_id === 3 ? "Южно-Сахалинск" : "");

    const [userName, setUserName] = useState("");

    const {user, tg, initData} = useTelegram();
    const navigate = useNavigate();

    tg.onEvent('backButtonClicked', () => navigate('/home'));
    tg.BackButton.show();

    const discountLevel = {"Новый клиент": [3, '#f5d098'],
                            "No discount": [0, '#f5d098']}

    console.log(user_data);

    useEffect(() => {
        setSelectedCity(user_data?.user?.city_id ===  1 ? 'Владивосток' : user_data?.user?.city_id === 2 ? 'Артем' : user_data?.user?.city_id === 3 ? "Южно-Сахалинск" : "");
        setUserName(user_data?.user?.name);
    }, [user_data])

    const fetchData = () => {
        fetch("https://octopus-vape.ru/users/add_info", { method:'PUT',headers: {
          'Content-Type': 'application/json',
          'Telegram-Data': initData,
        }, body: JSON.stringify( {'phone': phoneNumber.slice(1), 'city_id': selectedCity === 'Владивосток' ? 1 : selectedCity === 'Артем' ? 2 : 3} )
          })
          .then(response => {
            return JSON.stringify( {'phone': phoneNumber.slice(1), 'city_id': selectedCity === 'Владивосток' ? 1 : selectedCity === 'Артем' ? 2 : 3} )
          })
          .then(data => {
            console.log(JSON.stringify( {'phone': phoneNumber.slice(1), 'city_id': selectedCity === 'Владивосток' ? 1 : selectedCity === 'Артем' ? 2 : 3} ));
            setModalActive(false);
            setUpdateScreen(updateScreen+1);
          })
    }

    const fetchUser = () => {
        fetch("https://octopus-vape.ru/users/1", {method: 'GET', headers: {'Content-Type': 'application/json', 'Telegram-Data': initData,}})
          .then(response => {
            return response.json()
          })
          .then(data => {
            setUserData(data);
            //setPhoneNumber('79623389016');
            //console.log(data?.user.phone);
          })
      }
    
    useEffect(() => {
        fetchUser();
    }, [updateScreen])

    const img_style = window.Telegram.WebApp.colorScheme === 'light' ? {} : {};
    
    return (
        <div className={styles.root}>
            <div className={styles.Header} >
                <img className={styles.icon} src={process.env.PUBLIC_URL + '/assets/octopus_big1.jpg'} alt=''/>
            </div>
            <span className={styles.UserName}>{user_data?.user?.name}</span>
            <div className={styles.UserDiscountBox}>
                <span className={styles.UserDiscount}>{user_data === undefined && user_data.user.discount_group}</span>
            </div>
            <div className={styles.UserInfoBox}>
                {/* <p style={{margin: '2px 0', marginBottom: '5px', fontWeight: '800'}}>
                    <span style={{fontWeight: '800'}}>Статус: </span><span style={{color: user_data !== undefined && discountLevel[user_data.user.discount_group][1]}}>{user_data !== undefined && user_data.user.discount_group}</span>
                </p> */}
                <p style={{margin: '2px 0', marginBottom: '5px'}}>
                    <span style={{fontWeight: '800'}}>Телефон: </span><span>{user_data !== undefined && user_data.user.phone}</span>
                </p>
                <p style={{margin: '2px 0', marginBottom: '5px'}}>
                    <span style={{fontWeight: '800'}}>Город: </span><span>{user_data === undefined || null ? '' : (user_data.user.city_id !== undefined && user_data.user.city_id=== 1 ? "Владивосток" : user_data.user.city_id=== 2 ? "Артем" : "Южно-Сахалинск")}</span>
                </p>
            </div>
            <div className={styles.AddInfoBox}>
                <div className={styles.AddInfoBoxMain}>
                    <div className={styles.InfoIconBox} ><div className={styles.InfoIcon} >i</div></div>
                    <span className={styles.AddInfoText}>Для подтверждения заказов необходимо указать свой номер телефона и город.</span>
                </div>
                <div style={{'display':'flex', 'justifyContent': 'center'}}><div className={styles.AddInfoButton} onClick={() => setModalActive(true)}>Добавить инфо</div></div>
            </div>
            <div style={{marginRight: '16px'}}>
            <LoyaltyInfo />
            </div>
            <FilterModal active={modalActive} setActive={setModalActive}>
            <div style={{'width': '70vw', 'overflowX': 'hidden','overflowY': 'auto', backgroundColor: 'var(--tg-theme-bg-color)'}}>
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
                    <span style={{marginTop: '5px'}}>Укажите Имя</span>
                    <input name="myInput" className={modalStyles.InputName} value={userName} onChange={e => setUserName(e.target.value)}/>
                    <span>Укажите город. Так пункты выдачи заказов будут отображаться корректно.</span>
                    <select className={modalStyles.Select} value={selectedCity} onChange={e => setSelectedCity(e.target.value)} >
                        <option value="Владивосток">Владивосток</option>
                        <option value="Артем">Артем</option>
                        <option value="Южно-Сахалинск">Южно-Сахалинск</option>
                    </select>
                </div>
            </div>
            <div className={modalStyles.ConfirmButton} onClick={fetchData}>Подтвердить</div>
            </FilterModal>
        </div>
    );
}

export default Account