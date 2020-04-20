# Screensaver

Simple screensaver in JavaScript.

![alt screenshot](https://raw.githubusercontent.com/lrusso/Screensaver/master/Screensaver.png)

## Web:

https://lrusso.github.io/Screensaver/Screensaver.htm

## Using the screensaver:

* Setting a timeout (in seconds) and a text

```
Screensaver(60, "LRusso.com");
```

* Setting a timeout (in seconds) and a image

```
Screensaver(60, "<img src='https://www.example.com/myImage.jpg' alt='logo'/>");
```

* Setting a timeout (in seconds), text, font name, size, color and shadow color

```
Screensaver(60, "LRusso.com", "Arial", "72px", "red", "yellow");
```

* Setting a timeout (in seconds), text, font name, size and color without a shadow color

```
Screensaver(60, "LRusso.com", "Arial", "72px", "red", null);
```


