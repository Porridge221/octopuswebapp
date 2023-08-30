import CategoryItem from "./CategoryItem/CategoryItem"
import styles from "./CategoryList.module.css"

function CategoryList() {
    const category = [
        {id: 1, style: 'TelegramRef', text: 'Наш Telegram-канал:\n\n@octopusvl'},
        {id: 2, style: 'HelpConsultant', text: 'Помощь консультанта'},
        {id: 3, style: 'ChooseAndOrder', text: 'Выбрать и заказать'}
    ]

    return (
        <div className={styles.categorylist}>
            <CategoryItem className='cat2' category={category[1]}/>
            <CategoryItem className='cat3' category={category[2]}/>
            <CategoryItem className='cat1' category={category[0]}/>
        </div>
    )


}

export default CategoryList