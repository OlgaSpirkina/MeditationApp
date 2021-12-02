const upArrowContainer = document.getElementsByClassName('upArrowContainer')[0];
const mql = window.matchMedia('(max-width: 920px)');
let mobileView = mql.matches;
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
if(mobileView){
  // Detect scroll down
  window.onscroll = function() {scrollFunction()};
  upArrowContainer.addEventListener('click', function(){
  // When the user clicks on the button, scroll to the top of the document  
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  });
}
