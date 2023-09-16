import styles from './CheckItem.module.css'

function CheckItem({item, showButton}) {

    return (
        <div className={styles.root}>
            <div className={styles.Image}>
                <img style={{'objectFit': 'contain'}} src={"https://miniature-prod.moysklad.ru/miniature/3a69a92f-3453-11ee-0a80-092500013563/documentminiature/83d9bfaa-6238-4567-8b41-e4f0b49d1e8c"} alt=''/>
            </div>
            <div className={styles.Info} >
                <div className={styles.Price} >{new Intl.NumberFormat('ru-RU', {style: 'currency', currency: 'RUB', minimumFractionDigits: 0}).format(item.price/100)}</div>
                <div className={styles.Name} >{item.name + ', '+ item.count + 'шт.'}</div>
                {showButton && (<div className={styles.AddButton} >Добавить в корзину</div>)}
            </div>
        </div>
    );
}

export default CheckItem
