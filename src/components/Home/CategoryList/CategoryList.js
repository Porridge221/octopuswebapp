import CategoryItem from "./CategoryItem/CategoryItem"
import styles from "./CategoryList.module.css"

function CategoryList({user_data}) {
    const category = [
        {id: 1, style: 'TelegramRef', text: 'Наш Telegram-канал:\n@octopus', link: [3, 4].indexOf(user_data?.user?.city_id) !== -1 ? 'https://t.me/octopussakh' : 'https://t.me/octopusvl'},
        {id: 2, style: 'HelpConsultant', text: 'Помощь консультанта', link: '/home/categories'},
        {id: 3, style: 'ChooseAndOrder', text: 'Выбрать и заказать', link: '/home/categories'}
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