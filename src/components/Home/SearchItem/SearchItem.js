import styles from './SearchItem.module.css'
import { AiOutlineSearch } from "react-icons/ai";

function SearchItem() {
    
    return (
        <div className={styles.root}>
            <AiOutlineSearch  className={styles.SearchIcon}/>
            <div className={styles.SearchText}>Найти</div>
        </div>
    );
}

export default SearchItem