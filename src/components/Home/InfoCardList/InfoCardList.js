import InfoCard from "../InfoCard/InfoCard"
import styles from "./InfoCardList.module.css"

function InfoCardList({user_data}) {
    const cards = [
        {id: 1, style: 'HowToUse', text: 'Про Бота'},
        {id: 2, style: 'chatTG', text: 'TG-чат'},
        {id: 3, style: 'Loyalty', text: 'Про уровень лояльности'},
        {id: 4, style: 'FAQ', text: 'FAQ'},
        {id: 5, style: 'Callback', text: 'Обратная связь'}
    ]

    return (
        <div style={{overflowX  : 'hidden', minHeight: '95px'}}>
        <ul className={styles.infocardlist}>
            <li key={1}>
                <InfoCard card={cards[0]} user_data={user_data}/>
            </li>
            <li key={2}>
                <InfoCard card={cards[2]} user_data={user_data}/>
            </li>
            <li key={3}>
                <InfoCard card={cards[1]} user_data={user_data}/>
            </li>
            <li key={4}>
                <InfoCard card={cards[3]} user_data={user_data}/>
            </li>
            <li key={5}>
                <InfoCard card={cards[4]} user_data={user_data}/>
            </li>
        </ul>
        </div>
    )


}

export default InfoCardList