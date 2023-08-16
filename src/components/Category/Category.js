import styles from './Category.module.css';
import Header from '../Home/Header/Header';
import CategoryList from './CategoryList/CategoryList';
import { RxMixerVertical } from "react-icons/rx";
import { AiOutlineSearch } from "react-icons/ai";

function Category() {

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
