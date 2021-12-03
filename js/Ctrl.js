
class Ctrl {
  constructor(w, h) {
    this.gamePlace = document.getElementById('game');
    this.space = new Space(w, h, this.gamePlace)
    this.creatBox()
  }
  start () {
    this.addEvent()
    let timer = setInterval(() => {
      if (this.box.isLive) {
        console.log('down')
        this.box.down()
        this.space.sureClear(this.box)
        this.space.render()
      } else {
        for (const val of this.space.place[0]) {
          if (val === 1) {
            let reset = confirm('是否重新游戏');
            if (reset) {
              this.space.reset()
            } else {
              clearInterval(timer)
            }
            break
          }
        }
        this.creatBox()
      }
    }, 200)
  }
  addEvent () {
    window.addEventListener('keydown', (e) => {
      switch (e.key) {
        case 'a':
          this.box.left()
          break;
        case "d":
          this.box.right()
          break;
        case "s":
          while (true) {
            this.box.down()
            this.space.sureClear(this.box.isLive)
            if (this.box.isLive === false) {
              break;
            }
          }
          break;
        case "w":
          this.box.sureTransform()
          break;
        default:
          break;

      }
      this.space.render()
    })
  }

  creatBox () {
    const num = Math.floor(Math.random() * 4)
    switch (num) {
      case 0:
        this.box = new Box(this.space.place, 0, 5)
        break;
      case 1:
        this.box = new TSquare(this.space.place, 0, 5)
        break;
      case 2:
        this.box = new LongSquare(this.space.place, 0, 5)
        break;
      case 3:
        this.box = new FourSquares(this.space.place, 0, 5)
        break;
      default:
        this.box = new FourSquares(this.space.place, 0, 5)
        break;
    }
  }
}

const ctrl = new Ctrl(20, 30)
ctrl.start()