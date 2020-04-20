# Screensaver

Simple screensaver in JavaScript.

![alt screenshot](https://raw.githubusercontent.com/lrusso/Screensaver/master/Screensaver.png)

## Web:

https://lrusso.github.io/Screensaver/Screensaver.htm

## Using the screensaver:

* Setting a timeout (in seconds) and a text

```
var myScreensaver = new Screensaver(60, "LRusso.com");
```

* Setting a timeout (in seconds) and a image

```
var myScreensaver = new Screensaver(60, "<img src='https://www.example.com/logo.jpg' alt='logo'/>");
```

* Setting a timeout (in seconds), text, font name, size, color and shadow color

```
var myScreensaver = new Screensaver(60, "LRusso.com", "Arial", "72px", "red", "yellow 10px 10px 10px");
```

* Setting a timeout (in seconds), text, font name, size and color without a shadow color

```
var myScreensaver = new Screensaver(60, "LRusso.com", "Arial", "72px", "red", null);
```

## Updating the screensaver:

```
myScreensaver.setDelay(30);
myScreensaver.setText("Lorem Ipsum");
myScreensaver.setFontFamily("Times New Roman");
myScreensaver.setFontSize("24px");
myScreensaver.setFontColor("red");
myScreensaver.setFontShadow("yellow 10px 10px 10px");
```

