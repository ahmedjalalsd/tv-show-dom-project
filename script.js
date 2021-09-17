//You can edit ALL of the code here

// Global variables
// const allEpisodes = getAllEpisodes();
const rootElem = document.getElementById("root");
const navElm = document.getElementById("nav");
const endPoint = "https://api.tvmaze.com/shows/82/episodes";
// const endPoint = "https://api.tfl.gov.uk/BikePoint";

// const allEpisodes = getAllEpisodes("https://api.tvmaze.com/shows/82/episodes");
let allEpisodes;

const allShows = getAllShows();
// callback(https://api.tvmaze.com/shows/82/episodes, allEpisodes());

function setup() {
  getAllEpisodes(endPoint);
  // keyup event on of JS event listeners
  let searchBox = document.getElementById("search-box");
  let searchToken = 0;

  searchBox.addEventListener("keyup", (event) => {
    /* 
    send less request to the network, because without the app will send a request as soon
    as the user enters a Character in this way the app will send a request when the user has entered a 
    batch of characters
    */
    clearTimeout(searchToken);
    // protect against space bar inputs or any white space input
    if (searchBox.value.trim().length === 0) {
      console.log("no");
    }
    searchToken = setTimeout(() => {
      filterEpisodes(event);
    }, 250);
  });
}

// retrieve the data from tvmaze
function getAllEpisodes(endPoint) {
  // console.log(endPoint);
  fetch(endPoint)
    .then((response) => {
      if (response.status >= 200 && response.status <= 299) {
        return response.json();
      } else {
        throw new Error(
          `Encountered something unexpected: ${response.status} ${response.statusText}`
        );
      }
    })
    .then((episodeList) => {
      allEpisodes = episodeList;
      makePageForEpisodes(allEpisodes);
      displaySearchResultCount(allEpisodes, allEpisodes);
      createSelectOptions(allEpisodes);
      createSelectOptionsAllShows();
    })
    .catch((err) => {
      // Handle the error
      console.log(err);
    });
}

/**
 * create the layout of the page
 */
function makePageForEpisodes(episodeList) {
  // console.log(episodeList.length);
  rootElem.innerHTML = "";
  // rootElem.removeChild(rootElem.lastElementChild);
  episodeList.forEach(createCard);
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

function createCard(episode, index, array) {
  // console.log(episode.name);
  // Main div which hold the content of the episode
  let card = document.createElement("div");

  // Image part
  let imgDiv = document.createElement("div");
  let imgElem = document.createElement("img");
  if (!episode.image.original) {
    imgElem.src = episode.image.medium;
  } else {
    imgElem.src = episode.image.original;
  }

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
function createSelectOptions(episodeList) {
  // console.log(episodeList);
  const selectElm = document.getElementById("episode-select");
  selectElm.innerHTML = "";
  episodeList.forEach(populateSelectOptions);
}

function populateSelectOptions(episode) {
  const selectElm = document.getElementById("episode-select");
  // selectElm.options.length gets the current index
  selectElm.options[selectElm.options.length] = new Option(
    `${formatEpisodeNaming(episode)} - ${episode.name}`,
    episode.name
  );
}

/**
 * Create the options tag and populate them with the all show list
 */
function createSelectOptionsAllShows() {
  allShows.sort((a, b) => {
    if (a.name.toLowerCase() > b.name.toLowerCase()) {
      return 1;
    } else if (a.name.toLowerCase() < b.name.toLowerCase()) {
      return -1;
    } else {
      return 0;
    }
  });
  allShows.forEach(populateSelectOptionsAllShows);
}

function populateSelectOptionsAllShows(show, index) {
  // console.log(show.name);
  const selectElm = document.getElementById("show-select");

  selectElm.options[index] = new Option(show.name, show.id);
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

/* display a single episode when the user uses the drop-down menu */
function showSingleEpisode(event) {
  filterEpisodes(event);
  let btn = document.createElement("button");
  btn.innerHTML = "Show All Episodes";
  btn.type = "button";
  btn.className = "all-btn";

  btn.onclick = function () {
    makePageForEpisodes(allEpisodes);
    displaySearchResultCount(allEpisodes, allEpisodes);
    btn.style.display = "none";
  };

  navElm.appendChild(btn);
}

/* display a all the episode of the show when the user uses the drop-down menu to
choose a show
*/
function renderAShow(event) {
  // console.log(event.target.value);
  const url = `https://api.tvmaze.com/shows/${event.target.value}/episodes`;
  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(
          `Encountered something unexpected: ${response.status} ${response.statusText}`
        );
      }
    })
    .then((episodeList) => {
      makePageForEpisodes(episodeList);
      // getAllEpisodes(url);
      displaySearchResultCount(episodeList, episodeList);
      createSelectOptions(episodeList);
      createSelectOptionsAllShows();
    })
    .catch((err) => console.log(err));
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
