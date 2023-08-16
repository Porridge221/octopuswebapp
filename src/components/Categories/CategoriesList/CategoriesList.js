import CategoriesItem from "../CategoriesItem/CategoriesItem"
import styles from "./CategoriesList.module.css"

function CategoriesList() {
    const category = [
        {id: 1, style: 'ChooseAndOrder', text: 'Жидкости'},
        {id: 2, style: 'HelpConsultant', text: 'СНТ'},
        {id: 3, style: 'TelegramRef', text: 'Вейпы'}
    ]

    return (
        <div className={styles.categorylist}>
            <CategoriesItem className='cat1' category={category[0]}/>
            <CategoriesItem className='cat3' category={category[2]}/>
            <CategoriesItem className='cat2' category={category[1]}/>
        </div>
    )


}

export default CategoriesList