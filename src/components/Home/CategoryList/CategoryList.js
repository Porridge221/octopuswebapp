import CategoryItem from "./CategoryItem/CategoryItem"
import styles from "./CategoryList.module.css"

function CategoryList() {
    const category = [
        {id: 1, style: 'ChooseAndOrder', text: 'Выбрать и заказать'},
        {id: 2, style: 'HelpConsultant', text: 'Помощь личного консультанта'},
        {id: 3, style: 'TelegramRef', text: 'Смотри новинки в своём городе:\n\n@octopusvl'}
    ]

    return (
        <div className={styles.categorylist}>
            <CategoryItem className='cat1' category={category[0]}/>
            <CategoryItem className='cat3' category={category[2]}/>
            <CategoryItem className='cat2' category={category[1]}/>
        </div>
    )


}

export default CategoryList