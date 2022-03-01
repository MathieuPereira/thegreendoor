export default function(navigation = {}, action){
   if(action.type === 'add-category'){
      let copiedNavigation = JSON.parse(JSON.stringify(navigation));
      copiedNavigation.category = action.category;
      return copiedNavigation;
   } else if (action.type === 'addNavigation') {
      let copiedNavigation = JSON.parse(JSON.stringify(navigation));
      copiedNavigation.brand = action.brand;
      return copiedNavigation;
   }
}