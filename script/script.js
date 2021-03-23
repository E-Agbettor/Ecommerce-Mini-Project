//variables
const products = document.querySelector('#products-list');
const shoppingCartContent = document.querySelector('#cart-content tbody')



// eventListeners
loadListeners();

function loadListeners(){
    // add new product
    products.addEventListener('click', buyProduct);

    //document ready
    document.addEventListener('DOMContentLoaded', getFromLocalStorage);
}



//functions 
function buyProduct(e){
    e.preventDefault();

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
                <a href="#" class="remove" data-id="${product.image}">
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