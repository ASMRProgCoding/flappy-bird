import { Scene } from "phaser";

import bgImg from "../../public/images/background-day.png";
import groundImg from "../../public/images/base.png";
import birdImg from "../../public/images/bird-sprite.png";
import gameoverImg from "../../public/images/gameover.png";
import numbersImg from "../../public/images/numbers.png";
import numbersJson from "../../public/images/numbers.json";
import pipeImg from "../../public/images/pipe-green.png";
import dieSound from "../../public/audio/die.wav";
import hitSound from "../../public/audio/hit.wav";
import pointSound from "../../public/audio/point.wav";
import wingSound from "../../public/audio/wing.wav";

export class PreloadScene extends Scene {
  constructor() {
    super("preload");
  }

  preload() {
    this.load.image("background", bgImg);
    this.load.image("ground", groundImg);
    this.load.spritesheet("bird", birdImg, {
      frameWidth: 34,
      frameHeight: 24,
    });
    this.load.image("gameover", gameoverImg);
    this.load.atlas("numbers", numbersImg, numbersJson);
    this.load.image("pipe", pipeImg);
    this.load.audio("die", dieSound);
    this.load.audio("hit", hitSound);
    this.load.audio("wing", wingSound);
    this.load.audio("point", pointSound);
  }

  create() {
    this.scene.start("game");
  }
}
