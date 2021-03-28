//Item Control - Controls all the items plus their state
const ItemControl =(function(){

  //constructor
  const Item = function(id, name, calories){
    this.id = id;
    this.name = name;
    this.calories = calories;
  }

 //State
 const state = {
  items: [
    // {id: 0, name: "Mango", calories: 200},
    // {id: 1, name: "Oats", calories: 400}
  ],
  currentItem: null,
  totalCalories: 0
}
 //PUBLIC
 return {
  getItems: function(){
    return state.items;
  },
   addItem: function(name, calories){
     //CREATE ID
     let ID;
     if(state.items.length > 0){
      ID = state.items[data.items.length - 1].id + 1;
    } else {
      ID = 0;
    }
    // Calories to number
    calories = parseInt(calories);
    // Create new item
    newItem = new Item(ID, name, calories);
    // Add to items array
    state.items.push(newItem);
    return newItem;
  },
   logData: function(){
    return state; 
  }
 }
})();

//UI Control - handles everything to do with the user interface and will therefore be responsible for list items, etc.
const UIControl = (function(){
  const UISelectors = {
    itemList: "#item-list",
    addButton: ".add-btn",
    itemCalories: "#item-calories",
    itemName: "#item-name"
  }
  
//PUBLIC
return {
  createList: function(items){
    let html = "";
    //Loop through items and create a list
    items.forEach(function(item){
      html += `
      <li class="collection-item" id="item-${item.id}">
        <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
        <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>
      </li>
      `
    });
    //Insert list in index.html
    document.querySelector(UISelectors.itemList).innerHTML = html;
  },
   //Get the value of the inputs
   getInput: function(){
    return {
      name:document.querySelector(UISelectors.itemName).value,
      calories:document.querySelector(UISelectors.itemCalories).value
    }    
  },
    //Here we add a new item (from the input) to the UI
    addListItem: function(item){
    //Create <li> element
    const li = document.createElement("li");
    //Add class 
    li.className= "collection-item"
    //Add id
    li.id= `item-${item.id}`
    //Add html
    li.innerHTML = `
    <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
    <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>
    `
    //Add to UI
    document.querySelector(UISelectors.itemList).insertAdjacentElement("beforeend", li);
  },
  //Clear the inputs (this is only called when a new item is added)
  clearInput: function(){
    document.querySelector(UISelectors.itemName).value = "";
    document.querySelector(UISelectors.itemCalories).value = "";
  },
    //Make UISelectors public
  getSelectors: function(){
    return UISelectors;
  }
}
})();

//App
const App = (function(ItemControl, UIControl) {

  //Load event listeners
  const loadEventListeners = function() {
    //Get UISelector for add-button
    const UISelectors = UIControl.getSelectors();

    //Add button event listener
    document.querySelector(UISelectors.addButton).addEventListener("click", addItemButton);
  }

  //Add item with button
  const addItemButton = function(e){
    //Get value of inputs from UI Control
    const input = UIControl.getInput();
    if(input.name !== "" && input.calories !== ""){
      //Then we can create item
      const newItem = ItemControl.addItem(input.name, input.calories);
      //Then we want to add the newItem to UI
      UIControl.addListItem(newItem);
      //After inserting a new item to UI we want to clear the two input fields 
      UIControl.clearInput();
    } 
    e.preventDefault();
  }

  
  //PUBLIC  
  return {
    init : function(){
      console.log("App initializing")

      //Get Items from Itemcontrol
      const items = ItemControl.getItems();
      //Create item list
      UIControl.createList(items);

      //Load event
      loadEventListeners();
    }
  }
})(ItemControl, UIControl);

App.init();
