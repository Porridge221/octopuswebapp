import styles from './InfoCard.module.css'
import {Link} from 'react-router-dom'

function InfoCard({card, user_data}) {
    
    return (
        <Link className={styles.Link} to={card.id === 6 ? 'https://vk.com/creageese' : card.id === 2 ? ([3, 4].indexOf(user_data?.user?.city_id) !== -1 ? 'https://t.me/+slAn5rSqhKdkYzU6' : 'https://t.me/+L-pzrWrv6J05NTUy') : card.id === 5 ? 'https://forms.gle/LMBSoJGW4aC3FKsm8' : `/home/infopage`} state={{card_id: card.id}}>
            <div className={styles.root}>
                <main className={styles.main + ' rectangle' + card.style}>
                    <div className={card.style !== 'FAQ' ? styles.textSmall : styles.textLarge}></div>
                </main>
            </div>
        </Link>
    );
}

export default InfoCard