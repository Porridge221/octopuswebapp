import styles from './Toggle.module.css'
import { useState } from 'react';

function Toggle({ label, toggled, setStore, multiple, multipleState, producer_id, onClick, tog_id}) {
    // const [isToggled, setToggle] = useState(toggled)

    // const callback = () => {
    //     setToggle(!isToggled)
    //     // console.log(tog_id);
    //     // tog_id !== undefined && onClick(tog_id)
    // }

    const handleSetMultipleState = () => {
        var newState = [];
        console.log('SETMULTIPLESTATE');
        multipleState.forEach(el => {
            el.key === producer_id ? newState.push({key: el.key, value: !toggled, name: el.name}) : newState.push(el)
        });
        setStore(newState);
    } 

    return (
        <label className={styles.root}>
            <input className={styles.toggle} type="checkbox" checked={toggled} /*onClick={callback}*/ onChange={e => multiple ? handleSetMultipleState() : setStore(!toggled) } />
            <span className={styles.text}>{label}</span>
        </label>
    );
}

export default Toggle