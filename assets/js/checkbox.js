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
  for(let i=0; i<videoList.length; i++){
    videoList[i].classList.add('show');
  }
// addEventListener to all checkboxes
  for(let i=0; i<allCheckboxes.length; i++){
    allCheckboxes[i].addEventListener('change', function(){
      if(allCheckboxes[i].checked){
        hiddenDiv.style.display = "none";
        hiddenText.style.visibility = "hidden";
      }
//A case when All Smth checkbox checked or unchecked
    const allCheckedOrUnchecked = (name, label, textWhenTrue, textWhenFalse, theArray, videosDisabled) => {
      if((allCheckboxes[i].checked)&&(allCheckboxes[i].name === name)){
        label.innerHTML = textWhenTrue;
        theArray.forEach(elem =>{
          elem.checked = true;
        })
      }
      if((allCheckboxes[i].checked === false)&&(allCheckboxes[i].name === name)){
        label.innerHTML = textWhenFalse;
        theArray.forEach(elem =>{
          elem.checked = false;
        })
        disableAllVideos(videosDisabled)
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
    })
  }
},500);
// Filter based on rel attribute of checkboxes & class of videos
const filterWhenChecked = (theArray, filters) => {
  console.log(filters)
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
  hiddenDiv.style.display = "block";
  hiddenText.style.visibility = "visible";
  hiddenText.innerHTML = `Choose at least ${word}`;
}
