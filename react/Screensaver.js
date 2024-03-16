import React from "react"

/*

---------------------------------------------------------------------------
HOW TO USE IT:
---------------------------------------------------------------------------

import ScreensaverImage from "../assets/Screensaver.png"

return (
        <Screensaver
              secondsInactive={300}
              speed={2}
              logo={ScreensaverImage}
              disabledWhenUsingIframes
              />
        )
*/

const Screensaver = ({ secondsInactive, speed, logo, disabledWhenUsingIframes }) => {
  const [counter, setCounter] = React.useState(0)
  const [imgWidth, setImgWidth] = React.useState(0)
  const [imgHeight, setImgHeight] = React.useState(0)

  const hasIframe = document.getElementsByTagName("iframe")[0] ? true : false

  React.useEffect(() => {
    const resetCounter = () => {
      setCounter(0)
    }

    document.addEventListener("mouseup", resetCounter)
    document.addEventListener("mousemove", resetCounter)
    document.addEventListener("wheel", resetCounter)
    document.addEventListener("keyup", resetCounter)

    const tmpImg = document.createElement("img")
    tmpImg.src = logo
    tmpImg.onload = () => {
      setImgWidth(tmpImg.width)
      setImgHeight(tmpImg.height)
    }

    const updateInterval = setInterval(() => {
      setCounter((prevState) => prevState + 1)
    }, 1000)

    return () => {
      clearInterval(updateInterval)
      document.removeEventListener("mouseup", resetCounter)
      document.removeEventListener("mousemove", resetCounter)
      document.removeEventListener("wheel", resetCounter)
      document.removeEventListener("keyup", resetCounter)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  React.useEffect(() => {
    if (counter === secondsInactive) {
      window.scrollTo(0, 0)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [counter])

  if (counter < secondsInactive) {
    return null
  }

  if (disabledWhenUsingIframes && hasIframe) {
    return null
  }

  return (
    <ScreenSaverLayout
      imgWidth={imgWidth}
      imgHeight={imgHeight}
      speed={speed}
      logo={logo}
    />
  )
}

const ScreenSaverLayout = ({ imgWidth, imgHeight, speed, logo }) => {
  const [positionX, setPositionX] = React.useState(-imgWidth)
  const [positionY, setPositionY] = React.useState(0)
  const [goDown, setGoDown] = React.useState(true)

  React.useEffect(() => {
    if (positionX > window.innerWidth) {
      setPositionX(-imgWidth)
      setPositionY(
        Math.floor(
          (Math.floor(Math.random() * 100) * (window.innerHeight - imgHeight)) / 100
        )
      )
    } else {
      if (positionY < 0 || positionY > window.innerHeight - imgHeight) {
        if (positionY < 0) {
          setGoDown(true)
          setPositionY((prevState) => prevState + speed)
        } else if (positionY >= window.innerHeight - imgHeight) {
          setGoDown(false)
          setPositionY((prevState) => prevState - speed)
        }
      }
      if (goDown) {
        setPositionY((prevState) => prevState + speed)
      } else {
        setPositionY((prevState) => prevState - speed)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [positionX])

  React.useEffect(() => {
    setPositionY(
      Math.floor(
        (Math.floor(Math.random() * 100) * (window.innerHeight - imgHeight)) / 100
      )
    )

    const movementInterval = setInterval(() => {
      setPositionX((prevState) => prevState + speed)
    }, 30)

    // SAFARI WORKAROUND
    const originalBodyCursor = document.body.style.cursor
    document.body.style.cursor = "none"

    return () => {
      document.body.style.cursor = originalBodyCursor
      clearInterval(movementInterval)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      style={{
        backgroundImage: `url(${logo})`,
        backgroundPositionX: positionX,
        backgroundPositionY: positionY,
        ...styles.container,
      }}
    ></div>
  )
}

const styles = {
  container: {
    position: "absolute",
    minWidth: "1004px",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    zIndex: "9999",
    backgroundColor: "#000000",
    backgroundRepeat: "no-repeat",
    userSelect: "none",
    WebkitUserSelect: "none",
    cursor: "none",
  },
}

export default Screensaver
