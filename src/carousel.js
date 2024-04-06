/* eslint-disable no-param-reassign */
export default function initCarousel(carousel) {
  const contextMenuOpen = carousel.querySelector(".context-menu-open");
  const imgSize = parseInt(
    getComputedStyle(carousel).getPropertyValue("width"),
    10,
  );
  const list = carousel.querySelector("ul");

  let position = 0;

  carousel.querySelector(".previous").onclick = () => {
    if (position <= 0) {
      position = -imgSize * (list.querySelectorAll("li").length - 1);
    } else {
      position -= 1;
    }
    list.style.marginLeft = `${-position * imgSize}px`;
  };

  carousel.querySelector(".next").onclick = () => {
    if (position >= list.querySelectorAll("li").length - 1) {
      position = 0;
    } else {
      position += 1;
    }
    list.style.marginLeft = `${-position * imgSize}px`;
  };

  carousel.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    contextMenuOpen.style.left = `${e.clientX}px`;
    contextMenuOpen.style.top = `${e.clientY}px`;
    contextMenuOpen.style.display = "block";
  });

  contextMenuOpen.querySelector(".add-image").addEventListener("click", () => {
    const input = document.querySelector(".inputFile");

    input.onchange = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = (readerEvent) => {
        const li = document.createElement("li");
        li.classList.add("carousel-item");
        const img = document.createElement("img");
        img.src = readerEvent.target.result;
        li.appendChild(img);

        list
          .querySelectorAll("li")
          [position].insertAdjacentElement("afterend", li);
        position += 1;
        list.style.marginLeft = `${-position * imgSize}px`;
      };
    };

    input.click();
  });

  contextMenuOpen
    .querySelector(".remove-image")
    .addEventListener("click", () => {
      if (list.querySelectorAll("li").length === 0) {
        // eslint-disable-next-line no-alert
        alert("Нет элементов, которые можно было бы удалить");
      } else {
        list.removeChild(list.querySelectorAll("li")[position]);
        if (position > list.querySelectorAll("li").length - 1) {
          position = 0;
          list.style.marginLeft = `${-position * imgSize}px`;
        }
      }
    });

  window.addEventListener("click", () => {
    contextMenuOpen.style.display = "none";
  });
}
