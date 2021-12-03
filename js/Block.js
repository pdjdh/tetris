class Block {
  constructor(place, x, y) {
    this.place = place
    this.x = x
    this.y = y
    this.width = this.place[0].length
    this.height = this.place.length
  }
  init () { }
  /* 
     确认改变条件符合
  */
  sureTransform () { }
  /* 
      改变方块
  */
  transform () { }
  /* 
    改变place内容
    k为0或1
    0表示清理
    1表示占据
  */
  change (k) { }
  left () { }
  right () { }
  down () { }

}

class Box extends Block {
  /*
     x,y表示本身位置
   */
  constructor(place, x, y) {
    super(place, x, y)
    this.init()
    this.isLive = true
  }
  init () {
    this.change(1)

  }
  sureTransform () { }
  /* 
      改变方块
  */
  transform () { }
  /* 
    改变place内容
    k为0或1
    0表示清理
    1表示占据
  */
  change (k) {
    this.place[this.x][this.y] = k
  }

  left () {
    if (!this.isLive) {
      return
    }
    if (this.y > 0 && this.place[this.x][this.y - 1] === 0) {
      this.change(0)
      this.y -= 1
      this.change(1)
      console.log('left');
    }
  }
  right () {
    if (!this.isLive) {
      return
    }
    if (this.y < this.width && this.place[this.x][this.y + 1] === 0) {
      this.change(0)
      this.y += 1
      this.change(1)
      console.log('right');
    }
  }
  down () {
    if (!this.isLive) {
      return
    }
    if (this.x < this.height - 1 && this.place[this.x + 1][this.y] === 0) {
      this.change(0)
      this.x += 1
      this.change(1)
    } else {
      this.isLive = false
    }
  }


}



class FourSquares extends Block {
  /*
     x,y表示左上角位置
   */
  constructor(place, x, y) {
    super(place, x, y)
    this.init()
    this.isLive = true
  }
  init () {
    this.change(1)

  }
  sureTransform () { }
  /* 
      改变方块
  */
  transform () { }
  /* 
    改变place内容
    k为0或1
    0表示清理
    1表示占据
  */
  change (k) {
    this.place[this.x][this.y] = k
    this.place[this.x + 1][this.y] = k
    this.place[this.x][this.y + 1] = k
    this.place[this.x + 1][this.y + 1] = k
  }

  left () {
    if (!this.isLive) {
      return
    }
    if (this.y > 0 && this.place[this.x][this.y - 1] === 0 && this.place[this.x + 1][this.y - 1] === 0) {
      this.change(0)
      this.y -= 1
      this.change(1)
      console.log('left');
    }
  }
  right () {
    if (!this.isLive) {
      return
    }
    if (this.y < this.width && this.place[this.x][this.y + 2] === 0 && this.place[this.x + 1][this.y + 2] === 0) {
      this.change(0)
      this.y += 1
      this.change(1)
      console.log('right');
    }
  }
  down () {
    if (!this.isLive) {
      return
    }
    if (this.x + 1 < this.height - 1 && this.place[this.x + 2][this.y] === 0) {
      this.change(0)
      this.x += 1
      this.change(1)
    } else {
      this.isLive = false
    }
  }

}








class LongSquare extends Block {
  /*
     x,y表示中间点位置
   */
  constructor(place, x, y) {
    super(place, x, y)
    this.init()
    this.isLive = true
    this.state = 0 //初始状态  0:横线  1:竖线  
  }
  init () {
    this.change(1)
  }
  /* 
     确认改变条件符合
  */
  sureTransform () {
    if (!this.isLive) {
      return
    }
    let sure = true;
    for (let i = this.x - 2; i <= this.x + 2; i++) {
      for (let j = this.y - 2; j <= this.y + 2; j++) {
        if (this.state === 0 && i !== this.x) {
          if (this.place[i][j] === 1) {
            sure = false
            break
          }
        } else if (this.state === 1 && j !== this.y) {
          if (this.place[i][j] === 1 || j < 0 || j >= this.width) {
            sure = false
            break
          }
        }
      }
      if (!sure) {
        break
      }
    }
    sure ? this.transform() : ''
  }
  /* 
      改变方块
  */
  transform () {
    if (!this.isLive) {
      return
    }
    if (this.state == 0) {
      this.change(0)
      this.state = 1
      this.change(1)
    } else {
      this.change(0)
      this.state = 0
      this.change(1)
    }
  }
  /* 
    改变place内容
    k为0或1
    0表示清理
    1表示占据
  */
  change (k) {
    if (!this.isLive) {
      return
    }
    switch (this.state) {
      case 0:
        for (let i = this.y - 2; i <= this.y + 2; i++) {
          this.place[this.x][i] = k
        }
        break;
      case 1:
        for (let i = this.x - 2; i <= this.x + 2; i++) {
          this.place[i][this.y] = k
        }
        break;
      default:
        break;
    }
  }

