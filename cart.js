const product = [
    { id: 0, image: 'images/products/product-1.jpg', description: 'Z Flip Foldable Mobile', price: 120 },
    { id: 1, image: 'images/products/product-2.jpg', description: 'Air Pods Pro', price: 60 },
    { id: 2, image: 'images/products/product-3.jpg', description: 'Camera Lens', price: 250 },
    { id: 3, image: 'images/products/product-4.jpg', description: 'Headphones', price: 90 }
];

const productContainer = document.getElementById('product-container');
let i = 0;

productContainer.innerHTML = product.map((item) => {
    const { image, title, price } = item;
    return `
        <div class='box'>
            <div class='img-box'>
                <img class='images' src=${image} alt='${title}' />
            </div>
            <div class='bottom'>
                <p>${title}</p>
                <h2>$${price}.00</h2>
                <button onclick='addtocart(${i++})'>Add to Cart</button>
            </div>
        </div>`;
}).join('');

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
    let j = 0, total = 0;

    if (cart.length == 0) {
        document.getElementById('cartItem').innerHTML = "Your cart is empty";
        document.getElementById('total').innerHTML = "$0.00";
    } else {
        document.getElementById('cartItem').innerHTML = cart.map((items) => {
            var { image, title, price } = items;
            total = total + price;
            document.getElementById('total').innerHTML = "$" + total + ".00";

            return (
                `<div class='cart-item'>
                    <div class='row-img'>
                        <img class='rowimg' src=${image}>
                    </div>
                    <p style='font-size:12px;'>${title}</p>
                    <h2 style='font-size:15px;'>$${price}.00</h2>` +
                    "<i class='fa-solid fa-trash' onclick='delElement(" + (j++) + ")'></i></div>"
            );
        }).join('');
    }
}



