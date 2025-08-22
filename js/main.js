var my_products = []
var love_list = []
var input = document.querySelector("#search_bar")
function printCard(products_array) {
  document.querySelector("#cards_container").innerHTML = ""
  products_array.forEach(Object => {
    document.querySelector("#cards_container").innerHTML += 
    `<div class="bg-cyan-200 relative">
    <i class="fa-regular fa-heart love_icon absolute top-3 right-3 p-2 opacity-50 bg-white text-gray-600 rounded-lg"></i>
    <i class="fa-solid fa-pen-to-square absolute top-3 right-12 p-2 opacity-50 bg-white text-gray-600 rounded-lg"></i>
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
function editCard(products_array,index) {
  document.querySelector(".moredetials").innerHTML =
  `<div class="fixed z-50 bg-white">
  <button id="delete" class="absolute top-1 right-2">X</button>
  <label for="title">title: </label>
  <input id="title" type="text" value="${products_array[index].title}"> 
  <label for="description">description: </label>
  <input id="description" type="text" value="${products_array[index].description}"> 
  <label for="discount">discount: </label>
  <input id="discount" type="text" value="${products_array[index].discountPercentage}">
  <label for="brand">brand: </label>
  <input id="brand" type="text" value="${products_array[index].brand}">
  <label for="returnpolicy">return Policy: </label>
  <input id="returnpolicy" type="text" value="${products_array[index].returnPolicy}">
  <label for="tags">tags: </label>
  <input id="tags" type="text" value="${products_array[index].tags.toString()}">
  <label for="img0">Product_images: </label>
  <input id="img0" type="text" value="${products_array[index].images[0].split("https://cdn.dummyjson.com/product-images")[1]}">
  ${products_array[index].images[1]? `<input id="img1" type="text" value="${products_array[index].images[1].toString().split("https://cdn.dummyjson.com/product-images")[1]}"></input>`: ""}
  ${products_array[index].images[2]? `<input id="img1" type="text" value="${products_array[index].images[2].toString().split("https://cdn.dummyjson.com/product-images")[1]}"></input>`: ""}
  ${products_array[index].images[3]? `<input id="img1" type="text" value="${products_array[index].images[3].toString().split("https://cdn.dummyjson.com/product-images")[1]}"></input>`: ""}
  <label for="stock">stock: </label>
  <input id="stock" type="text" value="${products_array[index].stock}">
  <label for="price">price: </label>
  <input id="price" type="text" value="${products_array[index].price}">
  <button class="bg-black text-white cursor-pointer save_changes">save changes</button>
  </div>`
 document.querySelector(".save_changes").addEventListener("click", ()=>{
  products_array[index].images[0] = "https://cdn.dummyjson.com/product-images" + document.querySelector("#img0").value
  products_array[index].images[1]? products_array[index].images[1] = "https://cdn.dummyjson.com/product-images" + document.querySelector("#img1").value : ""
  products_array[index].images[2]? products_array[index].images[2] = "https://cdn.dummyjson.com/product-images" + document.querySelector("#img2").value : ""
  products_array[index].images[3]? products_array[index].images[3] = "https://cdn.dummyjson.com/product-images" + document.querySelector("#img3").value : ""
  products_array[index].title = document.querySelector("#title").value
  products_array[index].description = document.querySelector("#description").value  
  products_array[index].discountPercentage = document.querySelector("#discount").value
  products_array[index].brand = document.querySelector("#brand").value
  products_array[index].returnPolicy = document.querySelector("#returnpolicy").value
  products_array[index].tags = document.querySelector("#tags").value
  products_array[index].stock = document.querySelector("#stock").value
  products_array[index].price = document.querySelector("#price").value
  printCard(products_array)
  document.querySelector(".moredetials").innerHTML = ""
})
document.querySelector("#delete").addEventListener("click", ()=> {
  document.querySelector(".moredetials").innerHTML = ""
})
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
  document.querySelectorAll(".fa-pen-to-square").forEach((single_edit,index) => {
    single_edit.addEventListener("click", () => {
      editCard(my_products,index)
    })
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
    document.querySelectorAll(".love_icon").forEach((single_icon,index) => {
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