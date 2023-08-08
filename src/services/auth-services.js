import axios from "axios";
import { getApiUrl } from "../helpers";
import authHeader from "./auth-header";

const API_URL_REGISTER_BRAND = getApiUrl("api/brands/");
const API_URL_LOGIN_BRAND = getApiUrl("api/users/login/");
const API_URL_REGISTER_INFLUENCER = getApiUrl("api/influencers/");
const API_URL_USER_CHANGE_INFO = getApiUrl("api/brands/me/");
const API_URL_USER_CHANGE_PASSWORD = getApiUrl("api/brands/change-password/");
const API_URL_Contact_MSG = getApiUrl("api/contact-us/");



//register for brand
const brandSignup = (username, password, brand_name, country, mobile, email) => {
    return axios
    .post(API_URL_REGISTER_BRAND, {
    username,
    password,
    brand_name,
    country,
    mobile,
    email,
    })
    .then((response) => {
    });
};

//login for brand
const brandLogin = (username, password) => {
    return axios
    .post(API_URL_LOGIN_BRAND, {
        username,
        password,
    })
    .then((response) => {
        if (response.data.access) {
            localStorage.setItem("brand", JSON.stringify(response.data.access));
        }
        return response.data;
    });
};

//register for influencer
const influencerSignup = ( formData ) => {
    return axios
    .post(API_URL_REGISTER_INFLUENCER, formData,{     
        headers: { 'content-type': 'multipart/form-data' }
    })
    .then((response) => {
    });
};


// get all Influencers 
const allInfluencers =(influencersUrl)=>{
    const allInfluencersUrl = getApiUrl(influencersUrl);
    return axios.get(allInfluencersUrl , {headers: authHeader()})
    .then((response)=>{
    return response.data
    })
}

//get Information of influencer
const influencerInformation =(influencerId)=>{
    const influencerInfoUrl = getApiUrl(`api/influencers/${influencerId}/`);
    return axios.get(influencerInfoUrl , {headers: authHeader()})
    .then((response)=>{
        return response.data
    })
}

//get choosen of influencer
const choosenInfluencers =(choosenInfluencersUrl)=>{
    const API_URL_CHOOSEN_INFLUENCER = getApiUrl(`${choosenInfluencersUrl}`);

    return axios.get(API_URL_CHOOSEN_INFLUENCER , {headers: authHeader()})
    .then((response)=>{
        return response.data
    })
}

//delete influencer
const deleteInfluencer =(id)=>{
    const deleteInfluencerUrl = getApiUrl(`api/brand-influencers/status/`);
    return axios.post(deleteInfluencerUrl,{"influencer":id,"accepted":false},{ headers: authHeader() })
        .then((response) => {
        return response.data
    })
}

//add influencer
const addInfluencer =(id)=>{
    const addInfluencerUrl = getApiUrl(`api/brand-influencers/status/`);
    return axios.post(addInfluencerUrl, {"influencer":id,"accepted":true},{ headers: authHeader()})
        .then((response) => {
        return response.data
    })
}

//update user Info
const updateUserInfo =(brand_name,username,email)=>{
    return axios.patch(API_URL_USER_CHANGE_INFO,{brand_name,username,email},{ headers: authHeader() })
    .then((response)=>{
        return response.data
    })
}


//change password for user
const userChangePassword =(old_Password,new_Password)=>{
    return axios.post(API_URL_USER_CHANGE_PASSWORD, {
    "old_password": old_Password,
    "new_password": new_Password
}, { headers: authHeader() })
    .then((response)=>{
        return response.data
    })
}

//contact message
const contactMsg = (firstName,nickName,email,msg) => {
    return axios
        .post(API_URL_Contact_MSG, {
            "first_name": firstName,
            "last_name": nickName,
            "email": email,
            "message": msg
        })
        .then((response) => {
        return response.data;
    });
};

// get all companies 
const allCompanies =(companiesUrl)=>{
    const allCompaniesUrl = getApiUrl(companiesUrl);
    return axios.get(allCompaniesUrl)
    .then((response)=>{
    return response.data
    })
}

const authService = {
    brandSignup,
    brandLogin,
    influencerSignup,
    allInfluencers,
    influencerInformation,
    choosenInfluencers,
    deleteInfluencer,
    addInfluencer,
    updateUserInfo,
    userChangePassword,
    contactMsg,
    allCompanies,
};



export default authService;