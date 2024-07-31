/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import "./style.css";
import image1 from "./images/1.svg";
import image2 from "./images/2.svg";
import image3 from "./images/3.svg";
import initCarousel from "./carousel";

function addCarousel() {
  const div = document.createElement("div");
  div.classList.add("carousel");
  div.innerHTML = `
    <button class="arrow previous">&lt;</button>
    <div id="carousel" class="carousel-container">
      <ul class="carousel-list">
        <li class="carousel-item">
          <img src="./images/1.svg" alt="First slide" />
        </li>
        <li class="carousel-item">
          <img src="./images/2.svg" alt="Third slide" />
        </li>
        <li class="carousel-item">
          <img src="./images/3.svg" alt="Second slide" />
        </li>
      </ul>
    </div>
    <button class="arrow next">&gt;</button>
    <div class="context-menu-open">
      <ul>
        <li class="add-image">Добавить изображение</li>
        <li class="remove-image">Удалить изображение</li>
      </ul>
    </div>`;
  document
    .querySelector(".add-carousel")
    .insertAdjacentElement("beforebegin", div);
  initCarousel(div);
}

document.querySelectorAll(".carousel").forEach((el) => initCarousel(el));
document.querySelector(".add-carousel").addEventListener("click", addCarousel);
