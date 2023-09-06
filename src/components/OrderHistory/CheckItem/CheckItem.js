import styles from './CheckItem.module.css'

function CheckItem({item}) {

    return (
        <div className={styles.root}>
            <div className={styles.Image}>
                <img style={{'object-fit': 'contain'}} src={"https://miniature-prod.moysklad.ru/miniature/3a69a92f-3453-11ee-0a80-092500013563/documentminiature/83d9bfaa-6238-4567-8b41-e4f0b49d1e8c"} alt=''/>
            </div>
            <div className={styles.Info} >
                <div className={styles.Price} >{item.price}</div>
                <div className={styles.Name} >{item.name + ', '+ item.count + 'шт.'}</div>
                <div className={styles.AddButton} >Добавить в корзину</div>
            </div>
        </div>
    );
}

export default CheckItem