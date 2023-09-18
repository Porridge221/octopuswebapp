import styles from './Category.module.css';
import Header from '../Header/Header'
import CategoryList from './CategoryList/CategoryList';
import { RxMixerHorizontal } from "react-icons/rx";
import useTelegram from '../../hooks/useTelegram';
import { useLocation, useNavigate } from 'react-router-dom';
import Toggle from '../Toggle/Toggle'
import FilterModal from './FilterModal/FilterModal';
import { useState, useEffect, useMemo } from 'react';

import {AiOutlineClose} from "react-icons/ai";
import modalStyles from './Modal.module.css';

import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import './slider.css';
import useUser from '../../hooks/useUser';

function Category() {
  const user_data = useUser(false);
  const [storeZhig, setStoreZhig] = useState(true);
  const [storeRU, setStoreRU] = useState(true);
  const [storeFK, setStoreFK] = useState(true);
  const [storeNAB, setStoreNAB] = useState(true);
  const [storeKIR, setStoreKIR] = useState(true);
  const [storeSOV, setStoreSOV] = useState(true);
  const [storeSH, setStoreSH] = useState(true);
  const [storePYR, setStorePYR] = useState(true);

  const [storesToggle, setStoreToggles] = useState({16: true, 15: true, 1: true, 3: true, 20: true, 2: true, 11: true, 24: true});

  const category_id = useLocation().state;

  const [modalActive, setModalActive] = useState(false);

  const [priceRange, setPriceRange] = useState([0, 10000]);

  const [data, setData] = useState(0);

  const handleCallback = data => {
    setData(data);
  };

  const {tg, initData} = useTelegram();
  const navigate = useNavigate();

  tg.onEvent('backButtonClicked', () => navigate('/home/categories/'));
  tg.BackButton.show();

  const path = ['Главная', 'Каталог']
  const current = {
                    6: 'Жидкости',
                    1: 'JUUL Type',
                    2: 'Pod Системы',
                    3: 'Аккумуляторы',
                    4: 'Аксессуары',
                    5: 'Жевательный табак',
                    7: 'Одноразовые системы',
                    8: 'Расходники',
                    9: 'Устройства'
                  };
  
  console.log(priceRange);

  const [producerToggle, setProducerToggle] = useState()

  console.log(storesToggle);
  const fetchData = () => {
    // Object.keys(myObject).forEach(function(key, index) {
    //   myObject[key] *= 2;
    // });
    var query = (storeRU ? 'stores=16&' : '') + (storeFK ? 'stores=15&' : '') + (storeNAB ? 'stores=1&' : '') + (storeZhig ? 'stores=3&' : '') + (storeKIR ? 'stores=20&' : '') + (storeSOV ? 'stores=2&' : '') + (storeSH ? 'stores=11&' : '') + (storePYR ? 'stores=24&' : '');
    if (query === '') {
      setData(0);
      return;
    }
    fetch("https://octopus-vape.ru/products/catalog/" + category_id + '?' + query, {method: 'GET', headers: {'Content-Type': 'application/json', 'Telegram-Data': initData,}})
      .then(response => {
        return response.json()
      })
      .then(data => {
        setData(data);
      })
  }


  useEffect(() => {

    fetchData();
    
  }, [storeRU, storeFK, storeKIR, storeNAB, storePYR, storeSH, storeSOV, storeZhig])

  const filteredItems = useMemo(()=>{
    if (data === 0)
      return 0;
    var final = structuredClone(data)
    final.forEach((p,index) => {
      var filtered = []
      p.items.forEach((item, _i)=>{
          if(item.price_vvo/100 > priceRange[0] && item.price_vvo/100 < priceRange[1]){
              filtered.push(item);
          }
        })
      p.items = filtered
      });
      return final
  },[priceRange, data]);

  console.log(data);
  console.log(filteredItems);
  console.log(storeZhig);
  console.log(storeRU);
  console.log(storeSH);

  function storesHandler(id) {
    setStoreToggles({...storesToggle, id: storesToggle[id] ? false : true})
  } 

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
        {user_data.user.city_id === 1 ? <>
          <Toggle label="ул. Русская, 46" toggled={storeRU}  setStore={setStoreRU}/*onClick={logState} 16*//>
          <Toggle label="ул. Адмирала Фокина, 23в" toggled={storeFK}  setStore={setStoreFK} /*onClick={logState} 15*//>
          <Toggle label="ул. Набережная, 7Б" toggled={storeNAB}  setStore={setStoreNAB} /*onClick={logState}  1*//>
          <Toggle label="ул. Жигура, 12а" toggled={storeZhig}  setStore={setStoreZhig} /*onClick={logState}  3*//>
        </> : user_data.user.city_id === 2 ? <>
            <Toggle label="ул. Кирова, 2" toggled={storeKIR}  setStore={setStoreKIR} /*onClick={logState}  20*//>
        </> : user_data.user.city_id === 3 ? <>
          <Toggle label="ул. Советская, 31, 3" toggled={storeSOV}  setStore={setStoreSOV} /*onClick={logState}  2*//>
          <Toggle label="ул. Сахалинская, 45А, 1" toggled={storeSH}  setStore={setStoreSH} /*onClick={logState}  11*//>
          <Toggle label="ул. Пуркаева М.А., 102В" toggled={storePYR}  setStore={setStorePYR} /*onClick={logState}  24*//>
        </> : <>
          <Toggle label="ул. Русская, 46" toggled={storeRU}  setStore={setStoreRU}/*onClick={logState} 16*//>
          <Toggle label="ул. Адмирала Фокина, 23в" toggled={storeFK}  setStore={setStoreFK} /*onClick={logState} 15*//>
          <Toggle label="ул. Набережная, 7Б" toggled={storeNAB}  setStore={setStoreNAB} /*onClick={logState}  1*//>
          <Toggle label="ул. Жигура, 12а" toggled={storeZhig} setStore={setStoreZhig}/*onClick={logState}  3*//>
          <Toggle label="ул. Кирова, 2" toggled={storeKIR}  setStore={setStoreKIR} /*onClick={logState}  20*//>
          <Toggle label="ул. Советская, 31, 3" toggled={storeSOV}  setStore={setStoreSOV} /*onClick={logState}  2*//>
          <Toggle label="ул. Сахалинская, 45А, 1" toggled={storeSH}  setStore={setStoreSH} /*onClick={logState}  11*//>
          <Toggle label="ул. Пуркаева М.А., 102В" toggled={storePYR}  setStore={setStorePYR} /*onClick={logState}  24*//>
        </> }
        

        

        
      </div>
      <CategoryList className={styles.ItemList} result={filteredItems} category_id={category_id} />
      <FilterModal active={modalActive} setActive={setModalActive} >
        <div className={modalStyles.Header}>
          <span className={modalStyles.HeaderLabel}>Фильтры</span>
          <AiOutlineClose className={modalStyles.CloseButton} onClick={() => setModalActive(false)} />
        </div>
        {/* backgroundColor: 'var(--tg-theme-secondary-bg-color)' */}
        <div style={{'height': '70vh', 'overflowX': 'hidden','overflowY': 'auto', backgroundColor: 'var(--tg-theme-bg-color)'}}>          
          <div className={modalStyles.VerticalBox}>
            <span>Наличие в магазинах:</span>
              {user_data.user.city_id === 1 ? <>
                <Toggle label="ул. Русская, 46" toggled={storeRU}  setStore={setStoreRU} /*onClick={logState} 16*//>
                <Toggle label="ул. Адмирала Фокина, 23в" toggled={storeFK}  setStore={setStoreFK} /*onClick={logState} 15*//>
                <Toggle label="ул. Набережная, 7Б" toggled={storeNAB}  setStore={setStoreNAB} /*onClick={logState}  1*//>
                <Toggle label="ул. Жигура, 12а" toggled={storeZhig}  setStore={setStoreZhig} /*onClick={logState}  3*//>
              </> : user_data.user.city_id === 2 ? <>
                  <Toggle label="ул. Кирова, 2" toggled={storeKIR}  setStore={setStoreKIR} /*onClick={logState}  20*//>
              </> : user_data.user.city_id === 3 ? <>
                <Toggle label="ул. Советская, 31, 3" toggled={storeSOV}  setStore={setStoreSOV} /*onClick={logState}  2*//>
                <Toggle label="ул. Сахалинская, 45А, 1" toggled={storeSH}  setStore={setStoreSH} /*onClick={logState}  11*//>
                <Toggle label="ул. Пуркаева М.А., 102В" toggled={storePYR}  setStore={setStorePYR} /*onClick={logState}  24*//>
              </> : <>
                <Toggle label="ул. Русская, 46" toggled={storeRU}  setStore={setStoreRU} /*onClick={logState} 16*//>
                <Toggle label="ул. Адмирала Фокина, 23в" toggled={storeFK}  setStore={setStoreFK} /*onClick={logState} 15*//>
                <Toggle label="ул. Набережная, 7Б" toggled={storeNAB}  setStore={setStoreNAB} /*onClick={logState}  1*//>
                <Toggle label="ул. Жигура, 12а" toggled={storeZhig}  setStore={setStoreZhig} /*onClick={logState}  3*//>
                <Toggle label="ул. Кирова, 2" toggled={storeKIR}  setStore={setStoreKIR} /*onClick={logState}  20*//>
                <Toggle label="ул. Советская, 31, 3" toggled={storeSOV}  setStore={setStoreSOV} /*onClick={logState}  2*//>
                <Toggle label="ул. Сахалинская, 45А, 1" toggled={storeSH}  setStore={setStoreSH} /*onClick={logState}  11*//>
                <Toggle label="ул. Пуркаева М.А., 102В" toggled={storePYR}  setStore={setStorePYR} /*onClick={logState}  24*//>
              </> }
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
              <span>от <input className={modalStyles.inputPrice} value={priceRange[0]} onChange={e => setPriceRange([parseInt(e.target.value), priceRange[1]])} type='number' /></span>
              {/* <span>от {priceRange[0]} </span> */}
              <RangeSlider className={modalStyles.Slider} min={0} max={10000} value={priceRange} onInput={setPriceRange}/>
              <span> до <input className={modalStyles.inputPrice} value={priceRange[1]} onChange={e => setPriceRange([priceRange[0], parseInt(e.target.value)])} type='number' /></span>
            </div>
          </div>
          <div className={modalStyles.VerticalBox}>
            <span>Производитель:</span>
            <Toggle label="Все" toggled={true} /*onClick={logState}*//>
            {data !== 0 && data.map(producer => producer.items.length > 0 && ( <>
              <Toggle key={producer.product_id} label={producer.name} toggled={true} />
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
