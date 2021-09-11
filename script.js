//You can edit ALL of the code here

// Global variables
const rootElem = document.getElementById("root");
const allEpisodes = getAllEpisodes();
const navElm = document.getElementById("nav");

function setup() {
  makePageForEpisodes(allEpisodes);
  displaySearchResultCount(allEpisodes, allEpisodes);
  CreateSelectOptions();

  // keyup event on of JS event listeners
  let searchBox = document.getElementById("search-box");
  searchBox.addEventListener("keyup", filterEpisodes);
}

/* ****
show only episodes that includes the search terms entered by the user
in the search box and single episode when using the drop-down menu
**** */
function filterEpisodes(event) {
  // console.log(event.target.value);
  // let searchBox = document.getElementById("search-box");
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

/**
 * create the layout of the page
 */
function makePageForEpisodes(episodeList) {
  // console.log(episodeList.length);
  rootElem.innerHTML = "";
  episodeList.forEach(createCard);
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

/**
 * Create the options tag and populate them
 */
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

/**
 * Format the episode code as required
 */
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

function showSingleEpisode(event) {
  filterEpisodes(event);
  let btn = document.createElement("button");
  btn.innerHTML = "Show All Episodes";
  btn.type = "button";
  btn.className = "all-btn";

  btn.onclick = function () {
    makePageForEpisodes(allEpisodes);
  };

  navElm.appendChild(btn);
}

/**
 * Display the number of episodes after the search
 */
function displaySearchResultCount(filteredEpisodes, allEpisodes) {
  // create a search result counter
  const searchResultCount = document.getElementById("result-count");
  // console.log(navElm.childNodes);
  // console.log(navElm.removeChild[2]);

  navElm.removeChild(navElm.lastElementChild);
  searchResultCount.textContent = `Displaying ${filteredEpisodes.length} / ${allEpisodes.length} episodes`;
  navElm.appendChild(searchResultCount);

  // console.log(navElm.lastChild);
}

window.onload = setup;
