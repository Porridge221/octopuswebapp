import styles from './Header.module.css'
import { AiOutlineClose } from "react-icons/ai";

function Header() {
    
    return (
        <div className={styles.root}>
            <div className={styles.OctopusLabel}>OCTOPUS App</div>
            <AiOutlineClose className={styles.CloseButton} />
        </div>
    );
}

export default Header