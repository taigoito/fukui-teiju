/**
 * Text Controller
 * Author: Taigo Ito (https://qwel.design/)
 * Location: Fukui, Japan
 */

class TextController {

  constructor() {
    // 各要素生成
    // .tooltip
    this._tooltip = document.createElement('div');
    this._tooltip.id = 'tooltip';
    this._tooltip.classList.add('tooltip', '--collapse');

    // .tooltip__inner
    this._inner = document.createElement('div');
    this._inner.classList.add('tooltip__inner');
    this._tooltip.appendChild(this._inner);

    // .tooltip__arrow
    this._arrow = document.createElement('span');
    this._arrow.classList.add('tooltip__arrow');
    this._tooltip.appendChild(this._arrow);

    // .controlpanel__controllersから中身をインポート
    const menus = document.querySelector('.controlpanel');
    this._importMenu(menus);

    // .hero__mobileHeader要素に挿入
    const header = document.querySelector('.hero__mobileHeader');
    header.appendChild(this._tooltip);

    // 要素
    this._btnSpeaker = document.querySelectorAll('[data-role="btnSpeaker"]');
    this._btnFontsizeReguler = document.querySelectorAll('[data-role="btnFontsizeReguler"]');
    this._btnFontsizeLarge = document.querySelectorAll('[data-role="btnFontsizeLarge"]');
    this._btnColorLight = document.querySelectorAll('[data-role="btnColorLight"]');
    this._btnColorDark = document.querySelectorAll('[data-role="btnColorDark"]');
    this._btnColorVivid = document.querySelectorAll('[data-role="btnColorVivid"]');

    // 状態
    this._tooltipShown = false;

    this._handleEvents();

  }


  show() {
    this._tooltip.classList.remove('--collapse');
    setTimeout(() => {
      this._tooltip.classList.add('--active');
    }, 0);
    this._tooltipShown = true;
  }


  hide() {
    this._transitionEnd(this._tooltip, () => {
      this._tooltip.classList.remove('--active');
    }).then(() => {
      this._tooltip.classList.add('--collapse');
    });
    this._tooltipShown = false;
  }


  _importMenu(menus) {
    const clone = menus.cloneNode(true);
    clone.classList.add('--tooltip');
    this._inner.appendChild(clone);
  }


  _handleEvents() {
    const toggler = document.querySelector('[data-role="btnAccessibility"]');
    toggler.addEventListener('click', (event) => {
      event.preventDefault();
      if (this._tooltipShown) {
        this.hide();
      } else {
        this.show();
      }
    })


    this._btnFontsizeReguler.forEach((btn) => {
      btn.addEventListener('click', (event) => {
        event.preventDefault();
        document.documentElement.classList.remove('--large');
      });
    });

    this._btnFontsizeLarge.forEach((btn) => {
      btn.addEventListener('click', (event) => {
        event.preventDefault();
        document.documentElement.classList.add('--large');
      });
    });

    this._btnColorLight.forEach((btn) => {
      btn.addEventListener('click', (event) => {
        event.preventDefault();
        document.documentElement.style.setProperty('--background-color-1', 'var(--default-background-1)');
        document.documentElement.style.setProperty('--background-color-2', 'var(--default-background-2)');
        document.documentElement.style.setProperty('--background-color-3', 'var(--default-background-3)');
        document.documentElement.style.setProperty('--foreground-color', 'var(--default-foreground)');
        document.documentElement.classList.remove('--dark', '--vivid');
      });
    });

    this._btnColorDark.forEach((btn) => {
      btn.addEventListener('click', (event) => {
        event.preventDefault();
        document.documentElement.style.setProperty('--background-color-1', 'var(--invert-background-1)');
        document.documentElement.style.setProperty('--background-color-2', 'var(--invert-background-2)');
        document.documentElement.style.setProperty('--background-color-3', 'var(--invert-background-3)');
        document.documentElement.style.setProperty('--foreground-color', 'var(--invert-foreground)');
        document.documentElement.classList.remove('--vivid');
        document.documentElement.classList.add('--dark');
      });
    });

    this._btnColorVivid.forEach((btn) => {
      btn.addEventListener('click', (event) => {
        event.preventDefault();
        document.documentElement.style.setProperty('--background-color-1', 'blue');
        document.documentElement.style.setProperty('--background-color-2', 'blue');
        document.documentElement.style.setProperty('--background-color-3', 'blue');
        document.documentElement.style.setProperty('--foreground-color', 'yellow');
        document.documentElement.classList.remove('--dark');
        document.documentElement.classList.add('--vivid');
      });
    });

    // スクロール時にツールチップを閉じる
    window.addEventListener('scroll', () => {
      if (this._tooltipShown) {
        this.hide();
      }
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
