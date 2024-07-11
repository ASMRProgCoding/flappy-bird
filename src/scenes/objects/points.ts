import { Depth } from "../../utils/enums";
import { BaseObject } from "./base";

const OFFSET_Y = 100;
const POINTS_GAP = 60;

export class Points extends BaseObject {
  private points = 0;

  private sprites: Phaser.GameObjects.TileSprite[] = [];

  init(): void {}

  update(): void {}

  addPoint() {
    this.points += 1;

    this.scene.sound.play("point");

    // Destroy old points
    this.sprites.forEach((s) => s.destroy());

    for (let i = 0; i < `${this.points}.`.length - 1; i += 1) {
      this.sprites.push(
        this.scene.add
          .tileSprite(
            this.scene.cameras.main.width / 2 + i * POINTS_GAP,
            OFFSET_Y,
            24,
            36,
            "numbers",
            `${this.points}`[i]
          )
          .setScale(3)
          .setDepth(Depth.Points)
      );
    }
  }
}
