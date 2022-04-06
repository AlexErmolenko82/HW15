"use strict"
// Доработать список альбомов из предыдущего задания.
// Добавить к каждому LI еще и кнопку “Delete”. При нажатии на эту кнопку должно происходить удаление конкретного альбома (LI).
// Применить подход: делегирование событий
// Примечание: будьте внимательны, и не забывайте что вы работает с API запросом - а значит ваш код асинхронный!

const fillAlbumsList = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw response;
    } else {
        let array = await response.json();
        let albums = document.getElementById(`albums`);
        array.forEach(element => {
          let list = document.createElement('li');
          albums.append(list);
          list.className = "album_title";
          list.innerHTML = `${element.title}`;

          let button = document.createElement('button');
          list.append(button);
          button.className = "delete_button";
          button.innerHTML = `X`;
          });
          showCountAlbums(".album_title");
      }
  } catch (responseError) {
    if (responseError.status === 404) {
      console.log("URL not found");
    } else {
      console.error(error);
    }
  }
}

let url = "https://jsonplaceholder.typicode.com/albums";
fillAlbumsList(url);

const container = document.querySelector(".container");
container.addEventListener("click", (event) => {
    const isRemoveButton = event.target.className === "delete_button";
    if (isRemoveButton) {
      const closestAlbum = event.target.closest(".album_title");
      closestAlbum.remove();
      showCountAlbums(".album_title");
      }
});

const showCountAlbums = (className) => {
  let count = document.querySelectorAll(className).length;
  document.querySelector("#title").innerHTML = `ALBUMS (${count}):`;
}