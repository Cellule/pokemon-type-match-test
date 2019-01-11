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