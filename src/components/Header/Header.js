import styles from './Header.module.css'

function Header({path, current}) {

    const results = [];

    path.forEach(el => {
        results.push(<span key={el} className={styles.textPrev}>{el + ' > '}</span>);
    });
    
    return (
        <div className={styles.root}>
            <div>
                {results}
                {/* <span className={styles.textPrev}>Главная {'> '}</span> */}
                <span className={styles.textCurrent}>{current}</span>
            </div>
            <img className={styles.icon} src={process.env.PUBLIC_URL + '/assets/Group 25.svg'}/>
        </div>
    );
}

export default Header