function Screensaver(myDelay, myText, myFontFamily, myFontSize, myFontColor, myFontShadow)
	{
	// SETTING TWO VARIABLES FOR LATER USE
	var myScreensaverBackground = null;
	var myScreensaverText = null;

	// SETTING THE VARIABLE TO KNOW FOR HOW MANY SECONDS THE WEBSITE WAS IDLE (WITHOUT ANY INTERACTION WITH THE USER)
	var screensaverIdleTime = 0;

	// SETTING HOW MANY SECONDS MUST PASS IN ORDER TO THE SCREENSAVER TO BE ACTIVATED
	var screensaverActivateAfterSeconds = 60;

	// SETTING THE SCREENSAVER STATUS
	var screensaverStatusEnabled = false;

	// SETTING THE VARIABLE TO KNOW THE LAST ACTIVE ELEMENT
	var screensaverLastActiveElement = null;

	// SETTING THE VARIABLE TO KNOW THE LAST TOP VALUE (Y-SCROLL)
	var screensaverLastTop = null;

	function screensaverResetIncrement()
		{
		// RESETTING THE IDLE COUNTER
		screensaverIdleTime = 0;

		// CHECKING IF THE SCREENSAVER IS ENABLED
		if (screensaverStatusEnabled==true)
			{
			// STOPPING THE SCREENSAVER
			stopScreensaver();
			}
		}

	function screensaverTimerIncrement()
		{
		// UPDATING THE IDLE COUNTER
		screensaverIdleTime = screensaverIdleTime + 1;

		// CHECKING IF THE IDLE COUNTER IS GREATER THAN THE AMOUNT OF SECONDS
		// THAT MUST PASS IN ORDER TO START THE SCREENSAVER.
		if (screensaverIdleTime >= screensaverActivateAfterSeconds)
			{
			// CHECKING IF THE SCREENSAVER IS ENABLED
			if (screensaverStatusEnabled==false)
				{
				// STARTING THE SCREENSAVER
				startScreensaver();
				}
			}
		}

	function startScreensaver()
		{
		// UPDATING THE SCREEN SAVER STATUS
		screensaverStatusEnabled = true;

		// CHECKING IF THERE IS AN ACTIVE ELEMENT
		if (document.activeElement!=null)
			{
			// SETTING THE LAST ACTIVE ELEMENT VARIABLE FOR LATER USE
			screensaverLastActiveElement = document.activeElement;
			}
			else
			{
			// CLEARING THE LAST ACTIVE ELEMENT VARIABLE
			screensaverLastActiveElement = null;
			}

		// GETTING THE CURRENT PAGE Y-SCROLLING
		screensaverLastTop = window.pageYOffset;

		// REMOVING THE Y-SCROLLING FROM THE WEBSITE
		document.getElementsByTagName("BODY")[0].style.overflowY = "hidden";

		// LOCATING THE SCREENSAVER TEXT TO THE TOP-LEFT CORNER
		myScreensaverText.style.left = 0;
		myScreensaverText.style.top = 0;

		// SHOWING THE SCREENSAVER
		myScreensaverBackground.style.display = "block";

		// SCROLLING TO THE TOP-LEFT CORNER
		window.scrollTo(0,0);

		// STARTING THE SCREENSAVER ANIMATION
		screensaverAnimation();
		}

	function stopScreensaver()
		{
		// UPDATING THE SCREENSAVER STATUS
		screensaverStatusEnabled = false;

		// RESETTING THE IDLE COUNTER
		screensaverIdleTime = 0;

		// RESTORING THE Y-SCROLLING FROM THE WEBSITE
		document.getElementsByTagName("BODY")[0].style.overflowY = "initial";

		// HIDING THE SCREENSAVER
		myScreensaverBackground.style.display = "none";

		// CHECKING IF THERE IS A LAST ACTIVE ELEMENT
		if (screensaverLastActiveElement!=null)
			{
			// FOCUSING THE LAST ACTIVE ELEMENT
			try{screensaverLastActiveElement.focus()}catch(err){}

			// RESETTING THE LAST ACTIVE ELEMENT VARIABLE
			screensaverLastActiveElement = null;
			}

		// CHECKING THE ORIGINAL Y-SCROLLING THAT THE WEBSITE HAD
		if (screensaverLastTop!=null)
			{
			// RESTORING THE ORIGINAL Y-SCROLLING
			try{window.scrollTo(0,window.screensaverLastTop)}catch(err){}

			// CLEARING THE LAST Y-SCROLLING VARIABLE
			screensaverLastTop = null;
			}
		}

	function screensaverAnimation()
		{
		// CREATING THE REFERENCES TO THE SCREENSAVER AND THE SCREENSAVER TEXT
		var container = myScreensaverBackground;
		var elem = myScreensaverText;

		// SETTING THE MINIMUM VALUE FOR X WITHIN THE WEB
		var minX = 0;

		// SETTING THE MAXIMUM VALUE FOR X WITHIN THE WEB
		var maxX = container.offsetWidth - elem.offsetWidth - 5;

		// GETTING A RANDOM VALUE FOR X BETWEEN THE MINIMUM AND MAXIMUM
		var x = Math.floor(Math.random()*(maxX-minX+1)+minX);

		// SETTING THE MINIMUM VALUE FOR Y WITHIN THE WEB
		var minY = 0;

		// SETTING THE MAXIMUM VALUE FOR Y WITHIN THE WEB
		var maxY = container.offsetHeight - elem.offsetHeight - 5;

		// GETTING A RANDOM VALUE FOR Y BETWEEN THE MINIMUM AND MAXIMUM
		var y = Math.floor(Math.random()*(maxY-minY+1)+minY);

		// GETTING THE CURRENT LEFT POSITION FOR THE SCREENSAVER TEXT
		var left = parseInt(elem.style.left, 10);

		// GETTING THE CURRENT TOP POSITION FOR THE SCREENSAVER TEXT
		var top = parseInt(elem.style.top, 10);

		// GETTING THE DISTANCE BETWEEN THE LEFT-ORIGIN POINT AND THE LEFT-DESTINY POINT
		var dx = left - x;

		// GETTING THE DISTANCE BETWEEN THE TOP-ORIGIN POINT AND THE TOP-DESTINY POINT
		var dy = top - y;

		// CREATING TWO COUNTERS FOR LATER USE
		var movementsToGetToDestiny = 0;
		var currentMovements = 1;

		// SETTING HOW FAST THE SCREENSAVER TEXT WILL BE MOVING
		var speed = 1.5;

		// CALCULATING HOW MANY MOVEMENTS MUST BE DONE BETWEEN THE ORIGIN POINT AND THE DESTINY POINT
		if (Math.abs(dx)>Math.abs(dy))
			{
			movementsToGetToDestiny = parseFloat(Math.abs(dx) / speed).toFixed(0);
			}
			else
			{
			movementsToGetToDestiny = parseFloat(Math.abs(dy) / speed).toFixed(0);
			}

		// FUNCTION THAT IT'S CALLED FOR MOVING THE SCREENSAVER TEXT
		function loop()
			{
			// CHECKING IF THE SCREENSAVER IS ENABLED
			if (screensaverStatusEnabled==true)
				{
				// CHECKING IF THE SCREENSAVER TEXT ARRIVED TO THE DESTINY POINT
				if (currentMovements>=movementsToGetToDestiny)
					{
					// CALLING THE ANIMATION FUNCTION TO GET A NEW DESTINY POINT
					screensaverAnimation();
					}
					else
					{
					// UPDATING THE CURRENT MOVEMENTS COUNTER
					currentMovements = currentMovements + 1;

					// GETTING THE FINAL X
					var finalX = left - (dx * currentMovements / movementsToGetToDestiny);

					// GETTING THE FINAL Y
					var finalY = top - (dy * currentMovements / movementsToGetToDestiny);

					// MOVING SCREENSAVER TEXT TO THE FINAL X
					elem.style.left = (finalX).toFixed(0) + "px";

					// MOVING SCREENSAVER TEXT TO THE FINAL Y
					elem.style.top = (finalY).toFixed(0) + "px";

					// WAITING 20 MS FOR THE NEXT MOVEMENT
					setTimeout(loop, 20);
					}
				}
			}

		// RUNNING THE SCREENSAVER LOOP
		loop();
		}

	function addScreensaver()
		{
		// CHECKING IF A DELAY WAS DEFINED
		if(typeof myDelay !== "undefined")
			{
			// SETTING THE CUSTOM DELAY
			screensaverActivateAfterSeconds = myDelay;
			}

		// CHECKING IF A TEXT WASN'T DEFINED
		if(typeof myText === "undefined")
			{
			// SETTING THE DEFAULT TEXT
			myText = "Screensaver";
			}

		// CHECKING IF A FONT FAMILY WASN'T DEFINED
		if(typeof myFontFamily === "undefined")
			{
			// SETTING THE DEFAULT FONT FAMILY
			myFontFamily = "Arial";
			}

		// CHECKING IF A FONT SIZE WASN'T DEFINED
		if(typeof myFontSize === "undefined")
			{
			// SETTING THE DEFAULT FONT SIZE
			myFontSize = "72px";
			}

		// CHECKING IF A FONT COLOR WASN'T DEFINED
		if(typeof myFontColor === "undefined")
			{
			// SETTING THE DEFAULT FONT COLOR
			myFontColor = "#316faa";
			}

		// CHECKING IF A SHADOW COLOR WASN'T DEFINED
		if(typeof myFontShadow === "undefined")
			{
			// SETTING THE DEFAULT SHADOW COLOR
			myFontShadow = "#545454";
			}

		// CREATING THE SCREENSAVER BACKGROUND WITH ALL THE PROPERTIES
		myScreensaverBackground = document.createElement("div");
		myScreensaverBackground.style.position = "fixed";
		myScreensaverBackground.style.left = 0;
		myScreensaverBackground.style.right = 0;
		myScreensaverBackground.style.top = 0;
		myScreensaverBackground.style.bottom = 0;
		myScreensaverBackground.style.zIndex = 9999;
		myScreensaverBackground.style.cursor = "none";
		myScreensaverBackground.style.display = "none";
		myScreensaverBackground.style.outline = "none";
		myScreensaverBackground.style.backgroundColor = "black";
		myScreensaverBackground.style.userSelect = "none";

		// CREATING THE SCREENSAVER TEXT WITH ALL THE PROPERTIES
		myScreensaverText = document.createElement("div");
		myScreensaverText.style.position = "fixed";
		myScreensaverText.style.fontFamily = myFontFamily;
		myScreensaverText.style.fontWeight = "bold";
		myScreensaverText.style.textAlign = "center";
		myScreensaverText.style.fontSize = myFontSize;
		myScreensaverText.style.color = myFontColor;
		// CHECKING IF THE USER DOESN'T WANT A SHADOW COLOR
		if (myFontShadow!=null)
			{
			myScreensaverText.style.textShadow = myFontShadow + " 4px 4px 4px";
			}
		myScreensaverText.style.cursor = "none";
		myScreensaverText.style.outline = "none";

		// SETTING THE SCREENSAVER TEXT
		myScreensaverText.innerHTML = myText;

		// ADDING THE SCREENSAVER TEXT TO THE SCREENSAVER BACKGROUND
		myScreensaverBackground.appendChild(myScreensaverText);

		// ADDING THE SCREENSAVER BACKGROUND TO THE WEBSITE
		document.getElementsByTagName("BODY")[0].appendChild(myScreensaverBackground);
		}

	window.addEventListener("load", function()
		{
		addScreensaver();
		setInterval(screensaverTimerIncrement, 1000);
		document.addEventListener("wheel", screensaverResetIncrement, false);
		document.addEventListener("click", screensaverResetIncrement, false);
		document.addEventListener("dblclick", screensaverResetIncrement, false);
		document.addEventListener("mousemove", screensaverResetIncrement, false);
		document.addEventListener("keypress", screensaverResetIncrement, false);
		document.addEventListener("keydown", screensaverResetIncrement, false);
		document.addEventListener("keyup", screensaverResetIncrement, false);
		});
	}