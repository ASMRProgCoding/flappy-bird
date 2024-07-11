import { IExtendedScene } from "../../utils/interfaces";

export abstract class BaseObject {
  protected scene: IExtendedScene;

  constructor(scene: IExtendedScene) {
    this.scene = scene;
  }

  abstract init(): void;

  abstract update(): void;
}
