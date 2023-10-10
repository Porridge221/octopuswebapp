import CategoriesList from './CategoriesList/CategoriesList'
import styles from './Categories.module.css'
import useTelegram from '../../hooks/useTelegram';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import SearchItem from '../Home/SearchItem/SearchItem';
import useUser from '../../hooks/useUser';

function Categories() {
  const {tg} = useTelegram();
  const navigate = useNavigate();
  const user_data = useUser(false)

  tg.onEvent('backButtonClicked', () => navigate('/home'));
  tg.BackButton.show();

  const path = ['Главная']
  const current = 'Каталог'

  return (
    <div className={styles.Categories}>
      <Header path={path} current={current}/>
      <SearchItem/>
      <CategoriesList />
    </div>
  );
}

export default Categories;
