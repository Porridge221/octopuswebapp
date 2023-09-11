import styles from './CategoryItem.module.css'
import {Link} from 'react-router-dom'

function CategoryItem({category}) {
    
    return (
        <Link className={styles.root} to={category.link}>
            <div className={styles.unnamed6 + ' ' + category.style}>
                <div className={category.style !== 'TelegramRef' ? styles.textBlock : styles.textBlock2}>{category.text}</div>
                {category.style === 'ChooseAndOrder' && <img className={styles.CartButton} src={process.env.PUBLIC_URL + '/assets/home_order_icon.svg'} alt=''/>}
            </div> 
        </Link>
    );
}

export default CategoryItem