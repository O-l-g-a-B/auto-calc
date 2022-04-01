const marka = Array.from(document.querySelectorAll(".marka"));
const option = Array.from(document.querySelectorAll(".option"));
const fuel = Array.from(document.querySelectorAll(".fuel"));
const time = document.querySelector("#time");
const volume = document.querySelector("#volume");
const total = document.querySelector("#total");

const orderMarka = document.querySelector("#order_marka");
const orderTime = document.querySelector("#order_time");
const orderOption = document.querySelector("#order_option");
const orderFuel = document.querySelector("#order_fuel");

marka.forEach((el) => {
  el.addEventListener("click", markaUpdate);
});

time.addEventListener("input", timeUpdate);

option.forEach((el) => {
  el.addEventListener("change", optionUpdate);
});

fuel.forEach((el) => {
    el.addEventListener("click", fuelUpdate);
  });

function markaUpdate(e) {
  currentSet.marka = e.target.id;
  updatePrice();
  orderUpdate();
}

function timeUpdate(e) {
  currentSet.time = time.value;
  volume.value = currentSet.time;
  updatePrice();
  orderUpdate();
}

function optionUpdate(e) {
  e.stopPropagation();
  if (e.target.checked) {
    currentSet.option.push(e.target.id);
  } else {
    let index = currentSet.option.indexOf(e.target.id);
    currentSet.option.splice(index, 1);
  }
  updatePrice();
  orderUpdate();
}

function fuelUpdate(e) {
    currentSet.fuel = e.target.value;
    updatePrice();
    orderUpdate();
}

function updatePrice() {
  let markaPrice = currentSet.getMarkaPrice();
  let optionPrice = currentSet.getOptionPrice();
  let fuelPrice = currentSet.getFuelPrice();
  let totalPrice = +currentSet.time + +markaPrice + +optionPrice + +fuelPrice;
  total.value = totalPrice;
}

function orderUpdate() {
  orderTime.value = currentSet.time + " год";
  
  orderMarka.value = currentSet.getMarkaPrice() + " \u{20BD}";
  orderOption.value = currentSet.getOptionPrice() + " \u{20BD}";
  orderFuel.value = currentSet.getFuelPrice();
}

const priceInfo = {
    marka: {
        bmw: 5000000,
        mercedes: 4800000,
        volkswagen: 4000000,
        toyota: 4140000,
  },
  option: {
    option1: 10000,
    option2: 15000,
    option3: 15000,
    option4: 20000,
  },
  fuel: {
    petrol: 500000,
    diesel: 700000,
  }
};

let currentSet = {
    marka: "mercedes",
  time: 2000,
  option: [],
  fuel: "petrol",
  getMarkaPrice() {
    return priceInfo.marka[this.marka];
  },
  getOptionPrice() {
    let optionPrice = 0;
    if (!this.option.length == 0) {
      this.option.forEach((el) => {
        optionPrice += priceInfo.option[el];
      });
    }
    return optionPrice;
  },
  getFuelPrice() {
    return priceInfo.fuel[this.fuel];
    
  },
  
};

