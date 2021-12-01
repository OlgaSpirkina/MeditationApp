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
  }
  prev(){
    this.gotoItem(this.currentItem - this.slidesToScroll);
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
    let mobile = window.innerWidth < 800;
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

document.addEventListener('DOMContentLoaded', function(){
  new Carousel(document.querySelector('#carousel1'),{
    slidesToScroll: 1,
    slidesVisible: 3,
    loop: true
  });
  let carouselItem = document.querySelectorAll('figure');
  for(let i=0; i<carouselItem.length; i++){
    let divIcon = document.createElement('div');
    let icon = document.createElement('i');
    let infoText = document.createElement('p');
    let textNode = document.createTextNode('hello here');
    infoText.setAttribute('class', 'hidden-text');
    divIcon.setAttribute('class', 'div-info');
    icon.setAttribute('class', 'fas fa-2x fa-info-circle');
    divIcon.appendChild(icon);
    divIcon.appendChild(infoText);
    infoText.appendChild(textNode);
    carouselItem[i].appendChild(divIcon);
  }
  let infoIcon = document.querySelectorAll('.fa-info-circle');
  let divInfoText = document.querySelectorAll('.hidden-text');
  for(let j=0; j<infoIcon.length; j++){
    infoIcon[j].addEventListener('click', function(){
      for(let a=0; a<divInfoText.length; a++){
        if(j === a){
          divInfoText[a].classList.toggle('show-text');
        //  divInfoIcon[a].removeChild(text);
        }
      }
    })
  }
})
