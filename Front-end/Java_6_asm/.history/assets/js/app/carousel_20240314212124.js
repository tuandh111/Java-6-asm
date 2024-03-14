let nextCarouselDOM = document.createElementById('#next-carousel');
let prevCarouselDOM = document.createElementById('prev-carousel');
let carouselDOM = document.querySelector('.carousel')
let listCarouselDOM = document.querySelector('.carousel .list-carousel')
let thumnailDOM = document.querySelector('.carousel .thumnails')

// nextCarouselDOM.onClick = function () {
//     showSlider('next')
//     alert('Next carousel')
// }
// function showSlider(type) {
//     let itemCarouselDOM = document.querySelector('.carousel .list-carousel .item-carousel')
//     let itemThumnailsDOM = document.querySelector('.carousel .thumnails .item-thumnails')
//     if (type === 'next') {
//         listCarouselDOM.appendChild(itemCarouselDOM[0])
//         thumnailDOM.appendChild(itemThumnailsDOM[0])
//         carouselDOM.classList.add('next')
//     }
// }
