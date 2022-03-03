export default function (basket = [], action) {
   switch (action.type) {
      case 'add-article' :
         let basketCopy = [...basket]
         basketCopy.push({
            name: action.name,
            img: action.img,
            quantity: 0,
         })
         return basketCopy;
      case 'delete-article' :
         return basketCopy;
      case 'modify-article-quantity' :
         return basketCopy;
      case 'modify-article-size' :
         return basketCopy;
      default :
         return basket;
   }
}