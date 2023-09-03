import styles from './Header.module.css'

function Header() {

    return (
        <div className={styles.root}>
            <div style={{'display':'flex','align-items': 'center'}}>
                <span className={styles.Cart}>Корзина</span>
                <img className={styles.icon} src={process.env.PUBLIC_URL + '/assets/Group 25.svg'} alt=''/>
            </div>
            <div className={styles.ClearButton}>Очистить корзину</div>
        </div>
    );
}

export default Header
