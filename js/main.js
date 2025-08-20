var my_products = []
fetch('https://dummyjson.com/products')
  .then(res => res.json())
  .then(data => {
      my_products = data.products
      console.log(my_products);

    })
    .catch(err => console.error("Fetch error:", err));

    function printCard() {
      
    }