import styles from './CategoryItem.module.css'
import {Link} from 'react-router-dom'

function CategoryItem({category}) {
    
    return (
        <Link className={styles.root} to='/home/categories'>
            <main className={category.style}></main>
            <div className={styles.unnamed6}>
                <div className={category.style !== 'TelegramRef' ? styles.textBlock : styles.textBlock2}>{category.text}</div>
            </div> 
        </Link>
    );
}

export default CategoryItem