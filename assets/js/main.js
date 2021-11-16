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
// create Language Form
const languageForm = document.createElement('form');
const languageFieldset = document.createElement('fieldset');
languageFieldset.setAttribute('id', 'language');
languageForm.appendChild(languageFieldset);
// create Author Form
const authorForm = document.createElement('form');
const authorFieldset = document.createElement('fieldset');
authorFieldset.setAttribute('id', 'author');
authorForm.appendChild(authorFieldset);
// create Content Form
const contentForm = document.createElement('form');
const contentFieldset = document.createElement('fieldset');
contentFieldset.setAttribute('id', 'type-of-content');
contentForm.appendChild(contentFieldset);
// create Duration Form
const durationForm = document.createElement('form');
const durationFieldset = document.createElement('fieldset');
durationFieldset.setAttribute('id', 'duration');
durationForm.appendChild(durationFieldset);
// create Topic Form
const topicForm = document.createElement('form');
const topicFieldset = document.createElement('fieldset');
topicFieldset.setAttribute('id', 'topic');
topicForm.appendChild(topicFieldset);
const formParent = document.getElementById('formParent');
formParent.appendChild(languageForm);
formParent.appendChild(authorForm);
formParent.appendChild(contentForm);
formParent.appendChild(durationForm);
formParent.appendChild(topicForm);
// Variables
const language = document.getElementById('language'),
      author = document.getElementById('author'),
      typeOfContent = document.getElementById('type-of-content'),
      duration = document.getElementById('duration'),
      topic = document.getElementById('topic'),
      videos = document.getElementById('videos');
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
  videos.innerHTML =
  anyArray.map(function(video){
    classes = "youtube col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4 col-xxl-3 ";
    video.classes.forEach(item => { classes += ` ${item} ` })
    let html =
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
