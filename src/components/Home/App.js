import './App.css';
import AccountItem from './AccountItem/AccountItem';
import CategoryList from './CategoryList/CategoryList';
import InfoCardList from './InfoCardList/InfoCardList';
import SearchItem from './SearchItem/SearchItem';
import useTelegram from '../../hooks/useTelegram';
import { useEffect } from 'react';

function App() {
  const {tg} = useTelegram();
  tg.BackButton.hide();

  useEffect(() => {
    tg.expand();
  })

  return (
    <div className='App'>
      <AccountItem />
      <hr/>
        <InfoCardList />
      
      <hr/>
      <SearchItem />
      <CategoryList />
      <hr/>
    </div>
  );
}

export default App;