  left () {
    if (!this.isLive) {
      return
    }
    switch (this.state) {
      case 0:
        if (this.y - 2 > 0 && this.place[this.x][this.y - 3] === 0) {
          this.change(0)
          this.y -= 1
          this.change(1)
          console.log('left');
        }
        break;
      case 1:
        let sureLeft = true// true:可以left
        if (this.y > 0) {
          for (let i = this.x - 2; i < this.x + 2; i++) {
            if (this.place[i][this.y - 1] === 1) {
              sureLeft = false
              break
            }
          }
          if (sureLeft) {
            this.change(0)
            this.y -= 1
            this.change(1)
            console.log('left');
          }
        }
        break;
      default:
        break;
    }
  }
  right () {
    if (!this.isLive) {
      return
    }
    switch (this.state) {
      case 0:
        if (this.y + 2 > 0 && this.place[this.x][this.y + 3] === 0) {
          this.change(0)
          this.y += 1
          this.change(1)
          console.log('right');
        }
        break;
      case 1:
        let sureLeft = true// true:可以left
        if (this.y < this.width - 1) {
          for (let i = this.x - 2; i < this.x + 2; i++) {
            if (this.place[i][this.y + 1] === 1) {
              sureLeft = false
              break
            }
          }
          if (sureLeft) {
            this.change(0)
            this.y += 1
            this.change(1)
            console.log('right');
          }
        }
        break;
      default:
        break;
    }
  }
  down () {
    if (!this.isLive) {
      console.log('down die');
      return
    }
    switch (this.state) {
      case 0:
        let canDown = true;/* true可以向下 */
        if (this.x < this.height - 1) {
          for (let i = this.y - 2; i <= this.y + 2; i++) {
            if (this.place[this.x + 1][i] === 1) {
              this.isLive = false
              canDown = false
              break;
            }
          }
          if (canDown) {
            this.change(0)
            this.x += 1
            this.change(1)
          }
        } else {
          this.isLive = false
        }
        break;
      case 1:
        if (this.x + 2 < this.height - 1 && this.place[this.x + 3][this.y] === 0) {
          this.change(0)
          this.x += 1
          this.change(1)
        } else {
          this.isLive = false
        }
        break;
      default:
        break;
    }
  }
}


class TSquare extends Block {
  /*
     x,y表示中心点位置
   */
  constructor(place, x, y) {
    super(place, x, y)
    this.init()
    this.isLive = true
    this.state = 0 //初始状态  0:上  1:右  2:下   3:左  
  }
  init () {
    this.change(1)
  }
  /* 
     确认改变条件符合
  */
  sureTransform () {
    if (!this.isLive) {
      return
    }
	console.log('sss')
    let num = 0
	if(this.y-1 <= 0 || this.y+1>= this.width - 1){
				return 
			}
    for (let i = this.x - 1; i <= this.x + 1; i++) {
      for (let j = this.y - 1; j <= this.y + 1; j++) {
        if (j >= 0 && j <= this.height - 1) {
          this.place[i][j] === 1 ? num++ : ''
        }
      }
    }
    num === 4 ? this.transform() : ''
  }
  /* 
      改变方块
  */
  transform () {
    if (!this.isLive) {
      return
    }

    this.change(0)
    this.state === 3 ? this.state = 0 : this.state++
    this.change(1)
  }
  /* 
    改变place内容
    k为0或1
    0表示清理
    1表示占据
  */
  change (k) {
    if (!this.isLive) {
      return
    }
    switch (this.state) {
      case 0:
        for (let i = this.y - 1; i <= this.y + 1; i++) {
          this.place[this.x][i] = k
        }
        if (this.x > 0) {
          this.place[this.x - 1][this.y] = k
        }
        break;
      case 1:
        for (let i = this.x - 1; i <= this.x + 1; i++) {
          this.place[i][this.y] = k
        }
        this.place[this.x][this.y + 1] = k
        break;
      case 2:
        for (let i = this.y - 1; i <= this.y + 1; i++) {
          this.place[this.x][i] = k
        }
        this.place[this.x + 1][this.y] = k
        break;
      case 3:
        for (let i = this.x - 1; i <= this.x + 1; i++) {
          this.place[i][this.y] = k
        }
        this.place[this.x][this.y - 1] = k
        break;
      default:
        break;
    }
  }

