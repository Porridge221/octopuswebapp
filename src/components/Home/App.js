import './App.css';
import AccountItem from './AccountItem/AccountItem';
import CategoryList from './CategoryList/CategoryList';
import InfoCardList from './InfoCardList/InfoCardList';
import SearchItem from './SearchItem/SearchItem';
import useTelegram from '../../hooks/useTelegram';
import { useEffect, useState } from 'react';
import OrderList from './OrderList/OrderList';
import useUser from '../../hooks/useUser';
import FilterModal from '../Category/FilterModal/FilterModal';
import modalStyles from './Modal.module.css'
import CartService from '../../services/cartService';

import RegModal from './RegModal.module.css';
import {AiOutlineClose} from "react-icons/ai";
import Input from 'react-phone-number-input/input'

var showedAgeConfirm = false;
var showedRegConfirm = false;

function App() {
  const {tg, initData} = useTelegram();
  const [cartData, setCartData] = useState();
  const user_data = useUser(true);
  const [modalActive, setModalActive] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedCity, setSelectedCity] = useState(user_data?.user?.city_id ===  1 ? 'Владивосток' : user_data?.user?.city_id === 2 ? 'Артем' : user_data?.user?.city_id === 3 ? "Южно-Сахалинск" : "Владивосток");
  const [userName, setUserName] = useState("");
  const [regModalActive, setRegModalActive] = useState(false);

  const [registerShow, setRegisterShow] = useState(false)

  tg.BackButton.hide();

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
      }, body: JSON.stringify( {'name': userName, 'phone': phoneNumber.slice(1), 'city_id': selectedCity === 'Владивосток' ? 1 : selectedCity === 'Артем' ? 2 : 3} )
      })
      .then(response => {
        return JSON.stringify( {'name': userName, 'phone': phoneNumber.slice(1), 'city_id': selectedCity === 'Владивосток' ? 1 : selectedCity === 'Артем' ? 2 : 3} )
      })
      .then(data => {
        console.log(JSON.stringify( {'name': userName, 'phone': phoneNumber.slice(1), 'city_id': selectedCity === 'Владивосток' ? 1 : selectedCity === 'Артем' ? 2 : 3} ));
        setRegModalActive(false);
        showedRegConfirm = true;
        // setUpdateScreen(updateScreen+1);
      })
    }
  }

  const [modalAfter, setModalAfter] = useState(false)

  const handler = () => {
    setModalActive(true);
    showedAgeConfirm=true;
  }

  const handlerAgeConfirm = () => {
    setModalActive(false);
    localStorage.setItem('AgeConfirm', 'true')
    setRegisterShow(true)
  }

  const handlerAgeNotConfirm = () => {
    setModalActive(false);
    setModalAfter(true)
  }

  useEffect(() => {
    setSelectedCity( user_data?.user?.city_id ===  1 ? 'Владивосток' : user_data?.user?.city_id === 2 ? 'Артем' : user_data?.user?.city_id === 3 ? "Южно-Сахалинск" : "Владивосток");
    setUserName(user_data?.user?.name);
    user_data !== undefined && !showedAgeConfirm && localStorage.getItem('AgeConfirm') !== 'true' ? handler() : setRegisterShow(true);
    user_data !== undefined && registerShow && !showedRegConfirm && ((user_data?.user?.phone === null || user_data?.user?.phone === undefined) || (user_data?.user?.city_id === null || user_data?.user?.city_id === undefined)) && setRegModalActive(true);
    // user_data !== undefined && !showed && ((user_data?.user?.phone === null || user_data?.user?.phone === undefined) || (user_data?.user?.city_id === null || user_data?.city_id === undefined)) && setRegModalActive(true);
    // return CartService({isUpdate: true, isSet: false, setUserData: setCartData})
  }, [user_data, setRegisterShow])

  console.log(phoneNumber);
  console.log(phoneNumber.length);
  console.log(userName);

  return (
    <div className='App'>
      <AccountItem user_data={user_data}/>
      <hr/>
      <InfoCardList />
      <hr/>
      <div>
        <SearchItem />
      </div>
      <CategoryList user_data={user_data}/>
      <hr/>
      <OrderList user_data={user_data}/>
      <FilterModal active={modalActive} setActive={setModalActive} isDeactivated={false} >
            {/* backgroundColor: 'var(--tg-theme-secondary-bg-color)' */}
            {/* 'var(--tg-theme-bg-color)' */}
        <div style={{'width': '70vw', 'overflowX': 'hidden','overflowY': 'auto', backgroundColor: 'var(--tg-theme-bg-color)'}}>
            <div className={modalStyles.Header}>
                <span className={modalStyles.HeaderLabel}>Здравствуйте, </span>
            </div>
            <div className={modalStyles.VerticalBox}>
              <div>Для пользования ботом необходимо подтвердить свой возраст.</div>
              <div>Вам уже исполнилось <span style={{color: '#80BAE4'}}>18 лет?</span></div>
            </div>
            <div className={modalStyles.HorizontalBox}>
              <div className={modalStyles.ConfirmButton} onClick={() => handlerAgeNotConfirm()}>Нет</div>
              <div className={modalStyles.ConfirmButton} onClick={() => handlerAgeConfirm()}>Да</div>
            </div>
        </div>
        </FilterModal>
        <FilterModal active={modalAfter} setActive={setModalAfter} isDeactivated={false} >
            {/* backgroundColor: 'var(--tg-theme-secondary-bg-color)' */}
            {/* 'var(--tg-theme-bg-color)' */}
        <div style={{'width': '80vw', 'overflowX': 'hidden','overflowY': 'hidden', padding: '15px 15px', backgroundColor: 'var(--tg-theme-bg-color)'}}>
          <div className={modalStyles.ByeBox}>
            <img className={modalStyles.iconOcto} src={process.env.PUBLIC_URL + '/assets/ageconfirm.PNG'} alt='' />
            <div className={modalStyles.ConfirmButton} onClick={() => tg.close()}>Bye</div>
          </div>
        </div>
        </FilterModal>
        <FilterModal active={regModalActive} setActive={setRegModalActive} isDeactivated={false}>
            <div style={{'width': '70vw', 'overflowX': 'hidden','overflowY': 'auto', backgroundColor: 'var(--tg-theme-bg-color)'}}>
                <div className={RegModal.Header}>
                    <span className={RegModal.HeaderLabel}>Регистрация</span>
                    {/* <AiOutlineClose className={RegModal.CloseButton} onClick={() => setRegModalActive(false)} /> */}
                </div>
                <div className={RegModal.VerticalBox}>
                <span>Для использования бота необходимо указать свой номер телефона.</span>
                    <div className={RegModal.NumberBox}>
                        <span style={{margin: '0 0', textAlign: 'center'}}>+7 | </span><Input className={RegModal.NumberInput}
                            country="RU"
                            international
                            value={phoneNumber}
                            onChange={setPhoneNumber}/>
                    </div>
                    <span style={{marginTop: '5px'}}>Укажите Имя</span>
                    <input name="myInput" className={RegModal.InputName} value={userName} onChange={e => setUserName(e.target.value)}/>
                    <span>Укажите город. Так пункты выдачи заказов будут отображаться корректно.</span>
                    <select className={RegModal.Select} value={selectedCity} onChange={e => setSelectedCity(e.target.value)} >
                        <option value="Владивосток">Владивосток</option>
                        <option value="Артем">Артем</option>
                        <option value="Южно-Сахалинск">Южно-Сахалинск</option>
                    </select>
                </div>
            </div>
            <div className={RegModal.ConfirmButton} onClick={fetchData}>Подтвердить</div>
            </FilterModal>
    </div>
  );
}

export default App;
