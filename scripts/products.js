function  getProducts(brandName){
    const productsForBrand = products.filter(product => product.brandName === brandName);

    return productsForBrand;
}

function displayProducts(brandName){
    const productContainer = document.getElementById("productsContainer");

    console.log("starting");

    getProducts(brandName).forEach(product => {
        const container = document.createElement("div");

        container.className = "productsItem"

        container.innerHTML= `
        <img src="${product.img}" class="img-responsive" alt="">
        <h5>${product.name}</h5>
        <div class="container">
            <p class="text-danger">Description</p>
            <p>${product.description}</p>
            </div>
            <button class="btn btn-primary dBtn" title="Download Word Doc File"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg></button>
        `;  

        productContainer.appendChild(container);
    });
}

