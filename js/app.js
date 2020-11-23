/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/

const navbar = document.querySelector('#navbar__list');
const sections = document.getElementsByTagName('section');
const header = document.querySelectorAll('.page__header')[0];



/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
function setBtnEvent(btn){
    btn.addEventListener('click', function (event) {
        var currentActive = getActiveElement();
        if(currentActive.id != btn.dataset.nav)
        {
            setActiveElement(btn.dataset.nav);
            currentActive.classList.remove('active');
        }
    })
}

function buildNav(){
    for(s of sections) {
        var title = s.querySelector('h2').innerText;
        var navItem = document.createElement('li');
        navItem.setAttribute('data-nav', s.id);
        navItem.setAttribute('id', s.id);
        navItem.classList.add('menu__link');
        navItem.innerText = title;
        navbar.appendChild(navItem);
        setBtnEvent(navItem);
    };
}


// Add class 'active' to section when near top of viewport
function setActiveElement(sectionId){
    for(s of sections){
        if(s.id == sectionId){
            s.classList.add('active');
            scrollToClicked(s);
            setActiveBtn(sectionId);
            return;
        }
    }
}

function getActiveElement(){
    var activeEl = null;
    for (s of sections){
        if(s.classList && s.classList.valueOf('active').length > 0){
            activeEl = s;
            return activeEl;
        }
    }
}

function setActiveBtn(btnId){
    var current = navbar.querySelector('.active');
    if(current != null)
        current.classList.remove('active');
    document.getElementById(btnId).classList.add('active');
}
/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/


// Scroll to anchor ID using scrollTO event
function scrollToClicked(el) {
    window.scrollTo({
        top: el.offsetTop,
        behavior: "smooth"
    })
};

window.addEventListener('scroll', function(event){
    if(event.currentTarget.pageYOffset > 100){
        document.getElementById('goTop').classList.add('show');
        document.getElementById('goTop').classList.remove('hide');
        toggleHeader(false);
    }
    else
    {
        document.getElementById('goTop').classList.add('hide');
        document.getElementById('goTop').classList.remove('show');
        toggleHeader(true);
    }
})

function scrollToTop(){
    window.scrollTo(0,0);
}

function toggleHeader(isTop){
    if(!isTop){
        header.classList.remove('top-header')
    }
    else{
        header.classList.add('top-header')
    }
}

function toggleMenu(){
    if(navbar.classList.valueOf('show').length > 0)
        navbar.classList.remove('show')
    else
        navbar.classList.add('show')
}
/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
buildNav();

// Set sections as active
setActiveElement(sections[0].id);
