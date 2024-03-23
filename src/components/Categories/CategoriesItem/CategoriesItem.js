import styles from './CategoriesItem.module.css'
import {Link} from 'react-router-dom'

function CategoriesItem({category}) {
    
    return (
        <li>
            <Link className={styles.root} style={{backgroundColor: window.Telegram.WebApp.colorScheme === 'light' ? '#fff' : '#1c2431'}} to={'/home/categories/' + category.id} state={category.id}>
                <img className={styles.icon} src={process.env.PUBLIC_URL + '/assets/categories/' + category.img + (window.Telegram.WebApp.colorScheme === 'light' ? '-white.jpg' : '-black.jpg')}/>
                <div className={styles.textBlock}><span>{category.text}</span></div>
            </Link>
        </li>
    );
}

export default CategoriesItem