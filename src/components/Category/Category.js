import styles from './Category.module.css';
import Header from '../Home/Header/Header';
import CategoryList from './CategoryList/CategoryList';
import { RxMixerVertical } from "react-icons/rx";
import { AiOutlineSearch } from "react-icons/ai";
import useTelegram from '../../hooks/useTelegram';
import { useNavigate } from 'react-router-dom';

function Category() {
  const {tg} = useTelegram();
  const navigate = useNavigate();

  tg.onEvent('backButtonClicked', () => navigate('/home/categories/'));
  tg.BackButton.show();

  return (
    <div className={styles.Category}>
      <Header />
      <div style={{margin:'3%'}}>
      <span className={styles.CategoriesLabel}>Каталог</span>
        <RxMixerVertical className={styles.MixerButton} />
        <AiOutlineSearch className={styles.SearchIcon}/>        
      </div>
      <CategoryList className={styles.ItemList} />
    </div>
  );
}

export default Category;
