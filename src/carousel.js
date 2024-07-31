/* eslint-disable no-param-reassign */
export default function initCarousel(carousel) {
  const contextMenuOpen = carousel.querySelector(".context-menu-open");
  const imgSize = parseInt(
    getComputedStyle(carousel).getPropertyValue("width"),
    10,
  );
  const list = carousel.querySelector("ul");
  let listLength = list.children.length - 1;

  let position = 0;

  function updateMargin() {
    list.style.marginLeft = `${-position * imgSize}px`;
  }

  carousel.querySelector(".previous").addEventListener("click", () => {
    position = position <= 0 ? listLength : position - 1;
    updateMargin();
  });

  carousel.querySelector(".next").addEventListener("click", () => {
    position = position >= listLength ? 0 : position + 1;
    updateMargin();
  });

  if (carousel.classList.contains("context-menu-change")) {
    carousel.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      contextMenuOpen.style.left = `${e.clientX}px`;
      contextMenuOpen.style.top = `${e.clientY}px`;
      contextMenuOpen.style.display = "block";
    });

    contextMenuOpen
      .querySelector(".add-image")
      .addEventListener("click", () => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";

        input.onchange = (e) => {
          const file = e.target.files[0];
          const reader = new FileReader();
          reader.readAsDataURL(file);

          reader.onload = (readerEvent) => {
            const li = document.createElement("li");
            li.classList.add("carousel-item");
            li.innerHTML = `<img src="${readerEvent.target.result}" alt="${file.name}">`;

            list
              .querySelectorAll("li")
              [position].insertAdjacentElement("afterend", li);
            position += 1;
            listLength = list.children.length - 1;
            updateMargin();
          };
        };

        input.click();
      });

    contextMenuOpen
      .querySelector(".remove-image")
      .addEventListener("click", () => {
        if (listLength < 0) {
          // eslint-disable-next-line no-alert
          alert("Нет элементов, которые можно было бы удалить");
        } else {
          list.removeChild(list.children[position]);
          listLength = list.children.length - 1;
          position = Math.min(position, listLength);
          updateMargin();
        }
      });

    window.addEventListener("click", () => {
      contextMenuOpen.style.display = "none";
    });
  }
}
