import normalImg from "./img/normal.png";
import fireImg from "./img/fire.png";
import waterImg from "./img/water.png";
import electricImg from "./img/electric.png";
import grassImg from "./img/grass.png";
import iceImg from "./img/ice.png";
import fightingImg from "./img/fighting.png";
import poisonImg from "./img/poison.png";
import groundImg from "./img/ground.png";
import flyingImg from "./img/flying.png";
import psychicImg from "./img/psychic.png";
import bugImg from "./img/bug.png";
import rockImg from "./img/rock.png";
import ghostImg from "./img/ghost.png";
import dragonImg from "./img/dragon.png";
import darkImg from "./img/dark.png";
import steelImg from "./img/steel.png";
import fairyImg from "./img/fairy.png";

export enum Types {
  Normal,
  Fire,
  Water,
  Electric,
  Grass,
  Ice,
  Fighting,
  Poison,
  Ground,
  Flying,
  Psychic,
  Bug,
  Rock,
  Ghost,
  Dragon,
  GEN1Count,
  Dark = GEN1Count,
  Steel,
  GEN2Count,
  Fairy = GEN2Count,
  GEN6Count
};

export enum Effective {
  Not = 0,
  DualWeak = 0.25,
  Weak = 0.5,
  Normal = 1,
  Super = 2,
  DualSuper = 4,
};

export interface TypeChart {
  count: number;
  types: {[type: number]: {[type: number]: number}};
}

export const TypeImagesUrl: {[type: number]: string} = {
  [Types.Normal]: normalImg,
  [Types.Fire]: fireImg,
  [Types.Water]: waterImg,
  [Types.Electric]: electricImg,
  [Types.Grass]: grassImg,
  [Types.Ice]: iceImg,
  [Types.Fighting]: fightingImg,
  [Types.Poison]: poisonImg,
  [Types.Ground]: groundImg,
  [Types.Flying]: flyingImg,
  [Types.Psychic]: psychicImg,
  [Types.Bug]: bugImg,
  [Types.Rock]: rockImg,
  [Types.Ghost]: ghostImg,
  [Types.Dragon]: dragonImg,
  [Types.Dark]: darkImg,
  [Types.Steel]: steelImg,
  [Types.Fairy]: fairyImg,
}