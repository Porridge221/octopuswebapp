import useTelegram from '../../../../hooks/useTelegram'
import styles from './CategoryItem.module.css'
import {Link} from 'react-router-dom'

function CategoryItem({category}) {
    const {tg, initData} = useTelegram()

    const fetchData = () => {
        fetch("https://octopus-vape.ru/consultant", {method: 'GET', headers: {'Content-Type': 'application/json', 'Telegram-Data': initData,}})
          .then(response => {
            return response.json()
          })
          .then(data => {
            tg.close()
          })
      }
    
    return (
        <Link className={styles.root} onClick={() => category.id === 2 && fetchData()} to={category.link}>
            <div className={category.style + ' ' + styles.unnamed6}>
                <div className={category.style !== 'TelegramRef' ? styles.textBlock : styles.textBlock2}>{category.text}</div>
                {category.style === 'ChooseAndOrder' && <img className={styles.CartButton} src={process.env.PUBLIC_URL + '/assets/home_order_icon.svg'} alt=''/>}
            </div> 
        </Link>
    );
}

export default CategoryItem