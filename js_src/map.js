import {TILES} from './tile.js';
import {init2DArray, uniqueId} from './util.js';
import ROT from 'rot-js';
import {DATASTORE} from './datastore.js';

export class Map{
  constructor(xdim, ydim, mapType, mapSeed){

    this.attr = {};
    this.attr.xdim = xdim || 1;
    this.attr.ydim = ydim || 1;
    this.attr.mapType = mapType || 'basic_caves';
    this.attr.mapSeed = mapSeed || 0;
    this.attr.id = uniqueId('map-'+this.attr.mapType);
  }

  setupMap(){
    if(!this.tileGrid){
      this.tileGrid =
      TILE_GRID_GENERATOR[this.attr.mapType](this.attr.xdim, this.attr.ydim, this.attr.mapSeed);
    }
  }

  getId(){
    return this.attr.id;
  }
  setId(newId){
    this.attr.id = newId;
  }

  getXDim(){
    return this.attr.xdim;
  }
  setXDim(newxdim){
    this.attr.xdim = newxdim;
  }

  getYDim(){
    return this.attr.ydim;
  }
  setYDim(newydim){
    this.attr.ydim = newydim;
  }

  getMapType(){
    return this.attr.mapType;
  }
  setMapType(newtype){
    this.attr.mapType = newtype;
  }

  getMapSeed(){
    return this.attr.mapSeed;
  }
  setMapSeed(mapSeed){
    this.attr.mapSeed = mapSeed;
  }

  render(display, camera_x, camera_y){
    let cx = 0;
    let cy = 0;
    let xstart = camera_x - Math.trunc(display.getOptions().width / 2);
    let xend = xstart + display.getOptions().width;
    let ystart = camera_y - Math.trunc(display.getOptions().height / 2);
    let yend = ystart + display.getOptions().height;
    for(let xi = xstart; xi < xend; xi++){
      cy = 0;
      for(let yi = ystart; yi < yend; yi++){
        this.getTile(xi, yi).render(display, cx, cy);
        cy++;
      }
      cx++;
    }
  }

  toJSON(){
    return JSON.stringify(this.attr);
  }

  getTile(mapx, mapy){
    if(mapx < 0 || mapx > this.attr.xdim - 1 || mapy < 0 || mapy > this.attr.ydim - 1){
      return TILES.NULLTILE;
    }
    else{
      return this.tileGrid[mapx][mapy];
    }
  }
}

let TILE_GRID_GENERATOR = {
  'basic_caves': function(xdim, ydim, mapSeed){

    let origRngState = ROT.RNG.getState();
    ROT.RNG.setSeed(mapSeed);

    let tg = init2DArray(xdim, ydim, TILES.NULLTILE);
    let gen = new ROT.Map.Cellular(xdim, ydim, {connected: true});


    gen.randomize(0.625);
    for(let i = 0; i < 3; i++){
      gen.create();
    }
    gen.connect(
      function(x, y, isFloor){
        let floorCondition = isFloor && x != 0 && y != 0 && x != xdim - 1 && y != ydim - 1;
        let tile = null;
        if(floorCondition){
          tile = TILES.FLOOR;
        }
        else{
          tile = TILES.WALL;
        }
        tg[x][y] = tile;
      },
    1);

    ROT.RNG.setState(origRngState);

    return tg;
  }
}

export function MapMaker(mapData){

  let m = new Map(mapData.xdim, mapData.ydim,mapData.mapType, mapData.mapSeed);
  if(mapData.id){
    m.setId(mapData.id);
  }
  DATASTORE.MAPS[m.getId()] = m;
  return m;
}
