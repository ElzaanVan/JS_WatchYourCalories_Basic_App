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
      ID = state.items[state.items.length - 1].id + 1;
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
  getItemById: function(id) {
    let found = null;

    state.items.forEach((item) => {
      if(item.id === id){
        found = item
      }
    });
    return found;
  },
  setCurrentItem: function(item) {
    state.currentItem = item;
  },
  getCalories: function() {
    let total = 0;
    //Loop through data and append calories of each item to variable
    state.items.forEach(function(item) {
      total += item.calories;
    });
    //total calories should equal looped amount
    state.totalCalories = total
    //return the state of total calories
    return state.totalCalories;
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
    backButton: ".back-btn",
    updateButton: ".update-btn",
    deleteButton: ".delete-btn",
    itemCalories: "#item-calories",
    itemName: "#item-name",
    totalCalories: ".total-calories"
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
  //Show total calories
  showTotalCalories: function(totalCals){
    document.querySelector(UISelectors.totalCalories).textContent = totalCals;
    console.log(totalCals)
},
  hideEditState: function() {
    UIControl.clearInput();
    document.querySelector(UISelectors.updateButton).style.display = "none";
    document.querySelector(UISelectors.deleteButton).style.display = "none";
    document.querySelector(UISelectors.backButton).style.display = "none";
    document.querySelector(UISelectors.addButton).style.display = "block";
  },
  showEditItems: function(itemToEdit) {
    document.querySelector(UISelectors.itemName).value = itemToEdit.name ;
    document.querySelector(UISelectors.itemCalories).value = itemToEdit.calories;

    document.querySelector(UISelectors.updateButton).style.display = "inline";
    document.querySelector(UISelectors.deleteButton).style.display = "inline";
    document.querySelector(UISelectors.backButton).style.display = "inline";
    document.querySelector(UISelectors.addButton).style.display = "none";
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

    //Add edit button event listener
    document.querySelector(UISelectors.itemList).addEventListener("click", editItemButton);

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
      //Get totalCalories
      const totalCals = ItemControl.getCalories();
      //Show calories
      UIControl.showTotalCalories(totalCals)
      //After inserting a new item to UI we want to clear the two input fields 
      UIControl.clearInput();
    } 
    e.preventDefault();
  }

  //Edit item with button
  const editItemButton = function (e) {
    if(e.target.classList.contains("edit-item")){
      const itemId = e.target.parentNode.parentNode.id;
      
      const idArr = itemId.split("-");
      
      const id = parseInt(idArr[1]);

      
      //Item to edit
      const itemToEdit = ItemControl.getItemById(id);

      ItemControl.setCurrentItem(itemToEdit);

      //Now we want to show the current item in the UI form
      UIControl.showEditItems(itemToEdit);
    }
    e.preventDefault();
  }
  
  //PUBLIC  
  return {
    init : function(){
      console.log("App initializing")
      //Hide Edit state
      UIControl.hideEditState();
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
