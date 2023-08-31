import styles from './CategoriesItem.module.css'
import {Link} from 'react-router-dom'

function CategoriesItem({category}) {
    
    return (
        <li>
            <Link className={styles.root} to='/home/categories/1'>
                <img className={styles.icon} src={process.env.PUBLIC_URL + '/assets/Category1.png'}/>
                <div className={styles.textBlock}>{category.text}</div>
            </Link>
        </li>
    );
}

export default CategoriesItem