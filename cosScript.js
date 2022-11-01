// Select <ul> node
var ulElm = document.querySelector('ul');
// Create document fragment to later append googleAd
var docFrag = document.createDocumentFragment();


// create script element
var scriptElm = document.createElement('script');

// set script node attributes
scriptElm.setAttribute('src', 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1234567890123456');
scriptElm.setAttribute('crossorigin', 'anonymous');
scriptElm.setAttribute('async', '')

// create ins element
var insElm = document.createElement('ins');

// add class attribute
insElm.classList.add('adsbygoogle');

// look into inline CSS (not priority right now)
// set attribute
insElm.setAttribute('style', 'display:inline-block;width:728px;height:90px');

// set datasets
insElm.dataset.adClient = 'ca-pub-1234567890123456';
insElm.dataset.adSlot = '1234567890';

// create list element to put ad into
var liSlide = document.createElement('li');
// add class attribute
liSlide.classList.add('splide__slide');
// set dataset attribute
liSlide.dataset.splideHash = 'googleAd';
// set id attribute
// liSlide.setAttribute('id', 'googleAd');
liSlide.setAttribute('class', 'googleAd');
console.log('liSlide before appendChild', liSlide);

// append script and ins nodes
liSlide.appendChild(scriptElm);
liSlide.appendChild(insElm);

// liSlide.appendChild(secScriptElm);
console.log('liSlide after appendChild', liSlide);

// append newly created and updated li element to docFrag
docFrag.appendChild(liSlide);
console.log('docFrag',docFrag);

// GETTING A LIST OF ELEMENTS

// selects all nodes with class "splide__slide"
var liSlides = document.querySelectorAll('li');
console.log('splide__slides',liSlides)

// getting length of list
console.log("length", liSlides.length)

// creating array to hold index nums of liSlides
slide_indices = [];

// Pushing indices to array
for (let i = 0; i < liSlides.length ; i++) {
  slide_indices.push(i);
}

// did it work?
console.log('slide_indices array: ', slide_indices);



// Once DOM content is loaded, execute the following function:
  // instantiate new splide instance, accepting ID selector
  // accept options as 2nd argument (default settings)
document.addEventListener( 'DOMContentLoaded', function () {
  var main = new Splide('#main-carousel', {
    type: 'fade', 
    rewind: true,
    pagination: false,
    arrows: true,
  } );  

  // initializes instance, passing in extension object
  main.mount( window.splide.Extensions )

  // count how many times hash changes
let counter = 0;
  
// upon hashchange event, 
window.addEventListener('hashchange', () => {
  // tracks hash change through console
  const hash = window.location.hash;
  // increments counter by 1
  if (hash != '#googleAd'){
    counter += 1;
  }
  console.log('The hash has changed to ' + hash);
  console.log('counter', counter);
  const trackIndex = main.index + 1;
  console.log('track index: ', trackIndex, 'main.index: ', main.index)
  // console.log('main.index', main.index)

// console.log('checking scope w/main.index', main.index)

if (counter % 4 === 0) {
  main.add(liSlide, trackIndex);
  console.log('did main.add work?', liSlide, trackIndex)

  // main.on('moved', function() {
  //   var theIndex = main.Components.Controller.getIndex(true) + 1;
  //   console.log('theIndex', theIndex)
  //   console.log('did main.remove work?')
  //   main.remove(liSlide, theIndex)
  //   // main.remove(liSlide)
  // })
};
if (counter % 5 === 0) {
  main.on('moved', function() {
    var theIndex = main.Components.Controller.getIndex(true) + 1;
    console.log('theIndex', theIndex)
    console.log('did main.remove work?')
    main.remove(liSlide, theIndex)
    // main.remove( '.googleAd' )
    // main.remove(liSlide)
  })
} 
})




// main.on('moved', function() {
//   var theIndex = main.Components.Controller.getIndex(true) + 1;
//   console.log('theIndex', theIndex)
//   console.log('did main.remove work?')
//   main.remove(liSlide)
// })

// else if (counter % 5 === 0) {
  // main.on('moved', function() {
  //   var theIndex = main.Components.Controller.getIndex(true) + 1;
  //   console.log('theIndex', theIndex)
  //   console.log('did main.remove work?')
  //   main.remove(liSlide)
  // }
  //   )};
  // });
    // counter += 1

  // });
})
