"use strict";

// data.json > 데이터 가져오기

// 데이터 가져오는데 성공하면 함수실행

//

function loadData() {
  return fetch("data/data.json")
    .then((response) => response.json())
    .then((json) => json.mobileItems);
}

function displayItems(items) {
  const listCon = document.querySelector("ul.items");
  listCon.innerHTML = items.map((item) => creatHTML(item)).join("");
}

function creatHTML(item) {
  return `
    <li class="item">
            <div class="item-con">
              <span class="item-title">${item.title}</span>
              <img src="${item.img}" alt="${item.type}" />
              <span class="price">${item.price}</span>
            </div>
    </li>
    `;
}

function eventListener(items) {
  const logo = document.querySelector(".logo");
  const buttons = document.querySelector(".btn-con");
  logo.addEventListener("click", () => displayItems(items));
  buttons.addEventListener("click", (event) => onBtnClick(event, items));
}

function onBtnClick(event, items) {
  const dataset = event.target.dataset;
  const key = dataset.key;
  const value = dataset.value;

  if (key == null || value == null) {
    return;
  }

  displayItems(items.filter((item) => item[key] === value));
}

loadData()
  .then((items) => {
    displayItems(items);
    eventListener(items);
  })
  .catch(console.log);
