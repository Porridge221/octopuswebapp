import styles from './Category.module.css';
import Header from '../Header/Header'
import CategoryList from './CategoryList/CategoryList';
import { RxMixerHorizontal } from "react-icons/rx";
import useTelegram from '../../hooks/useTelegram';
import { useNavigate } from 'react-router-dom';
import Toggle from '../Toggle/Toggle'

function Category() {
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
        <RxMixerHorizontal className={styles.MixerButton} />      
      </div>
      <div className={styles.storeFilter}>
        <Toggle label="ул. Светланская, 9в" toggled={true} /*onClick={logState}*//>
        <Toggle label="ул. Русская, 46" toggled={true} /*onClick={logState}*//>
        <Toggle label="ул. Адмирала Фокина, 23в" toggled={true} /*onClick={logState}*//>
      </div>
      <CategoryList className={styles.ItemList} />
    </div>
  );
}

export default Category;
