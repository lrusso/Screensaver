# Screensaver

Simple screensaver in React and Vanilla JavaScript.

![alt screenshot](https://raw.githubusercontent.com/lrusso/Screensaver/master/Screensaver.png)

## Vanilla JavaScript version:

https://lrusso.github.io/Screensaver/Screensaver.htm

## React version:

https://github.com/lrusso/Screensaver/blob/master/react/Screensaver.js

## Using the screensaver - Vanilla JavaScript version:

```
const myScreensaver = new Screensaver({
  secondsInactive: 300,
  speed: 2,
  logo: "logo.png",
  disabledWhenUsingIframes: true,
});
```

## Using the screensaver - React version:

```
return (
        <Screensaver
              secondsInactive={300}
              speed={2}
              logo={ScreensaverImage}
              disabledWhenUsingIframes
              />
        )
```
