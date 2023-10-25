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

    const colorScheme = window.Telegram.WebApp.colorScheme === 'light' ? true : false;
    
    return (
        <div className={styles.root}>
             <div className={styles.MainBackground} ></div>
            {card_id === 1 ? 
                (<><div className={styles.Tips}>Здесь описаны основные возможности бота, с помощью которого можно оформить заказ в Octopus Vape Shop
                </div>
                <div className={styles.Tips} style={{color: colorScheme ? '#FF0C00' : '#F7930C', fontSize: '20px'}}><b>Доставку не осуществляем. Бот предназначен для заказов на самовывоз!</b></div>
                <ol style={{paddingLeft: '25px'}}>
                <li className={styles.Text}>
                {/* <div className={styles.Text}> */}
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                    <span>С помощью бота вы можете ознакомиться с нашим ассортиментом и оформить заказ в удобном для вас филиале.</span>
                    <img className={styles.iconEmpty} src={process.env.PUBLIC_URL + '/assets/infopage/1.png'} alt='' align='center' hspace='7px'/>
                    <span>Фильтры и поисковая строка на главном экране значительно упростят поиск.</span>
                    </div>
                    </li>
                {/* </div> */}
                <li className={styles.Text}>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <p>После оформления заказу будет присвоен уникальный номер, который необходимо назвать консультанту при оплате заказа.</p> 
                    <img className={styles.iconEmpty} src={process.env.PUBLIC_URL + '/assets/infopage/2.png'} alt='' align='center' hspace='7px'/>
                    </div>
                </li>
                <li className={styles.Text}>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                    <span>В профиле отображается количество бонусных баллов, QR код и статус в программе лояльности.</span>
                    <img className={styles.iconEmpty} src={process.env.PUBLIC_URL + '/assets/infopage/4.png'} alt='' align='right' hspace='7px'/>
                    </div>
                </li>
                <li className={styles.Text}>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                    <span>По возникшим вопросам вы можете обратиться в раздел «FAQ» или задать вопрос в чат.</span>
                    <img className={styles.iconEmpty} src={process.env.PUBLIC_URL + '/assets/infopage/5.png'} alt='' align='left' hspace='7px'/>
                    </div>
                </li>
                <li className={styles.Text}>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                    <span>При себе <b style={{fontSize: '22px'}}>обязательно</b> иметь документ, подтверждающий совершеннолетие.</span>
                    </div>
                </li>
                </ol></>)
             : card_id === 4 ?
             (<>
                <div className={styles.Header}>FAQ</div>
                <div className={styles.Tips} style={{marginTop: '25px'}}>Могу ли я оформить доставку?</div>
                <div className={styles.Text}>Согласно ст. 19 Федерального закона от 23.02.2013 N 15-ФЗ доставка никотиновой продукции запрещена.</div>
                <div className={styles.Tips} style={{marginTop: '35px'}}>Могу ли я оплатить заказ онлайн?</div>
                <div className={styles.Text}>Заказ оплачивается при получении в выбранном филиале.</div>
                <div className={styles.Tips} style={{marginTop: '35px'}}>Когда я могу забрать заказ?</div>
                <div className={styles.Text}>Заказ будет готов в течение часа. Вы сможете забрать его с с 11:00 до 21:00 в выбранном филиале. Через 24 часа заказ будет удален.</div>
                <div className={styles.Tips} style={{marginTop: '35px'}}>Можно ли изменить филиал после создания заказа?</div>
                <div className={styles.Text}>Такой возможности не предусмотрено.</div>
            </>) : card_id === 3 &&
            (<>
                <div className={styles.Header}>Программа лояльности</div>
                <div className={styles.Tips} style={{marginTop: '25px'}}>Участвуй в программе лояльности!{'\n\n'}
                                                                        Копи баллы и меняй их на скидку в наших магазинах!</div>
                <img className={styles.loyaltyIcon} src={process.env.PUBLIC_URL + '/assets/infopage/loyal1.PNG'} alt=''/>
                <div style={{margin: '0 0', marginLeft: '-16px'}}>
                    <LoyaltyInfo />
                </div>
            </>)}
        </div>
    );
}

export default InfoPage