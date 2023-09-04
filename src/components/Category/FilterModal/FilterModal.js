import styles from './FilterModal.module.css';

function FilterModal({active, setActive, children}) {

  return (
    <div className={active ? styles.ModalRoot + ' ' + styles.ModalActive : styles.ModalRoot} onClick={() => setActive(false)}>
        <div className={active ? styles.ModalContent + ' ' + styles.ContentActive : styles.ModalContent} onClick={e => e.stopPropagation()} >
            {children}
        </div>
    </div>
  );
}

export default FilterModal
