import styles from './InfoCard.module.css'

function InfoCard({card}) {
    
    return (
        <div className={styles.root}>
            <main className={'rectangle' + card.style}>
                <div className={'text' + card.style}>{card.text}</div>
            </main>
        </div>
    );
}

export default InfoCard