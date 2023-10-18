/**
 * Back To Top
 * Author: Taigo Ito (https://qwel.design/)
 * Location: Fukui, Japan
 */

class BackToTop {

  constructor() {
    // ボタン生成
    this._btn = document.getElementById('backToTop');

    // イベント登録
    this._handleEvents();

  }


  backToTop() {
    window.scroll({ top: 0, behavior: 'smooth' });

  }


  _handleEvents() {
    //const myTouch = 'ontouchend' in document && window.innerWidth < 1024 ? 'touchend' : 'click';
    const myTouch = 'click';

    this._btn.addEventListener(myTouch, (event) => {
      event.preventDefault();
      this.backToTop();
    });
    
  }

}
