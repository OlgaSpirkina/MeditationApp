// Loading
const loader = document.querySelector(".loader");
window.onload = async () => {
  let someData = await fetchVideos;
  if(someData){
    setTimeout(function(){
      loader.classList.add("hidden");
    },1500)
  };
}
// Navbar toggle menu
const toggleButton = document.getElementsByClassName('toggle-button')[0];
const navbarLinks = document.getElementsByClassName('navbar-links')[0];
toggleButton.addEventListener('click', ()=>{
  navbarLinks.classList.toggle('active');
})
// End Navbar menu
let checkboxArr = [];
// Function to create Form & Fieldset to display checkbox filters
const createFormFieldset = (idParam) => {
  const formParent = document.getElementById('formParent'),
        myForm = document.createElement('form'),
        myFieldset = document.createElement('fieldset');
  myFieldset.setAttribute('id', idParam);
  myForm.appendChild(myFieldset);
  formParent.appendChild(myForm);
  return formParent;
}
const languageForm = createFormFieldset('language'),
      authorForm = createFormFieldset('author'),
      contentForm = createFormFieldset('type-of-content'),
      durationForm = createFormFieldset('duration'),
      topicForm = createFormFieldset('topic'),
// Variables for forms & checkboxes
      language = document.getElementById('language');
      author = document.getElementById('author'),
      typeOfContent = document.getElementById('type-of-content'),
      duration = document.getElementById('duration'),
      topic = document.getElementById('topic'),
      videos = document.getElementById('videos'),
// Variables for all Forms wrapper and filterBy used for mobile screen size to hide or show checkbox filters
      wrapperFormParent = document.getElementById('wrapperFormParent'),
      filterBy = document.getElementById('filterBy'),
      upArrowContainer = document.getElementById("upArrowContainer");
/*
  Detect Scroll Down in mobile
*/
function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    upArrowContainer.style.display = "block";
  } else {
    upArrowContainer.style.display = "none";
  }
}
// End Detect Scroll Down Function
/*
  Create Checkbox filters
*/
const typeOfContentFilter = (wrapper, someData, commonClass, index, allSmth, allSmthClass, heading) => {
// There will be some changes in small screen size
  const mql = window.matchMedia('(max-width: 820px)');
  let mobileView = mql.matches;
// Create an array with all labels
  someData.forEach(elem => {
    checkboxArr.push(elem.classes[index])
  })
  checkboxArr.push(allSmth);
// Filtering the array of labels to remove doubles
  checkboxArr = checkboxArr.filter(function(m, index){
    return checkboxArr.indexOf(m) === index;
  }).sort();
// Display checkboxes. Wrapper is a form + fieldset
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
            <label for="${title}">${title.replace(/_/g, ' ')}</label>
        </span>
      `);
    return html;
  })
  .join('');
  // If small screen size
  if(mobileView){
    // Detect scroll down
    window.onscroll = function() {scrollFunction()};
    upArrowContainer.addEventListener('click', goToTop);
    filterBy.classList.add('mobileButton');
    filterBy.classList.add('btn');
    wrapperFormParent.classList.add('formHidden');
    filterBy.addEventListener('click', function(){
  // change text when open or close filters
      (filterBy.innerHTML === "Filter by:") ? (filterBy.innerHTML = "Close Filters") : (filterBy.innerHTML = "Filter by:");
  // hide or display checkbox filters
      (wrapperFormParent.classList.contains('formHidden'))
        ?
      (wrapperFormParent.classList.remove('formHidden'))
        :
      (wrapperFormParent.classList.add('formHidden'));
    })
  }
  checkboxArr = [];
}
/*
  Display Videos
*/
let classes;
const displayVideos = (anyArray, wrapper) => {
  let html;
  // wrapper is an html section
  wrapper.innerHTML =
  anyArray.map(function(video){
    classes = "youtube col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4 col-xxl-3 ";
    video.classes.forEach(item => { classes += ` ${item} ` })
    html =
    `
      <div
        class="${classes}"
      >
        <div class="d-flex justify-content-center align-items-center ">
          <div class="icon"></div>
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
// A modal to display Youtube videos & descriptions. The Modal is a bootstrap modal created in html file
const displayModal = (link, name, description) => {
  document.getElementById('youtubeModalLabel').innerHTML = name;
  document.getElementById('modalPlayer').src = `https://www.youtube.com/embed/${link}`;
  document.getElementById('modalPlayer').title = name;
  document.getElementById('youtubeModalDescription').innerHTML = description;
}
// Fetching data
async function fetchVideos(){
  const res = await fetch('https://my-json-server.typicode.com/OlgaSpirkina/MeditationApp/videos');
  if (!res.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }
  const data = await res.json();
  displayVideos(data, videos);
  typeOfContentFilter(typeOfContent, data, "commonCategories", 2, "All Categories", "allCat", "type of content");
  typeOfContentFilter(language, data, "commonLanguages", 0, "All Languages", "allLang", "language");
  typeOfContentFilter(author, data, "commonAuthors", 1, "All Authors", "allAuth", "author");
  typeOfContentFilter(duration, data, "commonDuration", 3, "Any duration", "anyDur", "duration");
  typeOfContentFilter(topic, data, "commonTopics", 4, "All Topics", "allTop", "topic");
  return data;
}
fetchVideos().catch(error => {
  error.message;
});


// When the user clicks on the button, scroll to the top of the document
function goToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
