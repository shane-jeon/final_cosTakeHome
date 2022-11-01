The objective of this Take Home Assignment is to insert an ad after every nth (or in this particular instance, every 3rd) image clicked in 
the [splideJS](https://splidejs.com/) carousel. Splide is basically an easy way to create a carousel.

## Ad Code
The code for the 'ad' is from adSense as seen below
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

## index.html
The carousel is built with HTML. The basic structure of the carousel is as follows

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

My code specifically works with the `<li>` elements and within my index.html, said elements contain the following attributes:
- class="splide__slide"
- data-splide-hash={insert name of band/musician}

data-splide-hash is the most important part to focus on, as whatever that attribute contains is what will appear in the
URL hash.

I was told to start by looking into [URL Hash Navigation](https://splidejs.com/extensions/url-hash/)

The URL hash change is the key component in figuring this problem out. 

I added an event handler so that every time the hash changes, the counter I created will be incremented by 1, unless
the hash is 'googleAd'.

In `cosScript.js`, all code between lines 1 - 50 was my way iof using DOM manipulation to insert the adSense code without having to hardcode it into the `<ul>`. I couldn't just add the HTML element with splide's ["add"](https://splidejs.com/guides/apis/#add) method because for some reason it just would get all messed up. So I used DOM Manipulation to create the element containing elements with all its respective attributes. I then created the variable `liSlide` to contain that adSense code. 


Lines 53 - 55 is just so I can see the list of `<li>` elements in the console, to make sure that the slides I'm seeing are in order and/or visible (see ...)

Lines 60 - 70 serves to create an array containing indices representing the number of `<li>` elements in the `<ul>` that composes the splide slide carousel. I think that maybe index slicing might be a possible solution but I'm still trying to figure out whether the solution is more heavy with the splideJS code or vanilla JS. 


Lines 76 - 85 contains the code that Consequence uses instantiate a Splide object and mount it (as in the carousel is now mounted and working)

Everything past line 87 is where my code gets a bit fuzzy and disoriented. I don't think I need a event listener within an event listener, or if that even is a thing or not good practice, but creating a second and external event listener would mean I couldn't access the variables within the scope of the first event listener (lines 76-85)

So, from line 87:

- create a counter for each time the hash changes

- created an event listener, so whenever it detects a hash change from the window, the code within the function that follows is executed. 

- `const hash` will display whatever text is contained within the URL hash on the console. 

- As long as hash != '#googleAd', the counter will increment by 1. (This is code I added yesterday. I realized the ad was being inserted after the 2nd click or the 4th click as opposed to the 3rd click because the ad slide was contributing to the counter).

- `const trackIndex = main.index + 1`
  - [main.index](https://splidejs.com/guides/apis/#index)
By adding +1 to `main.index`, I was able to add the ad slide following the 3rd image. The console log message on line 108 should only show every time the counter % 4 === 0. 

While I was able to add the ad slide, it only works when you move forward, but not backwards. This is why I think array slicing might be of use (if at all, not sure how to incorporate that here though)

line 118 isn't ideal in regards to telling the computer WHEN to remove the ad slide but keep in mind this is all just brute force for now.

  So, the code contained within this if block...
     ...`main.on` registers an event handler. The `.on` [method](https://splidejs.com/guides/apis/#on) will fire right after the event ["moved"](https://splidejs.com/guides/events/#moved), so after (not before) the carousel moves.

Line 120, I used a [controller](https://splidejs.com/components/controller/). Specifically [.getIndex](https://splidejs.com/components/controller/#getindex). So this is a crapshoot. It does remove the adslide but it's all just really wonky and actually fires after every time the slide moves, the if conditional doesn't do anything--as seen in the console messages.


