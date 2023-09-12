import styles from './Header.module.css'

function Header() {

    const fetchData = () => {
        fetch("https://45.153.69.113/carts/delete_all?cart_id=1", { method:'DELETE',headers: {
          'Content-Type': 'application/json'
        }, body: JSON.stringify( {'cart_id': 1 } )
          })
          .then(response => {
            return JSON.stringify( {'cart_id': 1 } )
          })
          .then(data => {
            console.log(JSON.stringify( {'cart_id': 1 } ));
          })
    }

    return (
        <div className={styles.root}>
            <div style={{'display':'flex','alignItems': 'center'}}>
                <span className={styles.Cart}>Корзина</span>
                <img className={styles.icon} src={process.env.PUBLIC_URL + '/assets/Group 25.svg'} alt=''/>
            </div>
            <div className={styles.ClearButton} onClick={fetchData}>Очистить корзину</div>
        </div>
    );
}

export default Header
