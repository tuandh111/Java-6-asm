
let nextCarouselDOM = document.getElementById('next-carousel');
let prevCarouselDOM = document.getElementById('prev-carousel');
let carouselDOM = document.querySelector('.carousel')
let listCarouselDOM = document.querySelector('.carousel .list-carousel')
let thumnailDOM = document.querySelector('.carousel .thumnails')
let timeRunning = 3000
let timeAutoNext = 7000
let runAuto;
let runTimeOut;
console.log(nextCarouselDOM)
nextCarouselDOM.onclick = function () {
    showSlider('next')
}
prevCarouselDOM.onclick = function () {
    showSlider('prev')
}
function showSlider(type) {
    let itemCarouselDOM = document.querySelectorAll('.carousel .list-carousel .item-carousel')
    let itemThumnailsDOM = document.querySelectorAll('.carousel .thumnails .item-thumnails')
    // console.log(itemCarouselDOM)
    // console.log(itemThumnailsDOM)
    if (type === 'next') {
        listCarouselDOM.appendChild(itemCarouselDOM[0])
        thumnailDOM.appendChild(itemThumnailsDOM[0])
        carouselDOM.classList.add('next')
    } else {
        let positionLastItem = itemCarouselDOM.length - 1
        listCarouselDOM.prepend(itemCarouselDOM[positionLastItem])
        thumnailDOM.prepend(itemThumnailsDOM[positionLastItem])
        carouselDOM.classList.add('prev')
    }
    clearTimeout(runTimeOut)
    runTimeOut = setTimeout(() => {
        carouselDOM.classList.remove('next')
        carouselDOM.classList.remove('prev')
    }, timeRunning)
    clearTimeout(runAuto)
    runAuto = setTimeout(() => {

    }, timeAutoNext)
}
