import { useLocation, useNavigate } from 'react-router-dom';
import styles from './InfoPage.module.css'
import LoyaltyInfo from '../LoyaltyInfo/LoyaltyInfo';
import useTelegram from '../../hooks/useTelegram';

function InfoPage() {

    const {card_id} = useLocation().state;

    const {tg} = useTelegram();
    const navigate = useNavigate();

    tg.onEvent('backButtonClicked', () => navigate('/home/'));
    tg.BackButton.show();
    
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
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                    <span>Бот поможет вам оформлять заказы Вашей любимой продукции и получать
                    их в наиболее удобных для Вас точках продаж. Для этого достаточно перейти
                    в функциональное окно <b>«Выбрать и заказать»</b> и отправиться на поиски
                    интересующей Вас продукции.</span>
                    <img className={styles.iconEmpty} src={process.env.PUBLIC_URL + '/assets/infopage/1.png'} alt='' align='center' hspace='7px'/>
                    <span>Не забывайте пользоваться <b>специальными фильтрами</b>, которые помогут Вам
                    узнать какая продукция доступна в нужном магазине!</span>
                    </div>
                    </li>
                {/* </div> */}
                <li className={styles.Text}>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <p>После добавления продукции в корзину Вы сможете оформить Ваш заказ в
                    нужный магазин после ввода дополнительной информации о получателе.
                    Администраторы <b>OCTOPUS</b> подготовят ваш заказ к выдаче в течение
                    <b>ОДНОГО ЧАСА</b> и Вы сможете насладиться заказанной продукцией после
                    выдачи.</p> 
                    <img className={styles.iconEmpty} src={process.env.PUBLIC_URL + '/assets/infopage/2.png'} alt='' align='center' hspace='7px'/>
                    </div>
                </li>
                <li className={styles.Text}>
                    <p>Заказы хранятся в общей базе <b>ВСЕГО 24 часа!</b> Поэтому не забывайте
                    забирать свои покупки у нас.</p>
                </li>
                <li className={styles.Text}>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                    <span>Для того, чтобы следить за начислением баллов в профиле достаточно
                    пройти простую <i>регистрацию</i>, после чего Вам станет доступна возможность
                    отслеживать успешное участие в <b>НАШЕЙ ПРОГРАММЕ ЛОЯЛЬНОСТИ</b>.</span>
                    <img className={styles.iconEmpty} src={process.env.PUBLIC_URL + '/assets/infopage/4.png'} alt='' align='right' hspace='7px'/>
                    </div>
                </li>
                <li className={styles.Text}>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                    <span>Если Вы теряетесь в огромном выборе продукции функциональная
                    особенность <b>«Помощь консультанта»</b> поможет определиться с нужным
                    для Вас выбором! Для этого достаточно провести приятный диалог с
                    нашим другом-ботом, который поможет Вам выбрать интересующую
                    продукцию и не ошибиться!</span>
                    <img className={styles.iconEmpty} src={process.env.PUBLIC_URL + '/assets/infopage/5.png'} alt='' align='left' hspace='7px'/>
                    </div>
                </li>
                </ol>
                <div className={styles.Tips}>
                    На этом этапе ЖЕЛАЕМ ВАМ ПРИЯТНЫХ ПОКУПОК! МЕСТО
                    ВСТРЕЧИ - OCTOPUS! 
                </div></>)
             : card_id === 4 ?
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
            </>) : card_id === 3 &&
            (<>
                <div className={styles.Header}>Программа лояльности</div>
                <div className={styles.Tips} style={{marginTop: '25px'}}>Участвуй в программе лояльности!{'\n\n'}
                                                                        Копи баллы и меняй их на скидку в наших магазинах!</div>
                <img className={styles.loyaltyIcon} src={process.env.PUBLIC_URL + '/assets/infopage/loyal.PNG'} alt=''/>
                <div style={{margin: '0 0', marginLeft: '-16px'}}>
                    <LoyaltyInfo />
                </div>
            </>)}
        </div>
    );
}

export default InfoPage