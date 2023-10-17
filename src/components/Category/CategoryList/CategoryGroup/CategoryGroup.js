import styles from './CategoryGroup.module.css';
import CategoryItem from '../CategoryItem/CategoryItem';
import { useState } from "react";
import { FaAngleDown, FaAngleRight } from "react-icons/fa6";

function CategoryGroup({producer, cartData, setCartData}) {
    const [hidden, setHidden] = useState(false);

    return (
    <div className={styles.ProducerGroup}>
        <div className={styles.ProducerName} onClick={() => setHidden(s => !s)}>{producer.name}{hidden ? <FaAngleDown/> : <FaAngleRight/>}</div>
        {hidden && (<div key={producer.product_id} className={styles.ProducerItems}>
            {producer['items'].map(item => (
                <CategoryItem key={item.id} item={item} producerName={producer['product_name']} cartData={cartData} setCartData={setCartData} />
            ))}
        </div>) }
    </div>
    );
}

export default CategoryGroup