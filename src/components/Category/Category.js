import styles from './Category.module.css';
import Header from '../Header/Header'
import CategoryList from './CategoryList/CategoryList';
import { RxMixerHorizontal } from "react-icons/rx";
import useTelegram from '../../hooks/useTelegram';
import { useLocation, useNavigate } from 'react-router-dom';
import Toggle from '../Toggle/Toggle'
import FilterModal from './FilterModal/FilterModal';
import { useState } from 'react';

import {AiOutlineClose} from "react-icons/ai";
import modalStyles from './Modal.module.css';

import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import './slider.css';

function Category() {
  const category_id = useLocation().state;

  const [modalActive, setModalActive] = useState(false);

  const [priceRange, setPriceRange] = useState([0, 10000]);

  const [data, setData] = useState(0);

  const handleCallback = data => {
    setData(data);
  };

  const {tg} = useTelegram();
  const navigate = useNavigate();

  tg.onEvent('backButtonClicked', () => navigate('/home/categories/'));
  tg.BackButton.show();

  const path = ['Главная', 'Каталог']
  const current = {1: 'Жидкость'}

  return (
    <div className={styles.Category}>
      <div className={styles.MainBackground} >
        {/* <img className={styles.icon} src={process.env.PUBLIC_URL + '/assets/main_background.svg'} alt=''/> */}
      </div>
      <Header path={path} current={current[category_id]}/>
      <div className={styles.filter}>
        <span className={styles.CategoriesLabel}>Все фильтры</span>
        <RxMixerHorizontal className={styles.MixerButton} onClick={() => setModalActive(true)} />      
      </div>
      <div className={styles.storeFilter}>
        <Toggle label="ул. Светланская, 9в" toggled={true} /*onClick={logState}*//>
        <Toggle label="ул. Русская, 46" toggled={true} /*onClick={logState}*//>
        <Toggle label="ул. Адмирала Фокина, 23в" toggled={true} /*onClick={logState}*//>
      </div>
      <CategoryList className={styles.ItemList} handleCallback={handleCallback} category_id={category_id} />
      <FilterModal active={modalActive} setActive={setModalActive} >
        <div className={modalStyles.Header}>
          <span className={modalStyles.HeaderLabel}>Фильтры</span>
          <AiOutlineClose className={modalStyles.CloseButton} onClick={() => setModalActive(false)} />
        </div>
        {/* backgroundColor: 'var(--tg-theme-secondary-bg-color)' */}
        <div style={{'height': '70vh', 'overflowX': 'hidden','overflowY': 'auto', backgroundColor: 'var(--tg-theme-bg-color)'}}>          
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
            <div className={modalStyles.HorizontalBox}>
              <span>от {priceRange[0]} </span>
              <RangeSlider className={modalStyles.Slider} min={0} max={10000} value={priceRange} onInput={setPriceRange}/>
              <span> до {priceRange[1]}</span>
            </div>
          </div>
          <div className={modalStyles.VerticalBox}>
            <span>Производитель:</span>
            <Toggle label="Все" toggled={true} /*onClick={logState}*//>
            {data!==0 && data.map(producer => ( <>
              <Toggle key={producer.id} label={producer.name} toggled={true} />
              </>
          ))}
            <span className={modalStyles.ShowButton}>Показать ещё</span>
          </div>

        </div>
        <div className={modalStyles.ConfirmButton} onClick={() => setModalActive(false)} >Подтвердить</div>
      </FilterModal>
    </div>
  );
}

export default Category;
