import { Depth } from "../../utils/enums";
import { IExtendedScene } from "../../utils/interfaces";
import { BaseObject } from "./base";

export const BIRD_OFFSET_X = -100;
const IDLE_OFFSET_Y = 20;
const ANGLE_MULTIPLIER = 4;
const JUMP_VELOCITY = -8;

export class Bird extends BaseObject {
  private bird: Phaser.Physics.Matter.Sprite | undefined;

  private x = 0;

  private y = 0;

  private idleDirection = 1;

  private isPrevPointerDown = false;

  constructor(scene: IExtendedScene) {
    super(scene);
    this.init();
  }

  init(): void {
    this.x = this.scene.cameras.main.width / 2 + BIRD_OFFSET_X;
    this.y = this.scene.cameras.main.height / 2;

    this.scene.anims.create({
      key: "birdAnimation",
      frames: this.scene.anims.generateFrameNumbers("bird"),
    });

    this.bird = this.scene.matter.add
      .sprite(this.x, this.y, "bird")
      .setScale(4)
      .setIgnoreGravity(true)
      .play({
        key: "birdAnimation",
        repeat: -1,
        frameRate: 8,
      })
      .setDepth(Depth.Bird);
  }

  update(): void {
    if (!this.bird) return;

    if (this.scene.gameOver) {
      this.bird.stop();
      return;
    }

    if (!this.scene.gameStarted) {
      if (this.bird.y < this.scene.cameras.main.height / 2 - IDLE_OFFSET_Y)
        this.idleDirection *= -1;
      else if (this.bird.y > this.scene.cameras.main.height / 2 + IDLE_OFFSET_Y)
        this.idleDirection *= -1;

      this.bird.y += this.idleDirection;

      return;
    }

    this.bird.setIgnoreGravity(false);

    const direction = this.y > this.bird.y ? -1 : 1;
    this.y = this.bird.y;

    const angle =
      Math.floor(
        (this.bird.body as MatterJS.BodyType).speed * ANGLE_MULTIPLIER
      ) * direction;

    this.bird.setAngle(angle);
    this.bird.setPosition(this.x, this.bird.y);

    const isPointerDown = this.scene.input.activePointer.isDown;

    if (!isPointerDown) {
      this.isPrevPointerDown = false;
      return;
    }

    if (!this.isPrevPointerDown) this.scene.sound.play("wing");

    this.isPrevPointerDown = isPointerDown;
    this.bird.setVelocityY(JUMP_VELOCITY);
  }
}
