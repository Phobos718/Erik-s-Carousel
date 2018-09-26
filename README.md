# Erik's Carousel
JQuery Carousel plugin - practice project

To Run,
- Embed JQuery, my script and css on the HTML page where you'd like the carousel displayed as seen in the sample index.html I have provided
```
        <link rel='stylesheet' type='text/css' href='dist/sass/style.css'/>
        <script type="text/javascript" src="http://code.jquery.com/jquery-latest.min.js"></script>     
        <script type="text/javascript" src="src/JS/carousel_plugin.js"></script>      
```
 - Then include the following structure on your page with the URLs of the images you'd like to display:
```
        <div class="carousel">
	        <div class="slides">
	            <ul>
	            	<li class='slide_active'><img src="src/assets/image1.jpg"></li>
	            	<li class='slide'><img src="src/assets/image2.jpg"></li>
	            	<li class='slide'><img src="src/assets/image3.jpg"></li>
                <li class='slide'><img src="src/assets/image4.jpg"></li>
                <li class='slide'><img src="src/assets/image5.jpg"></li>
	            </ul>
	        </div>
        </div>
```
- Finally, call the script targeting the class of the outer div and specify your options as seen below:
```
        <script type="text/javascript">
            $(document).ready(function(){
                $('.carousel').ErikzCarousel({
                    indicator: true,
                    buttons: true,
                    loopable: true,
                    autoplay: false,      // false for off or frequency in miliseconds
                    animation: 'slide',   // alternatively 'fade'
                    animSpeed: 500
                });
            });
        </script>
```
