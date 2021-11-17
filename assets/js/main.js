// Loading
const loader = document.querySelector(".loader");
window.onload = async () => {
  let someData = await fetchVideos;
  if(someData){
    setTimeout(function(){
      loader.classList.add("hidden");
    },1010)
  }
};
// Variables
let checkboxArr = [],
    html;
// Create Form & Fieldset for small screen size
const createFormFieldset = (idParam) => {
  const formParent = document.getElementById('formParent');
  console.log(idParam)
  const myForm = document.createElement('form');
  const myFieldset = document.createElement('fieldset');
      myFieldset.setAttribute('id', idParam);
  myForm.appendChild(myFieldset);
  formParent.appendChild(myForm);
  return formParent;
}
const languageForm = createFormFieldset('language');
const authorForm = createFormFieldset('author');
const contentForm = createFormFieldset('type-of-content');
const durationForm = createFormFieldset('duration');
const topicForm = createFormFieldset('topic');
// Variables for forms & checkboxes
const language = document.getElementById('language'),
      author = document.getElementById('author'),
      typeOfContent = document.getElementById('type-of-content'),
      duration = document.getElementById('duration'),
      topic = document.getElementById('topic'),
      videos = document.getElementById('videos');
//
//Carousel parent to display videos when small screen
//
const carouselPanorama = document.createElement('div');
      carouselPanorama.setAttribute('class', 'carousel_panorama');
// Carousel of videos when small screen
class Carousel {
  /*
  * @param (HTMLElement) element
  * @param (Object) options
  * @param (Object) options.slideToScroll Number of slides
  * @param (Object) options.slideVisible Number of vidios visible
  */
  constructor(element, options={}){
    this.element = element,
    this.options = Object.assign({}, {
      slideToScroll: 1,
      slideVisible: 1
    }, options)

  }
}
document.addEventListener('DOMContentLoaded', function(){
  new Carousel(document.querySelector('#videos'), {
    slideToScroll: 3,
    slideVisible: 3
  })
})
// Create Checkbox filters if large screen
const typeOfContentFilter = (wrapper, someData, index, allSmth, allSmthClass, heading) => {
  const mql = window.matchMedia('(max-width: 800px)');
  let mobileView = mql.matches;
  someData.forEach(elem => {
    checkboxArr.push(elem.classes[index])
  })
  checkboxArr.push(allSmth);
  checkboxArr = checkboxArr.filter(function(m, index){
    return checkboxArr.indexOf(m) === index;
  }).sort();
  if (mobileView) {
    //setNavInnerHTML(Component1);
  } else {
    wrapper.innerHTML = `<legend>${heading}</legend>` +
    checkboxArr.map(function(title){
      (title === allSmth)
        ?
        (html =
        `
          <span class="d-flex justify-content-start align-items-center ${allSmthClass}">
              <input id="${allSmthClass}" type="checkbox" name="${title}" rel="${title}" class="mx-1" checked></input>
              <label id="${allSmthClass}Label" for="${title}">Unselect ${title}</label>
          </span>
        `)
        :
        (html =
        `
          <span class="d-flex justify-content-start align-items-center">
              <input type="checkbox" id="${title}" name="${title}" rel="${title}" class="mx-1" checked></input>
              <label for="${title}">${title}</label>
          </span>
        `);
      return html;
    })
    .join('');
  }
  checkboxArr = [];
}
const displayModal = (link, name, description) => {
  document.getElementById('youtubeModalLabel').innerHTML = name;
  document.getElementById('modalPlayer').src = `https://www.youtube.com/embed/${link}`;
  document.getElementById('modalPlayer').title = name;
  document.getElementById('youtubeModalDescription').innerHTML = description;
}
// Display Videos
let classes;
const displayVideos = (anyArray) => {
  let html;
  // mobile view
  const mqlVideos = window.matchMedia('(max-width: 800px)');
  let mobileViewVideos = mqlVideos.matches;
    videos.innerHTML =
    anyArray.map(function(video){
      classes = "youtube col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4 col-xxl-3 ";
      video.classes.forEach(item => { classes += ` ${item} ` })
      if (mobileViewVideos) {
        videos.appendChild(carouselPanorama);
      } else {
      html =
      `
        <div
          class="${classes}"
        >
          <div class="d-flex justify-content-center align-items-center ">
            <div id="icon"></div>
            <i
              class="fab fa-5x fa-youtube"
              data-bs-toggle="modal"
              data-bs-target="#youtubeModal"
              onclick="displayModal('${video.link}', '${video.name}', '${video.description}')"
            >
            </i>
            <img src="https://i.ytimg.com/vi/${video.link}/sddefault.jpg"/>
          </div>
        </div>`;

      return html;
    }
    }).join('');

}

// Fetching data
async function fetchVideos(){
  const res = await fetch('https://my-json-server.typicode.com/OlgaSpirkina/MeditationApp/videos');
  if (!res.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }
  const data = await res.json();
  displayVideos(data);
  typeOfContentFilter(typeOfContent, data, 2, "All Categories", "allCat", "type of content");
  typeOfContentFilter(language, data, 0, "All Languages", "allLang", "language");
  typeOfContentFilter(author, data, 1, "All Authors", "allAuth", "author");
  typeOfContentFilter(duration, data, 3, "Any duration", "anyDur", "duration");
  typeOfContentFilter(topic, data, 4, "All Topics", "allTop", "topic");
  return data;
}
fetchVideos().catch(error => {
  error.message;
});
