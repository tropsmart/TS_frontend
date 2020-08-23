import http from "../http-common";
import authHeader from "@/services/auth-header";


class TsDataService {

    //Data Service
    login(user) {
        return http.post(`/api/authentication/sign-in/`,{
            email: user.email,
            password: user.password
        }, )
            .then(response => {
                if(response.data.success == true && response.data.resource.token) {
                    localStorage.setItem('user', JSON.stringify(response.data.resource))
                }
                return response.data;
            });
    }

    logout() {
        
        localStorage.removeItem('user');
    }

    register(data) {
        return http.post("/api/authentication/sign-up/", JSON.stringify(data));
    }

    //Users
    getAllUsers() {
        return http.get("/api/users", { headers: authHeader() })
            .then(response => {
                return response;
            });
    }

    getAllDrivers() {
        return http.get("api/users/drivers", { headers: authHeader() })
            .then(response => {
                return response;
            })
    }
    getUser(id) {
        return http.get(`/api/users/${id}`, { headers: authHeader() });
    }

    //Customers
    rechargeCredits(customerId,credits) {
        return http.put(`/api/customers/${customerId}/credits/${credits}`, { headers: authHeader() });
    }

    getCustomerByUserId(userId) {
        return http.get(`api/customers/users/${userId}`, { headers: authHeader() });
    }

    //Driver
    getDriverByUserId(userId) {
        return http.get(`api/drivers/users/${userId}`, { headers: authHeader() });
    }

    //Cargo
    getAllCargoes(){
        return http.get("/api/cargoes", { headers: authHeader() });
    }

    getAllCargoesByCustomerId(customerId) {
        return http.get(`api/cargoes/customers/${customerId}`,  { headers: authHeader() });
    }

    getAllCargoesByDriverId(driverId) {
        return http.get(`api/cargoes/drivers/${driverId}`, { headers: authHeader() });
    }

    getRequestedCargoesByDriverId(driverId) {
        return http.get(`api/cargoes/drivers/${driverId}/requesteds`, { headers: authHeader() });
    }

    getConfirmedCargoesByDriverId(driverId) {
        return http.get(`api/cargoes/drivers/${driverId}/confirmeds`, { headers: authHeader() });
    }

    getFinishedCargoesByDriverId(driverId) {
        return http.get(`api/cargoes/drivers/${driverId}/finisheds`, { headers: authHeader() });
    }

    setRequestCargo(customerId, cargoInput){
        return http.post(`/api/cargoes/customers/${customerId}`, JSON.stringify(cargoInput), { headers: authHeader() });
    }

    setCargoConfirmation(cargoId) {
        return http.put(`/api/cargoes/${cargoId}/confirm`);
    }

    setCargoDeliver(cargoId) {
        return http.put(`/api/cargoes/${cargoId}/deliver`);
    }
    //Favorites

    getAllFavoritesByUserId(id) {
        return http.get(`/api/users/${id}/favourites`,{ headers: authHeader() });
    }

    getAllFavorites() {
        return http.get(`/api/users/favourites`, { headers: authHeader() });
    }

    getFavorite(user,favorite){
        return http.get(`/api/users/${user}/favourites/${favorite}`, { headers: authHeader() });
    }

    setFavorite(user,favorite){
        return http.post(`/api/users/${user}/favourites/${favorite}`, { headers: authHeader() });
    }

    //Blockeds

    getAllBlockedsByUser(id) {
        return http.get(`/api/users/${id}/blockeds`, { headers: authHeader() });
    }

    getAllBlockeds() {
        return http.get(`/api/users/blockeds`, { headers: authHeader() });
    }

    getBlocked(user,block) {
        return http.get(`/api/users/${user}/blockeds/${block}`,{ headers: authHeader() });
    }

    setBlocked(user,block) {
        return http.post(`/api/users/${user}/blockeds/${block}`,{ headers: authHeader() });
    }

    //Configurations
    getConfiguration(id) {
        return http.get(`api/configurations/users/${id}`, {headers: authHeader() });
    }

    updateConfiguration(id,config) {
        return http.put(`api/configurations/users/${id}`, JSON.stringify(config), { headers: authHeader() });
    }


    addPaymentMethod(userId, paymentMethodInput) {
        return http.post(`api/configurations/users/${userId}/payment-method`, JSON.stringify(paymentMethodInput),{ headers: authHeader()});
    }

    getPaymentMethods(userId) {
        return http.get(`api/payment-methods/users/${userId}`,{ headers: authHeader()});
    }

    //Service
    getService(userId) {
        return http.get(`api/services/drivers/${userId}`, {headers: authHeader()});
    }

    //Reviews
    getReviewsByDriverId(userId){
        return http.get(`api/reviews/drivers/${userId}`,{ headers: authHeader()});
    }

    getReviewsByCustomerId(userId){
        return http.get(`api/reviews/customers/${userId}`, {headers: authHeader()});
    }

    //Subscription
    
    getSubscriptionsDone(userId){
        return http.get(`api/subscriptions/users/${userId}`, {headers: authHeader()});
    }

    subscribeByUserIdAndPlanId(userId, planId){
        return http.post(`api/subscriptions/users/${userId}/plans/${planId}`,{headers: authHeader()});
    }

    activeSomeSubscriptionByUserIdAndPlanId(subscriptionId){
        return http.put(`api/subscriptions/${subscriptionId}/enable`, {headers: authHeader()});
    }

    //Plans

    getPlanList(){
        return http.get(`api/plans`, {headers: authHeader()});
    }

}

export default new TsDataService();