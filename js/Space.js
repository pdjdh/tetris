class Space {
  constructor(width, height, gamePlace) {
    this.width = width
    this.height = height
    this.place = new Array(height)
    this.init(gamePlace)
  }
  init (gamePlace) {
    for (let i = 0; i < this.height; i++) {
      this.place[i] = new Array(this.width).fill(0)
      const tr = document.createElement('tr')
      tr.setAttribute('id', 'r' + i)
      for (let j = 0; j < this.width; j++) {
        const td = document.createElement('td');
        td.setAttribute('id', 'r' + i + 'd' + j)
        tr.appendChild(td);
      }
      gamePlace.appendChild(tr)
    }
  }
  /*
  判断清理的行
   */
  sureClear (box) {
    if (!box.isLive) {
      for (let i = this.height - 1; i >= 0; i--) {
        let flag = true;//true表示清理 false表示不清理
        for (let j = this.width - 1; j >= 0; j--) {
          if (this.place[i][j] === 0) {
            flag = false;
          }
        }
        if (flag) {
          this.clear(i)
          console.log(`清理${i}行`);
          i++;
          return i
        }
      }
    }
    return -1
  }
  /* 
    清理成行方块
  */
  clear (clearRow) {
    console.log('clear');
    for (let i = clearRow; i >= 0; i--) {
      for (let j = this.width - 1; j >= 0; j--) {
        i === 0 ? this.place[i][j] = 0 : this.place[i][j] = this.place[i - 1][j]
      }
    }
  }
  /*
    渲染方块
   */
  render () {
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        const block = document.getElementById('r' + i + 'd' + j);
        this.place[i][j] === 0 ? block.classList.remove('hasBlock') : block.classList.add('hasBlock')
      }
    }
  }

  /*
  重置方块
   */
  reset () {
    for (let i = 0; i < this.height; i++) {
      this.place[i] = new Array(this.width).fill(0)
    }
    this.render()
  }
}
