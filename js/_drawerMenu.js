/**
 * Drawer Menu
 * Author: Taigo Ito (https://qwel.design/)
 * Location: Fukui, Japan
 */

class DrawerMenu {

  constructor(options = {}) {
    // 各要素生成
    // .drawer
    this._drawer = document.createElement('button');
    this._drawer.classList.add('drawer');
    if (this.darkMode) this._drawer.classList.add('--dark');

    // .drawer__navicon
    this._navicon = document.createElement('span');
    this._navicon.classList.add('drawer__navicon', 'responsiveColor');
    this._navicon.dataset.icon = 'ei-navicon';
    this._navicon.dataset.size = 'm';
    this._drawer.appendChild(this._navicon);

    // .drawer__close
    this._close = document.createElement('span');
    this._close.classList.add('drawer__close');
    this._close.dataset.icon = 'ei-close';
    this._close.dataset.size = 'm';
    this._drawer.appendChild(this._close);

    // .drawerMenu
    this._drawerMenu = document.createElement('div');
    this._drawerMenu.classList.add('drawerMenu');
    if (this.darkMode) this._drawerMenu.classList.add('--dark');

    // .drawerMenu__inner
    this._menu = document.createElement('div');
    this._menu.classList.add('drawerMenu__inner');
    this._drawerMenu.appendChild(this._menu);
    this._importMenu();

    // .drawerMenuOverlay
    this._overlay = document.createElement('div');
    this._overlay.classList.add('drawerMenuOverlay', '--collapse');

    // body要素に挿入
    const main = document.querySelector('main');
    main.appendChild(this._drawer);
    main.appendChild(this._drawerMenu);
    main.appendChild(this._overlay);

    // 状態
    this.isShown = false;

    // イベント登録
    this._handleEvents();

  }


  toggle() {
    // 状態から判別して、表示/非表示を切り替え
    if (this.isShown) this.hide();
    else this.show();

  }


  show() {
    // 表示
    if (!this.isShown) {
      this._transitionEnd(this._drawerMenu, () => {
        this._drawerMenu.classList.add('--show');
        this._drawer.classList.add('--active');
        this._menu.classList.remove('--collapse');
        this._overlay.classList.remove('--collapse');
      }).then(() => {
        this._menu.classList.add('--show');
      });
    }
    this.isShown = true;

  }


  hide() {
    // 非表示
    if (this.isShown) {
      this._transitionEnd(this._drawerMenu, () => {
        this._drawerMenu.classList.remove('--show');
        this._drawer.classList.remove('--active');
        this._menu.classList.remove('--show');
      }).then(() => {
        this._menu.classList.add('--collapse');
        this._overlay.classList.add('--collapse');
      });
    }
    this.isShown = false;

  }


  _importMenu() {
    // メニューアイテムをインポート
    const mainMenu = document.getElementById('mainMenu');
    const clone = mainMenu.cloneNode(true);
    clone.id = 'drawerMenu';

    this._menu.appendChild(clone);
  }


  _handleEvents() {
    //const myTouch = 'ontouchend' in document && window.innerWidth < 1024 ? 'touchend' : 'click';
    const myTouch = 'click';

    // ドロワーのイベント登録
    this._drawer.addEventListener(myTouch, (event) => {
      event.preventDefault();
      this.toggle();
    });

    // オーバーレイのイベント登録
    this._overlay.addEventListener(myTouch, () => {
      this.hide();
    });

    // スクロール時のイベント登録
    window.addEventListener('scroll', () => {
      this._windowScrollHandler();
    });

  }


  _windowScrollHandler() {
    // スクロール時にメニューを非表示
    if (this.isShown) this.hide();

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
