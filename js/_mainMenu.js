/**
 * Menu
 * Author: Taigo Ito (https://qwel.design/)
 * Location: Fukui, Japan
 */

class MainMenu {

  constructor() {
    // 設定
    this._elem = document.getElementById('mainMenu');
    if (!this._elem) return;

    // イベント登録
    this._handleEvents();

  }


  show(menu) {
    // 表示
    const inner = menu.children[0];
    inner.classList.remove('--collapse');
    menu.classList.remove('--collapse');

  }


  hide(menu) {
    // 非表示
    const inner = menu.children[0];
    inner.classList.add('--collapse');
    menu.classList.add('--collapse');

  }


  _handleEvents() {
    //const myTouch = 'ontouchend' in document && window.innerWidth < 1024 ? 'touchend' : 'click';
    const myTouch = 'click';
    const togglers = this._elem.querySelectorAll('[data-toggle="submenu"]');
    
    togglers.forEach((toggler) => {
      const elem = toggler.parentNode;

      // サブメニューを開く
      elem.addEventListener('mouseenter', () => {
        toggler.classList.add('--active');
        const menu = elem.querySelector('[data-role="submenu"]');
        this.show(menu);
      });

      // サブメニューを閉じる
      elem.addEventListener('mouseleave', () => {
        toggler.classList.remove('--active');
        const menu = elem.querySelector('[data-role="submenu"]');
        this.hide(menu);
      });
    });

  }


  _transitionEnd(elem, func) {
    // CSS遷移の完了を監視
    let callback;
    const promise = new Promise((resolve, reject) => {
      callback = () => resolve(elem);
      elem.addEventListener('transitionend', callback);
    });
    func();
    promise.then((elem) => {
      elem.removeEventListener('transitionend', callback);
    });
    return promise;

  }

}
