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

var showed = false;

function App() {
  const {tg} = useTelegram();

  const user_data = useUser(true);

  const [modalActive, setModalActive] = useState(false);

  tg.BackButton.hide();

  const handler = () => {
    setModalActive(true);
    showed=true;
  }

  useEffect(() => {
    user_data !== undefined && !showed && (user_data.phone === null || user_data.phone === undefined) && (user_data.city_id === null || user_data.city_id === undefined) && handler();
  }, [user_data])

  return (
    <div className='App'>
      <AccountItem user_data={user_data}/>
      <hr/>
      <InfoCardList />
      <hr/>
      <SearchItem />
      <CategoryList />
      <hr/>
      <OrderList user_data={user_data}/>
      <FilterModal active={modalActive} setActive={setModalActive} >
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
              <div className={modalStyles.ConfirmButton} onClick={() => tg.close()}>Нет</div>
              <div className={modalStyles.ConfirmButton} onClick={() => setModalActive(false)}>Да</div>
            </div>
        </div>
        </FilterModal>
    </div>
  );
}

export default App;
