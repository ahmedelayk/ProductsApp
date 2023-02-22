
var productNameInp = document.getElementById("productName");
var productPriceInp = document.getElementById("productPrice");
var productCategoryInp = document.getElementById("productCategory");
var productDescInp = document.getElementById("productDesc");
// declare an empty array to save products in
var productsContainer = [];
// get data from local storage
if (localStorage.getItem("productsList") != null) {
  productsContainer = JSON.parse(localStorage.getItem("productsList"));
  displayProducts();
}
function addProduct() {
  var product = {
    name: productNameInp.value,
    price: productPriceInp.value,
    category: productCategoryInp.value,
    description: productDescInp.value
  }
  productsContainer.push(product);
  localStorage.setItem("productsList", JSON.stringify(productsContainer));
  displayProducts();
  clearForm();
}
function clearForm() {
  productNameInp.value = "";
  productPriceInp.value = "";
  productCategoryInp.value = "";
  productDescInp.value = "";
}
function displayProducts() {
  var containerForProducts = "";
  for (let i = 0; i < productsContainer.length; i++) {
    containerForProducts += `<tr>
                    <td>`+ productsContainer[i].name + `</td>
                    <td>`+ productsContainer[i].price + `</td>
                    <td>`+ productsContainer[i].category + `</td>
                    <td>`+ productsContainer[i].description + `</td>
                    <td> <button class="btn btn-warning" onclick="updateProduct(`+ i + `)">Update</button> </td>
                    <td> <button class="btn btn-danger" onclick="deleteProduct(`+ i + `)">Delete</button> </td>
                </tr>`;
  }
  document.getElementById("tableBody").innerHTML = containerForProducts;
}
function searchFunc(term) {
  var containerForProducts = "";
  var searchWordsContainer = "";
  var newTxt = "";
  for (let i = 0; i < productsContainer.length; i++) {
    if (productsContainer[i].name.includes(term.trim()) == true) {
      containerForProducts += `<tr>
                      <td>`+ productsContainer[i].name + `</td>
                      <td>`+ productsContainer[i].price + `</td>
                      <td>`+ productsContainer[i].category + `</td>
                      <td>`+ productsContainer[i].description + `</td>
                      <td> <button class="btn btn-warning" onclick="updateProduct(`+ i + `)">Update</button> </td>
                      <td> <button class="btn btn-danger" onclick="deleteProduct(`+ i + `)">Delete</button> </td>
                  </tr>`;
      newTxt = productsContainer[i].name.replace(term, "<span class = 'bg-danger'>" + term + "</span>")
      searchWordsContainer += `<p>` + newTxt + `</p>`;
    }
    document.getElementById("tableBody").innerHTML = containerForProducts;
    document.getElementById("searchResult").innerHTML = searchWordsContainer;
  }
}
function clearSearch() {
  document.getElementById("searchResult").innerHTML = "";
}
function deleteProduct(index) {
  productsContainer.splice(index, 1);
  localStorage.setItem("productsList", JSON.stringify(productsContainer));
  displayProducts();
}
function updateProduct(index) {
  document.getElementById("editBtnspan").innerHTML = `<button onclick="editProduct(` + index + `)" class="btn btn-outline-info fw-bolder">Edit
  Product</button>`;
  productNameInp.value = productsContainer[index].name;
  productPriceInp.value = productsContainer[index].price;
  productCategoryInp.value = productsContainer[index].category;
  productDescInp.value = productsContainer[index].description;
}
function editProduct(index) {
  productsContainer[index].name = productNameInp.value;
  productsContainer[index].price = productPriceInp.value;
  productsContainer[index].category = productCategoryInp.value;
  productsContainer[index].description = productDescInp.value;
  localStorage.setItem("productsList", JSON.stringify(productsContainer));
  displayProducts();
  clearForm();
  document.getElementById("editBtnspan").innerHTML = ``;
}
