//You can edit ALL of the code here

const rootElem = document.getElementById("root");
const allEpisodes = getAllEpisodes();

function setup() {
  // const allEpisodes = getAllEpisodes();

  makePageForEpisodes(allEpisodes);
  displaySearchResultCount(allEpisodes, allEpisodes);
  CreateSelectOptions();

  // keyup event on of JS event listeners
  let searchBox = document.getElementById("site-search");
  searchBox.addEventListener("keyup", filterEpisodes);
}

function filterEpisodes(event) {
  // console.log(event.target.value);
  // let searchBox = document.getElementById("site-search");
  // searchBox.value === event.target.value

  let filteredEpisodes = allEpisodes.filter((ele) => {
    if (ele.name.toLowerCase().includes(event.target.value.toLowerCase())) {
      return true;
    } else {
      return false;
    }
  });
  // console.log(filteredEpisodes);
  displaySearchResultCount(filteredEpisodes, allEpisodes);

  makePageForEpisodes(filteredEpisodes);
}

function makePageForEpisodes(episodeList) {
  // const rootElem = document.getElementById("root");
  // rootElem.textContent = `Got ${episodeList.length} episode(s)`;
  // console.log(episodeList.length);
  rootElem.innerHTML = "";
  episodeList.forEach(createCard);
}

function displaySearchResultCount(filteredEpisodes, allEpisodes) {
  // create a search result counter
  const searchContainerElm = document.getElementById("search-container");
  const searchResultCount = document.getElementById("result-count");

  // console.log(searchContainerElm.childNodes);
  // console.log(searchContainerElm.removeChild[2]);

  searchContainerElm.removeChild(searchContainerElm.lastElementChild);
  searchResultCount.textContent = `Displaying ${filteredEpisodes.length} / ${allEpisodes.length} episodes`;
  searchContainerElm.appendChild(searchResultCount);

  // console.log(searchContainerElm.lastChild);
}

function CreateSelectOptions() {
  allEpisodes.forEach(populateSelectOptions);
}

function populateSelectOptions(episode, index) {
  const selectElm = document.getElementById("episode-select");
  // selectElm.options.length gets the current index
  selectElm.options[selectElm.options.length] = new Option(
    `${formatEpisodeNaming(episode)} - ${episode.name}`,
    episode.name
  );
}

function createCard(episode, index, array) {
  // console.log(episode.name);

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

  // console.log(formatEpisodeNaming(episode));

  titleCard.textContent = episode.name + " - ";
  spanElmEpisodeCode.textContent = formatEpisodeNaming(episode);
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

function formatEpisodeNaming(episode) {
  if (episode.number > 9) {
    // return ` - S0${episode.season}E${episode.number}`;
    return (
      episode.season.toString().padStart(3, "S0") +
      episode.number.toString().padStart(3, "E0")
    );
  } else {
    return `S0${episode.season}E0${episode.number}`;
  }
}

window.onload = setup;
