import styles from './InfoCard.module.css'

function InfoCard({card}) {
    
    return (
        <div className={styles.root}>
            <main className={styles.main + ' rectangle' + card.style}>
                <div className={card.style !== 'FAQ' ? styles.textSmall : styles.textLarge}>{card.text}</div>
            </main>
        </div>
    );
}

export default InfoCard