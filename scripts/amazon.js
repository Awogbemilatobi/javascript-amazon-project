import {cart} from '../data/cart.js';
import {products} from '../data/products.js';
import {formatCurrency} from './utils/money.js';


let productsHTML = '';

products.forEach((product) => {
    productsHTML += `
            <div class="product-container">
                <div class="product-image-container">
                    <img class="product-image"
                    src="${product.image}">
                </div>

                <div class="product-name limit-text-to-2-lines">
                    ${product.name}
                </div>

                <div class="product-rating-container">
                    <img class="product-rating-stars"
                    src="images/ratings/rating-${product.rating.stars * 10}.png">
                    <div class="product-rating-count link-primary">
                    ${product.rating.count}
                    </div>
                </div>

                <div class="product-price">
                    $${formatCurrency(product.priceCents)}
                </div>

                <div class="product-quantity-container">
                    <select class="js-quantity-selector-${product.id}">
                    <option selected value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    </select>
                </div>

                <div class="product-spacer"></div>

                <div class="added-to-cart js-added-to-cart-${product.id}">
                    <img src="images/icons/checkmark.png">
                    Added
                </div>

                <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
                    Add to Cart
                </button>
                </div>
    `;
});

document.querySelector('.js-products-grid').innerHTML = productsHTML;

function addToCart (productId, selectorValue) {
  let matchingItem;
        
        cart.forEach((cartItem) => {
            if (productId === cartItem.productId) {
                matchingItem = cartItem;
            }
        });

        if (matchingItem) {
            matchingItem.quantity += Number(selectorValue);
        }  else {
            cart.push({
                productId: productId,
                quantity: Number(selectorValue)
            }) 
        }
    }

    function updateQuantity () {
      let cartQuantity = 0;

      cart.forEach((cartItem) => {
          cartQuantity += cartItem.quantity;
      });

      document.querySelector('.js-cart-quantity').innerText = cartQuantity;
    }

document.querySelectorAll('.js-add-to-cart').forEach((button) => {
    button.addEventListener('click', () => {
        const productId = button.dataset.productId; //convert product-name (kebab case) to productName (camelCase)
        
        let selectorValue = document.querySelector(`.js-quantity-selector-${productId}`).value;

        addToCart(productId, selectorValue);
        updateQuantity();
 
        document.querySelector(`.js-added-to-cart-${productId}`).classList.add("added-to-cart-show");

        setTimeout(() => {
          document.querySelector(`.js-added-to-cart-${productId}`).classList.remove("added-to-cart-show");
        }, 2000);

    });
});

