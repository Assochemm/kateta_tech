const section = document.querySelectorAll('section')
const videoContainer = document.querySelector('.video-container')

setTimeout(()=> {
    videoContainer.classList.add('startVideo')
}, 1000)

addEventListener('click', ()=> {
})
var video = document.getElementById("myVideo");

var autoplayDelay = 2000;

setTimeout(function() {
  video.muted = true;
  video.play().then(function() {
  }).catch(function(error) {
    console.error("Autoplay was prevented: ", error);
  });
}, autoplayDelay);

video.addEventListener('ended', function() {
  video.currentTime = 0;
  video.play();
});

let layer = document.querySelector('.cover-page')
const Header = document.querySelector('.header')
const navlinks = document.querySelectorAll('.navlinks a')
const logo = document.querySelector('.logo')
const sidebar = document.querySelector('.sidebar')
const toggleBtn = document.querySelector('.toggle-btn')

const box = document.querySelector('.box');
const contentSections = document.querySelectorAll('.content-inbox');

let contentboxs = document.querySelector('.contents-boxs')
let events = document.querySelector('#events')
let summary = document.querySelector('#summary')
let lastScrollTop = 0;
let degree = 0
const sectionOffsetTop = events.offsetTop;
const sectionHeight = events.offsetHeight;
const windowHeight = window.innerHeight;

section.forEach(sections => {
    sections.addEventListener('click', ()=> {
        sidebar.classList.remove('active')
    })
})
toggleBtn.addEventListener('click', ()=> {
            sidebar.classList.add('active')
    })
    
window.addEventListener('scroll', function() {
    let value = window.scrollY;
    layer.style.left = value*2+'px'


    navlinks.forEach(links => {
        if(value <= 0){
        console.log("wfw")
        logo.classList.remove('logomoves')
        sidebar.classList.add('sidebarapper')
        links.classList.remove('linkmoves') 
        Header.classList.remove('headermoves') 
    } else {
        logo.classList.add('logomoves')
        links.classList.add('linkmoves') 
        sidebar.classList.remove('sidebarapper')
        Header.classList.add('headermoves')
    }

    BookOpen()
});

const scrollTop = window.pageYOffset;
if (
    scrollTop >= sectionOffsetTop - windowHeight / 10 && 
    scrollTop <= sectionOffsetTop + sectionHeight - windowHeight / 1.3
) {
    box.style.position = 'fixed';
    // box.style.top = '10%'; // Adjust as needed to maintain box position within the section
} else {
    box.style.position = 'relative';
    // box.style.top = 'auto';
}

contentSections.forEach((section, index) => {
    if (isInViewport(section)) {
        rotateBoxToContent(index);
        section.style.opacity = '1'
    }else {
          section.style.opacity = '.5'
    }
});

})


let currentContentIndex = -1;

  // Function to check if an element is in the viewport
  function isInViewport(element) {
      const rect = element.getBoundingClientRect();
      return (
          rect.top >= 0 &&
          rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
      );
  }

  // Function to handle box rotation based on active content
  function rotateBoxToContent(index) {
      if (index !== currentContentIndex) {
          currentContentIndex = index;
          const card = document.querySelector(`.box .card:nth-child(${index + 1})`);
          const rotationDegrees = -(index * 90); // Calculate rotation based on content index
          box.style.transform = `perspective(1000px) rotateY(${rotationDegrees}deg)`;
          
          // Add a class to highlight the currently active content
          contentSections.forEach((section) => {
              section.classList.remove('viewport');
              if(section === index.length - 1){
                console.log("over")
              }
          });
          contentSections[index].classList.add('viewport');
      }
    //   if (index === contentSections[index].length - 1) {
    //     console.log("OVER THE KING")
    // }
  }

const startTyping = document.querySelector('#starttyping')    
// const stopTyping = document.querySelector('#stoptyping')
function starttyping() {
const typing = document.getElementById('hidden-text').textContent;
const targetElement = document.getElementById('typing-animation');
const typingSpeed = 30;

function typeWriter(typing, element, speed) {
    let i = 0;
    const cursor = document.querySelector('#cursor')
    const typingInterval = setInterval(() => {
        if (i < typing.length) {
            element.innerHTML += typing.charAt(i);
            i++;
        } else {
            clearInterval(typingInterval);
            clearInterval(cursortyping)
            
        }
    }, speed);
    const cursortyping = setInterval(() => {
        cursor.style.display = (cursor.style.display === 'none' ? 'inline-block' : 'none');
    }, 50); 
}
let clickready = false
// startTyping.addEventListener('click', ()=> {
    typeWriter(typing, targetElement, typingSpeed);
// })
}

const booking = document.querySelector('.wrapper');


