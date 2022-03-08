export default function (basket = [], action) {
   let basketCopy = [...basket];
   switch (action.type) {
      case 'addArticle' :
         localStorage.removeItem('basket');
         for (let e of basketCopy) {
            if (e.name === action.name && e.size === action.size) {
               e.quantity += 1;
               return basketCopy;
            }
         }
         basketCopy.push({
            name: action.name,
            brand: action.brand,
            img: action.img,
            quantity: 1,
            size: action.size,
            normalPrice: action.normalPrice,
            reducedPrice: action.reducedPrice
         });
         localStorage.setItem('basket', JSON.stringify(basketCopy))
         return basketCopy;
      case 'deleteArticle' :
         localStorage.removeItem('basket');
         basketCopy.splice(action.index, 1)
         localStorage.setItem('basket', JSON.stringify(basketCopy))
         return basketCopy;
      case 'modifyArticleQuantity' :
         if(action.quantity < 1) {
            return basketCopy
         }
         localStorage.removeItem('basket');
         for (let e of basketCopy) {
            if (e.name === action.name) {
               e.quantity = action.quantity;
               localStorage.setItem('basket', JSON.stringify(basketCopy))
               return basketCopy;
            }
         }
         localStorage.setItem('basket', JSON.stringify(basketCopy))
         return basketCopy;
      case 'modifyArticleSize' :
         localStorage.removeItem('basket');
         basketCopy[action.index].size = action.size;
         localStorage.setItem('basket', JSON.stringify(basketCopy))
         return basketCopy;
      case 'modifyLastArticleSize' :
         localStorage.removeItem('basket');
         if (basketCopy.length > 0) {
            basketCopy[basketCopy.length - 1].size = action.size
         }
         localStorage.setItem('basket', JSON.stringify(basketCopy))
         return basketCopy;
      case 'removeBasket' :
         return [];
      case 'refreshBasket' :
         basketCopy = JSON.parse(localStorage.getItem('basket')) != null ? JSON.parse(localStorage.getItem('basket')) : [...basket];
         return basketCopy;
      default :
         return basket;
   }
}