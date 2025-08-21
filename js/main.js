var my_products = []
var love_list = []
var input = document.querySelector("#search_bar")
function printCard(products_array) {
  document.querySelector("#cards_container").innerHTML = ""
  products_array.forEach(Object => {
    document.querySelector("#cards_container").innerHTML += 
    `<div class="bg-cyan-200 relative">
    <i class="fa-regular fa-heart Love_icon absolute top-3 right-3 p-2 opacity-50 bg-green-400 text-gray-600 rounded-lg z-50"></i>
    <img src="${Object.images[0]}">
    <div><span class="text-rose-500">title:</span> ${Object.title}</div>
    <div><span class="text-rose-500 mb-[200px]">description:</span> ${Object.description}</div>
    <div><span class="text-rose-500">category:</span> ${Object.category}</div>
    <div><span class="text-rose-500">price:</span> ${Object.price}</div>
    </div>
    `
  });
}
function search(products_array,search_value = "") {
  var filtered_products
  if(!search_value) {
    filtered_products = products_array
  }
  else {
    filtered_products = products_array.filter(product =>
      product.title.toLowerCase().includes(search_value.toLowerCase()) ||
      product.tags.includes(search_value.toLowerCase()) ||
      product.description.toLowerCase().includes(search_value.toLowerCase())
    )
    console.log(filtered_products)
  }
  printCard(filtered_products)
  
}
fetch('https://dummyjson.com/products')
.then(res => res.json())
.then(data => {
  my_products = data.products
  console.log(my_products);
  printCard(my_products)
  input.addEventListener("keyup", function() {
    search(my_products,input.value)
  })
    })
    .catch(err => console.error("Fetch error:", err));

    document.querySelector("#grid").addEventListener("click", ()=>{
      document.querySelector("#cards_container").classList.remove("flex")
      document.querySelector("#cards_container").classList.remove("flex-col")
      document.querySelector("#cards_container").classList.add("grid")
      document.querySelector("#cards_container").classList.add("grid-cols-4")
    })
    document.querySelector("#flex_row").addEventListener("click", ()=> {
      document.querySelector("#cards_container").classList.remove("grid")
      document.querySelector("#cards_container").classList.remove("grid-cols-4")
      document.querySelector("#cards_container").classList.add("flex")
      document.querySelector("#cards_container").classList.add("flex-col")
    })
    document.querySelectorAll(".Love_icon").forEach((single_icon,index) => {
      single_icon.addEventListener("click", ()=>{
        if (single_icon.classList.contains("fa-regular")) {
          single_icon.classList.remove("fa-regular")
          single_icon.classList.add("fa-solid")
          single_icon.classList.add("text-red-600")
          love_list.push(my_products[index]) 
        }
        else {
          single_icon.classList.remove("fa-solid")
          single_icon.classList.remove("text-red-600")
          single_icon.classList.add("fa-regular")
          love_list.pop(my_products[index]) 
        }
        console.log(love_list);
        
    })
    })