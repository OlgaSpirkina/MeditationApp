// Loading
window.addEventListener("load", function(){
  const loader = document.querySelector(".loader");
  loader.className += " hidden";
});
// Variables
let checkboxArr = [];
const language = document.getElementById('language'),
      autor = document.getElementById('author'),
      typeOfContent = document.getElementById('type-of-content'),
      duration = document.getElementById('duration'),
      topic = document.getElementById('topic'),
      videos = document.getElementById('videos');
// Create Checkbox filters
const typeOfContentFilter = (wrapper, someData, index, allSmth, heading) => {
  someData.forEach(elem => {
    checkboxArr.push(elem.classes[index])
  })
  checkboxArr.push(allSmth);
  checkboxArr = checkboxArr.filter(function(m, index){
    return checkboxArr.indexOf(m) === index;
  }).sort();
  wrapper.innerHTML = `<legend>select by ${heading}</legend>` +
  checkboxArr.map(function(title){
    let html =
    `
      <span>
          <input type="checkbox" id="${title}" name="${title}" rel="${title}" checked></input>
          <label for="${title}">${title}</label>
      </span>
    `;
    return html
  }).join('');
  checkboxArr = [];
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
        class="d-flex justify-content-center align-items-center ${classes}"
      >
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
    `;

    return html;
  }).join();
}
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
  displayVideos(data);
  typeOfContentFilter(typeOfContent, data, 2, "All Categories", "type of content");
  typeOfContentFilter(language, data, 0, "All Languages", "language");
  typeOfContentFilter(author, data, 1, "All Authors", "author");
  typeOfContentFilter(duration, data, 3, "Any duration", "duration");
  typeOfContentFilter(topic, data, 4, "All Topics", "topic");
  return data;
}
fetchVideos().catch(error => {
  error.message;
});
