//Category
class Category {
    constructor(name, products) {
        this.name = name;
        this.products = products
    }
}

//Dish
class Product {
    constructor(name, description, price, image) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.image = image;
    }
}

function incrementValue()
{
    var value = parseInt(document.getElementById('number').innerHTML, 10);
    value++;
    document.getElementById('number').innerHTML = value;
}

function changeCategory(id)
{
    document.getElementById('category-label').innerHTML = document.getElementById(id).innerHTML
}






