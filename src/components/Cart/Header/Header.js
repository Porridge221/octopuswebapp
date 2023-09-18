import useTelegram from '../../../hooks/useTelegram'
import styles from './Header.module.css'

function Header({fetchDeleteAllCart, user_data}) {
    const {initData} = useTelegram();

    return (
        <div className={styles.root}>
            <div style={{'display':'flex','alignItems': 'center'}}>
                <span className={styles.Cart}>Корзина</span>
                <svg width="31" height="24" viewBox="0 0 31 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="Group 25">
                        <path id="Vector 16" className={styles.icon} d="M8.19672 8.92H2L4.65574 23H26.7869L29 8.92H22.8033M8.19672 8.92H22.8033M8.19672 8.92C8.19672 8.92 7.14286 0.999992 15.2787 1C23.4145 1.00001 22.8033 8.92 22.8033 8.92" stroke="#424242" stroke-width="2"/>
                    </g>
                </svg>
            </div>
            {user_data !== undefined && user_data.items.length > 0 && (<div className={styles.ClearButton} onClick={fetchDeleteAllCart}>Очистить корзину</div>)}
            
        </div>
    );
}

export default Header
