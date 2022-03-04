export default function (basket = [], action) {
   let basketCopy = [...basket];
   switch (action.type) {
      case 'addArticle' :
         for (let e of basketCopy) {
            if (e.name === action.name && e.size === action.size) {
               e.quantity += 1;
               return basketCopy;
            }
         }
         basketCopy.push({
            name: action.name,
            img: action.img,
            quantity: 1,
            size: action.size,
            normalPrice: action.normalPrice,
            reducedPrice: action.reducedPrice,
         });
         return basketCopy;
      case 'deleteArticle' :
         basketCopy.splice(action.index, 1)
         return basketCopy;
      case 'modifyArticleQuantity' :
         for (let e of basketCopy) {
            if (e.name === action.name) {
               e.quantity = action.quantity;
               return basketCopy;
            }
         }
         return basketCopy;
      case 'modifyArticleSize' :
         basketCopy[action.index].size = action.size;
         return basketCopy;
      case 'modifyLastArticleSize' :
         if (basketCopy.length > 0) {
            basketCopy[basketCopy.length - 1].size = action.size
         }
         return basketCopy;
      default :
         return basket;
   }
}