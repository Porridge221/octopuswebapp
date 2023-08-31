import styles from './Category.module.css';
import Header from '../Header/Header'
import CategoryList from './CategoryList/CategoryList';
import { RxMixerHorizontal } from "react-icons/rx";
import useTelegram from '../../hooks/useTelegram';
import { useNavigate } from 'react-router-dom';

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
      <CategoryList className={styles.ItemList} />
    </div>
  );
}

export default Category;
