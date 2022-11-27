function saveToLocalStorage(event) {
    event.preventDefault();
    const food1 = event.target.food.value;
    const category1 = event.target.category.value;
    const description1 = event.target.foodname.value;
    const id = Math.floor(Math.random() * 1000);
    const obj = {
      food1,
      category1,
      description1,
      id,
    };
    axios.post("https://crudcrud.com/api/0acc6265deed4c6ba7e3f0e6c0616f62/appointmentData",obj)
    .then((Response)=> {
      showOrderOnSreen(Response.data)
      console.log(Response)
    })
    .catch((err)=>{
      //document.body.innerHTML=document.body.innerHTML + "<h4>Something went wrong</h4>"
      console.log(err)

    })
    
    //localStorage.setItem(obj.id, JSON.stringify(obj));
    //showOrderOnSreen(obj);
  }
  
  window.addEventListener("DOMContentLoaded", () => {
    const localStorageObj = localStorage;
    const localStoragekeys = Object.keys(localStorageObj);
    for (var i = 0; i < localStoragekeys.length; i++) {
      const key = localStoragekeys[i];
      const userDetailsString = localStorageObj[key];
      const userDetailsObj = JSON.parse(userDetailsString);
      showOrderOnSreen(userDetailsObj);
    }
  });
  
  function showOrderOnSreen(order) {
    document.getElementById("food").value = "";
    document.getElementById("category").value = "";
    document.getElementById("foodname").value = "";
    const parentNode = document.getElementById("listOfUsers");
    const childHTML = `<li id=${order.id}> ₹${order.food1} - ${order.category1} - ${order.description1} 
   <button onclick=editUserDetails('${order.food1}','${order.category1}','${order.description1}','${order.id}')>Edit User </button>
     <button onclick=deleteUser('${order.id}')> Delete User </button> </li>`;
    parentNode.innerHTML = parentNode.innerHTML + childHTML;
  }
  
  function editUserDetails(food1, category1, description1,id) {
    document.getElementById("food").value = food1;
    document.getElementById("category").value = category1;
    document.getElementById("foodname").value = description1;
  
    deleteUser(id);
  }
  
  function deleteUser(id) {
    localStorage.removeItem(id);
    removeUserFromScreen(id);
  }
  
  function removeUserFromScreen(id) {
    const parentNode = document.getElementById("listOfUsers");
    const childNodeToBeDeleted = document.getElementById(id);
  
    parentNode.removeChild(childNodeToBeDeleted);
  }