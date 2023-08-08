import React, { Fragment } from "react";
import "./footer.css";
import footerLogo from '../../assets/images/footer-logo.webp'
import twitter from '../../assets/images/twitter.webp'
import facebook from '../../assets/images/facebook.webp'
import linkedin from '../../assets/images/linkedin.webp'
import youtube from '../../assets/images/youtubeBlack.webp'
import { NavLink } from "react-router-dom";
import influencer from '../../assets/images/logo.webp'
import azzrak from '../../assets/images/azzrak.png' ;
import athar from '../../assets/images/athar.png';
import mardod from '../../assets/images/mardod.png';
import waraqaa from '../../assets/images/waraqaa.png';
import darb from '../../assets/images/darb.jpg';
import smoue from '../../assets/images/smoue.webp';



const DOMAINS = {
    "AZZRK": "https://influencer.azzrk.com",
    "ATHAR" : "https://influencer.atherr.com",
    "MARDOD" : "https://influencer.marrdoud.com",
    "WARAQA" : "https://influencer.warrqa.com",
    "DARB" : "https://influencer.darbplatform.com",
    "SMOUE" : "https://influencer.sumoue.com",
}

const Footer = () => {

    var subdomain = window.location.origin;
    var logo 
    var footerDescription
    var email
    var phone
    var whatts
    switch (subdomain){
        case DOMAINS.AZZRK: 
        logo = azzrak;
        email = 'info@azzrk.com'
        phone = '966115063351'
        whatts = '966501172306'
        footerDescription ="انت بحاجة إلى شريك للنجاح …لذا نحن هنا منصة أزرق المنصة الرائدة في مجال التجارة الإلكترونية والتسويق الرقمي، نقدم كافة الخدمات التسويقية لوكالتك التسويقية بنظام إحترافي يطبق من خلال فريق عمل مكون من أعلى المهارات في جميع التخصصات"
        break;

        case DOMAINS.ATHAR : 
        logo = athar;
        email = 'contact-us@atherr.com'
        phone = '966115062968'
        whatts = '966115062968'
        footerDescription ='أثر شركة سعودية متخصصة فى تأسيس و تسويق المتاجر الالكترونية , تقدم خدماتها بامتياز لتواكب احتياجات السوق المحلى من خلال تحسين محركات البحث و إدارة الحملات الاعلانية المدفوعة و إدارة منصات التواصل الاجتماعي و انشاء الهوية البصرية للمتاجر الالكترونية .'
        break;

        case DOMAINS.MARDOD: 
        logo = mardod;
        email = ' info@marrdoud.com'
        phone = '966115063353'
        whatts = '966115063353'
        footerDescription = 'مردود منصة متخصصة في حلول التجارة الإلكترونية داخل المملكة العربية السعودية تقدم خدماتها بالاعتماد على فريق العمل المتخصص في مجال التسويق الرقمي، ويمتلك فريق العمل خبرة أكثر من 15 عام وهذا ما يجعلهم يعملون بإبداع ويساعدوك للغاية في سباق التطور التكنولوجي السريع.'
        break;

        case DOMAINS.WARAQA : 
        logo = waraqaa;
        email = 'contact@warrqa.com'
        phone = ' 966551159380'
        whatts = ' 966551159380'
        footerDescription = 'ورقة هي منصة متخصصة في الحلول التسويقية للمتاجر الإلكترونية في المملكة العربية السعودية.خبرة تزيد عن 5 سنوات في مجال التسويق الرقمي وانشاء المتاجر الإلكترونيه.'
        break;

        case DOMAINS.DARB: 
        logo = darb;
        footerDescription = 'درب .. طريقك للنجاح'
        phone = '966531546013'
        whatts = '966531546013'
        break;

        case DOMAINS.SMOUE : 
        logo = smoue;
        email =  'hello@sumoue.com';
        phone = '966115119709'
        whatts = '966501172306'
        footerDescription = 'حكايتنا هي اختلافنا اننا اتينا من خلفيات مختلفة فى مجال إدارة المتاجر الالكترونية وجمعنا قدر كبير من الخبرة ،درسنا مشاكل السوق ومعظم الأخطاء التي وقعت بها شركات التسويق و ادارة المتاجر الالكترونية ،وهذا ما دعانا لرفض الرتابة والنمطية السائدة في أغلب تلك الشركات ، وأن نصنع لنا نهج مختلف يؤهلنا لمساعدة عملائنا ويكسر ذلك الإطار النمطي الذي تم وضع اغلب شركات إدارة المتاجر الالكترونية به ، وذلك من خلال مجموعة من القيم التي أسسنا عليها شركتنا لتكون على قدر من الاختلاف والاحترافية تتيح لها النمو والتوسع وكسب ثقة عملائها بناء على تجربتهم معنا .'
        break;

        default :  
        logo = influencer;
    }


    return (
        <Fragment>
            <div className="footer">
                <div className="footer-logo">
                    <NavLink to = {'/home'}>
                        <img src={logo} alt="" width='' height='' />
                    </NavLink>
                </div>
                <div className="footer-content">
                    <div className="footer-description">
                        <h1>{footerDescription}</h1>
                    </div>
                    <div className="footer-contact">
                        <div className="footer-contact-title">
                            <h1>Follow us :</h1>
                        </div>
                        <div className="footer-contact-info">
                            <p>Call us : {phone} - {whatts}</p>
                            <p>Email : {email}</p>
                        </div>
                        <div className="footer-contact-social">
                            <img src={youtube} alt="" width='' height='' />
                            <img src={twitter} alt="" width='' height='' />
                            <img src={linkedin} alt="" width='' height='' />
                            <img src={facebook} alt="" width='' height='' />
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Footer;