const products = [
        {
          id: 1,
          name: "Hertfoid Upholstered Chair",
          price: 101,
          image: "/1.png",
          slug: "hertfoid-upholstered-chair",
        },
        {
          id: 2,
          name: "Abingdon Upholstered Chair Swivel",
          price: 151,
          image: "/2.png",
          slug: "abingdon-upholstered-chair-swivel",
        },
        {
          id: 3,
          name: "Jeses Minimore Modern Style Etta",
          price: 181,
          image: "/3.png",
          slug: "jeses-minimore-modern-style-etta",
        },
        {
          id: 4,
          name: "JJeses Minimore Modern Style",
          price: 201,
          image: "/4.png",
          slug: "jjeses-minimore-modern-style",
        },
        {
          id: 5,
          name: "Bolanle Upholstered Armchair",
          price: 251,
          image: "/5.png",
          slug: "bolanle-upholstered-armchair",
        },
        {
          id: 6,
          name: "Jaqueze Upholstered Armchair",
          price: 111,
          image: "./6.png",
          slug: "jaqueze-upholstered-armchair",
        },
        {
          id: 7,
          name: "Leston Wide Upholstered Fabric",
          price: 121,
          image: "/7.png",
          slug: "leston-wide-upholstered-fabric",
        },
        {
          id: 8,
          name: 'Stephanny 27.5" Wide Tufted',
          price: 220,
          image: "/8.png",
          slug: "stephanny-275-wide-tufted-armchair",
        },
      ];

    let cart = [];
    const searchBox = document.getElementById("search");

    searchBox.addEventListener("input", function() {
      searchProducts();
    });

    function searchProducts(){
      let query = searchBox.value.toLowerCase();

      let filtered = products.filter(product => {
        return  product.name.toLowerCase().includes(query);
      });

      displayProducts(filtered);
    }

    function displayProducts(filtered = products){
      let productsDiv = document.getElementById("products");
      productsDiv.innerHTML="";

      filtered.forEach((product) => {
        let productContainer = document.createElement("div");
        productContainer.classList.add("product");
        productContainer.innerHTML=`
          <img src="${product.image}" alt="">
            <p class="name">${product.name}</p>
            <p class="cost">${product.price}</p>
            <button class="add-btn">Add to Cart</button>
            `;

            const addBtn = productContainer.querySelector(".add-btn");

            addBtn.addEventListener("click", () => {
              addToCart(product.id);
              updateCart();
              
            });

            productsDiv.append(productContainer);
      });
    }

    function addToCart(id){
      let selectedProduct = products.find((product) => product.id === id);
      let existingItem = cart.find((item) => item.id === id);

      if(existingItem){
        existingItem.quantity++;
      }else{
        cart.push({...selectedProduct, quantity:1});
      }

      toast();
    }

    function updateCart(){
      let cartDiv = document.querySelector(".cart-c");
      cartDiv.innerHTML="";

      let totalAmount = 0;

      if(cart.length === 0){
        cartDiv.innerHTML="<p style='margin-top:10px'>Your Cart is Empty...</p>";
        document.querySelector(".total").textContent="Total: $0";
        localStorage.removeItem("cart");
        return;
      }

      cart.forEach((item,index) => {
        let cartItem = document.createElement("div");
        cartItem.classList.add("cart-p");

        totalAmount += item.price * item.quantity;

        cartItem.innerHTML=`
          <img src="${item.image}" alt="${item.name}">
          <p>${item.name} - ${item.price}</p>
          <input type="number" min="1" value= ${item.quantity}>
          <button class="remove-btn">Remove</button>  
        `;

        let removeBtn = cartItem.querySelector(".remove-btn");

        removeBtn.addEventListener("click", function() {
          let index = cart.findIndex((cartItem) => cartItem.id === item.id);

          if(index !==-1){
            cart.splice(index, 1);
          }
          updateCart();

        });

        const quantityInput = cartItem.querySelector("input");

        quantityInput.addEventListener("change", function() {
          const quantity = Number(quantityInput.value);

          if(!Number.isInteger(quantity) || quantity < 1){
            item.quantity =1;
          }else {
            item.quantity = quantity;
          }
          updateCart();
        });
        cartDiv.append(cartItem);
      })

      document.querySelector(".total").textContent=`Total: $${totalAmount}`;

      localStorage.setItem("cart", JSON.stringify(cart));

     
    }

    function loadCart(){
      const storedCart = localStorage.getItem("cart");
      if(storedCart){
        cart = JSON.parse(storedCart);
      }
      displayProducts();
      updateCart();
    }

    loadCart();

    const cartToggleBtn = document.getElementById("cart-toggle-btn");

    cartToggleBtn.addEventListener("click", function() {
      const cart = document.querySelector(".cart");
      cart.classList.toggle("open");
    });

    function toast(){
      const toast = document.getElementById("added-toggle");
      toast.classList.add("show");

      setTimeout(() => {
        toast.classList.remove("show");
      },2000);
    }

  