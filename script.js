//You can edit ALL of the code here
const rootElem = document.getElementById("root");
const allEpisodes = getAllEpisodes();
function setup() {
  // const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);

  let searchBox = document.getElementById("site-search");
  searchBox.addEventListener("keyup", filterEpisodes);

  // keyup event for eventlistern
}

function filterEpisodes(event) {
  // console.log(event.target.value);
  // let searchBox = document.getElementById("site-search");
  // searchBox.value === event.target.value
  const allEpisodes = getAllEpisodes();

  let filteredEpisodes = allEpisodes.filter((ele) => {
    if (ele.name.toLowerCase().includes(event.target.value.toLowerCase())) {
      // console.log(true);
      return true;
    } else {
      return false;
    }
  });
  // console.log(filteredEpisodes);
  // search bar

  const searchContainerElm = document.getElementById("search-container");
  const searchPara = document.createElement("p");
  searchPara.textContent = `Displaying ${filteredEpisodes.length} / ${allEpisodes.length} episodes`;
  searchContainerElm.appendChild(searchPara);

  makePageForEpisodes(filteredEpisodes);
}

function makePageForEpisodes(episodeList) {
  // const rootElem = document.getElementById("root");
  // rootElem.textContent = `Got ${episodeList.length} episode(s)`;
  // console.log(episodeList.length);
  rootElem.innerHTML = "";
  episodeList.forEach(createCard);
}

function createCard(episode, index, array) {
  // console.log(episode.name);
  // console.log(episode.season);
  // console.log(episode.number);
  // console.log(episode.image.medium);
  // console.log(episode.summary);

  // Main div which hold the content of the episode
  let card = document.createElement("div");

  // Image part
  let imgDiv = document.createElement("div");
  let imgElem = document.createElement("img");
  imgElem.src = episode.image.original;
  imgElem.alt = episode.name + "image";
  imgElem.title = episode.name;

  imgDiv.style.backgroundImage = "url(" + episode.image.original + ")";
  card.appendChild(imgDiv);
  // imgDiv.appendChild(imgElem);

  //  text part
  let textContentDiv = document.createElement("div");
  let titleCard = document.createElement("h4");
  let spanElmEpisodeCode = document.createElement("span");
  let spanElmSummary = document.createElement("span");

  titleCard.textContent = episode.name;
  spanElmEpisodeCode.textContent = ` - S0${episode.season}E0${episode.number}`;
  spanElmSummary.innerHTML = episode.summary;

  titleCard.appendChild(spanElmEpisodeCode);
  textContentDiv.appendChild(titleCard);
  textContentDiv.appendChild(spanElmSummary);

  // adding classes
  card.classList.add("card");
  textContentDiv.className = "text-container";
  imgDiv.className = "img-container";

  rootElem.appendChild(card).appendChild(textContentDiv);
}

window.onload = setup;
