//Item Control - Controls all the items plus their state
const ItemControl = (function () {

  //constructor
  const Item = function(id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  }

 //State
 const state = {
   items: [
     {id: 0, name: "Mango", calories: 150},
     {id: 1, name: "Pasta", calories: 850},
     {id: 2, name: "Oats", calories: 250}
    ],
   currentItem: null,
   totalCalories: 0
 }
 //PUBLIC
 return {
   logState: function() {
     return state; 
   },
   addItem: function(name, calories) {
     //CREATE ID
     let ID;
    if(state.items.length > 0){
      ID = state.items[state.items.length -1].id +1
    } else {
      return ID=0;
    }
    //Calories to numbers
    calories = parseInt(calories);

    //Create new Item
    newItem = new Item(ID, name, calories);

    state.items.push(newItem);

   },
   getItems: function() {
     return state.items;
   }
 }

})();

//UI Control - handles everything to do with the user interface and will therefore be responsible for list items, etc.
const UIControl = (function () {
  const UISelectors = {
    itemList: "#item-list",
    addButton: ".add-btn",
    itemCalories: "#item-calories",
    itemName: "#item-name"
  }
  
//PUBLIC
return {
  createList: function(items) {
    let html = "";
    //Loop through items and create a list
    items.forEach(function (item){
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
  getInput: function () {
    return {
      name : document.querySelector(UISelectors.itemName).value,
      calories : document.querySelector(UISelectors.itemCalories).value
    }    
  },
  addItemList: function () {
    //Create Li
    const li = document.createElement("li");
  },
  //Make UISelectors public
  getSelectors: function() {
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
  const addItemButton = function(e) {
    //Get value of inputs from UI Control
    const input = UIControl.getInput();
    if(input.name !== "" && input.calories !== ""){
      //Then we can create item
      const newItem = ItemControl.addItem(input.name, input.calories);
      //We want to insert item into UI
      UIControl.addItemList();
    } 
    e.preventDefault();
  }

  
  //PUBLIC  
  return {
    init : function() {
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
