import CategoriesList from './CategoriesList/CategoriesList'
import Header from '../Home/Header/Header';
import styles from './Categories.module.css'
function Categories() {

  return (
    <div className={styles.Categories}>
      <Header />
      <div className={styles.CategoriesLabel}>Категории</div>
      <CategoriesList />
    </div>
  );
}

export default Categories;