let isTypingAnimationRunning = false;
startTyping.addEventListener('click', ()=> {
    if (!isTypingAnimationRunning) {
        starttyping();
        isTypingAnimationRunning = true;
    } else {
    targetElement.innerHTML = ''; 
    startTyping()
}
})

function BookOpen(){
    if (isInViewport(booking)) {
        const pageTurnBtn = document.querySelectorAll('.nextprev-btn')
        
        pageTurnBtn.forEach((el, index) => {
        el.onclick = () => {
        const pageTurnId = el.getAttribute('data-page')
        const pageTurn = document.getElementById(pageTurnId)
        
        if(pageTurn.classList.contains('turn')){
            pageTurn.classList.remove('turn');
            setTimeout(() => {
                pageTurn.style.zIndex = 20 - index
            }, 500)
        }else{
            pageTurn.classList.add('turn');
            setTimeout(() => {
                pageTurn.style.zIndex = 20 + index
            }, 500)
        }
    }
    });
    
    const pages = document.querySelectorAll('.book-page.page-right')
    const contactMeBtn = document.querySelector('.btn.contact-me');
    
    contactMeBtn.onclick = () => {
    pages.forEach((page, index) => {
        setTimeout(()=> {
            page.classList.add('turn');
            
            setTimeout(()=>{
                page.style.zIndex = 20 + index;
            }, 500)
        }, (index + 1) * 200 + 100)
    })
    }
    
    let totalPages = pages.length;
    let pageNumber = 0;
    
    function reverseIndex() {
    pageNumber--;
    if(pageNumber < 0){
        pageNumber = totalPages - 1;
    }
    }
    
    const backProfileBtn = document.querySelector('.back-profile')
    
    backProfileBtn.onclick = () => {
    pages.forEach((_, index) => {
        setTimeout(() => {
            reverseIndex();
            pages[pageNumber].classList.remove('turn')
            
            setTimeout(()=> {
                reverseIndex();
                pages[pageNumber].style.zIndex = 10 + index
            }, 500)
        }, (index + 1) * 200 + 100)
    })
    }
    
    const coverRight = document.querySelector('.cover.cover-right');
    const pageLeft = document.querySelector('.book-page.page-left');
    
    setTimeout(() => {
    coverRight.classList.add('turn')
    }, 2100)
    
    setTimeout(() => {
    coverRight.style.zIndex = -1
    }, 2800)
    
    setTimeout(() => {
    pageLeft.style.zIndex = 20
    }, 3200)
    
    pages.forEach((_, index) => {
    setTimeout(() => {
        reverseIndex();
        pages[pageNumber].classList.remove('turn')
        
        setTimeout(()=> {
            reverseIndex();
            pages[pageNumber].style.zIndex = 10 + index
        }, 500)
    }, (index + 1) * 200 + 2100)
    })
    
    const forWords = document.querySelector('.for-words')
    var countTarget = document.querySelector("#word-count-input");
    var wordCount = document.querySelector("#word-count");
    var characterCount = document.querySelector("#character-count");
    
    var characters = []
    var characters = countTarget.value;
    var characterLength = characters.length;
    
    var count = function(){
    var characters = countTarget.value;
    var characterLength = characters.length;
    var words = characters.split(/[\n\r\s]+/g).filter(function (word){
        return word.length > 0;
    })
    wordCount.innerHTML = words.length;
    characterCount.innerHTML = characterLength;
    };
    count();
    window.addEventListener("keyup", (event)=> {
    if(event.target.matches("#word-count-input")){
        count();
        forWords.style.opacity = '1'
    }
    if(countTarget.value == ""){
        forWords.style.opacity = '0'
    }        
    },
    false
    );
    }
}

let next = document.querySelector('.next')
let prev = document.querySelector('.prev')
let bookslider = document.querySelector('.bookslider')

next.addEventListener('click', ()=> {
let slides = document.querySelectorAll('.bookslides')
bookslider.appendChild(slides[0]);
})
prev.addEventListener('click', ()=> {
let slides = document.querySelectorAll('.bookslides');
bookslider.prepend(slides[slides.length - 1]);
})

ScrollReveal({
    reset: true,
    distance: '90px',
    duration: 3000,
    delay: 250
});

ScrollReveal().reveal('.main-title img, .social-media, .contacting h1', {origin: 'top'});
ScrollReveal().reveal('.main-title h2, .homebtns, .aboutin-contents, .box-stripe', {origin: 'bottom'});
ScrollReveal().reveal('.main-title h1, .news-multiple, .home-content h1, .courses-page h1, .sidecolumn,', {origin: 'left'});
ScrollReveal().reveal('.main-title .line1, .home-content p, .courses-page p, .images', {origin: 'right'});