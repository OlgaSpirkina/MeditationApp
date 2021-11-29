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
    this.currentItem = 0; // firs element
    this.root = this.createDivWithClass('carousel');
    this.container = this.createDivWithClass('carousel__container');
    this.root.appendChild(this.container);
    this.element.appendChild(this.root);
    this.moveCallbacks = [];
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
    this.moveCallbacks.forEach(cb => cb(0));

  }
  /**
    setStyle() helps to count appropriate dimentions of each element in carousel
  */
  setStyle(){
    let ratio = this.items.length / this.options.slidesVisible;
    this.container.style.width = (ratio * 100)+"%";
    this.items.forEach(item => item.style.width = ((100 / this.options.slidesVisible) / ratio)+"%")
  }
  createNavigation(){
    let nextButton = this.createDivWithClass('carousel__next');
    let prevButton = this.createDivWithClass('carousel__prev');
    this.root.appendChild(nextButton);
    this.root.appendChild(prevButton);
// bind makes a reference to class and not to nextButton
    nextButton.addEventListener('click', this.next.bind(this));
    prevButton.addEventListener('click', this.prev.bind(this));
    this.onMove(index => {
      if(index === 0){
        prevButton.classList.add('carousel__prev-hidden');
      }else{
        prevButton.classList.remove('carousel__prev-hidden');
      }
      if(this.items[this.currentItem + this.options.slidesVisible] === undefined){
        nextButton.classList.add('carousel__next-hidden');
      }else{
        nextButton.classList.remove('carousel__next-hidden');
      }
    })
  }
  next(){
    this.gotoItem(this.currentItem + this.options.slidesToScroll);
  }
  prev(){
    this.gotoItem(this.currentItem - this.options.slidesToScroll);
  }
  /**
    moves the carousel to the choosen  element
    @param {number} index
  */
  gotoItem(index){
    if(index < 0){
      index = this.items.length - this.options.slidesVisible;
    }else if((index >= this.items.length) || (this.items[this.currentItem + this.options.slidesVisible] === undefined)){
      index = 0;
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
    this.moveCallbacks.push(cb)
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
}

document.addEventListener('DOMContentLoaded', function(){
  new Carousel(document.querySelector('#carousel1'),{
    slidesToScroll: 2,
    slidesVisible: 3,
    loop: false
  })
})
