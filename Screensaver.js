class Screensaver {
  constructor({ secondsInactive, speed, logo, disabledWhenUsingIframes }) {
    this.secondsInactive = secondsInactive
    this.speed = speed
    this.logo = logo
    this.disabledWhenUsingIframes = disabledWhenUsingIframes
    this.container = null
    this.imgX = 0
    this.imgY = 0
    this.imgWidth = 0
    this.imgHeight = 0
    this.idleCounter = 0
    this.movingDown = true
    this.enabled = false

    const _this = this
    const tmpImg = document.createElement("img")
    tmpImg.src = logo
    tmpImg.onload = function () {
      _this.imgWidth = tmpImg.width
      _this.imgHeight = tmpImg.height
      _this.init()
    }
  }

  init() {
    this.container = document.createElement("div")
    this.container.style.position = "fixed"
    this.container.style.left = 0
    this.container.style.right = 0
    this.container.style.top = 0
    this.container.style.bottom = 0
    this.container.style.zIndex = 9999
    this.container.style.cursor = "none"
    this.container.style.display = "none"
    this.container.style.outline = "none"
    this.container.style.backgroundColor = "black"
    this.container.style.userSelect = "none"
    this.container.style.backgroundImage = `url(${this.logo})`
    this.container.style.backgroundRepeat = "no-repeat"
    document.getElementsByTagName("BODY")[0].appendChild(this.container)

    const _this = this
    setInterval(_this.updateCounter.bind(_this), 1000)

    window.addEventListener("click", function () {
      _this.stop()
    })
    window.addEventListener("dblclick", function () {
      _this.stop()
    })
    window.addEventListener("mouseup", function () {
      _this.stop()
    })
    window.addEventListener("mousemove", function () {
      _this.stop()
    })
    window.addEventListener("wheel", function () {
      _this.stop()
    })
    window.addEventListener("keypress", function () {
      _this.stop()
    })
    window.addEventListener("keydown", function () {
      _this.stop()
    })
    window.addEventListener("keyup", function () {
      _this.stop()
    })
    window.addEventListener("touchstart", function () {
      _this.stop()
    })
  }

  updateCounter() {
    const hasIframe = document.getElementsByTagName("iframe")[0] ? true : false

    if (this.disabledWhenUsingIframes && hasIframe) {
      return
    }

    this.idleCounter = this.idleCounter + 1

    if (this.idleCounter >= this.secondsInactive) {
      if (!this.enabled) {
        this.startScreensaver()
      }
    }
  }

  startScreensaver() {
    this.enabled = true

    this.imgX = 0
    this.imgY = 0

    document.getElementsByTagName("BODY")[0].style.overflowY = "hidden"

    this.container.style.display = "block"

    window.scrollTo(0, 0)

    this.animate()
  }

  stop() {
    this.enabled = false

    this.idleCounter = 0

    document.getElementsByTagName("BODY")[0].style.overflowY = "initial"

    this.container.style.display = "none"
  }

  animate() {
    const _this = this

    function loop() {
      if (_this.enabled) {
        _this.imgX = _this.imgX + _this.speed
        _this.imgY = _this.movingDown
          ? _this.imgY + _this.speed
          : _this.imgY - _this.speed

        _this.container.style.backgroundPositionX = _this.imgX.toFixed(0) + "px"
        _this.container.style.backgroundPositionY = _this.imgY.toFixed(0) + "px"

        if (_this.imgY > _this.container.offsetHeight - _this.imgHeight) {
          _this.movingDown = false
        }

        if (_this.imgY < 0) {
          _this.movingDown = true
        }

        if (_this.imgX > _this.container.offsetWidth) {
          _this.imgX = -_this.imgWidth
          _this.imgY = parseInt(
            Math.random() * _this.container.offsetHeight - _this.imgHeight
          )
          _this.movingDown = true
        }

        setTimeout(loop, 20)
      }
    }

    loop()
  }
}
