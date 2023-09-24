import styles from './FilterModal.module.css';

function FilterModal({active, setActive, isDeactivated, children}) {

  return (
    <div className={active ? styles.ModalRoot + ' ' + styles.ModalActive : styles.ModalRoot} onClick={() => isDeactivated === undefined ? setActive(false) : setActive(true)}>
        <div className={active ? styles.ModalContent + ' ' + styles.ContentActive : styles.ModalContent} onClick={e => e.stopPropagation()} >
            {children}
        </div>
    </div>
  );
}

export default FilterModal
