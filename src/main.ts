import Phaser from "phaser";

import { GAME_CONFIG } from "./utils/constants";
import { PreloadScene } from "./scenes/preload";
import { GameScene } from "./scenes/game";

new Phaser.Game({
  type: Phaser.CANVAS,
  scale: {
    width: GAME_CONFIG.width,
    height: GAME_CONFIG.height,
    min: {
      width: GAME_CONFIG.width / 3,
      height: GAME_CONFIG.height / 3,
    },
    max: {
      width: GAME_CONFIG.width,
      height: GAME_CONFIG.height,
    },
    zoom: 1,
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: "matter",
    matter: {
      gravity: { x: 0, y: 1 },
    },
  },
  scene: [PreloadScene, GameScene],
});
