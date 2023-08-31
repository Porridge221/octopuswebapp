import styles from './Header.module.css'

function Header() {
    
    return (
        <div className={styles.root}>
            <div>
            <span className={styles.textPrev}>Главная {'> '}</span>
            <span className={styles.textCurrent}>Каталог</span>
            </div>
            <img className={styles.icon} src={process.env.PUBLIC_URL + '/assets/Group 25.svg'}/>
        </div>
    );
}

export default Header