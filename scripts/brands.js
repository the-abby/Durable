function getBrands(){
    let checkedBrands = [];
    return products.map(product => {
        let brandName;
        if(checkedBrands.includes(product.brandName)){
            return "_"
        }
        brandName = product.brandName;
        checkedBrands.push(product.brandName)
        return brandName.toLowerCase();
    }).filter(v => v != "_")
}

function displayBrands(brandName){
    const brandsContainer = document.getElementById("brands-list");

    console.log(getBrands());


    getBrands().forEach(brand => {
        const container = document.createElement("a");

        container.className = "brand"

        container.href = `brands/${brand}/index.html`

        container.innerHTML= `
        <img src="" alt="" class="brand-image img-responsive">
        <div class="brand-name">
            <img src="assets/images/${brand}.png" alt="" srcset="">
        </div>
        `;

        brandsContainer.appendChild(container);
    });
}