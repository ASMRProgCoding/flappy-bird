import { Scene } from "phaser";

import { IExtendedScene } from "../utils/interfaces";
import { BaseObject } from "./objects/base";
import { Background } from "./objects/background";
import { Ground } from "./objects/ground";
import { Bird } from "./objects/bird";
import { GROUND_HEIGHT } from "../utils/constants";
import { Pipes } from "./objects/pipes";
import { Depth } from "../utils/enums";
import { Points } from "./objects/points";

export class GameScene extends Scene implements IExtendedScene {
  gameStarted = false;

  gameOver = false;

  private gameObjects: BaseObject[] = [];

  constructor() {
    super("game");
  }

  create() {
    this.gameOver = false;
    this.gameStarted = false;
    this.gameObjects = [];
    this.matter.world.setBounds(
      0,
      0,
      this.cameras.main.width,
      this.cameras.main.height - GROUND_HEIGHT
    );

    const points = new Points(this);

    this.gameObjects.push(
      new Background(this),
      new Ground(this),
      new Bird(this),
      new Pipes(this, () => {
        points.addPoint();
      })
    );

    this.matter.world.on("collisionstart", () => {
      if (!this.gameOver) {
        this.sound.play("hit");
        this.sound.play("die");
      }
      this.gameOver = true;

      this.add
        .sprite(
          this.cameras.main.width / 2,
          this.cameras.main.height / 2,
          "gameover"
        )
        .setScale(3)
        .setDepth(Depth.GameOver);
    });
  }

  update() {
    const isPointerDown = this.input.activePointer.isDown;
    if (isPointerDown) this.gameStarted = true;

    if (isPointerDown && this.gameOver) this.scene.restart();

    this.gameObjects.forEach((go) => go.update());
  }
}
