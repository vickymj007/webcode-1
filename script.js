
const apiUrl = "https://makeup-api.herokuapp.com/api/v1/products.json"

const title = document.createElement("h1")
title.className="title"
title.innerText = "MAKEUP PRODUCTS"

const searchBox = document.createElement("div")
searchBox.className ="search-box"
searchBox.innerHTML =`
    <input for="search-btn" class = "input-box" type="text" placeholder="Tell us what you are looking for?">
    <button class ="search-btn">Search</button>
    <button class ="clear-btn">Clear Filter</button>`
document.body.append(title)
document.body.append(searchBox)


//Function to Fetch Data from API
const fetchData = async function(url){
    try {
        const data = await fetch(url);
        const response = await data.json()
        createObjLoop(response)
    } catch (err){
        console.log(err.message);
    }
}
fetchData(apiUrl)


//Function to Create Product Card using ForEach Loop
function createObjLoop (arr){
    arr.forEach((product, index) => {
            createCard(product)
    });
}

const container = document.createElement("div")
container.className="container"
document.body.append(container)

//Function to Create HTML Div Element for Product Card
function createCard (productObj){
    const productCard = document.createElement("div")
    productCard.className = "product-card"
    productCard.innerHTML = `
    <div class="image-box">
    <img src="${productObj.api_featured_image}">
    </div>
    <h3 data-product="${productObj.name}">${productObj.name}</h3>
    <h2 data-brand="${productObj.brand}">Brand: ${productObj.brand}</h2>
    <p class="price-tag">Price: ${productObj.price_sign}${productObj.price}</p> 
    <a href="${productObj.product_link}" target="blank" class="product-link">Product Link</a>
    <button class="d-btn">Product Description</button>
    <div class="description-box">
    <p class="description" id="${productObj.id}">${productObj.description}</p>
    <button class="des-box-close-btn">Close</button>
    </div>`
    container.append(productCard)
}

const list = document.querySelector(".container")
const btn = document.querySelector(".d-btn")
const searchBtn = document.querySelector(".search-btn")
const clearBtn = document.querySelector(".clear-btn")
const input = document.querySelector(".input-box")
const dataSet = document.querySelector("[data-brand]")
const pName = document.querySelector(".product-card")
const cardElement = list.childNodes


//Function to Search Product
input.addEventListener("input", (event)=>{
    let searchValue = event.target.value.trim()
    cardElement.forEach(val=>{
        let productName = val.childNodes[3].dataset.product
        let brandName = val.childNodes[5].dataset.brand
        if(productName.toLowerCase().includes(searchValue.toLowerCase())|| brandName.toLowerCase().includes(searchValue.toLowerCase())){
            val.style.display ="flex"
        } else {
            val.style.display ="none"
        }
    })
})

//Function to Search Products using Search Button
searchBtn.addEventListener("click",(event)=>{
    event.preventDefault()
    let value = input.value.toLowerCase()
    if(value !==""){
        cardElement.forEach(val=>{
            let productName = val.childNodes[3].dataset.product
            let brandName = val.childNodes[5].dataset.brand
            if(productName.toLowerCase().includes(value.toLowerCase())|| brandName.toLowerCase().includes(value.toLowerCase())){
                val.style.backgroundColor="#32CBFF"
                val.style.borderColor="#32CBFF"
                clearBtn.style.display ="block"
            } else {
                val.style.backgroundColor="#fff"
            }
         })
    } else {
        alert("Please Enter a Value")
    }
})

//Function to Clear Search Filter
clearBtn.addEventListener("click", ()=>{
    cardElement.forEach(val=>{
        clearBtn.style.display ="none"
        val.style.display="flex"
        val.style.backgroundColor="#fff"
        val.style.borderColor="#fff"
        input.value = ""
     })
})

//Function to Display Description
list.addEventListener("click", (event)=>{
    if(event.target.className === "d-btn"){
        let parent = event.target.parentNode.lastChild
        parent.style.display = "block"
    }
})
list.addEventListener("click", (event)=>{
    if(event.target.className === "des-box-close-btn"){
        let parent = event.target.parentNode
        parent.style.display = "none"
    }
})



