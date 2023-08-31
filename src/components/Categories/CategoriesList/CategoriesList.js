import CategoriesItem from "../CategoriesItem/CategoriesItem"
import styles from "./CategoriesList.module.css"

import { v4 } from 'uuid'

function CategoriesList() {
    const category = [
        {id: 1, text: 'Жидкости'},
        {id: 2, text: 'СНТ'},
        {id: 3, text: 'Вейпы'}
    ]

    return (
        <ul className={styles.categorylist}>
            <CategoriesItem category={category[0]}/>
            <CategoriesItem category={category[1]}/>
            <CategoriesItem category={category[2]}/>
        </ul>
    )


}

export default CategoriesList