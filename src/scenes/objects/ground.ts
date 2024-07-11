import { GAME_CONFIG, GROUND_HEIGHT } from "../../utils/constants";
import { Depth } from "../../utils/enums";
import { IExtendedScene } from "../../utils/interfaces";
import { BaseObject } from "./base";

export const GROUND_SPEED_COEFF = 2;

export class Ground extends BaseObject {
  private sprite: Phaser.GameObjects.TileSprite | undefined;

  constructor(scene: IExtendedScene) {
    super(scene);
    this.init();
  }

  init(): void {
    this.sprite = this.scene.add
      .tileSprite(
        0,
        this.scene.cameras.main.height - GROUND_HEIGHT,
        this.scene.cameras.main.width,
        GROUND_HEIGHT,
        "ground"
      )
      .setOrigin(0)
      .setScrollFactor(0)
      .setDepth(Depth.Ground);
  }

  update(): void {
    if (!this.sprite || this.scene.gameOver) return;
    this.sprite.tilePositionX += GAME_CONFIG.speed / GROUND_SPEED_COEFF;
  }
}
