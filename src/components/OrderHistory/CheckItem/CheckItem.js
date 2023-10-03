import styles from './CheckItem.module.css'
import { useState } from 'react';


function CheckItem({item, showButton}) {

    const [imageVar, setImageVar] = useState(item?.image)

    return (
        <div className={styles.root}>
            <div className={styles.Image}>
                {/* <img style={{'objectFit': 'contain'}} src={process.env.PUBLIC_URL + "/assets/AccountImage.png"} alt=''/> */}
                <img style={{'objectFit': 'contain'}} src={imageVar} alt='' onError={(ev) => setImageVar(process.env.PUBLIC_URL + "/assets/octopus_big1.jpg")} />
            </div>
            <div className={styles.Info} >
                <div className={styles.Name} >{item.name + ', '+ item.count + 'шт.'}</div>
                <div className={styles.Price} >{new Intl.NumberFormat('ru-RU', {style: 'currency', currency: 'RUB', minimumFractionDigits: 0}).format(item.price/100)}</div>
                {showButton && (<div className={styles.AddButton} >Добавить в корзину</div>)}
            </div>
        </div>
    );
}

export default CheckItem
