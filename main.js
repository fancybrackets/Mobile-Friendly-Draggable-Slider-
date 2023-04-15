const carousel = document.querySelector(".carousel") , 
firstImg = carousel.querySelectorAll("img")[0] , 
arrowIcons = document.querySelectorAll(".wrapper i");


let isDragStart = false , prevPageX , prevScrollLeft , positionDiff ; 
let firstImgWidth = firstImg.clientWidth + 14 ; // 14 margin-left değeri
let scrollWidth = carousel.scrollWidth - carousel.clientWidth ;
let isDragging  = false ;  


const showHideIcons = () => {
    arrowIcons[0].style.display  = carousel.scrollLeft == 0 ? "none" : "block" ; 
    arrowIcons[1].style.display  = carousel.scrollLeft == scrollWidth ? "none" : "block" ; 
}

arrowIcons.forEach( 
(icon) => { 
    icon.addEventListener("click", () => {

        carousel.scrollLeft += icon.id == "left" ? -firstImgWidth :firstImgWidth;   

        
        setTimeout( showHideIcons,60) ; 

    } );
}
) ;


const dragStart = (e) => {
    isDragStart = true ; 
      e.preventDefault() ; 


  prevPageX = e.pageX || e.touches[0].pageX ; 

  prevScrollLeft = carousel.scrollLeft ; 
}

const autoSlide = () => {

    if(carousel.scrollLeft - (carousel.scrollWidth - carousel.clientWidth) > -1 || carousel.scrollLeft <= 0) return;

positionDiff = Math.abs(positionDiff) ;
let firstImgWidth = firstImg.clientWidth + 14 ; 
let valDifference = firstImgWidth - positionDiff  ; 

if(carousel.scrollLeft > prevScrollLeft) {

    console.log("slided from the right");
    return carousel.scrollLeft += positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
}
else {
    console.log("slided from the left") ; 
    return carousel.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
}

}



const dragging = (e) => {
    if(!isDragStart) return ; 
  
     positionDiff = ( e.pageX || e.touches[0].pageX ) - prevPageX ;

     
    carousel.scrollLeft = prevScrollLeft - positionDiff ; 


    carousel.classList.add("dragging");

    showHideIcons() ; 

    isDragging = true ; 

}   

const dragStop = () => {
    isDragStart = false ; 

    carousel.classList.remove("dragging");
    if(!isDragging) return ; 
    isDragging = false ; 

    autoSlide(); 

}

carousel.addEventListener("mousedown" ,dragStart );

carousel.addEventListener("touchstart" , dragStart);


carousel.addEventListener("mousemove" , dragging) ; 

carousel.addEventListener("touchmove" , dragging);

carousel.addEventListener("mouseup" , dragStop);

carousel.addEventListener("mouseleave" ,dragStop);
carousel.addEventListener("touchend" , dragStop);

   

