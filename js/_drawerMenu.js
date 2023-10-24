/**
 * Drawer Menu
 * Author: Taigo Ito (https://qwel.design/)
 * Location: Fukui, Japan
 */

class DrawerMenu {

  constructor() {
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

    // main要素に挿入
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

      // サブメニューも閉じる
      const menus = this._menu.querySelectorAll('[data-role="submenu"]');
      menus.forEach((menu) => {
        this.hideSubMenu(menu);
      });
    }
    this.isShown = false;

  }


  showSubMenu(menu) {
    // 表示
    const inner = menu.children[0];
    inner.classList.remove('--collapse');
    menu.classList.remove('--collapse');

  }


  hideSubMenu(menu) {
    // 非表示
    const inner = menu.children[0];
    inner.classList.add('--collapse');
    menu.classList.add('--collapse');

  }


  _importMenu() {
    // メニューアイテムをインポート
    const mainMenu = document.querySelector('.nav');
    const clone = mainMenu.cloneNode(true);

    // 戻るボタンを追加
    const menus = clone.querySelectorAll('.nav__subMenuInner');
    menus.forEach((menu) => {
      const backBtn = document.createElement('div');
      backBtn.classList.add('nav__subMenuBack');
      backBtn.textContent = '戻る';
      menu.appendChild(backBtn);
    });

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

    // サブメニューを開く
    const togglers = this._menu.querySelectorAll('[data-toggle="submenu"]');
    togglers.forEach((toggler) => {
      const elem = toggler.parentNode;

      toggler.addEventListener('mouseenter', () => {
        const menu = elem.querySelector('[data-role="submenu"]');
        this.showSubMenu(menu);
      });
    });

    // サブメニューを閉じる
    const backBtns = this._menu.querySelectorAll('.nav__subMenuBack');
    backBtns.forEach((backBtn) => {
      const menu = backBtn.parentNode.parentNode;

      backBtn.addEventListener('mouseenter', () => {
        this.hideSubMenu(menu);
      });
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
