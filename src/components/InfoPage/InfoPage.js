import { useLocation } from 'react-router-dom';
import styles from './InfoPage.module.css'
import LoyaltyInfo from '../LoyaltyInfo/LoyaltyInfo';

function InfoPage() {

    const {card_id} = useLocation().state;
    
    return (
        <div className={styles.root}>
             <div className={styles.MainBackground} ></div>
            {card_id === 1 ? 
                (<><div className={styles.Tips}>Всем привет! В данной статье описан основной функционал Бота, который
                    поможет Вам эффективно заказывать продукцию с официального
                    VAPE|SHOP|BAR OCTOPUS.
                </div>
                <ol style={{paddingLeft: '25px'}}>
                <li className={styles.Text}>
                {/* <div className={styles.Text}> */}
                <img className={styles.iconEmpty} src={process.env.PUBLIC_URL + '/assets/infopage/1.png'} alt='' align='right'/>
                    Бот поможет вам оформлять заказы Вашей любимой продукции и получать
                    их в наиболее удобных для Вас точках продаж. Для этого достаточно перейти
                    в функциональное окно <b>«Выбрать и заказать»</b> и отправиться на поиски
                    интересующей Вас продукции.{'\n\n'}
                    Не забывайте пользоваться <b>специальными фильтрами</b>, которые помогут Вам
                    узнать какая продукция доступна в нужном магазине!
                    </li>
                {/* </div> */}
                <li className={styles.Text}>
                <img className={styles.iconEmpty} src={process.env.PUBLIC_URL + '/assets/infopage/2.png'} alt='' align='left'/>
                    После добавления продукции в корзину Вы сможете оформить Ваш заказ в
                    нужный магазин после ввода дополнительной информации о получателе.
                    Администраторы <b>OCTOPUS</b> подготовят ваш заказ к выдаче в течение
                    <b>ОДНОГО ЧАСА</b> и Вы сможете насладиться заказанной продукцией после
                    выдачи. 
                </li>
                <li className={styles.Text}>
                    Заказы хранятся в общей базе <b>ВСЕГО 24 часа!</b> Поэтому не забывайте
                    забирать свои покупки у нас.
                </li>
                <li className={styles.Text}>
                <img className={styles.iconEmpty} src={process.env.PUBLIC_URL + '/assets/infopage/4.png'} alt='' align='right'/>
                    Для того, чтобы следить за начислением баллов в профиле достаточно
                    пройти простую <i>регистрацию</i>, после чего Вам станет доступна возможность
                    отслеживать успешное участие в <b>НАШЕЙ ПРОГРАММЕ ЛОЯЛЬНОСТИ</b>.
                </li>
                <li className={styles.Text}>
                <img className={styles.iconEmpty} src={process.env.PUBLIC_URL + '/assets/infopage/5.png'} alt='' align='left'/>
                    Если Вы теряетесь в огромном выборе продукции функциональная
                    особенность <b>«Помощь консультанта»</b> поможет определиться с нужным
                    для Вас выбором! Для этого достаточно провести приятный диалог с
                    нашим другом-ботом, который поможет Вам выбрать интересующую
                    продукцию и не ошибиться!
                </li>
                </ol>
                <div className={styles.Tips}>
                    На этом этапе ЖЕЛАЕМ ВАМ ПРИЯТНЫХ ПОКУПОК! МЕСТО
                    ВСТРЕЧИ - OCTOPUS! 
                </div></>)
             : card_id === 3 ?
             (<>
                <div className={styles.Header}>FAQ</div>
                <div className={styles.Tips} style={{marginTop: '25px'}}>Как оплатить заказ?</div>
                <div className={styles.Text}>Для оплаты заказа Вам достаточно прибыть в выбранный
                                            VapeShop. Наши администраторы выдадут Ваш заказ , и Вы
                                            сможете его оплатить. Оплата в приложении не предусмотрена{')'}</div>
                <div className={styles.Tips} style={{marginTop: '35px'}}>Часы работы</div>
                <div className={styles.Text}>Наш VapeSHOP открыт для Вас ежедневно с 11:00 до 21:00</div>
                <div className={styles.Tips} style={{marginTop: '35px'}}>Как списать накопленные баллы</div>
                <div className={styles.Text}>Для того, чтобы списать накопленные баллы обратитесь к нашему
                                            администратору, предъявив Вашу дисконтную карту, либо назовите
                                            свой номер телефона. После чего – насладитесь вашими покупками
                                            с уверенной скидкой!
                </div>
            </>) : card_id === 2 &&
            (<>
                <div className={styles.Header}>Программа лояльности</div>
                <div className={styles.Tips} style={{marginTop: '25px'}}>Участвуй в программе лояльности!{'\n\n'}
                                                                        Копи баллы и меняй их на скидку в наших магазинах!</div>
                <img className={styles.loyaltyIcon} src={process.env.PUBLIC_URL + '/assets/infopage/loyal.PNG'} alt=''/>
                <LoyaltyInfo />
            </>)}
        </div>
    );
}

export default InfoPage