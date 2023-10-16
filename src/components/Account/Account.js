import styles from './Account.module.css'
import LoyaltyInfo from '../LoyaltyInfo/LoyaltyInfo'
import FilterModal from '../Category/FilterModal/FilterModal';
import useTelegram from '../../hooks/useTelegram';
import { useState, useEffect } from 'react';
import {useNavigate, Link} from 'react-router-dom'

import modalStyles from './Modal.module.css';
import {AiOutlineClose} from "react-icons/ai";
import Input from 'react-phone-number-input/input'
import useUser from '../../hooks/useUser';
import {QRCodeSVG} from 'qrcode.react';

function Account() {
    const [user_data, setUserData] = useState();
    const [updateScreen, setUpdateScreen] = useState(1);

    const [modalActive, setModalActive] = useState(false);

    const [phoneNumber, setPhoneNumber] = useState();

    const [selectedCity, setSelectedCity] = useState(user_data?.user?.city_id ===  1 ? 'Владивосток' : user_data?.user?.city_id === 2 ? 'Артем' : user_data?.user?.city_id === 3 ? "Южно-Сахалинск" : user_data?.user?.city_id === 4 ? "Корсаков" : "");

    const [userName, setUserName] = useState("");

    const {user, tg, initData} = useTelegram();
    const navigate = useNavigate();

    tg.onEvent('backButtonClicked', () => navigate('/home'));
    tg.BackButton.show();

    const discountLevel = {"Новый клиент": [3, '#f5d098'],
                            "No discount": [0, '#f5d098']}

    console.log(user_data);

    useEffect(() => {
        setSelectedCity(user_data?.user?.city_id ===  1 ? 'Владивосток' : user_data?.user?.city_id === 2 ? 'Артем' : user_data?.user?.city_id === 3 ? "Южно-Сахалинск" : user_data?.user?.city_id === 4 ? "Корсаков" : "");
        setUserName(user_data?.user?.name);
    }, [user_data])

    const fetchData = () => {
        var error = false;
        if (userName === "" || userName === undefined) {
            tg.showAlert('Введите своё Имя');
            error = true;
        } else if (phoneNumber.length !== 12) {
            tg.showAlert('Номер телефона должен состоять из 10 цифр!');
            error = true;
        } else if (selectedCity === "" || selectedCity === undefined) {
            tg.showAlert('Введите Ваш город!');
            error = true;
        }
        if (!error) {
            fetch("https://octopus-vape.ru/users/add_info", { method:'PUT',headers: {
                'Content-Type': 'application/json',
                'Telegram-Data': initData,
            }, body: JSON.stringify( {'name': userName, 'phone': phoneNumber.slice(1), 'city_id': selectedCity === 'Владивосток' ? 1 : selectedCity === 'Артем' ? 2 : selectedCity === 'Южно-Сахалинск' ? 3 : 4} )
          })
          .then(response => {
            return JSON.stringify( {'name': userName, 'phone': phoneNumber.slice(1), 'city_id': selectedCity === 'Владивосток' ? 1 : selectedCity === 'Артем' ? 2 : selectedCity === 'Южно-Сахалинск' ? 3 : 4} )
          })
          .then(data => {
            console.log(JSON.stringify( {'name': userName, 'phone': phoneNumber.slice(1), 'city_id': selectedCity === 'Владивосток' ? 1 : selectedCity === 'Артем' ? 2 : selectedCity === 'Южно-Сахалинск' ? 3 : 4} ));
            setModalActive(false);
            setUpdateScreen(updateScreen+1);
          })
        }
        
    }

    const fetchUser = () => {
        fetch("https://octopus-vape.ru/users/1", {method: 'GET', headers: {'Content-Type': 'application/json', 'Telegram-Data': initData,}})
          .then(response => {
            return response.json()
          })
          .then(data => {
            setUserData(data);
            setPhoneNumber('+' + data?.user?.phone);
            //console.log(data?.user.phone);
          })
      }
    
    useEffect(() => {
        fetchUser();
    }, [updateScreen])

    const colorScheme = window.Telegram.WebApp.colorScheme === 'light' ? true : false;

    const userImage = window.Telegram.WebApp.initDataUnsafe?.user?.photo_url
    console.log(phoneNumber);
    
    return (
        <div className={styles.root}>
            <div className={styles.Header} >
                <img className={styles.icon} src={userImage === undefined ? (process.env.PUBLIC_URL + "/assets/octopus_big1.jpg") : userImage} alt=''/>
            </div>
            <span className={styles.UserName}>{user_data?.user?.name}</span>
            <div className={styles.UserDiscountBox}>
                <span className={styles.UserDiscount}>{user_data !== undefined && user_data?.user?.discount_group === 'No discount' ? 'Bronze Card' : user_data?.user?.discount_group}</span>
            </div>
            <div className={styles.UserInfoBox}>
                {/* <p style={{margin: '2px 0', marginBottom: '5px', fontWeight: '800'}}>
                    <span style={{fontWeight: '800'}}>Статус: </span><span style={{color: user_data !== undefined && discountLevel[user_data.user.discount_group][1]}}>{user_data !== undefined && user_data.user.discount_group}</span>
                </p> */}
                <p style={{margin: '2px 0', marginBottom: '5px'}}>
                    <span style={{fontWeight: '800'}}>Телефон: </span><span>{user_data !== undefined && user_data?.user?.phone}</span>
                </p>
                <p style={{margin: '2px 0', marginBottom: '5px'}}>
                    <span style={{fontWeight: '800'}}>Город: </span><span>{user_data === undefined || null ? '' : (user_data?.user?.city_id !== undefined && user_data?.user?.city_id=== 1 ? "Владивосток" : user_data?.user?.city_id=== 2 ? "Артем" : user_data?.user?.city_id=== 3 ? "Южно-Сахалинск" : "Корсаков")}</span>
                </p>
            </div>
            <div className={styles.AddInfoBox}>
                <div className={styles.AddInfoBoxMain}>
                    <div className={styles.InfoIconBox} ><div className={styles.InfoIcon} >i</div></div>
                    <span className={styles.AddInfoText}>Для подтверждения заказов необходимо указать свой номер телефона и город.</span>
                </div>
                <div style={{'display':'flex', 'justifyContent': 'center'}}><div className={styles.AddInfoButton} onClick={() => setModalActive(true)}>Редактировать</div></div>
            </div>
            {user_data !== undefined && user_data?.user?.card_num ? (
                <div className={styles.qrBox}>
                    <div className={styles.qrTextBox} >
                        <div className={styles.qrTextHeader} >Бонусная карта</div>
                        <div className={styles.qrText} >Твой QR-код</div>
                    </div>
                    <div className={styles.qrImage} >
                        <QRCodeSVG value={user_data?.user?.card_num} size={145} bgColor='#ffffff' fgColor='#000000'/>
                    </div>
                </div>
            ) : (
                <Link className={styles.qrBox} style={{position: 'relative', background: '#424242'}} to={'https://octopus.getmeback.ru/wallet'}>
                    <div className={styles.qrBlurBox} style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', filter: 'blur(2px)'}} >
                        <div className={styles.qrTextBox} >
                            <div className={styles.qrTextHeader} >Бонусная карта</div>
                        </div>
                        <div className={styles.qrImage} style={{backgroundColor: '#2E2E2E'}} >
                        </div>
                    </div>
                    <div style={{display: 'flex', width: '100%', height: '100%', top: 0, left: 0, position: 'absolute', justifyContent: 'center', alignItems: 'center'}} >
                    <span style={{color: '#ffffff', width: '70%', whiteSpace: 'pre-wrap', fontSize: '18px', fontWeight: '700', textAlign: 'center'}}>
                        Зарегистрируйтесь,{'\n'} чтобы пользоваться программой лояльности
                    </span>
                    </div>
                </Link>
            )}
                
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
                        <option value="Корсаков">Корсаков</option>
                    </select>
                </div>
            </div>
            <div className={modalStyles.ConfirmButton} onClick={fetchData}>Подтвердить</div>
            </FilterModal>
        </div>
    );
}

export default Account