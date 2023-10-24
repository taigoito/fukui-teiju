/**
 * Tab Panel
 * Author: Taigo Ito (https://qwel.design/)
 * Location: Fukui, Japan
 * 
 * [data-target-tag]: 0:全て, 1:お知らせ, 2:イベント, 3:メディア
 * [data-tags]: 0～7の値を取り、2進法で3つのbool値を格納
 */

class Tabpanel {

  constructor() {
    // 要素
    this._elem = document.querySelector('.tabpanel');
    if (!this._elem) return;

    this._tabs = this._elem.querySelectorAll('[data-target-tag]');
    this._items = this._elem.querySelectorAll('[data-tags]');

    this._handleEvents();

  }


  toggle(tag) {
    this._items.forEach((item) => {
      let tags = item.dataset.tags;
      tags -= 0; // 数値型へ変換
      const tag1 = tags % 2;
      const tag2 = Math.floor(tags / 2) % 2;
      const tag3 = Math.floor(tags / 4) % 2;
      const tagsArr = [tag1, tag2, tag3];

      if (tag == 0) { // 全てを表示
        item.parentNode.classList.remove('--collapse');
      } else { // 選択して表示
        if (tagsArr[tag - 1]) {
          item.parentNode.classList.remove('--collapse');
        } else {
          item.parentNode.classList.add('--collapse');
        }
      }
    });

  }


  _handleEvents() {
    //const myTouch = 'ontouchend' in document && window.innerWidth < 1024 ? 'touchend' : 'click';
    const myTouch = 'click';

    this._tabs.forEach((tab) => {
      tab.addEventListener(myTouch, (event) => {
        event.preventDefault();
        const tag = tab.dataset.targetTag;
        this.toggle(tag);
      });
    });

  }
}
