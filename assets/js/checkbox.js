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
// Wait untill everything is loaded
setTimeout(function(){
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
// display all the videos by default
  for(let i=0; i<videoList.length; i++){
    videoList[i].classList.add('show');
  }
// addEventListener to all checkboxes
  for(let i=0; i<allCheckboxes.length; i++){
    allCheckboxes[i].addEventListener('change', function(){
      console.log("coucou")
      let filtersChecked = {
        theLanguage: getClassOfCheckboxes(allLanguages),
        theAuthor: getClassOfCheckboxes(allAuthors),
        theContent: getClassOfCheckboxes(allContents),
        theDuration: getClassOfCheckboxes(allDurations),
        theTopic: getClassOfCheckboxes(allTopics),
      };
      filterWhenChecked(filtersChecked, videoList);
    })
  }
},500);
// Filter based on rel attribute of checkboxes & class of videos
const filterWhenChecked = (filters, theArray) => {
  console.log("coucou")
  let hiddenElems = [];
  if(!theArray || theArray.length <= 0) return;
  for(let i=0; i<theArray.length; i++){
    let el = theArray[i];
  //Authors
    if(filters.theAuthor.length > 0){
      isHidden = true;
      for(let j=0; j<filters.theAuthor.length; j++){
        let filter = filters.theAuthor[j];
        if(el.classList.contains(filter)){
          isHidden = false;
          break;
        }
      }
      if(isHidden){hiddenElems.push(el);}
    }
  }
  // End Authors
  for(let i=0; i<theArray.length; i++){
    theArray[i].classList.add('show');
  }
  if(hiddenElems.length <= 0) return;
  for(let i=0; i<hiddenElems.length; i++){
    hiddenElems[i].classList.remove('show');
  }
}
