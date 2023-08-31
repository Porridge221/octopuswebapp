import styles from './CategoryItem.module.css'
import {Link} from 'react-router-dom'
import { BsArrowRight } from "react-icons/bs";

function CategoryItem({category}) {
    
    return (
        <Link className={styles.root} to='/home/categories'>
            {/* <main className={category.style}></main> */}
            <div className={styles.unnamed6 + ' ' + category.style}>
                <div className={category.style !== 'TelegramRef' ? styles.textBlock : styles.textBlock2}>{category.text}</div>
                {category.style === 'ChooseAndOrder' && <BsArrowRight className={styles.CartButton}/>}
            </div> 
        </Link>
    );
}

export default CategoryItem