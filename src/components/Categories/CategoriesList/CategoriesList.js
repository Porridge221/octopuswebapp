import CategoriesItem from "../CategoriesItem/CategoriesItem"
import styles from "./CategoriesList.module.css"

import { v4 } from 'uuid'

function CategoriesList() {
    const category = [
        {id: 6, text: 'Жидкости', img: 'Жидкость'},
        {id: 1, text: 'JUUL Type', img: 'JOOL-Type'},
        {id: 2, text: 'Pod Системы', img: 'Pod'},
        {id: 3, text: 'Аккумуляторы', img: 'Аккумуляторы'},
        {id: 4, text: 'Аксессуары', img: 'Акксесуары'},
        {id: 5, text: 'Жевательный табак', img: 'Жевательный-табак'},
        {id: 7, text: 'Одноразовые системы', img: 'Одноразовые-системы'},
        {id: 8, text: 'Расходники', img: 'Расходники'},
        {id: 9, text: 'Устройства', img: 'Устройства'},
        {id: 10, text: 'Атомайзеры', img: 'Атомайзеры'},
    ]

    return (
        <ul className={styles.categorylist}>
            <CategoriesItem category={category[0]}/>
            <CategoriesItem category={category[1]}/>
            <CategoriesItem category={category[2]}/>
            <CategoriesItem category={category[3]}/>
            <CategoriesItem category={category[4]}/>
            <CategoriesItem category={category[5]}/>
            <CategoriesItem category={category[6]}/>
            <CategoriesItem category={category[7]}/>
            <CategoriesItem category={category[8]}/>
            <CategoriesItem category={category[9]}/>
        </ul>
    )


}

export default CategoriesList