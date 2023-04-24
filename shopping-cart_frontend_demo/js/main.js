
window.onload = getProducts;
//window.onload = postProduct;
//window.onload = editProduct;

// window.onload = updateProduct;


async function getProducts() {
    const response = await fetch("http://localhost:3000/products");
    const jsonData = await response.json();

    for (let e of jsonData) {
        addNewProductRowToTable(e.id, e.title, e.description, e.price);
    }

}



function addNewProductRowToTable(id, title, description, price) {

    const row = document.createElement('tr');
    let cell = document.createElement('td');
    cell.appendChild(document.createTextNode(id));
    row.appendChild(cell);

    cell = document.createElement('td');
    cell.appendChild(document.createTextNode(title));
    row.appendChild(cell);

    cell = document.createElement('td');
    cell.appendChild(document.createTextNode(description));
    row.appendChild(cell);

    cell = document.createElement('td');
    cell.appendChild(document.createTextNode(price));
    row.appendChild(cell);

    document.getElementById('tbodyProductList').appendChild(row);

}


async function postProduct(title, description, price) {
    let b = { "title": title, "description": description, "price": price }
    let setting = {
        method: 'POST',
        body: JSON.stringify(b),
        headers: { 'Content-Type': 'application/json' }
    };
    const response = await fetch("http://localhost:3000/products", setting);
    const jsonData = await response.json();
    return jsonData;
}

document.addEventListener("DOMContentLoaded", () => {
document.getElementById('btnRegister').addEventListener('click', (event) => {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;
    data = postProduct(title, description, price)

    document.getElementById('title').innerHTML = data;
    document.getElementById('myform').reset();

});
});

async function editProduct(id,title, description, price) {
    let b = { "id":id, "title": title, "description": description, "price": price }
    let setting = {
        method: 'PUT',
        body: JSON.stringify(b),
        headers: { 'Content-Type': 'application/json' }
    };
    const response = await fetch(`http://localhost:3000/products/${id}`, setting);
    const jsonData = await response.json();
    return jsonData;
}

document.addEventListener("DOMContentLoaded", () => {
document.getElementById('btnEdit').addEventListener('click', async (event) => {
    const id = document.getElementById('id').value;
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;
    data = await editProduct(id, title, description, price)
    // console.log(data)
    document.getElementById('id').innerHTML = data;
    document.getElementById('myform').reset();
  
});
});


async function deleteProduct(id) {
    const setting = {
        method: 'DELETE'
    };
    const response = await fetch(`http://localhost:3000/products/${id}`, setting);
    const jsonData = await response.json();
    return jsonData;
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('btnDelete').addEventListener('click', async (event) => {
        const id = document.getElementById('id').value;
        await deleteProduct(id);
        document.getElementById('id').value = '';
        document.getElementById('myform').reset();
    });
});