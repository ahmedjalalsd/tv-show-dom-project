//You can edit ALL of the code here
const rootElem = document.getElementById("root");
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);

  let searchBox = document.getElementById("site-search");
  searchBox.addEventListener("keyup", filterEpisodes);

  // keyup event for eventlistern
}

function filterEpisodes(event) {
  // console.log(event.target.value);
  const allEpisodes = getAllEpisodes();

  let filteredEpisodes = allEpisodes.filter((ele) => {
    if (ele.name.toLowerCase().includes(event.target.value.toLowerCase())) {
      console.log(true);
      return true;
    } else {
      return false;
    }
  });
  // console.log(filteredEpisodes);

  makePageForEpisodes(filteredEpisodes);
}

function makePageForEpisodes(episodeList) {
  // const rootElem = document.getElementById("root");
  // rootElem.textContent = `Got ${episodeList.length} episode(s)`;
  rootElem.innerHTML = "";
  episodeList.forEach(createCard);
}

function createCard(episode) {
  // console.log(episode.name);
  // console.log(episode.season);
  // console.log(episode.number);
  // console.log(episode.image.medium);
  // console.log(episode.summary);

  let card = document.createElement("div");
  card.classList.add("card");

  // Image part
  let imgCard = document.createElement("img");
  imgCard.src = episode.image.medium;
  imgCard.alt = episode.name + "image";
  imgCard.title = episode.name;
  card.appendChild(imgCard);

  //  text part
  let cardContentContainer = document.createElement("div");
  let titleCard = document.createElement("h4");
  let spanElm = document.createElement("span");
  // let paraElem = document.createElement("p");

  // adding classes to the div
  cardContentContainer.className = "container";

  titleCard.textContent = episode.name;
  spanElm.textContent = ` - S0${episode.season}E0${episode.number}`;
  titleCard.appendChild(spanElm);

  spanElm.innerHTML = episode.summary;
  cardContentContainer.appendChild(titleCard);
  cardContentContainer.appendChild(spanElm);

  rootElem.appendChild(card).appendChild(cardContentContainer);
}

window.onload = setup;
