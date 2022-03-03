export default function(navigation = {}, action){
   switch(action.type) {
      case 'add-category' :
         navigation.category = action.category;
         return navigation;
      case 'add-brand' :
         navigation.brand = action.brand;
         return navigation;
      default :
         return navigation;
   }
}