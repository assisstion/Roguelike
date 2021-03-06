import {Color} from './color.js';

export class DisplaySymbol{
  constructor(data){
    this.chr = data.chr || ' ';
    this.fg = data.fg || Color.ENTITY_FG;
    this.bg = data.bg || Color.ENTITY_BG;
  }

  render(display, x, y, paintBg){
    display.draw(x, y, this.chr, this.fg, paintBg ? paintBg : this.bg);
  }

  renderGray(display, x, y, paintBg){
    display.draw(x, y, this.chr, Color.MEMORY_FG, paintBg ? paintBg : Color.ENTITY_BG);
  }
}
