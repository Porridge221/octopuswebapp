import CategoriesList from './CategoriesList/CategoriesList'
import Header from '../Home/Header/Header';
import styles from './Categories.module.css'
import useTelegram from '../../hooks/useTelegram';
import { useNavigate } from 'react-router-dom';

function Categories() {
  const {tg} = useTelegram();
  const navigate = useNavigate();

  tg.BackButton.show();
  tg.onEvent('backButtonClicked', () => navigate(-1));

  return (
    <div className={styles.Categories}>
      <Header />
      <div className={styles.CategoriesLabel}>Категории</div>
      <CategoriesList />
    </div>
  );
}

export default Categories;
