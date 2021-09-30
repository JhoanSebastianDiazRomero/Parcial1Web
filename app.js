var cart = new Map();
var order = [];

function initialize() {
  fetch(
    "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json"
  )
    .then((response) => {
      return response.json();
    })
    .then((obj) => {
      localStorage.setItem("restaurant", JSON.stringify(obj));
      this.displayProducts(0);
    })
    .catch((error) => console.error(error));
}

function displayProducts(categoryId) {
  var data = JSON.parse(localStorage.getItem("restaurant"));
  var categoryProducts = data[categoryId].products;

  categoryProducts.forEach((element) => {
    var card = document.createElement("div");
    card.class = "card col";
    card.style = "width: 18rem;";

    card.innerHTML = `
            <img class="card-img-top product-image border-dark" src="${element.image}" alt="Card image cap">
            <div class="card-body">
              <h5 class="card-title">${element.name}</h5>
              <p class="card-text">${element.description}</p>
              <p class="card-text" style="font-weight: bold;">$${element.price}</p>
              <a href="#" class="btn btn-dark" onclick="addToCart('${element.name}', '${element.price}')">Add to cart</a>
            </div>
            `;
    document.getElementById("products-container").appendChild(card);
  });
}

function changeCategory(id) {
  document.getElementById("category-label").innerHTML =
    document.getElementById(id).innerHTML;
  document.getElementById("products-container").innerHTML = "";
  document.getElementById("products-list").innerHTML = "";
  document.getElementById("products-container").style.display = "flex";
  document.getElementById("products-table").style.display = "none";
  if (document.getElementById("table-footer") !== null) {
    document.getElementById("table-footer").remove();
  }
  this.displayProducts(id);
}

function showCart() {
  document.getElementById("category-label").innerHTML = "Order detail";
  document.getElementById("products-container").style.display = "none";
  document.getElementById("products-table").style.display = "table";
  var index = 1;
  const list = document.getElementById("products-list");
  var orderTotal = 0;
  order = [];
  cart.forEach((value, key) => {
    const row = document.createElement("tr");

    row.innerHTML = `
    <td style="font-weight: bold;">${index}</td>
    <td>${value.qty}</td>
    <td>${key}</td>
    <td>${value.price}</td>
    <td>${(value.qty * value.price).toFixed(2)}</td>
    <div class="btn-group" role="group">
      <button type="button" class="btn btn-secondary" onclick="addProduct('${key}','${
      value.price
    }')">+</button>
      <button type="button" class="btn btn-secondary" onclick="removeProduct('${key}','${
      value.price
    }')">-</button>
    </div>
    `;
    orderTotal += value.qty * value.price;
    order.push({
      item: index,
      quantity: value.qty,
      description: key,
      unitPrince: value.price,
    });
    index++;
    list.appendChild(row);
  });

  const mainInfo = document.getElementById("main-info");
  const footer = document.createElement("div");
  footer.id = "table-footer";
  footer.className = "row";
  footer.style.width = "100%";

  footer.innerHTML = `
  <div class="col-8">
    <p style="font-weight: bold;">Total: $<span id="total-price">${orderTotal.toFixed(
      2
    )}</span></p>
  </div>
  <div class="col-4">
    <button type="button" class="btn btn-danger btn-outline-dark" style="margin: 5px;" data-bs-toggle="modal" data-bs-target="#exampleModal">Cancel</button>
    <button type="button" class="btn btn-light btn-outline-dark" style="margin: 5px;" onclick="printOrder()">Confirm order</button>
  </div>
  `;
  mainInfo.appendChild(footer);
}

function showDialog() {
  document.getElementById("exampleModal").modal("show");
}

function redrawCart() {
  document.getElementById("products-list").innerHTML = "";
  document.getElementById("products-table").style.display = "none";
  if (document.getElementById("table-footer") !== null) {
    document.getElementById("table-footer").remove();
  }
  this.showCart();
}

function addToCart(name, price) {
  cart.has(name)
    ? cart.set(name, { qty: cart.get(name).qty + 1, price: price })
    : cart.set(name, { qty: 1, price: price });
  var value = parseInt(document.getElementById("number").innerHTML, 10);
  value++;
  document.getElementById("number").innerHTML = value;
}

function addProduct(name, price) {
  cart.set(name, { qty: cart.get(name).qty + 1, price: price });
  this.redrawCart();
}

function printOrder() {
  console.log(order);
}

function removeProduct(name, price) {
  if (cart.get(name).qty > 1) {
    cart.set(name, { qty: cart.get(name).qty - 1, price: price });
  } else {
    cart.delete(name);
  }
  this.redrawCart();
}

function resetCounter() {
  document.getElementById("number").innerHTML = 0;
}

function cancelOrder() {
  cart.clear();
  this.redrawCart();
  this.resetCounter();
}
