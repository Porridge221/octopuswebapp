import InfoCard from "../InfoCard/InfoCard"
import styles from "./InfoCardList.module.css"

function InfoCardList() {
    const cards = [
        {id: 1, style: 'HowToUse', text: 'Как пользоваться Ботом'},
        {id: 2, style: 'Loyalty', text: 'Про уровень лояльности'},
        {id: 3, style: 'FAQ', text: 'FAQ'}
    ]

    return (
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
        </ul>
    )


}

export default InfoCardList