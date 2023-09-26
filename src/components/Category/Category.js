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

var newState = [];

function Category() {
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

  const [updateCatalog, setUpdateCatalog] = useState(1);

  // const [storesToggle, setStoreToggles] = useState({16: true, 15: true, 1: true, 20: true, 2: true, 11: true, 24: true});
  const [producerToggle, setProducerToggles] = useState([]);

  const [NikotinTypeToggle, setNikotinTypeToggles] = useState([
    {key: 1, value:true, name: 'Соль'},
    {key: 2, value:true, name: 'Щелочь'}
  ]);
  const [NikotinValueToggle, setNikotinValueToggles] = useState([
    {key: 1, value:true, name: '0'},
    {key: 2, value:true, name: '3'},
    {key: 3, value:true, name: '5'},
    {key: 4, value:true, name: '12'},
    {key: 5, value:true, name: '20'},
    {key: 6, value:true, name: '40'},
    {key: 7, value:true, name: '50'},
  ]);
  const [sizeToggle, setSizeToggles] = useState([
    {key: 1, value:true, name: '10'},
    {key: 2, value:true, name: '20'},
    {key: 3, value:true, name: '30'},
    {key: 4, value:true, name: '40'},
    {key: 5, value:true, name: '60'},
    {key: 6, value:true, name: '80'},
    {key: 7, value:true, name: '120'},
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
                    9: 'Устройства'
                  };
  
  console.log(priceRange);

  // const [producerToggle, setProducerToggle] = useState()

  function addValueToList(key, value, name) {
    //if the list is already created for the "key", then uses it
    //else creates new list for the "key" to store multiple values in it.
    // newState[key] = newState[key] || [];
    newState.push({key: key, value: value, name: name});
    // newState[key].push(value);
    // newState[key].push(name);
  }

  const fetchData = () => {
    // Object.keys(myObject).forEach(function(key, index) {
    //   myObject[key] *= 2;
    // });
    var query = (storeRU ? 'stores=16&' : '') + (storeFK ? 'stores=15&' : '') + (storeNAB ? 'stores=1&' : '') + (storeKIR ? 'stores=20&' : '') + (storeSOV ? 'stores=2&' : '') + (storeSH ? 'stores=11&' : '') + (storePYR ? 'stores=24&' : '');
    user_data.user.city_id === 1 && (query = (storeRU ? 'stores=16&' : '') + (storeFK ? 'stores=15&' : '') + (storeNAB ? 'stores=1&' : ''));
    user_data.user.city_id === 2 && (query = (storeKIR ? 'stores=20&' : ''));
    user_data.user.city_id === 3 && (query = (storeSOV ? 'stores=2&' : '') + (storeSH ? 'stores=11&' : '') + (storePYR ? 'stores=24&' : ''));
    // query !== '' && (query += '&');
    !checkAllProducer && (producerToggle.forEach(producer => producer.value && (query += `products=${producer.key}&`)));
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
        console.log('producerToggle');
        console.log(producerToggle);
        if (producerToggle.length === 0) {
          newState = [];
          data.forEach(producer => ( producer.items.length > 0 &&
            addValueToList(producer.product_id, true, producer.name)
          ));
          setProducerToggles(newState);
        }
        console.log('newState out 999');
        console.log(newState);
        newState !== undefined && newState.size !== 0 && newState.map(producer => (console.log(producer)));
        // console.log(newState[999]);
        // console.log(newState[999][1]);
      })
  }


  useEffect(() => {

    fetchData();
    
  }, [storeRU, storeFK, storeKIR, storeNAB, storePYR, storeSH, storeSOV, updateCatalog])


  useEffect(() => {
    var state = true;
    var states = [...producerToggle];
    states.forEach(producer =>  {
      console.log(producer.value);
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
      // for (var pp in producerToggle) {
      //   console.log(p.product_id + '  ' + pp.key + '  ' + pp.value);
      //   if (p.product_id === pp.key && pp.value) {
      //     isContain = true;
      //     break;
      //   }
      // }
      if (isContain) {
        p.items.forEach((item, _i)=>{
            if((user_data.user.city_id === 3 ? item.price_shk/100 : item.price_vvo/100) > priceRange[0] && (user_data.user.city_id === 3 ? item.price_shk/100 : item.price_vvo/100) < priceRange[1]){
                filtered.push(item);
            }
          })
        p.items = filtered
      } else p.items = [];
      });
      // indexes.forEach((index) => {
      //   final.splice(index, 1)
      // })
      console.log('FILTERED');
      console.log(final);
      return final
  },[priceRange, data, producerToggle]);

  console.log(data);
  console.log(filteredItems);
  console.log(storeRU);
  console.log(storeSH);
  console.log('tttttttttttttttt');
  console.log(producerToggle !== undefined ? producerToggle : 'hahahah');
  console.log(producerToggle.length);

  // function storesHandler(id) {
  //   setStoreToggles({...storesToggle, id: storesToggle[id] ? false : true})
  // }

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

  const handleSetUpdateCatalog = () => {
    setUpdateCatalog(updateCatalog + 1);
    setModalActive(false);
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
        {/* backgroundColor: 'var(--tg-theme-bg-color)' */}
        <div style={{maxHeight: '70vh', maxWidth: '80vw', 'overflowX': 'hidden','overflowY': 'auto', backgroundColor: 'var(--tg-theme-bg-color)'}}>          
          <div className={modalStyles.VerticalBox}>
            <span>Наличие в магазинах:</span>
              {user_data.user.city_id === 1 ? <>
                <Toggle label="ул. Русская, 46" toggled={storeRU}  setStore={setStoreRU} /*onClick={logState} 16*//>
                <Toggle label="ул. Адмирала Фокина, 23в" toggled={storeFK}  setStore={setStoreFK} /*onClick={logState} 15*//>
                <Toggle label="ул. Набережная, 7Б" toggled={storeNAB}  setStore={setStoreNAB} /*onClick={logState}  1*//>
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
              <span>Тип никотина:</span>
              <div className={modalStyles.HorizontalBox} >
                <Toggle label="Соль" toggled={true} /*onClick={logState}*//>
                <Toggle label="Щелочь" toggled={true} /*onClick={logState}*//>
              </div>
            </div>
            <div className={modalStyles.VerticalBox}>
              <span>Крепость</span>
              <div style={{display: 'flex', width: '100%'}}>
                <Toggle label="0" toggled={true} />
                <Toggle label="1.5" toggled={true} />
                <Toggle label="3" toggled={true} />
                <Toggle label="6" toggled={true} />
                {/* <Toggle label="12" toggled={true} />
                <Toggle label="18" toggled={true} />
                <Toggle label="20" toggled={false} />
                <Toggle label="25" toggled={false} />
                <Toggle label="20 Medium" toggled={false} />
                <Toggle label="35" toggled={false} />
                <Toggle label="20 Strong" toggled={false} />
                <Toggle label="20 Hard" toggled={false} />
                <Toggle label="40" toggled={false} />
                <Toggle label="45" toggled={false} />
                <Toggle label="20mg Ultra" toggled={false} />
                <Toggle label="20mg Extra" toggled={false} /> 
                <Toggle label="50" toggled={false} />
                <Toggle label="60" toggled={false} /> */}
              </div>
              <span className={modalStyles.ShowButton}>Показать ещё</span>
            </div>
            <div className={modalStyles.VerticalBox}>
              <span>Объем (мл):</span>
              <div className={modalStyles.HorizontalBox}>
                <Toggle label="10" toggled={true} />
                <Toggle label="30" toggled={true} />
                <Toggle label="60" toggled={true} />
                <Toggle label="80" toggled={true} />
                {/* <Toggle label="95" toggled={false} />
                <Toggle label="100" toggled={false} />
                <Toggle label="120" toggled={false} /> */}
              </div>
            </div>
          </>)
          }
          <div className={modalStyles.VerticalBox}>
            <span>Цена:</span>
            <div className={modalStyles.HorizontalBox} style={{margin: '0 15px', textAlign: 'center', justifyContent: 'center'}}>
              <span><input className={modalStyles.inputPrice} value={priceRange[0]} onChange={e => setPriceRange([parseInt(e.target.value), priceRange[1]])} type='number' /></span>
              {/* <span>от {priceRange[0]} </span> */}
              <div style={{margin: '0 10px', fontSize: '17px', fontWeight: '400', marginBottom: '16px'}} >до</div>
              {/* <RangeSlider className={modalStyles.Slider} min={0} max={10000} value={priceRange} onInput={setPriceRange}/> */}
              <span><input className={modalStyles.inputPrice} value={priceRange[1]} onChange={e => setPriceRange([priceRange[0], parseInt(e.target.value)])} type='number' /></span>
            </div>
          </div>

        </div>
        <div className={modalStyles.ConfirmButton} onClick={() => handleSetUpdateCatalog()} >Подтвердить</div>
      </FilterModal>
    </div>
  );
}

export default Category;
