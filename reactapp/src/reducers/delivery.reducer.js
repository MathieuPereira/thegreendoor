export default function(deliveryService = 1, action){
    if(action.type == 'changeDeliveryService'){
        localStorage.setItem('deliveryService', action.delivery)
        return action.delivery
    } else if (action.type == 'refreshDelivery'){
        return localStorage.getItem('deliveryService') != null ? localStorage.getItem('deliveryService') : deliveryService;
    } else {
        return deliveryService
    }
}