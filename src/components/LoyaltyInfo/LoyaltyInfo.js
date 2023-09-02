import styles from './LoyaltyInfo.module.css'

function LoyaltyInfo() {

  return (
    <div className={styles.root}>
        <div className={styles.Label}>Программа лояльности:</div>
        <div className={styles.Table}>
            <span className={styles.Header}>Статус</span>
            <span className={styles.Header} style={{'text-align': 'center'}}>Заказы</span>
            <span className={styles.Header} style={{'text-align': 'center'}}>Баллы</span>
            <span className={styles.StatusText}>Бронзовый</span>
            <span className={styles.OrderText}>0</span>
            <span className={styles.PointsText}>+10</span>
            <span className={styles.StatusText}>Серебрянный</span>
            <span className={styles.OrderText}>6</span>
            <span className={styles.PointsText}>+25</span>
            <span className={styles.StatusText}>Золотой</span>
            <span className={styles.OrderText}>14</span>
            <span className={styles.PointsText}>+50</span>
        </div>
    </div>
  );
}

export default LoyaltyInfo
