import { GAME_CONFIG } from "../../utils/constants";
import { Depth } from "../../utils/enums";
import { IExtendedScene } from "../../utils/interfaces";
import { BaseObject } from "./base";

const BG_SPEED_COEFF = 10;

export class Background extends BaseObject {
  private sprite: Phaser.GameObjects.TileSprite | undefined;

  constructor(scene: IExtendedScene) {
    super(scene);
    this.init();
  }

  init(): void {
    this.sprite = this.scene.add
      .tileSprite(0, 0, this.scene.cameras.main.width, 512, "background")
      .setOrigin(0)
      .setScrollFactor(0)
      .setScale(3)
      .setDepth(Depth.Background);
  }

  update(): void {
    if (!this.sprite || this.scene.gameOver) return;

    this.sprite.tilePositionX += GAME_CONFIG.speed / BG_SPEED_COEFF;
  }
}
