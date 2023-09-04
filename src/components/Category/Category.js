import styles from './Category.module.css';
import Header from '../Header/Header'
import CategoryList from './CategoryList/CategoryList';
import { RxMixerHorizontal } from "react-icons/rx";
import useTelegram from '../../hooks/useTelegram';
import { useNavigate } from 'react-router-dom';
import Toggle from '../Toggle/Toggle'
import FilterModal from './FilterModal/FilterModal';
import { useState } from 'react';

import {AiOutlineClose} from "react-icons/ai";
import modalStyles from './Modal.module.css';

function Category() {
  const [modalActive, setModalActive] = useState(false);

  const {tg} = useTelegram();
  const navigate = useNavigate();

  tg.onEvent('backButtonClicked', () => navigate('/home/categories/'));
  tg.BackButton.show();

  const path = ['Главная', 'Каталог']
  const current = 'Жидкость'

  return (
    <div className={styles.Category}>
      <Header path={path} current={current}/>
      <div className={styles.filter}>
        <span className={styles.CategoriesLabel}>Все фильтры</span>
        <RxMixerHorizontal className={styles.MixerButton} onClick={() => setModalActive(true)} />      
      </div>
      <div className={styles.storeFilter}>
        <Toggle label="ул. Светланская, 9в" toggled={true} /*onClick={logState}*//>
        <Toggle label="ул. Русская, 46" toggled={true} /*onClick={logState}*//>
        <Toggle label="ул. Адмирала Фокина, 23в" toggled={true} /*onClick={logState}*//>
      </div>
      <CategoryList className={styles.ItemList} />
      <FilterModal active={modalActive} setActive={setModalActive} >
        <div style={{'height': '80vh', 'overflow-x': 'hidden','overflow-y': 'auto'}}>

          <div className={modalStyles.Header}>
            <span className={modalStyles.HeaderLabel}>Фильтры</span>
            <AiOutlineClose className={modalStyles.CloseButton} onClick={() => setModalActive(false)} />
          </div>
          <div className={modalStyles.VerticalBox}>
            <span>Наличие в магазинах:</span>
            <Toggle label="В любом" toggled={true} /*onClick={logState}*//>
            <Toggle label="ул. Светланская, 9в" toggled={false} /*onClick={logState}*//>
            <Toggle label="ул. Русская, 46" toggled={false} /*onClick={logState}*//>
            <Toggle label="ул. Адмирала Фокина, 23в" toggled={false} /*onClick={logState}*//>
          </div>
          <div className={modalStyles.HorizontalBox}>
            <span>Тип никотина:</span>
            <Toggle label="Соль" toggled={true} /*onClick={logState}*//>
            <Toggle label="Щелочь" toggled={true} /*onClick={logState}*//>
          </div>
          <div className={modalStyles.VerticalBox}>
            <span>Крепость</span>
            <div className={modalStyles.HorizontalBox}>
              <Toggle label="10" toggled={true} /*onClick={logState}*//>
              <Toggle label="20" toggled={false} /*onClick={logState}*//>
              <Toggle label="30" toggled={false} /*onClick={logState}*//>
              <Toggle label="40" toggled={false} /*onClick={logState}*//>
            </div>
            <span className={modalStyles.ShowButton}>Показать ещё</span>
          </div>
          <div className={modalStyles.VerticalBox}>
            <span>Объем (мл):</span>
            <div className={modalStyles.HorizontalBox}>
              <Toggle label="10" toggled={true} /*onClick={logState}*//>
              <Toggle label="20" toggled={false} /*onClick={logState}*//>
              <Toggle label="30" toggled={false} /*onClick={logState}*//>
              <Toggle label="40" toggled={false} /*onClick={logState}*//>
            </div>
          </div>
          <div className={modalStyles.VerticalBox}>
            <span>Цена:</span>
            <span>от 234     до 120 000</span>
          </div>
          <div className={modalStyles.VerticalBox}>
            <span>Производитель:</span>
            <Toggle label="Все" toggled={true} /*onClick={logState}*//>
            <Toggle label="Alaska" toggled={false} /*onClick={logState}*//>
            <Toggle label="Hummble" toggled={false} /*onClick={logState}*//>
            <Toggle label="Husky" toggled={false} /*onClick={logState}*//>
            <span className={modalStyles.ShowButton}>Показать ещё</span>
          </div>

        </div>
        <div className={modalStyles.ConfirmButton} >Подтвердить</div>
      </FilterModal>
    </div>
  );
}

export default Category;
