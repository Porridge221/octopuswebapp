import styles from './CheckItem.module.css'

function CheckItem({item, showButton}) {

    return (
        <div className={styles.root}>
            <div className={styles.Image}>
                <img style={{'objectFit': 'contain'}} src={process.env.PUBLIC_URL + "/assets/AccountImage.png"} alt=''/>
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
