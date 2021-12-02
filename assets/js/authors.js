class Carousel{
  /**
  @callback moveCallbacks
  @param {number} index
  */
  /**
  *
  @param {HTMLElement} element
  @param {Object} options
  @param {Object} options.slidesVisible number of visible elements
  @param {Object} options.slidesToScroll number of elements
  @param {boolean} options.loop
  */
  constructor(element, options = {}){
    this.element = element
    this.options = Object.assign({}, {
      slidesVisible: 1,
      slidesToScroll: 1,
      loop: false
    }, options);
    let children = [].slice.call(element.children);
    this.isMobile = false;
    this.currentItem = 0; // firs element
    this.moveCallbacks = [];
// Modification du DOM
    this.root = this.createDivWithClass('carousel');
    this.root.setAttribute('tabindex', '0');
    this.container = this.createDivWithClass('carousel__container');
    this.root.appendChild(this.container);
    this.element.appendChild(this.root);
// fat errow refers to this (global)
// if we use word function it refers to this.children
    this.items = children.map((child) => {
      let item = this.createDivWithClass('carousel__item');
      item.appendChild(child);
      this.container.appendChild(item);
      return item;
    })
    this.setStyle();
    this.createNavigation();
// Evenements
    this.moveCallbacks.forEach(cb => cb(0));
    this.onWindowResize();
    window.addEventListener('resize', this.onWindowResize.bind(this));
    this.root.addEventListener('keyup', e=>{
      if(e.key === "ArrowRight" || e.key === "Right"){this.next()}
      else if(e.key === "ArrowLeft" || e.key === "Left"){this.prev()};
    })
  }
  /**
    setStyle() helps to count appropriate dimentions of each element in carousel
  */
  setStyle(){
    let ratio = this.items.length / this.slidesVisible;
    this.container.style.width = (ratio * 100)+"%";
    this.items.forEach(item => item.style.width = ((100 / this.slidesVisible) / ratio)+"%")
  }
  createNavigation(){
    let nextButton = this.createIcon('fas fa-3x fa-chevron-circle-right carousel__next');
    let prevButton = this.createIcon('fas fa-3x fa-chevron-circle-left carousel__prev');
    this.element.appendChild(nextButton);
    this.element.appendChild(prevButton);
// bind makes a reference to class and not to nextButton
    nextButton.addEventListener('click', this.next.bind(this));
    prevButton.addEventListener('click', this.prev.bind(this));
    if(this.options.loop === true)return;
    this.onMove(index => {
      if(index === 0){
        prevButton.classList.add('carousel__prev-hidden');
      }else{
        prevButton.classList.remove('carousel__prev-hidden');
      }
      if(this.items[this.currentItem + this.slidesVisible] === undefined){
        nextButton.classList.add('carousel__next-hidden');
      }else{
        nextButton.classList.remove('carousel__next-hidden');
      }
    })
  }
  next(){
    this.gotoItem(this.currentItem + this.slidesToScroll);
    document.getElementsByClassName('bio')[0].style.display = "none";
  }
  prev(){
    this.gotoItem(this.currentItem - this.slidesToScroll);
    document.getElementsByClassName('bio')[0].style.display = "none";
  }
  /**
    moves the carousel to the choosen  element
    @param {number} index
  */
  gotoItem(index){
    if(index < 0){
      if(this.options.loop){
        index = this.items.length - this.slidesVisible;
      }else{ return }
    }else if((index >= this.items.length) || (this.items[this.currentItem + this.slidesVisible] === undefined)){
      if(this.options.loop){ index = 0 }
      else{ return }
    }
    let translateX = index * -100 / this.items.length;
    this.container.style.transform = 'translate3d(' + translateX + '%, 0, 0)'
    this.currentItem = index;
    this.moveCallbacks.forEach(cb => cb(index));
  }
  /**
    @param {Carousel - moveCallbacks}
  */
  onMove(cb){
    this.moveCallbacks.push(cb);
  }
  onWindowResize(){
    let mobile = window.innerWidth < 801;
    if(mobile !== this.isMobile){
      this.isMobile = mobile;
      this.setStyle();

      this.moveCallbacks.forEach(cb => cb(this.currentItem));
    }
  }

  /**
  @param {string} className
  @returns {HTMLElement}
  */

  createDivWithClass (className) {
    let div = document.createElement('div');
    div.setAttribute('class', className);
    return div;
  }
  createIcon(className){
    let icon = document.createElement('i');
    icon.setAttribute('class', className);
    return icon;
  }
  /* getter to change the number of slides when mobile */
  get slidesToScroll(){
    return this.isMobile ? 1 : this.options.slidesToScroll;
  }
  get slidesVisible(){
    return this.isMobile ? 1 : this.options.slidesVisible;
  }
}
// End Class Carousel
//
// Call new Class when data is fetched
//
window.onload = async () => {
  let authorsBio = await fetchAuthorsBio;
  if(authorsBio){
    new Carousel(document.querySelector('#carousel1'),{
      slidesToScroll: 1,
      slidesVisible: 3,
      loop: true
    });
  }
}
// Get the data: authors' biography
async function fetchAuthorsBio(){
  const res = await fetch('https://my-json-server.typicode.com/OlgaSpirkina/MeditationApp/authorsBio');
  if (!res.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }
  const data = await res.json();
  const parantFigure = document.querySelectorAll('.carousel__item'), // div with figure where p will be appended in small screen
        bioSection = document.getElementsByClassName('bio')[0], // section to display bio
        cards = document.querySelectorAll('.cards'); // all the img of authors
// elements will be presented differently in small or large screen
  const mql = window.matchMedia('(max-width: 801px)');
  let mobileWindow = mql.matches;
// create DOM Elements (p: where the biography will be displayed when large screen) &  (icon)
  let bioParagrapheElem = document.createElement('p');
  bioParagrapheElem.setAttribute('class', 'bio-paragraphe');
  let closingIcon = document.createElement('i');
  closingIcon.setAttribute('class', 'far fa-2x fa-times-circle icon-close');
// every .card (img) contains alt attr with author's name needed to append a correspondent text
  cards.forEach((card, cardIndex) => {
    if(mobileWindow){
      let authorNameM = card.getAttribute('alt'); //correct author's name to compare with name came from fetched data
      parantFigure.forEach((figure, figureIndex) => {
        console.log(parantFigure.length)
        if(cardIndex === figureIndex){
// in small screen create 4 paragraphes
          let bioP = document.createElement('p');
          bioP.setAttribute('class', 'bio-p');
          figure.appendChild(bioP);
          data.forEach((author) => {
            if(author.name === authorNameM){
              let bioParagrapheMobile = document.querySelectorAll('.bio-p');
              bioParagrapheMobile.forEach((parag, item) => {
                if(cardIndex === item){
                  parag.innerHTML = author.bio;
                }
              })
            }
          })
        }
      })
// when large screen only one paragraphe will be created bioParagrapheElem
    }else{
      bioSection.appendChild(bioParagrapheElem);
      const bioParagraphe = document.getElementsByClassName('bio-paragraphe')[0];
      for(let i=0; i<parantFigure.length; i++){
        if(i === cardIndex){
      // create div containing information icon & hidden text 'know more about...'
      // append it to the div containing the figure
          let divIcon = document.createElement('div');
          let icon = document.createElement('i');
          let infoText = document.createElement('p');
          infoText.setAttribute('class', 'hidden-text');
          divIcon.setAttribute('class', 'div-info');
          icon.setAttribute('class', 'fas fa-2x fa-info-circle');
          divIcon.appendChild(icon);
          divIcon.appendChild(infoText);
          parantFigure[i].appendChild(divIcon);
        }
      }
    // access newly created icons and divs to display custom text with author's name
      let infoIcon = document.querySelectorAll('.fa-info-circle');
      let divInfoText = document.querySelectorAll('.hidden-text');
      for(let j=0; j<infoIcon.length; j++){
        infoIcon[j].addEventListener('click', function(){
          for(let a=0; a<divInfoText.length; a++){
            if((j === a) && (j === cardIndex) && (a === cardIndex)){
              let authorName = card.getAttribute('alt');
              divInfoText[a].innerHTML = `know more about ${authorName}`;
              divInfoText[a].classList.add('show-text');
  // make hidden text disappear after 2sec.
              setTimeout(function(){ divInfoText[a].classList.remove('show-text'); }, 2000);
              data.forEach((author) => {
                if(author.name === authorName){
                  bioParagraphe.innerHTML = author.bio;
                  bioSection.appendChild(closingIcon);
                  bioParagraphe.style.padding = "1rem";
                  bioSection.style.border = "1px solid var(--navbarGrey)";
                  let closingIconElem = document.querySelectorAll('.icon-close')[0];
                  closingIconElem.style.display = "block";
                  closingIconElem.addEventListener('click', function(){
                    bioSection.style.display = "none";
                    bioParagraphe.style.padding = "0";
                  })
                  bioSection.style.display = "block";
                }
              })
            }
          }
        })
      }
    }
  })
  return data;
}
fetchAuthorsBio().catch(error => {
  error.message;
});
