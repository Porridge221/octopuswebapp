import './App.css';
import AccountItem from './AccountItem/AccountItem';
import CategoryList from './CategoryList/CategoryList';
import InfoCardList from './InfoCardList/InfoCardList';
import SearchItem from './SearchItem/SearchItem';
import useTelegram from '../../hooks/useTelegram';
import { useEffect } from 'react';
import OrderList from './OrderList/OrderList';
import useUser from '../../hooks/useUser';

function App() {
  const {tg} = useTelegram();
  const user_data = useUser(true);

  tg.BackButton.hide();

  // useEffect(() => {
  //   tg.expand();
  //   // console.log(user_data);
  // })

  return (
    <div className='App'>
      <AccountItem user_data={user_data}/>
      <hr/>
      <InfoCardList />
      <hr/>
      <SearchItem />
      <CategoryList />
      <hr/>
      <OrderList user_data={user_data}/>
    </div>
  );
}

export default App;
