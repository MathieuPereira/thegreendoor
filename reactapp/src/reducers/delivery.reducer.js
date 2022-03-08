export default function(deliveryPrice = 0, action){
    if(action.type == 'changeDeliveryPrice'){
        console.log(action.price)
        return action.price
    } else {
        return deliveryPrice
    }
}