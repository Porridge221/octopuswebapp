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
import CartService from '../../services/cartService';

var newState = [];

function Category() {
  const [cartData, setCartData] = useState(CartService({isUpdate: false, isInit: false}))

  const user_data = useUser(false);
  const [storeRU, setStoreRU] = useState(true);
  const [storeFK, setStoreFK] = useState(true);
  const [storeNAB, setStoreNAB] = useState(true);
  const [storeKIR, setStoreKIR] = useState(true);
  const [storeSOV, setStoreSOV] = useState(true);
  const [storeSH, setStoreSH] = useState(true);
  const [storePYR, setStorePYR] = useState(true);

  const [showAllProducer, setShowAllProducer] = useState(false);
  const [checkAllProducer, setCheckAllProducer] = useState(true);
  const [checkAllNikotin, setCheckAllNikotin] = useState(true);
  const [checkAllVolume, setCheckAllVolume] = useState(true);

  const [showAllNikotinValue, setShowAllNikotinValue] = useState(false);
  const [showAllSize, setShowAllSize] = useState(false);

  const [updateCatalog, setUpdateCatalog] = useState(1);

  const [producerToggle, setProducerToggles] = useState([]);

  const [NikotinValueToggle, setNikotinValueToggles] = useState([
    {key: 1, value:true, name: '0mg'},
    {key: 2, value:true, name: '3mg'},
    {key: 3, value:true, name: '6mg'},
    {key: 4, value:true, name: '12mg'},
    {key: 5, value:true, name: '18mg'},
    {key: 6, value:true, name: '20mg'},
    {key: 7, value:true, name: '20+'},
  ]);

  const [sizeToggle, setSizeToggles] = useState([
    {key: 1, value:true, name: '10ml'},
    {key: 2, value:true, name: '30ml'},
    {key: 3, value:true, name: '50ml'},
    {key: 4, value:true, name: '57ml'},
    {key: 5, value:true, name: '58ml'},
    {key: 6, value:true, name: '60ml'},
    {key: 7, value:true, name: '80ml'},
    {key: 8, value:true, name: '100ml'},
    {key: 9, value:true, name: '120ml'},
  ]);

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
                    9: 'Устройства',
                    10: 'Атомайзеры'
                  };

  function addValueToList(key, value, name) {
    //if the list is already created for the "key", then uses it
    //else creates new list for the "key" to store multiple values in it.
    // newState[key] = newState[key] || [];
    newState.push({key: key, value: value, name: name});
    // newState[key].push(value);
    // newState[key].push(name);
  }

  const fetchData = () => {
    var query = (storeRU ? 'stores=16&' : '') + (storeFK ? 'stores=15&' : '') + (storeNAB ? 'stores=1&' : '') + (storeKIR ? 'stores=20&' : '') + (storeSOV ? 'stores=2&' : '') + (storeSH ? 'stores=11&' : '') + (storePYR ? 'stores=24&' : '');
    user_data.user.city_id === 1 && (query = (storeRU ? 'stores=16&' : '') + (storeFK ? 'stores=15&' : '') + (storeNAB ? 'stores=1&' : ''));
    user_data.user.city_id === 2 && (query = (storeKIR ? 'stores=20&' : ''));
    user_data.user.city_id === 3 && (query = (storeSH ? 'stores=11&' : '') + (storePYR ? 'stores=24&' : ''));
    user_data.user.city_id === 4 && (query = (storeSOV ? 'stores=2&' : ''));
    // query !== '' && (query += '&');
    // !checkAllProducer && (producerToggle.forEach(producer => producer.value && (query += `products=${producer.key}&`)));

    if (category_id === 6) {
      sizeToggle.forEach((sizeItem) => {
        query += sizeItem.value ? `volume=${sizeItem.name}&` : ''
      })
      NikotinValueToggle.forEach((nikotinItem) => {
        query += nikotinItem.value ? (nikotinItem.key === 7 ? `nikotin=20%2B&` :  `nikotin=${nikotinItem.name}&`) : ''
      })
    }

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
        if (producerToggle.length === 0) {
          newState = [];
          data.forEach(producer => ( producer.items.length > 0 &&
            addValueToList(producer.product_id, true, producer.name)
          ));
          setProducerToggles(newState);
        }
        setIsLoading(false);
        // newState !== undefined && newState.size !== 0 && newState.map(producer => (console.log(producer)));
      })
  }


  useEffect(() => {
    fetchData();
    
  }, [storeRU, storeFK, storeKIR, storeNAB, storePYR, storeSH, storeSOV, updateCatalog])


  useEffect(() => {
    var state = true;
    var states = [...producerToggle];
    states.forEach(producer =>  {
      if (producer.value === false) {
        state = false;
        return;
      }
    });
    setCheckAllProducer(state);
  }, [producerToggle])

  const filteredItems = useMemo(()=>{
    if (data === 0)
      return 0;
    var final = structuredClone(data)
    var indexes = []
    final.forEach((p,index) => {
      var filtered = []
      var isContain = false;
      producerToggle.forEach((obj) => {
        if (p.product_id === obj['key'] && obj.value) {
          isContain = true;
        }
      })

      if (isContain) {
        p.items.forEach((item, _i)=>{
            if(( [3, 4].indexOf(user_data?.user?.city_id) !== -1 ? item.price_shk/100 : item.price_vvo/100) > priceRange[0] && ([3, 4].indexOf(user_data?.user?.city_id) !== -1 ? item.price_shk/100 : item.price_vvo/100) < priceRange[1]){
                filtered.push(item);
            }
          })
        p.items = filtered
      } else p.items = [];
      });

      return final
  },[priceRange, data, producerToggle]);

  const handleShowAllProducer = () => {
    setShowAllProducer(!showAllProducer);
  }

  const handleSetCheckAllProducer = (state) => {
    var states = [...producerToggle];
    states.forEach(producer =>  (
      producer.value = !checkAllProducer
    ));
    setProducerToggles(states);
    // setCheckAllProducer(!checkAllProducer);
  }

  const handleSetCheckAllVolume = (state) => {
    var states = [...sizeToggle];
    states.forEach(producer =>  (
      producer.value = !checkAllVolume
    ));
    setSizeToggles(states);
    // setCheckAllProducer(!checkAllProducer);
  }

  useEffect(() => {
    var state = true;
    var states = [...NikotinValueToggle];
    states.forEach(producer =>  {
      if (producer.value === false) {
        state = false;
        return;
      }
    });
    setCheckAllNikotin(state);
  }, [NikotinValueToggle])

  useEffect(() => {
    var state = true;
    var states = [...sizeToggle];
    states.forEach(producer =>  {
      if (producer.value === false) {
        state = false;
        return;
      }
    });
    setCheckAllVolume(state);
  }, [sizeToggle])

  const handleSetCheckAllNikotin = (state) => {
    var states = [...NikotinValueToggle];
    states.forEach(producer =>  (
      producer.value = !checkAllNikotin
    ));
    setNikotinValueToggles(states);
    setCheckAllNikotin(!checkAllNikotin);
  }

  const handleSetUpdateCatalog = () => {
    setIsLoading(true);
    setUpdateCatalog(updateCatalog + 1);
    setModalActive(false);
  }

  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className={styles.Category}>
      {isLoading && (
        <div className={styles.loaderContainer}>
          <div className={styles.spinner}></div>
        </div>
      ) }
      <div className={styles.MainBackground} >
        {/* <img className={styles.icon} src={process.env.PUBLIC_URL + '/assets/main_background.svg'} alt=''/> */}
      </div>
      <Header path={path} current={current[category_id]} cartData={cartData}/>
      <div className={styles.filter}>
        <span className={styles.CategoriesLabel}>Все фильтры</span>
        <RxMixerHorizontal className={styles.MixerButton} onClick={() => setModalActive(true)} />      
      </div>
      <div className={styles.storeFilter}>
        {user_data?.user?.city_id === 1 ? <>
          <Toggle label="ул. Русская, 46" toggled={storeRU}  setStore={setStoreRU}/*onClick={logState} 16*//>
          <Toggle label="ул. Адмирала Фокина, 23в" toggled={storeFK}  setStore={setStoreFK} /*onClick={logState} 15*//>
          <Toggle label="ул. Набережная, 7Б" toggled={storeNAB}  setStore={setStoreNAB} /*onClick={logState}  1*//>
        </> : user_data?.user?.city_id === 2 ? <>
            <Toggle label="ул. Кирова, 2" toggled={storeKIR}  setStore={setStoreKIR} /*onClick={logState}  20*//>
        </> : user_data?.user?.city_id === 3 ? <>
          <Toggle label="ул. Сахалинская, 45А, 1" toggled={storeSH}  setStore={setStoreSH} /*onClick={logState}  11*//>
          <Toggle label="ул. Пуркаева М.А., 102В" toggled={storePYR}  setStore={setStorePYR} /*onClick={logState}  24*//>
        </> : user_data?.user?.city_id === 4 ? <>
          <Toggle label="ул. Советская, 31, 3" toggled={storeSOV}  setStore={setStoreSOV} /*onClick={logState}  2*//>
        </> : <>
          <Toggle label="ул. Русская, 46" toggled={storeRU}  setStore={setStoreRU}/*onClick={logState} 16*//>
          <Toggle label="ул. Адмирала Фокина, 23в" toggled={storeFK}  setStore={setStoreFK} /*onClick={logState} 15*//>
          <Toggle label="ул. Набережная, 7Б" toggled={storeNAB}  setStore={setStoreNAB} /*onClick={logState}  1*//>
          <Toggle label="ул. Кирова, 2" toggled={storeKIR}  setStore={setStoreKIR} /*onClick={logState}  20*//>
          <Toggle label="ул. Советская, 31, 3" toggled={storeSOV}  setStore={setStoreSOV} /*onClick={logState}  2*//>
          <Toggle label="ул. Сахалинская, 45А, 1" toggled={storeSH}  setStore={setStoreSH} /*onClick={logState}  11*//>
          <Toggle label="ул. Пуркаева М.А., 102В" toggled={storePYR}  setStore={setStorePYR} /*onClick={logState}  24*//>
        </> }       
      </div>
      {data === 0 ? (
        <div className={styles.loaderStartContainer}>
          <div className={styles.spinner}></div>
        </div>
        ) : 
        <CategoryList className={styles.ItemList} result={filteredItems} category_id={category_id} cartData={cartData} setCartData={setCartData} />
      }
      <FilterModal active={modalActive} setActive={setModalActive} >
        <div className={modalStyles.Header}>
          <span className={modalStyles.HeaderLabel}>Фильтры</span>
          <AiOutlineClose className={modalStyles.CloseButton} onClick={() => setModalActive(false)} />
        </div>
        {/* backgroundColor: 'var(--tg-theme-bg-color)' */}
        <div style={{maxHeight: '70vh', maxWidth: '80vw', 'overflowX': 'hidden','overflowY': 'auto', backgroundColor: 'var(--tg-theme-bg-color)'}}>          
          <div className={modalStyles.VerticalBox}>
            <span>Наличие в магазинах:</span>
              {user_data?.user?.city_id === 1 ? <>
                <Toggle label="ул. Русская, 46" toggled={storeRU}  setStore={setStoreRU} /*onClick={logState} 16*//>
                <Toggle label="ул. Адмирала Фокина, 23в" toggled={storeFK}  setStore={setStoreFK} /*onClick={logState} 15*//>
                <Toggle label="ул. Набережная, 7Б" toggled={storeNAB}  setStore={setStoreNAB} /*onClick={logState}  1*//>
              </> : user_data?.user?.city_id === 2 ? <>
                  <Toggle label="ул. Кирова, 2" toggled={storeKIR}  setStore={setStoreKIR} /*onClick={logState}  20*//>
              </> : user_data?.user?.city_id === 3 ? <>
                <Toggle label="ул. Сахалинская, 45А, 1" toggled={storeSH}  setStore={setStoreSH} /*onClick={logState}  11*//>
                <Toggle label="ул. Пуркаева М.А., 102В" toggled={storePYR}  setStore={setStorePYR} /*onClick={logState}  24*//>
              </> : user_data?.user?.city_id === 4 ? <>
                <Toggle label="ул. Советская, 31, 3" toggled={storeSOV}  setStore={setStoreSOV} /*onClick={logState}  2*//>
              </> : <>
                <Toggle label="ул. Русская, 46" toggled={storeRU}  setStore={setStoreRU} /*onClick={logState} 16*//>
                <Toggle label="ул. Адмирала Фокина, 23в" toggled={storeFK}  setStore={setStoreFK} /*onClick={logState} 15*//>
                <Toggle label="ул. Набережная, 7Б" toggled={storeNAB}  setStore={setStoreNAB} /*onClick={logState}  1*//>
                <Toggle label="ул. Кирова, 2" toggled={storeKIR}  setStore={setStoreKIR} /*onClick={logState}  20*//>
                <Toggle label="ул. Советская, 31, 3" toggled={storeSOV}  setStore={setStoreSOV} /*onClick={logState}  2*//>
                <Toggle label="ул. Сахалинская, 45А, 1" toggled={storeSH}  setStore={setStoreSH} /*onClick={logState}  11*//>
                <Toggle label="ул. Пуркаева М.А., 102В" toggled={storePYR}  setStore={setStorePYR} /*onClick={logState}  24*//>
              </> }
          </div>
          <div className={modalStyles.VerticalBox}>
              <span>Производитель:</span>
              <Toggle label="Все" toggled={checkAllProducer} setStore={handleSetCheckAllProducer} /*onClick={logState}*//>
              {producerToggle.length !== 0 && producerToggle.map((producer, index) => showAllProducer ? ( <>
                <Toggle key={producer.key} label={producer.name} toggled={producer.value} setStore={setProducerToggles} multiple={true} multipleState={producerToggle} producer_id={producer.key} />
                </>
              ) : index < 3 && ( <>
              <Toggle key={producer.key} label={producer.name} toggled={producer.value} setStore={setProducerToggles} multiple={true} multipleState={producerToggle} producer_id={producer.key} />
              </>
              ))}
              <span className={modalStyles.ShowButton} onClick={() => handleShowAllProducer()}>{showAllProducer ? 'Скрыть' : 'Показать ещё'}</span>
          </div>
          {category_id === 6 &&
          (<>
            <div className={modalStyles.VerticalBox}>
              <span>Крепость (мг):</span>
              <Toggle label="Все" toggled={checkAllNikotin} setStore={handleSetCheckAllNikotin} /*onClick={logState}*//>
              <div className={modalStyles.NikotinValueBox}>
                {NikotinValueToggle.length !== 0 && NikotinValueToggle.map((NikotinValueItem, index) => showAllNikotinValue ? ( <>
                <Toggle key={NikotinValueItem.key} label={NikotinValueItem.name} toggled={NikotinValueItem.value} setStore={setNikotinValueToggles} multiple={true} multipleState={NikotinValueToggle} producer_id={NikotinValueItem.key} />
                </>
              ) : index < 3 && ( <>
                <Toggle key={NikotinValueItem.key} label={NikotinValueItem.name} toggled={NikotinValueItem.value} setStore={setNikotinValueToggles} multiple={true} multipleState={NikotinValueToggle} producer_id={NikotinValueItem.key} />
                </>
              ))}
              </div>
              <span className={modalStyles.ShowButton} onClick={() => setShowAllNikotinValue(!showAllNikotinValue)}>{showAllNikotinValue ? 'Скрыть' : 'Показать ещё'}</span>
            </div>
            <div className={modalStyles.VerticalBox}>
              <span>Объем (мл):</span>
              <Toggle label="Все" toggled={checkAllVolume} setStore={handleSetCheckAllVolume} /*onClick={logState}*//>
              <div className={modalStyles.NikotinValueBox}>
                {sizeToggle.length !== 0 && sizeToggle.map((sizeItem, index) => showAllSize ? ( <>
                <Toggle key={sizeItem.key} label={sizeItem.name} toggled={sizeItem.value} setStore={setSizeToggles} multiple={true} multipleState={sizeToggle} producer_id={sizeItem.key} />
                </>
              ) : index < 3 && ( <>
                <Toggle key={sizeItem.key} label={sizeItem.name} toggled={sizeItem.value} setStore={setSizeToggles} multiple={true} multipleState={sizeToggle} producer_id={sizeItem.key} />
                </>
              ))}
              </div>
              <span className={modalStyles.ShowButton} onClick={() => setShowAllSize(!showAllSize)}>{showAllSize ? 'Скрыть' : 'Показать ещё'}</span>

            </div>
          </>)
          }
          <div className={modalStyles.VerticalBox}>
            <span>Цена:</span>
            <div className={modalStyles.HorizontalBox} style={{margin: '0 15px', textAlign: 'center', justifyContent: 'center'}}>
              <span><input className={modalStyles.inputPrice} value={priceRange[0]} onChange={e => setPriceRange([e.target.value === '' ? '' : parseInt(e.target.value), priceRange[1]])} type='number' /></span>
              {/* <span>от {priceRange[0]} </span> */}
              <div style={{margin: '0 10px', fontSize: '17px', fontWeight: '400', marginBottom: '16px'}} >до</div>
              {/* <RangeSlider className={modalStyles.Slider} min={0} max={10000} value={priceRange} onInput={setPriceRange}/> */}
              <span><input className={modalStyles.inputPrice} value={priceRange[1]} onChange={e => setPriceRange([priceRange[0], e.target.value === '' ? '' : parseInt(e.target.value)])} type='number' /></span>
            </div>
          </div>

        </div>
        <div className={modalStyles.ConfirmButton} onClick={() => handleSetUpdateCatalog()} >Подтвердить</div>
      </FilterModal>
    </div>
  );
}

export default Category;