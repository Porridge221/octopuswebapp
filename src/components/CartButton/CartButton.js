import { useEffect, useState } from 'react';
import styles from './CartButton.module.css'
import {Link} from 'react-router-dom'
import CartService from '../../services/cartService';

function CartButton({cart_data}) {
    return (
        <Link className={styles.CartLink} to='/cart'>
            <svg width="31" height="24" viewBox="0 0 31 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="Group 25">
                    <path id="Vector 16" className={styles.CartButton} d="M8.19672 8.92H2L4.65574 23H26.7869L29 8.92H22.8033M8.19672 8.92H22.8033M8.19672 8.92C8.19672 8.92 7.14286 0.999992 15.2787 1C23.4145 1.00001 22.8033 8.92 22.8033 8.92" stroke="#424242" stroke-width="2"/>
                </g>
            </svg>
            <div style={{position: 'relative'}}><div className={styles.CartCount}>{cart_data ? cart_data?.items?.length : 0}</div></div>
            {/* <img className={styles.CartButton} src={process.env.PUBLIC_URL + '/assets/Group 25.svg'} alt=''/> */}
        </Link>
    );
}

export default CartButton