import http from "../http-common";

class TsDataService {

    //Authentication

    signUp(data) {
        return http.post("/api/authentication/sign-up/", JSON.stringify(data));
    }

    SignIn (data) {
        return http.post(`/api/authentication/sign-in/`,JSON.stringify(data));
    }

    
    //Users

    getAllUsers() {
        return http.get("/api/users");
    }
    getUser(id) {
        return http.get(`/api/users/${id}`);
    }

    //Cargo

    getAllCargoes(){
        return http.get("/api/cargoes");
    }

    registerCargo(){
        return http.post("/api/cargoes/customers/");
    }

    //Favorites

    getAllFavoritesByUserId(id) {
        return http.get(`/api/users/${id}/favourites`);
    }

    getAllFavorites() {
        return http.get(`/api/users/favourites`);
    }

    getFavorite(user,favorite){
        return http.get(`/api/users/${user}/favourites/${favorite}`);
    }

    setFavorite(user,favorite){
        return http.post(`/api/users/${user}/favourites/${favorite}`);
    }

    //Blockeds

    getAllBlockedsByUser(id) {
        return http.get(`/api/users/${id}/blockeds`);
    }

    getAllBlockeds() {
        return http.get(`/api/users/blockeds`);
    }

    getBlocked(user,block) {
        return http.get(`/api/users/${user}/blockeds/${block}`);
    }

    setBlocked(user,block) {
        return http.post(`/api/users/${user}/blockeds/${block}`);
    }


}

export default new TsDataService();