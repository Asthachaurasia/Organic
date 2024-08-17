const product = [
    { id: 0, image: 'images/products/product-1.jpg', description: 'Orange', price: 50 },
    { id: 1, image: 'images/products/product-2.jpg', description: 'Dragon Fruit', price: 150 },
    { id: 2, image: 'images/products/product-3.jpg', description: 'Pumpkin', price: 20 },
    { id: 3, image: 'images/products/product-4.jpg', description: 'Apple', price: 40 },


    { id: 0, image: 'images/products/product-1.jpg', description: 'Orange', price: 50 },
    { id: 1, image: 'images/products/product-2.jpg', description: 'Dragon Fruit', price: 150 },
    { id: 2, image: 'images/products/product-3.jpg', description: 'Pumpkin', price: 20 },
    { id: 3, image: 'images/products/product-4.jpg', description: 'Apple', price: 40 },

    { id: 0, image: 'images/products/product-1.jpg', description: 'Orange', price: 50 },
    { id: 1, image: 'images/products/product-2.jpg', description: 'Dragon Fruit', price: 150 },
    { id: 2, image: 'images/products/product-3.jpg', description: 'Pumpkin', price: 20 },
    { id: 3, image: 'images/products/product-4.jpg', description: 'Apple', price: 40 }
];

// const productContainer = document.getElementById('product-container');
// let i = 0;

// productContainer.innerHTML = product.map((item) => {
//     const { image, description, price } = item;
//     return  `<div class="col-lg-3 mb-5 text-center">
//        <div class="card border-0 bg-light mb-2">
//            <div class="card-body">
             
//              <img class='images' src="${image}" alt="${description}">
             
//            </div>
   
//        </div>
       
//        <div><h6>${description}</h6>
//        <p>$${price}</p>
//         <button onclick='addtocart(${i++})' class="btn1">Add to Cart</button>
//        </div>
//          </div>`;
// }).join('');


const productContainer = document.getElementById('product-container');
let i = 0;
let displayedProducts = 0;

// Function to display products
function displayProducts(startIndex, endIndex) {
  productContainer.innerHTML += product.slice(startIndex, endIndex).map((item) => {
    const { image, description, price } = item;
    return  `<div class="col-lg-3 mb-5 text-center">
       <div class="card border-0 bg-light mb-2">
           <div class="card-body">
             
             <img class='images' src="${image}" alt="${description}">
             
           </div>
   
       </div>
       
       <div><h6>${description}</h6>
       <p>$${price}</p>
        <button onclick='addtocart(${i++})' class="btn1">Add to Cart</button>
       </div>
         </div>`;
  }).join('');
  displayedProducts += 4;
}

// Display the first 4 products initially
displayProducts(0, 4);

// Event listener for "Load More" button
const loadMoreButton = document.getElementById('loadMore');
loadMoreButton.addEventListener('click', () => {
  // Check if there are more products to display
  if (displayedProducts < product.length) {
    displayProducts(displayedProducts, displayedProducts + 4);
    // Update button text if all products are displayed
    if (displayedProducts >= product.length) {
      loadMoreButton.textContent = "No more products";
      loadMoreButton.disabled = true;
    }
  } else {
    loadMoreButton.textContent = "No more products";
    loadMoreButton.disabled = true;
  }
});


var cart = [];

function addtocart(a) {
    cart.push({...product[a]});
    displaycart();
}

function delElement(a) {
    cart.splice(a, 1);
    displaycart();
}

 
function displaycart() {
  let j = 0;
  let total = 0;

  if (cart.length == 0) {
      document.getElementById('cartItem').innerHTML = "Your cart is empty";
      document.getElementById('total').innerHTML = "$0.00";
  } else {
      document.getElementById('cartItem').innerHTML = cart.map((items, index) => {
          var { image, description, price } = items;
          var quantity = items.quantity || 1; // Default quantity to 1 if not set

          total += price * quantity;

          return (
              `<div class='cart-item'>
                  <div class='row-img'>
                      <img class='rowimg' src="${image}">
                  </div>
                  <p style='font-size:24px;'>${description}</p>
                  <h2 style='font-size:15px;'>$${price}.00</h2> 
                  <div style='font-size:15px;' class="quant-btn">
                      <button onclick='decQuantity(${index})'  >-</button>
                    <span class="ml-3 mr-3">  ${quantity}</span>
                      <button onclick='incQuantity(${index})'  >+</button>
                  </div>
                  <i class='fa-solid fa-trash' onclick='delElement(${index})'></i>
              </div>`
          );
      }).join('');

      document.getElementById('total').innerHTML = "$" + total + ".00";
  }
}

// Function to increase quantity
function incQuantity(index) {
  cart[index].quantity = (cart[index].quantity || 1) + 1;
  displaycart();
}

// Function to decrease quantity
function decQuantity(index) {
  if (cart[index].quantity > 1) {
      cart[index].quantity -= 1;
      displaycart();
  }
}
 
function setupCartToggle() {
    const cart = document.getElementById("mycart");
    const toggleCartButton = document.getElementById("toggleCart");

    toggleCartButton.addEventListener('click', () => {
        if (cart.classList.contains('visible')) {
            cart.classList.remove('visible');
        } else {
            cart.classList.add('visible');
        }
    });
}

// `
// <div class='box'>
//     <div class='img-box'>
//         <img class='images' src=${image} alt='${title}' />
//     </div>
//     <div class='bottom'>
//         <p>${title}</p>
//         <h2>$${price}.00</h2>
//         <button onclick='addtocart(${i++})'>Add to Cart</button>
//     </div>
// </div>`;
