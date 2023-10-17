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
      document.documentElement.style.setProperty('--root-font-size', '16px');
    });

    this._btnFontsizeLarge.addEventListener('click', (event) => {
      event.preventDefault();
      document.documentElement.style.setProperty('--root-font-size', '18px');
    });

    this._btnColorLight.addEventListener('click', (event) => {
      event.preventDefault();
      document.documentElement.style.setProperty('--background-color-1', '#faf9f2');
      document.documentElement.style.setProperty('--background-color-2', '#fef3e6');
      document.documentElement.style.setProperty('--foreground-color', '#242424');
    });

    this._btnColorDark.addEventListener('click', (event) => {
      event.preventDefault();
      document.documentElement.style.setProperty('--background-color-1', '#292a31');
      document.documentElement.style.setProperty('--background-color-2', '#25303d');
      document.documentElement.style.setProperty('--foreground-color', '#ffffff');
    });

    this._btnColorVivid.addEventListener('click', (event) => {
      event.preventDefault();
      document.documentElement.style.setProperty('--background-color-1', 'blue');
      document.documentElement.style.setProperty('--background-color-2', 'blue');
      document.documentElement.style.setProperty('--foreground-color', 'yellow');
    });
  }

}
