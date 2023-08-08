export default function authHeader() {
    const brand = JSON.parse(localStorage.getItem("brand"));
    if (brand ) {
        return { "Authorization": 'Bearer ' + brand  };
    } 
    else {
        return {};
    }
};
