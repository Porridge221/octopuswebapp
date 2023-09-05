import styles from './CategoryGroup.module.css';
import CategoryItem from '../CategoryItem/CategoryItem';
import { useState } from "react";

function CategoryGroup({producer}) {
    const [hidden, setHidden] = useState(true);



    return (
    <div className={styles.ProducerGroup}>
        <div className={styles.ProducerName} onClick={() => setHidden(s => !s)}>{producer.name}{hidden ? '>' : '<'}</div>
        {hidden && (<ul key={producer.product_id} className={styles.ProducerItems}>
            {producer['items'].map(item => (
                <CategoryItem key={item.id} item={item} producerName={producer['product_name']} />
            ))}
        </ul>) }
    </div>
    );
}

export default CategoryGroup