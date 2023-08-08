import React, { Fragment, useState } from "react";
import "./contact.css";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/Footer";
import Swal from "sweetalert2";
import authService from "../../services/auth-services";
import LoadingButton from '../../components/loadingButton/LoadingButton'
import { motion } from "framer-motion";

const Contact = () => {
    const [firstName,setFirstName] =useState('')
    const [nickName,setNickName] =useState('')
    const [email,setEmail] =useState('')
    const [msg,setMsg] =useState('')
    const [isValid, setIsValid] = useState(true);
    const [loadingLogin,setLoadingLogin]=useState(false);


    function handleInputChange(event) {
        const inputEmail = event.target.value;
        setEmail(inputEmail);
        setIsValid(validateEmail(inputEmail));
    }

    function handleBlur() {
        setIsValid(validateEmail(email));
    }

    function validateEmail(email) {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return pattern.test(email);
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        if(firstName && nickName && email && msg ){
        try{ 
            setLoadingLogin(true)
            await authService.contactMsg(firstName,nickName,email,msg).then(
            (response) => {
                setLoadingLogin(false)
                setFirstName('');
                setNickName('');
                setEmail('');
                setMsg('');
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'تم ارسال الرسالة بنجاح',
                    showConfirmButton: false,
                    timer: 1500
                })
            },
            (error) => {
                console.log("errrrrr");
            });
            }catch (err) {
                console.log("errrrrr");
            }
        }
    }

    return (
        <Fragment>
            <Navbar/>
            <div className="contact container">
                <div className="contact-title">
                    <h1>بحاجة الي استفسار؟</h1>
                    <h1> لا تتردد </h1>
                    <h1>تواصل معنا </h1>
                </div>
                <div className="contact-form-parent">
                    <form onSubmit={handleSubmit}>
                        <div className="contact-form">
                            <div className="div-inputs">
                                <input type="text" placeholder="الاسم الاول" className="half-input"  value={firstName} 
                                onChange={(e) => setFirstName(e.target.value)} />
                                <input type="text" placeholder="اللقب" className="half-input" value={nickName} 
                                onChange={(e) =>  setNickName(e.target.value)} />
                            </div>
                            <input type="text" placeholder="البريد الإلكترونى" value={email} 
                            onChange={handleInputChange}
                            onBlur={handleBlur} />
                            {!isValid && (
                            <span className=" spanhint">يجب أن يكون بريد إلكترونى</span>
                            )}
                            <textarea placeholder="اكتب رسالتك" value={msg} 
                            onChange={(e) => setMsg(e.target.value)} />
                            <motion.button type="submit" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            { loadingLogin ? <LoadingButton /> : ('ارسال') }
                            </motion.button>
                        </div>
                    </form>
                </div>
            </div> 
            <Footer/>
        </Fragment>
    );
};

export default Contact;