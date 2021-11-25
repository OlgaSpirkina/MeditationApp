// Number of videos per page regarding the screen size
let maxVideosPerPage = 8;
$(document).ready(function() {
  if(($(window).width() > 300) && ($(window).width()<=767)){
    maxVideosPerPage = 6;
    return show(maxVideosPerPage);
  }
  if(($(window).width()>767) && ($(window).width()<=800)){
    maxVideosPerPage = 9;
    return show(maxVideosPerPage);
  }
  /*
  if(($(window).width()>590) && ($(window).width()<=620)){
    maxVideosPerPage = 28;
    return show(maxVideosPerPage);
  }
  if(($(window).width()>620) && ($(window).width()<=670)){
    maxVideosPerPage = 22;
    return show(maxVideosPerPage);
  }
  if(($(window).width()>670) && ($(window).width()<=768)){
    maxVideosPerPage = 20;
    return show(maxVideosPerPage);
  }
  if(($(window).width()>768) && ($(window).width()<=790)){
    maxVideosPerPage = 45;
    return show(maxVideosPerPage);
  }
  if(($(window).width()>790) && ($(window).width()<=810)){
    maxVideosPerPage = 45;
    return show(maxVideosPerPage);
  }
  if(($(window).width()>810) && ($(window).width()<=835)){
    maxVideosPerPage = 42;
    return show(maxVideosPerPage);
  }
  if(($(window).width()>835) && ($(window).width()<=850)){
    maxVideosPerPage = 39;
    return show(maxVideosPerPage);
  }
  if(($(window).width()>850) && ($(window).width()<=900)){
    maxVideosPerPage = 36;
    return show(maxVideosPerPage);
  }
  if(($(window).width()>900) && ($(window).width()<=950)){
    maxVideosPerPage = 33;
    return show(maxVideosPerPage);
  }
  if(($(window).width()>951) && ($(window).width()<=1000)){
    maxVideosPerPage = 33;
    return show(maxVideosPerPage);
  }
  if(($(window).width()>1001) && ($(window).width()<=1015)){
    maxVideosPerPage = 30;
    return show(maxVideosPerPage);
  }
  if(($(window).width()>1015) && ($(window).width()<=1045)){
    maxVideosPerPage = 27;
    return show(maxVideosPerPage);
  }
  if(($(window).width()>1045) && ($(window).width()<=1101)){
    maxVideosPerPage = 24;
    return show(maxVideosPerPage);
  }
  if(($(window).width()>1101) && ($(window).width()<=1300)){
    maxVideosPerPage = 21;
    return show(maxVideosPerPage);
  }
  if(($(window).width()>1301) && ($(window).width()<=1450)){
    maxVideosPerPage = 18;
    return show(maxVideosPerPage);
  }
  */
  if($(window).width()>1451){
    maxVideosPerPage = 8;
    return show(maxVideosPerPage);
  }
 });
