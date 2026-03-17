let cardcontainer = document.getElementById("cardcontainer");
let sebetic = document.getElementById("sebetic");
let sebetcount1 = document.getElementById("sebetcount1");
let sebet = [];
let mehsullar=[]
const sebeticmehsullar = document.getElementById("sebeticmehsullar");
const total = document.getElementById("total");
function mehsullarTezele(){
  cardcontainer.innerHTML =''
  fetch("https://69b94968e69653ffe6a73340.mockapi.io/mehemmed/mehemmed")
  .then((res) => res.json())
  .then((data) => {
    mehsullar = data;
    data.forEach((item) => {
      cardcontainer.innerHTML += `
<div id="${item.id}"
    class="bg-white border border-gray-200 shadow-md w-full max-w-sm rounded-lg overflow-hidden mx-auto mt-4">
    <div class="aspect-[3/2]">
        <img src="${item.image}" class="w-full h-full object-cover" alt="Card image" />
    </div>
    <div class="p-6">
        <h3 class="text-slate-900 text-xl font-semibold">${item.title}</h3>
        <p class="mt-3 text-sm text-slate-500">Kateqoriya: ${item.category}</p>
        <p class="mt-3 text-sm font-bold text-slate-700">$${item.price}</p>
        <p class="mt-3 text-sm text-slate-500">${item.description.slice(0, 70)}...</p>
        <button onclick="addbasket(${item.id})" type="button"
            class="mt-6 px-6 py-2.5 rounded-lg text-white text-sm font-medium
                    bg-blue-600 hover:bg-blue-700 cursor-pointer">
            <i class="fa-solid fa-cart-shopping"></i>
        </button>
    </div>
</div>
`;
    });
  });
}
mehsullarTezele()
function sebetRender() {
  sebetic.classList.toggle("hidden");
}

function sebetTezele() {
  if (sebet.length === 0) {
    sebeticmehsullar.innerHTML = '';
    sebetRender()
  }
  else{
    sebeticmehsullar.innerHTML = sebet
    .map(
      (item) => `
<div class="grid sm:grid-cols-3 items-start gap-4 border-b py-4 px-4">
    <div class="sm:col-span-2 flex items-start gap-4">
        <div class="w-28 h-28 shrink-0 bg-gray-100 p-2 rounded-md">
            <img src="${item.image}" class="w-full h-full object-contain" />
        </div>
        <div class="flex flex-col">
            <h3 class="text-[15px] font-semibold text-slate-900">${item.title}</h3>
            <p class="text-xs text-slate-500 mt-2">$${item.price}</p>
            <button onclick="removeBasket(${item.id})" type="button"
                class="mt-4 font-medium text-red-600 text-xs cursor-pointer flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"/>
                    <path d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"/>
                </svg>
                Sil
            </button>
        </div>
    </div>
    <div class="sm:ml-auto flex items-center gap-3 sm:mt-6">
        <button onclick="deyisCount(${item.id},-1)"
            class="px-2 py-1 border border-gray-300 rounded text-sm">−</button>
        <span class="text-sm font-medium">${item.count}</span>
        <button onclick="deyisCount(${item.id},1)"
            class="px-2 py-1 border border-gray-300 rounded text-sm">+</button>
    </div>
</div>
    `,
    )
    .join("");
  }
  sebetcount();
  price()
}

function addbasket(id) {
  const prdct = mehsullar.find((p) => p.id == id);
      const x = sebet.find((p) => p.id == prdct.id);
      if (x) {
        x.count++;
      } else {
        prdct.count = 1;
        sebet.push(prdct);
      }
      sebetTezele();
}

function deyisCount(id, delta) {
  const item = sebet.find((p) => p.id == id);
  if (!item) return;
  item.count += delta;
  if (item.count <= 0) {
    removeBasket(id);
  }
  else{sebetTezele()};
}

function removeBasket(id) {
  sebet = sebet.filter((p) => p.id !== id);
  sebetTezele();
}

function sebetcount() {
  sebetcount1.innerHTML = sebet.length;
}
function price(){
    let totalPay=0
    sebet.map(item=>totalPay+=item.price*item.count)
    total.innerHTML=totalPay.toFixed(2)+'$'
}

function getAdd(){
  window.location.href='Add.htm'
}