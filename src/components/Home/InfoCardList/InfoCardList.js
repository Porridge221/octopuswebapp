import InfoCard from "../InfoCard/InfoCard"
import styles from "./InfoCardList.module.css"

function InfoCardList() {
    const cards = [
        {id: 1, style: 'HowToUse', text: 'Про Бота'},
        {id: 2, style: 'Loyalty', text: 'Про уровень лояльности'},
        {id: 3, style: 'FAQ', text: 'FAQ'},
        {id: 4, style: 'CREA', text: 'Разработчики'}
    ]

    return (
        <div style={{overflowX  : 'hidden', minHeight: '95px'}}>
        <ul className={styles.infocardlist}>
            <li key={1}>
                <InfoCard card={cards[0]} />
            </li>
            <li key={2}>
                <InfoCard card={cards[1]}/>
            </li>
            <li key={3}>
                <InfoCard card={cards[2]}/>
            </li>
            <li key={4}>
                <InfoCard card={cards[3]}/>
            </li>
            <li key={5}>
                <InfoCard card={cards[1]}/>
            </li>
        </ul>
        </div>
    )


}

export default InfoCardList