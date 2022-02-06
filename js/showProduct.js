
let boxImg = document.querySelector("#img-boxs");
boxImg.src = JSON.parse(localStorage.getItem("img"));


let allImgGroup = document.querySelector(".all-img");
allImgGroup.innerHTML += `
    <div>
        <img id="product-img" src="${boxImg.src}" alt="">
    </div>
`;

let allProductImg = document.querySelectorAll("#product-img");
allProductImg.forEach((item) => {
    item.addEventListener("click",(eo) => {
        boxImg.src = item.src;
    });
});


// trigger functions from main js file
lista();
searching();


