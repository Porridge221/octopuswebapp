import styles from './LoyaltyInfo.module.css'

function LoyaltyInfo() {

  const PointsText = window.Telegram.WebApp.colorScheme !== 'dark' ? styles.PointsTextLight : styles.PointsTextDark;

  return (
    <div className={styles.root}>
        <div className={styles.Label}>Программа лояльности:</div>
        <div className={styles.Table}>
            <span className={styles.Header}>Статус</span>
            <span className={styles.Header} style={{'textAlign': 'center'}}>Сумма покупок</span>
            <span className={styles.Header} style={{'textAlign': 'center'}}>% начисления</span>
            <div className={styles.rowBorder}></div>
            <span className={styles.StatusText} style={{'color': '#6d3a95'}}>Bronze Card</span>
            <span className={styles.OrderText}>0</span>
            <span className={PointsText}>3%</span>
            <div className={styles.rowBorder}></div>
            <span className={styles.StatusText} style={{'color': '#80bae4'}}>Silver Card</span>
            <span className={styles.OrderText}>от 100 Р</span>
            <span className={PointsText}>5%</span>
            <div className={styles.rowBorder}></div>
            <span className={styles.StatusText} style={{'color': '#f5d098'}}>Gold Card</span>
            <span className={styles.OrderText}>от 100000 Р</span>
            <span className={PointsText}>7%</span>
            <div className={styles.rowBorder}></div>
            <span className={styles.StatusText} style={{'color': '#db287e'}}>Platinum Card</span>
            <span className={styles.OrderText}>от 200000 Р</span>
            <span className={PointsText}>9%</span>
            <div className={styles.rowBorder}></div>
            <span className={styles.StatusText} style={{'color': '#e321ab'}}>Diamond Card</span>
            <span className={styles.OrderText}>от 500000 Р</span>
            <span className={PointsText}>11%</span>
            <div className={styles.rowBorder}></div>
        </div>
    </div>
  );
}

export default LoyaltyInfo
