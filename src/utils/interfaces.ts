import { Scene } from "phaser";

export interface IExtendedScene extends Scene {
  gameStarted: boolean;

  gameOver: boolean;
}
