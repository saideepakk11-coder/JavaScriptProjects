async function loadProducts() {
    try{

        let response = await fetch("https://fakestoreapi.com/products");

        if(!response.ok){
            throw new Error("Failed to fetch products");
        }
        
        let products = await response.json();

        let container = document.getElementById("products");
        container.innerHTML="";

        products.forEach((product) => {
            let card = document.createElement("div");
            card.classList.add("card");

            card.innerHTML=`
                <img src="${product.image}" alt="${product.title}">
                <p class="name">${product.title} </p>
                <p class="price">$${product.price}</p>
                <p class="description">${product.category}</p>
            `;

            container.appendChild(card);
        });
    }catch(error){
        console.log("Error:", error);
    }
}

loadProducts();