import styles from './InfoCard.module.css'
import {Link} from 'react-router-dom'

function InfoCard({card}) {
    
    return (
        <Link className={styles.Link} to={card.id === 4 ? 'https://t.me/CreaGeese' : `/home/infopage`} state={{card_id: card.id}}>
            <div className={styles.root}>
                <main className={styles.main + ' rectangle' + card.style}>
                    <div className={card.style !== 'FAQ' ? styles.textSmall : styles.textLarge}>{card.text}</div>
                </main>
            </div>
        </Link>
    );
}

export default InfoCard