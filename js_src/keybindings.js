export let BINDINGS = {
  //Master bindings cannot be reassinged EXCEPT in play mode
  MASTER: {
    EXIT_MENU: "Escape",
    MENU_UP: "ArrowUp",
    MENU_LEFT: "ArrowLeft",
    MENU_DOWN: "ArrowDown",
    MENU_RIGHT: "ArrowRight",
    SELECT: "Enter"
    //Also disallow rebinding of number keys
  },
  INVENTORY: {},
  GAME: {},
  PERSISTENCE: {
    NEW_GAME: "n",
    SAVE: "s",
    ENTER_LOAD: "l",
    ENTER_DELETE: "d",
    DELETE_ALL: "D",
  },
  BINDING: {
    REVERT_WASD: "W",
    REVERT_ARROW: "A",
    REVERT_INVENTORY: "R"
  }
};

export let BINDING_DESCRIPTIONS = {
  INVENTORY: {
  },
  GAME: {
    MOVE_NORTH: "Move north",
    MOVE_WEST: "Move west",
    MOVE_SOUTH: "Move south",
    MOVE_EAST: "Move east",
    ENTER_PERSISTENCE: "Save/load/new game",
    ENTER_MESSAGES: "Show all messages",
    ENTER_BINDINGS: "Show/switch key bindings",
    NEXT_FLOOR: "Next floor",
    PREV_FLOOR: "Previous floor",
    WIN: "Win the game",
    LOSE: "Lose the game"
  },
};

setKeybindingsArrowKeys();
setInventoryBindings();

export function setKeybindingsWASD(){
  BINDINGS.GAME = {
    MOVE_NORTH: "w",
    MOVE_WEST: "a",
    MOVE_SOUTH: "s",
    MOVE_EAST: "d",
    ENTER_PERSISTENCE: "S",
    ENTER_MESSAGES: "M",
    ENTER_BINDINGS: "?",
    NEXT_FLOOR: ">",
    PREV_FLOOR: "<",
    WIN: "ArrowUp",
    LOSE: "ArrowDown"
  }
}

export function setKeybindingsArrowKeys(){
  BINDINGS.GAME = {
    MOVE_NORTH: "ArrowUp",
    MOVE_WEST: "ArrowLeft",
    MOVE_SOUTH: "ArrowDown",
    MOVE_EAST: "ArrowRight",
    ENTER_PERSISTENCE: "S",
    ENTER_MESSAGES: "M",
    ENTER_BINDINGS: "?",
    NEXT_FLOOR: ">",
    PREV_FLOOR: "<",
    WIN: "w",
    LOSE: "l"
  }
}

export function setInventoryBindings(){
  BINDINGS.INVENTORY = {

  }
}