  left () {
    if (!this.isLive) {
      return
    }
    console.log('left');
    switch (this.state) {
      case 0:
        if (this.y - 1 > 0) {
          if (this.place[this.x][this.y - 2] === 0 && this.place[this.x - 1][this.y - 1] === 0) {
            this.change(0)
            this.y -= 1
            this.change(1)
          }
        }
        break;
      case 1:
        if (this.y > 0) {
          let canLeft = true
          for (let i = this.x - 1; i <= this.x + 1; i++) {
            if (this.place[i][this.y - 1] === 1) {
              this.canLeft = false
              break
            }
          }
          if (canLeft) {
            this.change(0)
            this.y -= 1
            this.change(1)
          }
        }
        break;
      case 2:
        if (this.y - 1 > 0) {
          if (this.place[this.x][this.y - 2] === 0 && this.place[this.x - 1][this.y - 1] === 0) {
            this.change(0)
            this.y -= 1
            this.change(1)
          }
        }
        break;
      case 3:
        if (this.y - 1 > 0) {
          if (this.place[this.x][this.y - 2] === 0 && this.place[this.x + 1][this.y - 1] === 0 && this.place[this.x - 1][this.y - 1] === 0) {
            this.change(0)
            this.y -= 1
            this.change(1)
          }
        }
        break;
      default:
        break;
    }

  }
  right () {
    if (!this.isLive) {
      return
    }
    console.log('right');
    switch (this.state) {
      case 0:
        if (this.y + 1 < this.width - 1) {
          if (this.place[this.x][this.y + 2] === 0 && this.place[this.x - 1][this.y + 1] === 0) {
            this.change(0)
            this.y += 1
            this.change(1)
          }
        }
        break;
      case 1:
        if (this.y + 1 < this.width - 1) {
          if (this.place[this.x][this.y + 2] === 0 && this.place[this.x + 1][this.y + 1] === 0 && this.place[this.x - 1][this.y + 1] === 0) {
            this.change(0)
            this.y += 1
            this.change(1)
          }
        }
        break;
      case 2:
        if (this.y + 1 < this.width - 1) {
          if (this.place[this.x][this.y + 2] === 0 && this.place[this.x + 1][this.y + 1] === 0) {
            this.change(0)
            this.y += 1
            this.change(1)
          }
        }
        break;
      case 3:
        if (this.y < this.width - 1) {
          let canLeft = true
          for (let i = this.x - 1; i <= this.x + 1; i++) {
            if (this.place[i][this.y + 1] === 1) {
              this.canLeft = false
              break
            }
          }
          if (canLeft) {
            this.change(0)
            this.y += 1
            this.change(1)
          }
        }
        break;
      default:
        break;
    }
  }
  down () {
    if (!this.isLive) {
      console.log('down die');
      return
    }
    switch (this.state) {
      case 0:
        if (this.x < this.height - 1) {
          let canDown = true
          for (let i = this.y - 1; i <= this.y + 1; i++) {
            if (this.place[this.x + 1][i] === 1) {
              this.canDown = false
              this.isLive = false
              break;
            }
          }
          if (canDown) {
            this.change(0)
            this.x += 1
            this.change(1)
          }
        } else {
          this.isLive = false
        }
        break;
      case 1:
        if (this.x + 1 < this.height - 1 && this.place[this.x + 2][this.y] === 0 && this.place[this.x + 1][this.y + 1] === 0) {
          this.change(0)
          this.x += 1
          this.change(1)
        } else {
          this.isLive = false
        }
        break;
      case 2:
        if (this.x + 1 < this.height - 1 && this.place[this.x + 2][this.y] === 0 && this.place[this.x + 1][this.y + 1] === 0 && this.place[this.x + 1][this.y - 1] === 0) {
          this.change(0)
          this.x += 1
          this.change(1)
        } else {
          this.isLive = false
        }
        break;
      case 3:
        if (this.x + 1 < this.height - 1 && this.place[this.x + 2][this.y] === 0 && this.place[this.x + 1][this.y - 1] === 0) {
          this.change(0)
          this.x += 1
          this.change(1)
        } else {
          this.isLive = false
        }
        break;
      default:
        break;
    }
  }
}