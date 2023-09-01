import styles from './Toggle.module.css'
import { useState } from 'react';

function Toggle({ label, toggled, onClick }) {
    const [isToggled, setToggle] = useState(toggled)

    const callback = () => {
        setToggle(!isToggled)
        // onClick(!isToggled)
    }

    return (
        <label className={styles.root}>
            <input className={styles.toggle} type="checkbox" defaultChecked={isToggled} onClick={callback} />
            <span className={styles.text}>{label}</span>
        </label>
    );
}

export default Toggle