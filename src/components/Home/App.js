import './App.css';
import AccountItem from './AccountItem/AccountItem';
import CategoryList from './CategoryList/CategoryList';
import Header from './Header/Header';
import InfoCardList from './InfoCardList/InfoCardList';
import SearchItem from './SearchItem/SearchItem';
import useTelegram from '../../hooks/useTelegram';

function App() {
  const {tg} = useTelegram();
  tg.BackButton.hide();

  return (
    <div className='App'>
      <Header />
      <AccountItem />
      <SearchItem />
      <div>
        <InfoCardList />
      </div>
      <CategoryList />
    </div>
  );
}

export default App;
