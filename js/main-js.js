window.addEventListener("load",(eo) => {
    AOS.init();
});

/* ----------------------start home slider show------------*/
let sliderShow = document.getElementById("show");  // slid container
let imgSlid = document.querySelector(".img-slid");
let rightImg = document.getElementById("right");
let leftImg = document.getElementById("left");

let imgIndex = 0;
let SliderImg = [
    `<img src="images2/home-img/home1.jpg" alt="">`,
    `<img src="images2/home-img/home2.jpg" alt="">`,
    `<img src="images2/home-img/home3.jpg" alt="">`,
    `<img src="images2/home-img/home4.jpg" alt="">`
];


window.addEventListener("load",() => {
    loadFirstImg(imgIndex);
});
function loadFirstImg(count){
    let slidContent = ` 
        <div class="slid-info" data-aos="fade-up">
            <h2>wooden chair collection</h2>
            <button class ="shop-link">Shop Now</button>
        </div>
        ${SliderImg[count]}
   `;
 imgSlid.innerHTML = slidContent;
}

// next btn
rightImg.addEventListener("click",(eo) => {
   nextFun();
});
function nextFun(){
    imgIndex++;
    if(imgIndex > SliderImg.length-1){
        imgIndex = 0;
    }
    loadFirstImg(imgIndex);
}

// pre btn
leftImg.addEventListener("click",(eo) => {
    imgIndex--;
    if(imgIndex < 0){
        imgIndex = SliderImg.length-1;
    }
    loadFirstImg(imgIndex);
});

let autoNextSlid = setInterval(() => {
    nextFun();
},6000);


/*---------------------------------------------toggle navbar on sm screen-------------------------------*/
function lista(){
    let mune = document.querySelector(".list-unstyled");
    let list = document.querySelector(".nav-list-icon");
    let closeList = document.querySelector(".close-list");

    list.addEventListener("click",(eo) => {
        mune.classList.add("show");
        setTimeout(() => {
            list.style.transform = "scale(0)";
        }, 500);
    });

    closeList.addEventListener("click",(eo) => {
        mune.classList.remove("show");
        list.style.transform = "scale(1)";
    });
}

lista();

/*---------------------------------------------go to show product page-------------------------------*/
let showProduct = document.querySelectorAll("#show-product");
showProduct.forEach((item) => {
    item.addEventListener("click",(eo) => {
        // eo.preventDefault();
        let img = item.parentElement.parentElement.querySelector(".img").src;
        localStorage.setItem("img",JSON.stringify(img));
    });
});


/*---------------------------------------------------------------------------*/
function searching (){
    let login = document.querySelector(".login");
    let liSearch = document.querySelector(".li-search");
    let searchIcon = document.querySelector(".search-icon");

    searchIcon.addEventListener("click",(eo) => {
        login.classList.toggle("feet");
        liSearch.classList.toggle("feet");
    });
};
searching();


/*-------------------------------------------    shooping cart-------  -------------------------*/

const buyProduct = document.querySelectorAll(".buy-btn");
buyProduct.forEach((item) => {
    // console.log(item.parentElement.parentElement.querySelector(".img").src);
    item.addEventListener("click",(eo) => {
        eo.preventDefault();
    });
});


/*------------------------------------------shopping card page--------------------------------------------- */
let allBuyBtn = document.querySelectorAll(".buy-btn");
let shoppingIcon = document.querySelector("#product-counter");
let shoppingPage = document.querySelector(".shopping-page");
let heidShoppingPage = shoppingPage.querySelector(".close-shopping");
let productListUl = shoppingPage.querySelector("#product-list");
let productCounter = 0;


//open shopping page
shoppingIcon.addEventListener("click",(eo) => {
    shoppingPage.style.right = "0";
});

//heid shopping page
heidShoppingPage.addEventListener("click",(eo) => {
    shoppingPage.style.right = "-100vw";
});

