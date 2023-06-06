function clampBuilder( minWidthPx, maxWidthPx, minFontSize, maxFontSize ) {
    const root = document.querySelector( "html" );
    const pixelsPerRem = Number( getComputedStyle( root ).fontSize.slice( 0,-2 ) );
  
    const minWidth = minWidthPx / pixelsPerRem;
    const maxWidth = maxWidthPx / pixelsPerRem;
  
    const slope = ( maxFontSize - minFontSize ) / ( maxWidth - minWidth );
    const yAxisIntersection = -minWidth * slope + minFontSize
  
    return `clamp( ${ minFontSize }rem, ${ yAxisIntersection }rem + ${ slope * 100 }vw, ${ maxFontSize }rem )`;
  }

console.log( clampBuilder( 500, 1280, 1.4, 2 ) );

let title = document.querySelector('.title');

let newSpan = title.innerText.split('').map((letter, index) => {
    return `<span>${letter}</span>`;
    
})
.join('');

title.innerHTML = newSpan;

let letters = document.querySelectorAll('.title span');

let tl = gsap.timeline(defaults = {ease: "power2.inOut", repeat:0, repeatDelay: 0});

tl.from(letters, {color:'white', filter:'blur(60px)' ,stagger: 1/5, duration: 1})
.to(letters, {textShadow: '1px -1px 0 pink, -2px 2px 1px pink, -3px 4px 1px white', duration: 1});

// Sidebar Height

let sidebar = document.querySelector('.sidebar');
let header = document.querySelector('.header');
let listElements = document.querySelectorAll('.sidebar li');
let mainCont = document.querySelector('.main-cont');
let headerIcon = document.querySelector('.header i');
let contElementHeadings = document.querySelectorAll('.cont h1');
// Overall document height
let sidebarHeight = document.body.clientHeight - header.clientHeight;
let mainContHeight = document.body.clientHeight - header.clientHeight;
// Set sidebar height
sidebar.style.height = sidebarHeight + 'px';
mainCont.style.height = mainContHeight + 'px';

// Sidebar Icon
let clicks = 2;
headerIcon.addEventListener('click', () => {
    clicks++;
    if(clicks % 2 === 1) {
    gsap.to(sidebar, {x: `-${sidebar.offsetWidth}`, duration: 0.15, ease: "none"});
    gsap.set(sidebar, {display: 'none', delay: 0.15});
    gsap.set(mainCont, {flexBasis: '100%'}, '<');
    headerIcon.style.transform = 'rotate(90deg)';
    } else {
        gsap.set(sidebar, {display: 'block'});
        gsap.to(sidebar, {x: 0, duration: 0.15, ease: "none"});
        gsap.set(mainCont, {flexBasis: '80%'});
        headerIcon.style.transform = 'rotate(0deg)';
    }
})

listElements.forEach((element, index) => {
    console.log(element.innerText);
    Array.from(contElementHeadings)[index].innerText = element.innerText;

});

let listItems = Array.from(listElements);
let contentItems = document.querySelectorAll('.cont');
contentItems = Array.from(contentItems);

listItems.forEach((item, index) => {
  item.addEventListener('click', () => {
    contentItems.forEach((content, contentIndex) => {
      if (contentIndex === index) {
        content.style.display = 'block';
      } else {
        content.style.display = 'none';
      }
    });
  });
});
