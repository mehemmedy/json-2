function elaveET() {
  let title = document.getElementById("title");
  let price = document.getElementById("price");
  let desc = document.getElementById("desc");
  let category = document.getElementById("category");
  let img = document.getElementById("img");

  const titleValue = title.value;
  const priceValue = price.value;
  const descValue = desc.value;
  const categoryValue = category.value;
  const imgValue = img.value;
  const data = {
    title: titleValue,
    price: priceValue,
    description: descValue,
    category: categoryValue,
    image: imgValue,
  };
  fetch("https://69b94968e69653ffe6a73340.mockapi.io/mehemmed/mehemmed", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
  .then(() => {
    title.value = '';
    price.value = '';
    desc.value = '';
    category.value = '';
    img.value = '';
    bagla()
  })
}
function bagla(){
    window.location.href = 'index.htm';
}