// buy product when user clicked on buy btn
allBuyBtn.forEach((button) => {
    button.addEventListener("click",(eo) => {
        eo.preventDefault();

        // call Check whether the product is duplicate or not function
        checkproduct(button);

    });
});

// add product to card
const addProductInList = (item) => {
    let category = item.parentElement.parentElement;
    let getProductImg = category.querySelector(".img").src;
    let getProductPrise = (category.querySelector(".new-price").innerHTML != null) ? category.querySelector(".new-price").innerHTML : category.parentElement.parentElement.parentElement.querySelector(".new-price").innerHTML;

    //this our item
    let product = `
        <li class ="product-li">
            <div class="remove-product">&#10539;</div>
            <div class="prise">${getProductPrise}</div>
            <div class="Quantity">
                <span>Quantity</span>
                <input type="number" min="1" value="1" id="product-quantity">
            </div>
            <div class="img-product-buyed">
                <span class="name-of-product">chair</span>
                <img src="${getProductImg}" alt="" class = "pecture">
            </div>
       </li> `;

        // add this product to shopping list
        productListUl.innerHTML += product;

        productCounter++;
        shoppingIcon.innerHTML = productCounter

        //call update prise function
        updateTotalPrice();

};

// Check whether the product is duplicate or not
const checkproduct = (item) => {
    let category = item.parentElement.parentElement;
    let getProductImg = category.querySelector(".img").src;
    let check = false;

    productListUl.querySelectorAll(".product-li").forEach((one) => {
        let imgProductBuyed = one.querySelector(".pecture").src;
        if(getProductImg == imgProductBuyed){
            check = true;

            // call duplicateProductMsg function
            duplicateProductMsg();
        }
    });

    if(check === false){
        //call massegeForYou function
        massegeForYou();

        // call add product function
        addProductInList(item)
    }
}

//update total price function
const updateTotalPrice = () => {                  // inportant*************************
    let total = 0;
    // get parent element of item in cart
    const allProductsInCart = document.querySelectorAll(".product-li"); 
    allProductsInCart.forEach(item  => {
      let price  = item.querySelector(".prise").innerHTML.replace("$","");
      let quantity = item.querySelector("#product-quantity");
      total = total + (Number(price) * Number(quantity.value)) ;
    });
    total.toFixed(2);
    shoppingPage.querySelector(".total-numper").innerHTML = `$${total}`;
};

// create congratulationsMassege
const massegeForYou = () => {
    // create congratulation massege
    let massege = document.createElement("p");
    massege.innerHTML = "&#128150; congratulations";
    massege.classList.add("massege");
    document.body.append(massege);
    setTimeout(() => {
        massege.style.left = "-100%";
    }, 2000);
    setTimeout(() => {
     massege.remove();
    }, 3000);
}

// create error massege
const duplicateProductMsg = () => {
    let duplicateProduct = document.createElement("div");
    duplicateProduct.innerHTML = "&#128584;  duplicate product";
    duplicateProduct.classList.add("duplicate-msg");
    document.body.append(duplicateProduct);
    setTimeout(() => {
        duplicateProduct.style.top = "-100vh";
    }, 4000);
}

// update total prise when a user change Quantity
shoppingPage.addEventListener("change",(eo) => {
    // call update total price function
    updateTotalPrice();
});

// remove product from shopping page
shoppingPage.addEventListener("click",(eo) => {
    if(eo.target.classList.contains("remove-product")){
        eo.target.parentElement.style.transform = "translateX(110vw)";
        setTimeout(() => {
            eo.target.parentElement.remove();

             // call update total price function
             updateTotalPrice();
        }, 1000 );

        // update product counter
        productCounter--;
        shoppingIcon.innerHTML = productCounter

        if(productCounter === 0){
            setTimeout(() => {
                shoppingPage.style.right = "-100vw";
            }, 1250);
        }
    }
});


/*--------------------------------------------------------------------------------------- */



