import styles from './CartItem.module.css'

function CartItem() {

    return (
        <div className={styles.root}>
            <div className={styles.Image}>
                <img style={{'object-fit': 'contain'}} src={"https://miniature-prod.moysklad.ru/miniature/3a69a92f-3453-11ee-0a80-092500013563/documentminiature/83d9bfaa-6238-4567-8b41-e4f0b49d1e8c"} alt=''/>
            </div>
            <div className={styles.Info} >
                <div className={styles.Price} >1500 Р</div>
                <div className={styles.Name} >Alaska Salt "Strawberry Banana"</div>
                <div className={styles.RemoveButton} >Удалить</div>
            </div>
            <div className={styles.CountInput} >
                <div ><img className={styles.icon} src={process.env.PUBLIC_URL + '/assets/plusButton.svg'} alt=''/></div>
                <div >1</div>
                <div ><img className={styles.icon} src={process.env.PUBLIC_URL + '/assets/minusButton.svg'} alt=''/></div>
            </div>
        </div>
    );
}

export default CartItem
