import { GAME_CONFIG, GROUND_HEIGHT } from "../../utils/constants";
import { Depth } from "../../utils/enums";
import { IExtendedScene } from "../../utils/interfaces";
import { BaseObject } from "./base";
import { BIRD_OFFSET_X } from "./bird";
import { GROUND_SPEED_COEFF } from "./ground";

const PIPE_SCALE_X = 4;
const PIPE_SCALE_Y = 3;
const INIT_PIPES_OFFSET_X = 500;
const PIPES_GAP_X = 700;
const PIPES_GAP_Y = 320;

function generateRandom(min = 0, max = 0) {
  const diff = max - min;
  return Math.floor(Math.random() * diff) + min;
}

export class Pipes extends BaseObject {
  private pipes: Phaser.Physics.Matter.Sprite[][] = [];

  private onPointEarn: () => void;

  private wasIntersecting = false;

  constructor(scene: IExtendedScene, onPointEarn: () => void) {
    super(scene);
    this.init();
    this.onPointEarn = onPointEarn;
  }

  init(): void {}

  private addPipes() {
    const x = this.scene.cameras.main.width + INIT_PIPES_OFFSET_X;

    // Check and delete old pipes
    if (this.pipes.length) {
      const firstPipe = this.pipes[0][0];
      if (firstPipe.x + firstPipe.displayWidth < 0) {
        const [topP, botP] = this.pipes.shift()!;
        topP.destroy();
        botP.destroy();
      }

      // Check if it's time to add a new pipe
      const lastPipe = this.pipes[this.pipes.length - 1][0];
      if (lastPipe && x - lastPipe.x < PIPES_GAP_X) return;
    }

    // Add new pipes
    const botPipe = this.scene.matter.add
      .sprite(x, 0, "pipe")
      .setDepth(Depth.Pipe)
      .setStatic(true)
      .setScale(PIPE_SCALE_X, PIPE_SCALE_Y);

    const minBotPipeY =
      this.scene.cameras.main.height -
      GROUND_HEIGHT -
      botPipe.displayHeight / 2;
    const botPipeY = generateRandom(
      minBotPipeY,
      this.scene.cameras.main.height
    );
    botPipe.setY(botPipeY);

    const topPipe = this.scene.matter.add
      .sprite(x, 0, "pipe")
      .setDepth(Depth.Pipe)
      .setStatic(true)
      .setScale(PIPE_SCALE_X, PIPE_SCALE_Y)
      .setRotation(3.14);

    const topPipeY =
      botPipeY -
      botPipe.displayHeight / 2 -
      topPipe.displayHeight / 2 -
      PIPES_GAP_Y;
    topPipe.setY(topPipeY);

    this.pipes.push([topPipe, botPipe]);
  }

  update(): void {
    if (!this.scene.gameStarted) return;
    if (this.scene.gameOver) {
      this.pipes.forEach(([topPipe, botPipe]) => {
        topPipe.setCollisionCategory(0);
        botPipe.setCollisionCategory(0);
      });
      return;
    }

    this.addPipes();

    this.pipes.forEach(([topPipe, botPipe]) => {
      topPipe.x -= GAME_CONFIG.speed / GROUND_SPEED_COEFF;
      botPipe.x -= GAME_CONFIG.speed / GROUND_SPEED_COEFF;
    });

    const isIntersecting = !!this.pipes.find(
      ([pipe]) =>
        pipe.x - pipe.displayWidth / 2 <
          this.scene.cameras.main.width / 2 + BIRD_OFFSET_X &&
        pipe.x + pipe.displayWidth / 2 >
          this.scene.cameras.main.width / 2 + BIRD_OFFSET_X
    );

    if (this.wasIntersecting && !isIntersecting) this.onPointEarn();
    this.wasIntersecting = isIntersecting;
  }
}
