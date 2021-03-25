//variables
let products = document.querySelector('#products-list');
let shoppingCartContent = document.querySelector('#cart-content tbody');
let showShoppingCart = document.getElementById('#shopping-cart');
let shoppingCartQty = document.querySelector('#shoppingCartQty')
let productCount = 1;
let  buttonPlus = document.querySelector('#button-plus');
let  buttonMinus = document.querySelector('#button-minus');
let  buttonCount = document.querySelector('#button-count');
let  btnCart = document.querySelector('#btn-cart');
let  sideShoppingCart = document.querySelector('#shopping-cart-sidebar');
;
    
 btnCart.addEventListener('click', function(){
         sideShoppingCart.style.display = "block";
 });
  
/* buttonPlus.addEventListener('click', function(){
    buttonCount.innerText= productCount++;
}); 

buttonMinus.addEventListener('click', function(){
     if(count > 0){
         buttonCount.innerText= productCount--;
     }
});  */


// eventListeners
// loadListeners();

// function loadListeners(){
    //view cart sliding from left
    
     // add new product
     products.addEventListener('click', buyProduct);

    //document ready
    document.addEventListener('DOMContentLoaded', getFromLocalStorage);
//  }



//functions 

function buyProduct(e){
    // e.preventDefault();
    
    //find product
    if(e.target.classList.contains('add-to-cart')){
        const product = e.target.parentElement.parentElement;

        // read the values
        getProductInfo(product);
    }
   
}

//reads the html info of the selected course
function getProductInfo(product){
    
    const productInfo = {
        image: product.querySelector('img').src,
        title: product.querySelector('h3').textContent,
        price: product.querySelector('h5').textContent,
        quantity:shoppingCartQty.innerText = productCount++,
        id: product.querySelector('a').getAttribute('data-id')
    }
    addIntoCart(productInfo);
}

function addIntoCart(product){
    // create a row
    const row = document.createElement('tr');
    
    // cart template
    row.innerHTML = `
        <tr>
            <td>
                <img src="${product.image}" width=100>
            </td>
            <td>
                ${product.title}
            </td>
            <td>
                ${product.price}
            </td>
            <td>
                ${product.quantity}
            </td>
            <td>
                <a href="#" class="remove" data-id="${product.id}">
            </td>
        </tr>
    `;
    // add to cart
    shoppingCartContent.appendChild(row);
    //save to localStorage
    saveIntoStorage(product);
}

function saveIntoStorage(product){
    let products = getProductsFromStorage();

    //add the product into array
    products.push(product);

    //convert Json into String
    localStorage.setItem('products', JSON.stringify(products));
}

function getProductsFromStorage(){
    let products;

    if(localStorage.getItem('products')===null){
        products = [];
    }else {
        products = JSON.parse(localStorage.getItem('products'));
    }
    return products;
}

//print products into cart when the document is ready
function getFromLocalStorage(){
    let productsLS = getProductsFromStorage();

    // loop through the products
    productsLS.forEach(function(product){
        // creaate tr
        const row = document.createElement('tr');

        //print the content
        row.innerHTML = `
            <tr>
                <td>
                    <img src="${product.image}" width=100>
                </td>
                <td>
                    ${product.title}
                </td>
                <td>
                    ${product.price}
                </td>
                <td>
                    <a href="#" class="remove" data-id="${product.image}">
                </td>
            </tr>
        `;
        shoppingCartContent.appendChild(row);
    });
}
 