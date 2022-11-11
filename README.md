This take-home assessment is for Consequence (formerly known as Consequence of Sound). I cold e-mailed Consequence with my resume back in February and got a call from the CTO in May. He said to "take my time" with this assessment, which I am still taking face value. SO, that being said,the potential position (either an internship or a junior dev role) will be front-end. 

The objective of this take-home assessment:

- Go to [Consequence Live](https://consequence.net/live)
The carousel you see contains featured upcoming tours by musicians, bands, comedians, etc. The carousel itself is built with the [splideJS](https://splidejs.com/) library. 

- The user can navigate through the slides by clicking the arrows going forwards/backwards or the images in the thumbnail carousel.  The OBJECTIVE: Every nth image clicked (for example every 3rd), I want to insert an ad. I was given the following code to insert from [google adSense](https://support.google.com/adsense/answer/9190028?hl=en).
```
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1234567890123456" crossorigin="anonymous"></script>
<!-- Homepage Leaderboard -->
<ins class="adsbygoogle"
style="display:inline-block;width:728px;height:90px"
data-ad-client="ca-pub-1234567890123456"
data-ad-slot="1234567890"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>
```

### Source Code & explanations
In `source_code.html` the pertinent lines of code are as follows:

[Importing CSS](https://splidejs.com/guides/getting-started/#importing-css)
A. Line 119

[Building splide carousel with HTML](https://splidejs.com/guides/getting-started/#html) (B. & C.)

Basic building structure:
```
<section class="splide" aria-label="Splide Basic HTML Example">
  <div class="splide__track">
		<ul class="splide__list">
			<li class="splide__slide">Slide 01</li>
			<li class="splide__slide">Slide 02</li>
			<li class="splide__slide">Slide 03</li>
		</ul>
  </div>
</section>
```

* note that instead of "splide", Consequence instantiated new objects using the terms "main" or "thumbnail". (See E.)

B. Lines 1310 - 1425
`<section id="main-carousel>`
- Code block B is what displays the main images in the carousel

C. Lines 1427 - 1462
`<section id="thumbnail-carousel>`
- Code block C displays thumbnail images that moves synchronously with main images

The main differences between B. & C. are merely extra elements for the way the carousel is styled (and to include corresponding links to Ticketmaster). The key component shared by both is the attribute `data-splide-hash={}`(see E.)

Styling CSS
D. Lines 1464 - 1513 

[Splide constructor](https://splidejs.com/guides/options/#by-javascript)
E. Lines 1515 - 1543
- Within the event listener, once `DOMContentLoaded`, the Splide constructor initializes 2 instances within the function parameter. The first object is `main` and the second is `thumbnail`. 

Each object contains its variable's respective id selector as the 1st parameter, so `main`'s id selector is `#main-carousel` and `thumbnail`'s id selector is `#thumbnail carousel`. The 2nd parameter contains the various options used to customize how the carousel works. 

[.sync](https://splidejs.com/tutorials/thumbnail-carousel/#sync)
- `main.sync( thumbnails );` at line 1539 synchronizes the main carousel to thumbnails. This way, when you click on any thumbnail image, the main carousel will display whatever thumbnail image was chosen. Also, when you move from image to image using the arrows in the carousel, you'll see the main displayed image highlighted in its thumbnail form. 

[.mount](https://splidejs.com/guides/apis/#mount) This method initializes the instance and with lines 1540 and 1541, an optional parameter of an "Extension" is passed in.

The "Extension" specifically is for [URL Hash Navigation](https://splidejs.com/extensions/url-hash/)
**URL HASH NAVIGATION** is the key component here. The CTO said that this was my best starting point. 

What the URL Hash Navgiation extension does, is every time you change the image in the carousel, the URL hash will change to reflect the displayed image. 

For example, when you are on the slide displaying 'blink-182', in the URL you will see consequence.net/live/#blink-182. Click on the right arrow, now you see Taylor Swift and the URL changes to consequence.net/live/#taylor-swift

Importing library from [CDN](https://splidejs.com/guides/getting-started/#cdn)
Lines 3155 - 3157 


So now that I've described how the code relevant to the assessment functions (please let me know if you have any questions or require any further clarification), let me explain my approach to finding a solution and exactly where I am stuck and what I need help with.
...
I immediately started by creating a counter and an event listener. The event listener detects whenever the URL hash has changed, and if so the counter will increment by 1. Whenever the count % 4 === 0, I used the [.add method](https://splidejs.com/components/slides/#add()) in line 99 of `cosScript.js` to insert the ad[^1]. *However, wherever the ad slide is inserted, the image that was supposed to appear at that index is replaced. This is because the optional 2nd parameter in `main.add` contains the current index + 1 (see line 92, `const trackIndex`). Also this means that you won't see the ad insert if you go backwards or choose to navigate the carousel with the thumbnail selection.

[^1]: The add method has 2 ways of including a new slide. The first way is to insert HTML as an argument, the second way is to create a new HTML element. The 1st option didn't work because even if I used triple quotes to contain multiple lines of code, the adSense code just was not reading. The 2nd option was just a big mess. So what I did instead was recreate the adSense code from scratch using DOM Manipulation (see lines 2 - 48). Still reaquainting myself with DOM Manipulation so idk if docFrag is even needed (line 48). But point is, I was able to put all the adSense code into `var liSlide` (line 32) *note: I do know that `var` is outdated and I should be using `let` or `const`, but this is how Consequence had their variables in their source code. 

I really couldn't think of anything besides adding and removing ([.remove](https://splidejs.com/components/slides/#remove())). Remove does work but it fires every time the slide has moved (see line 109), I guess my if conditional (counter & 5 === 0) doesn't work but even if it did it's not an ideal way to remove the slide. 

I don't think my answer will be found by inserting and removing the ad slide into the carousel...also it doesn't seem very efficient in regards to runtime. So I'm thinking maybe I need to use REACT. SplideJS does have a REACT integration.

Where I am stuck at now? Well I would like to know whether or not my solution can truly be found using React and the React component for SplideJS? To be quite honest I didn't pay much attention during the React lectures (and the lectures for JavaScript, DOM Manipulation, jQuery, and AJAX--big mistakes I know but I have went back to rewatch the JS and DOM lectures as well as the intro to React. jQuery is pretty straight forward to me but I just would like to know how to write everything in Vanilla JS before going that route. And yeah AJAX isn't applicable here.)

If the answer is yes, then I will happily leap into the depths of re-self-learning React. 

I am writing this before I am writing the e-mail to you, and I most likely will put in the e-mail what I am going to write now, which is:

  - I have been at a loss in regards to which direction I want to go to with programming. Unfortunately I keep hearing the same thing, which is Python is the go to language for Machine Learning. Yes there are back ends that use Python, but I decided that I want to go more towards Front-End as JS, React (and the other JS frameworks) are more widely used. But as you know, finding work isn't easy and I need to portion my time wisely. I am finally starting to get a good grasp on basic leetcode and understanding data structures/algorithms with Python. I would like to keep sticking to that route WHILE getting a stronger fluency in JS. I'm just not ready to do leetcode in JS just yet.
  
  This particular take-home assessment is honestly playing a major factor into whether or not I finally take the leap and go into full blown front-end study and interview preparation.

So my main 2 questions would be, (again) do you think I can complete this assessment by using React (keep in mind I haven't gone through the React Splide documentation and only have very basic introductory knowledge of React for now) AND could you help point me towards the right direction to complete this assessment successfully?

THANK YOU!