/**
 * Text Controller
 * Author: Taigo Ito (https://qwel.design/)
 * Location: Fukui, Japan
 */

class TextController {

  constructor() {
    // 要素
    this._btnSpeaker = document.getElementById('btnSpeaker');
    this._btnFontsizeReguler = document.getElementById('btnFontsizeReguler');
    this._btnFontsizeLarge = document.getElementById('btnFontsizeLarge');
    this._btnColorLight = document.getElementById('btnColorLight');
    this._btnColorDark = document.getElementById('btnColorDark');
    this._btnColorVivid = document.getElementById('btnColorVivid');

    this._handleEvents();

  }


  _handleEvents() {
    this._btnFontsizeReguler.addEventListener('click', (event) => {
      event.preventDefault();
      document.documentElement.style.setProperty('--root-font-size', 'var(--default-font-size)');
      document.body.classList.remove('--large');
    });

    this._btnFontsizeLarge.addEventListener('click', (event) => {
      event.preventDefault();
      document.documentElement.style.setProperty('--root-font-size', 'var(--large-font-size)');
      document.body.classList.add('--large');
    });

    this._btnColorLight.addEventListener('click', (event) => {
      event.preventDefault();
      document.documentElement.style.setProperty('--background-color-1', 'var(--default-background-1)');
      document.documentElement.style.setProperty('--background-color-2', 'var(--default-background-2)');
      document.documentElement.style.setProperty('--foreground-color', 'var(--default-foreground)');
    });

    this._btnColorDark.addEventListener('click', (event) => {
      event.preventDefault();
      document.documentElement.style.setProperty('--background-color-1', 'var(--invert-background-1)');
      document.documentElement.style.setProperty('--background-color-2', 'var(--invert-background-2)');
      document.documentElement.style.setProperty('--foreground-color', 'var(--invert-foreground)');
    });

    this._btnColorVivid.addEventListener('click', (event) => {
      event.preventDefault();
      document.documentElement.style.setProperty('--background-color-1', 'blue');
      document.documentElement.style.setProperty('--background-color-2', 'blue');
      document.documentElement.style.setProperty('--foreground-color', 'yellow');
    });
  }

}
