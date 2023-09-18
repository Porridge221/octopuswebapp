import styles from './Toggle.module.css'
import { useState } from 'react';

function Toggle({ label, toggled, setStore, onClick, tog_id}) {
    // const [isToggled, setToggle] = useState(toggled)

    // const callback = () => {
    //     setToggle(!isToggled)
    //     // console.log(tog_id);
    //     // tog_id !== undefined && onClick(tog_id)
    // }

    return (
        <label className={styles.root}>
            <input className={styles.toggle} type="checkbox" defaultChecked={true} value={toggled} /*onClick={callback}*/ onChange={e => setStore(!toggled) } />
            <span className={styles.text}>{label}</span>
        </label>
    );
}

export default Toggle