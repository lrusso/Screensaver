class Screensaver
	{
	constructor(myDelay, myText, myFontFamily, myFontSize, myFontColor, myFontShadow)
		{
		// SETTING THE SCREENSAVER PROPERTIES
		this.myDelay = myDelay;
		this.myText = myText;
		this.myFontFamily = myFontFamily;
		this.myFontSize = myFontSize;
		this.myFontColor = myFontColor;
		this.myFontShadow = myFontShadow;

		// SETTING TWO VARIABLES FOR LATER USE
		this.myScreensaverBackground = null;
		this.myScreensaverText = null;

		// SETTING THE VARIABLE TO KNOW FOR HOW MANY SECONDS THE WEBSITE WAS IDLE (WITHOUT ANY INTERACTION WITH THE USER)
		this.screensaverIdleTime = 0;

		// SETTING HOW MANY SECONDS MUST PASS IN ORDER TO THE SCREENSAVER TO BE ACTIVATED
		this.screensaverActivateAfterSeconds = 60;

		// SETTING THE SCREENSAVER STATUS
		this.screensaverStatusEnabled = false;

		// SETTING THE VARIABLE TO KNOW THE LAST ACTIVE ELEMENT
		this.screensaverLastActiveElement = null;

		// SETTING THE VARIABLE TO KNOW THE LAST TOP VALUE (Y-SCROLL)
		this.screensaverLastTop = null;

		this.start();
		}

	setDelay(myDelay)
		{
		this.myDelay = myDelay;
		this.screensaverActivateAfterSeconds = myDelay;
		}

	getDelay()
		{
		return this.myDelay;
		}

	setText(myText)
		{
		this.myText = myText;
		this.myScreensaverText.innerHTML = myText;
		}

	getText()
		{
		return this.myText;
		}

	setFontFamily(myFontFamily)
		{
		this.myFontFamily = myFontFamily;
		this.myScreensaverText.style.fontFamily = myFontFamily;
		}

	getFontFamily()
		{
		return this.myFontFamily;
		}

	setFontSize(myFontSize)
		{
		this.myFontSize = myFontSize;
		this.myScreensaverText.style.fontSize = myFontSize;
		}

	getFontSize()
		{
		return this.myFontSize;
		}

	setFontColor(myFontColor)
		{
		this.myFontColor = myFontColor;
		this.myScreensaverText.style.color = myFontColor;
		}

	getFontColor()
		{
		return this.myFontColor;
		}

	setFontShadow(myFontShadow)
		{
		this.myFontShadow = myFontShadow;
		if (this.myFontShadow!=null)
			{
			this.myScreensaverText.style.textShadow = this.myFontShadow + " 4px 4px 4px";
			}
			else
			{
			this.myScreensaverText.style.textShadow = "black 0px 0px 0px";
			}
		}

	getFontShadow()
		{
		return this.myFontShadow;
		}

	start()
		{
		// ADDING THE SCREENSAVER LAYOUT
		this.addScreensaver();

		var algo = this;

		// SETTING THE INTERVAL FOR CHECKING THE IDLE COUNTER
		setInterval(algo.screensaverTimerIncrement.bind(algo), 1000);

		// SETTING ALL THE EVENTS THAT WILL RESET THE IDLE COUNTER
		window.addEventListener("wheel", function(){algo.screensaverResetIncrement()});
		window.addEventListener("click", function(){algo.screensaverResetIncrement()});
		window.addEventListener("dblclick", function(){algo.screensaverResetIncrement()});
		window.addEventListener("mousemove", function(){algo.screensaverResetIncrement()});
		window.addEventListener("keypress", function(){algo.screensaverResetIncrement()});
		window.addEventListener("keydown", function(){algo.screensaverResetIncrement()});
		window.addEventListener("keyup", function(){algo.screensaverResetIncrement()});
		}

	screensaverResetIncrement()
		{
		// RESETTING THE IDLE COUNTER
		this.screensaverIdleTime = 0;

		// CHECKING IF THE SCREENSAVER IS ENABLED
		if (this.screensaverStatusEnabled==true)
			{
			// STOPPING THE SCREENSAVER
			this.stopScreensaver();
			}
		}

	screensaverTimerIncrement()
		{
		// UPDATING THE IDLE COUNTER
		this.screensaverIdleTime = this.screensaverIdleTime + 1;

		// CHECKING IF THE IDLE COUNTER IS GREATER THAN THE AMOUNT OF SECONDS
		// THAT MUST PASS IN ORDER TO START THE SCREENSAVER.
		if (this.screensaverIdleTime >= this.screensaverActivateAfterSeconds)
			{
			// CHECKING IF THE SCREENSAVER IS ENABLED
			if (this.screensaverStatusEnabled==false)
				{
				// STARTING THE SCREENSAVER
				this.startScreensaver();
				}
			}
		}

	startScreensaver()
		{
		// UPDATING THE SCREEN SAVER STATUS
		this.screensaverStatusEnabled = true;

		// CHECKING IF THERE IS AN ACTIVE ELEMENT
		if (document.activeElement!=null)
			{
			// SETTING THE LAST ACTIVE ELEMENT VARIABLE FOR LATER USE
			this.screensaverLastActiveElement = document.activeElement;
			}
			else
			{
			// CLEARING THE LAST ACTIVE ELEMENT VARIABLE
			this.screensaverLastActiveElement = null;
			}

		// GETTING THE CURRENT PAGE Y-SCROLLING
		this.screensaverLastTop = window.pageYOffset;

		// REMOVING THE Y-SCROLLING FROM THE WEBSITE
		document.getElementsByTagName("BODY")[0].style.overflowY = "hidden";

		// LOCATING THE SCREENSAVER TEXT TO THE TOP-LEFT CORNER
		this.myScreensaverText.style.left = 0;
		this.myScreensaverText.style.top = 0;

		// SHOWING THE SCREENSAVER
		this.myScreensaverBackground.style.display = "block";

		// SCROLLING TO THE TOP-LEFT CORNER
		window.scrollTo(0,0);

		// STARTING THE SCREENSAVER ANIMATION
		this.screensaverAnimation();
		}

	stopScreensaver()
		{
		// UPDATING THE SCREENSAVER STATUS
		this.screensaverStatusEnabled = false;

		// RESETTING THE IDLE COUNTER
		this.screensaverIdleTime = 0;

		// RESTORING THE Y-SCROLLING FROM THE WEBSITE
		document.getElementsByTagName("BODY")[0].style.overflowY = "initial";

		// HIDING THE SCREENSAVER
		this.myScreensaverBackground.style.display = "none";

		// CHECKING IF THERE IS A LAST ACTIVE ELEMENT
		if (this.screensaverLastActiveElement!=null)
			{
			// FOCUSING THE LAST ACTIVE ELEMENT
			try{this.screensaverLastActiveElement.focus()}catch(err){}

			// RESETTING THE LAST ACTIVE ELEMENT VARIABLE
			this.screensaverLastActiveElement = null;
			}

		// CHECKING THE ORIGINAL Y-SCROLLING THAT THE WEBSITE HAD
		if (this.screensaverLastTop!=null)
			{
			// RESTORING THE ORIGINAL Y-SCROLLING
			try{window.scrollTo(0,window.this.screensaverLastTop)}catch(err){}

			// CLEARING THE LAST Y-SCROLLING VARIABLE
			this.screensaverLastTop = null;
			}
		}

	screensaverAnimation()
		{
		// CREATING THE REFERENCES TO THE SCREENSAVER AND THE SCREENSAVER TEXT
		var container = this.myScreensaverBackground;
		var elem = this.myScreensaverText;

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

		var algo = this;

		// FUNCTION THAT IT'S CALLED FOR MOVING THE SCREENSAVER TEXT
		function loop()
			{
			// CHECKING IF THE SCREENSAVER IS ENABLED
			if (algo.screensaverStatusEnabled==true)
				{
				// CHECKING IF THE SCREENSAVER TEXT ARRIVED TO THE DESTINY POINT
				if (currentMovements>=movementsToGetToDestiny)
					{
					// CALLING THE ANIMATION FUNCTION TO GET A NEW DESTINY POINT
					algo.screensaverAnimation();
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

	addScreensaver()
		{
		// CHECKING IF A DELAY WAS DEFINED
		if(typeof this.myDelay !== "undefined")
			{
			// SETTING THE CUSTOM DELAY
			this.screensaverActivateAfterSeconds = this.myDelay;
			}

		// CHECKING IF A TEXT WASN'T DEFINED
		if(typeof this.myText === "undefined")
			{
			// SETTING THE DEFAULT TEXT
			this.myText = "Screensaver";
			}

		// CHECKING IF A FONT FAMILY WASN'T DEFINED
		if(typeof this.myFontFamily === "undefined")
			{
			// SETTING THE DEFAULT FONT FAMILY
			this.myFontFamily = "Arial";
			}

		// CHECKING IF A FONT SIZE WASN'T DEFINED
		if(typeof this.myFontSize === "undefined")
			{
			// SETTING THE DEFAULT FONT SIZE
			this.myFontSize = "72px";
			}

		// CHECKING IF A FONT COLOR WASN'T DEFINED
		if(typeof this.myFontColor === "undefined")
			{
			// SETTING THE DEFAULT FONT COLOR
			this.myFontColor = "#316faa";
			}

		// CHECKING IF A SHADOW COLOR WASN'T DEFINED
		if(typeof this.myFontShadow === "undefined")
			{
			// SETTING THE DEFAULT SHADOW COLOR
			this.myFontShadow = "#545454";
			}

		// CREATING THE SCREENSAVER BACKGROUND WITH ALL THE PROPERTIES
		this.myScreensaverBackground = document.createElement("div");
		this.myScreensaverBackground.style.position = "fixed";
		this.myScreensaverBackground.style.left = 0;
		this.myScreensaverBackground.style.right = 0;
		this.myScreensaverBackground.style.top = 0;
		this.myScreensaverBackground.style.bottom = 0;
		this.myScreensaverBackground.style.zIndex = 9999;
		this.myScreensaverBackground.style.cursor = "none";
		this.myScreensaverBackground.style.display = "none";
		this.myScreensaverBackground.style.outline = "none";
		this.myScreensaverBackground.style.backgroundColor = "black";
		this.myScreensaverBackground.style.userSelect = "none";

		// CREATING THE SCREENSAVER TEXT WITH ALL THE PROPERTIES
		this.myScreensaverText = document.createElement("div");
		this.myScreensaverText.style.position = "fixed";
		this.myScreensaverText.style.fontFamily = this.myFontFamily;
		this.myScreensaverText.style.fontWeight = "bold";
		this.myScreensaverText.style.textAlign = "center";
		this.myScreensaverText.style.fontSize = this.myFontSize;
		this.myScreensaverText.style.color = this.myFontColor;
		// CHECKING IF THE USER DOESN'T WANT A SHADOW COLOR
		if (this.myFontShadow!=null)
			{
			this.myScreensaverText.style.textShadow = this.myFontShadow + " 4px 4px 4px";
			}
		this.myScreensaverText.style.cursor = "none";
		this.myScreensaverText.style.outline = "none";

		// SETTING THE SCREENSAVER TEXT
		this.myScreensaverText.innerHTML = this.myText;

		// ADDING THE SCREENSAVER TEXT TO THE SCREENSAVER BACKGROUND
		this.myScreensaverBackground.appendChild(this.myScreensaverText);

		// ADDING THE SCREENSAVER BACKGROUND TO THE WEBSITE
		document.getElementsByTagName("BODY")[0].appendChild(this.myScreensaverBackground);
		}
	}