// Get all rel to filter videos
const getClassOfCheckboxes = (checkboxes) => {
  let classOfCheckb = [];
  if(checkboxes && checkboxes.length > 0){
    for(let i=0; i< checkboxes.length; i++){
      if(checkboxes[i].checked){
        classOfCheckb.push(checkboxes[i].getAttribute("rel"));
      }
    }
  }
  return classOfCheckb;
}
// This function will be used inside filterWhenChecked function to filter each category
const filterByCategory = (category, el, hiddenElems) => {
  if(category.length > 0){
    let isHidden = true;
    for(let j=0; j<category.length; j++){
      let filter = category[j];
      if(el.classList.contains(filter)){
        isHidden = false;
        break;
      }
    }
    if(isHidden){hiddenElems.push(el);}
  }
}
// Wait untill everything is loaded because all checkboxes are created in main.js file
setTimeout(function(){
// Variables
  const videosContainer = document.getElementById('videos'),
  // Checkboxes
      allCheckboxes = document.querySelectorAll('input[type="checkbox"]'),
      allLanguages = document.querySelectorAll('#language input[type="checkbox"]'),
      allAuthors = document.querySelectorAll('#author input[type="checkbox"]'),
      allContents = document.querySelectorAll('#type-of-content input[type="checkbox"]'),
      allDurations = document.querySelectorAll('#duration input[type="checkbox"]'),
      allTopics = document.querySelectorAll('#topic input[type="checkbox"]'),
  // Input All
      allCat = document.getElementById('allCat'),
      allLang = document.getElementById('allLang'),
      allAuth = document.getElementById('allAuth'),
      anyDur = document.getElementById('anyDur'),
      allTop = document.getElementById('allTop'),
  // Label to change the phrase from "Select" to "Unselect"
      allCatLabel = document.getElementById('allCatLabel'),
      allLangLabel = document.getElementById('allLangLabel'),
      allAuthLabel = document.getElementById('allAuthLabel'),
      anyDurLabel = document.getElementById('anyDurLabel'),
      allTopLabel = document.getElementById('allTopLabel');
  let videoList = document.querySelectorAll('.youtube');
// display all the videos hidden by default
(()=>{
  for(let i=0; i<videoList.length; i++){
    videoList[i].classList.add('show');
  }
  show(maxVideosPerPage);
})();
/*
Make first checkbox All Smth of each category be checked/unchecked depending on the state of all other
chekcboxes of the same category (all checked or all unchecked)
*/
let allCheckedOrUncheckedArr = [];
const initialVideosHeight = videosContainer.offsetHeight; // find the initial height of videos container
const everyCheckboxIsUncheckedOrChecked = (anyArr, theBool, length, name, placeholder, phrase, disablePhrase) => {
  anyArr.forEach((elem) => {
    if(elem.checked === theBool){
      allCheckedOrUncheckedArr.push(elem);
    }else{ allCheckedOrUncheckedArr = []; }
    for(let i=0; i<allCheckedOrUncheckedArr.length; i++){
      if(allCheckedOrUncheckedArr.length === length){
        anyArr.forEach((elem) => {
          if(elem.name === name){
            elem.checked = theBool;
            if(elem.checked === false){
              disableAllVideos(disablePhrase);
              console.log(initialVideosHeight)
// add a height to cover div because if not it takes the heigth of videos container that may be not accurate in this particular case
              document.getElementById('hiddenDiv').style.height = initialVideosHeight+50+"px";
            }
          };
            placeholder.innerHTML = phrase;
        })
      }
    }
  });
}
// addEventListener to all checkboxes
  for(let i=0; i<allCheckboxes.length; i++){
    allCheckboxes[i].addEventListener('change', function(){
      if(allCheckboxes[i].checked){
        hiddenDiv.style.display = "none";
        hiddenText.style.visibility = "hidden";
  // All Smth checkbox is checked when all the other checkboxes of the same category are checked
        everyCheckboxIsUncheckedOrChecked(allLanguages, true, 3, "All Languages", allLangLabel, "Unselect All Languages");
        everyCheckboxIsUncheckedOrChecked(allAuthors, true, 5, "All Authors", allAuthLabel, "Unselect All Authors");
        everyCheckboxIsUncheckedOrChecked(allContents, true, 3, "All Categories", allCatLabel, "Unselect All Categories");
        everyCheckboxIsUncheckedOrChecked(allDurations, true, 3, "Any duration", anyDurLabel, "Unselect Any Duration");
        everyCheckboxIsUncheckedOrChecked(allTopics, true, 5, "All Topics", allTopLabel, "Unselect All Topics");
      }
//A case when All Smth checkbox checked or unchecked
    const allCheckedOrUnchecked = (name, label, textWhenTrue, textWhenFalse, theArray, videosDisabled) => {
      if((allCheckboxes[i].checked)&&(allCheckboxes[i].name === name)){
        label.innerHTML = textWhenTrue;
        theArray.forEach(elem =>{
          elem.checked = true;
        })
      }
      if(allCheckboxes[i].checked === false){
        everyCheckboxIsUncheckedOrChecked(allLanguages, false, 3, "All Languages", allLangLabel, "Select All Languages", "one Language");
        everyCheckboxIsUncheckedOrChecked(allAuthors, false, 5, "All Authors", allAuthLabel, "Select All Authors", "one Author");
        everyCheckboxIsUncheckedOrChecked(allContents, false, 3, "All Categories", allCatLabel, "Select All Categories", "one Category");
        everyCheckboxIsUncheckedOrChecked(allDurations, false, 3, "Any duration", anyDurLabel, "Select Any Duration", "one Duration Parameter");
        everyCheckboxIsUncheckedOrChecked(allTopics, false, 5, "All Topics", allTopLabel, "Select All Topics", "one Topic");
      }
      if((allCheckboxes[i].checked === false)&&(allCheckboxes[i].name === name)){
        label.innerHTML = textWhenFalse;
        disableAllVideos(videosDisabled);
        theArray.forEach(elem =>{
          elem.checked = false;
        })
      }
    }
      allCheckedOrUnchecked("All Languages", allLangLabel, "Unselect All Languages", "Select All Languages", allLanguages, "one Language");
      allCheckedOrUnchecked("All Authors", allAuthLabel, "Unselect All Authors", "Select All Authors", allAuthors, "one Author");
      allCheckedOrUnchecked("All Categories", allCatLabel, "Unselect All Categories", "Select All Categories", allContents, "one Category");
      allCheckedOrUnchecked("Any duration", anyDurLabel, "Unselect Any Duration", "Select Any Duration", allDurations, "one Duration Parameter");
      allCheckedOrUnchecked("All Topics", allTopLabel, "Unselect All Topics", "Select All Topics", allTopics, "one Topic");
// End All Smth Checked/Unchecked
      let filtersChecked = {
        theLanguage: getClassOfCheckboxes(allLanguages),
        theAuthor: getClassOfCheckboxes(allAuthors),
        theContent: getClassOfCheckboxes(allContents),
        theDuration: getClassOfCheckboxes(allDurations),
        theTopic: getClassOfCheckboxes(allTopics),
      };
      filterWhenChecked(videoList, filtersChecked);
      show(maxVideosPerPage);
    })
  }
},1510);
// Filter based on rel attribute of checkboxes & class of videos
const filterWhenChecked = (theArray, filters) => {
  let hiddenElems = [];
  if(!theArray || theArray.length <= 0) return;
  for(let i=0; i<theArray.length; i++){
    let el = theArray[i];
    filterByCategory(filters.theAuthor, el, hiddenElems);
    filterByCategory(filters.theLanguage, el, hiddenElems);
    filterByCategory(filters.theContent, el, hiddenElems);
    filterByCategory(filters.theDuration, el, hiddenElems);
    filterByCategory(filters.theTopic, el, hiddenElems);
  }
  for(let i=0; i<theArray.length; i++){
    theArray[i].classList.add('show');
  }
  if(hiddenElems.length <= 0) return;
  for(let i=0; i<hiddenElems.length; i++){
    hiddenElems[i].classList.remove('show');
  }
}
// Videos aren't clickable when No category selected
const disableAllVideos = (word) => {
// Div and Text where a message appears when no category selected
  const hiddenDiv = document.getElementById('hiddenDiv');
  const hiddenText = document.getElementById('hiddenText');
  let videosTotalHeight = videos.offsetHeight;
  console.log(videosTotalHeight, "total height")
  videosTotalHeight += 50; // add 50px to the heigth of videos container
  hiddenDiv.style.display = "block";
  hiddenDiv.style.height = videosTotalHeight+"px"; //hiddenDiv will cover all the videos
  hiddenText.style.visibility = "visible";
  hiddenText.innerHTML = `Choose at least ${word}`;
}
// Add pagination. JQuery plugin
function show(maxVideosPerPage) {
  let arrayOfVids = Array.from(document.querySelectorAll(".show"));
  $('#pagin').pagination({
    dataSource: Array.from(document.querySelectorAll(".show")),
    pageSize: maxVideosPerPage,
    showPrevious: false,
    showNext: false,
    className: 'paginationjs-theme-blue',
    callback: function(data, pagination) {
      document.querySelectorAll(".show").forEach((el) => el.classList.remove("show"));
      data.forEach((el) => el.classList.add("show"));
/* hide pagination div when there is only one page */
      (arrayOfVids.length <= maxVideosPerPage) ? $('#pagin').hide() : $('#pagin').show();
    }
  })
}
