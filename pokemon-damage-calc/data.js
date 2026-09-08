export const MOVES = {
  heatWave: { name: 'ねっぷう', type: 'fire', power: 95, category: 'special', spread: true },
  weatherBall: { name: 'ウェザーボール', type: 'normal', power: 50, category: 'special', weatherBall: true },
  hurricane: { name: 'ぼうふう', type: 'flying', power: 110, category: 'special' },
  leafStorm: { name: 'リーフストーム', type: 'grass', power: 130, category: 'special' },
  sludgeBomb: { name: 'ヘドロばくだん', type: 'poison', power: 90, category: 'special' },
  waveCrash: { name: 'ウェーブタックル', type: 'water', power: 120, category: 'physical' },
  earthquake: { name: 'じしん', type: 'ground', power: 100, category: 'physical', spread: true },
  icePunch: { name: 'れいとうパンチ', type: 'ice', power: 75, category: 'physical' },
  dragonPulse: { name: 'りゅうのはどう', type: 'dragon', power: 85, category: 'special' },
  flashCannon: { name: 'ラスターカノン', type: 'steel', power: 80, category: 'special' },
  electroShot: { name: 'エレクトロビーム', type: 'electric', power: 130, category: 'special', preAttackStage: 1 },
  spiritBreak: { name: 'ソウルクラッシュ', type: 'fairy', power: 75, category: 'physical' },
  protect: { name: 'まもる', damaging: false },
  sleepPowder: { name: 'ねむりごな', damaging: false },
  tailwind: { name: 'おいかぜ', damaging: false },
  wideGuard: { name: 'ワイドガード', damaging: false },
  partingShot: { name: 'すてゼリフ', damaging: false },
  reflect: { name: 'リフレクター', damaging: false },
  lightScreen: { name: 'ひかりのかべ', damaging: false },
};

export const TEAM = {
  charizard: {
    name: 'リザードン', types: ['fire', 'flying'], ability: 'もうか', item: 'リザードナイトY',
    moves: ['heatWave', 'weatherBall', 'hurricane', 'protect'], forms: ['normal', 'mega'],
  },
  venusaur: {
    name: 'フシギバナ', types: ['grass', 'poison'], ability: 'ようりょくそ', item: 'きあいのタスキ',
    moves: ['leafStorm', 'sludgeBomb', 'sleepPowder', 'protect'], forms: ['normal'],
  },
  pelipper: {
    name: 'ペリッパー', types: ['water', 'flying'], ability: 'あめふらし', item: 'オボンのみ',
    moves: ['weatherBall', 'hurricane', 'tailwind', 'wideGuard'], forms: ['normal'],
  },
  swampert: {
    name: 'ラグラージ', types: ['water', 'ground'], ability: 'げきりゅう', item: 'ラグラージナイト',
    moves: ['waveCrash', 'earthquake', 'icePunch', 'protect'], forms: ['normal', 'mega'],
  },
  archaludon: {
    name: 'ブリジュラス', types: ['steel', 'dragon'], ability: 'じきゅうりょく', item: 'たべのこし',
    moves: ['dragonPulse', 'flashCannon', 'electroShot', 'protect'], forms: ['normal'],
  },
  grimmsnarl: {
    name: 'オーロンゲ', types: ['dark', 'fairy'], ability: 'いたずらごころ', item: 'ひかりのねんど',
    moves: ['spiritBreak', 'partingShot', 'reflect', 'lightScreen'], forms: ['normal'],
  },
};

export const OPPONENTS = {
  garchomp: { name: 'ガブリアス', types: ['dragon', 'ground'], base: { hp: 108, def: 95, spd: 85 } },
  delphox: { name: 'マフォクシー', types: ['fire', 'psychic'], base: { hp: 75, def: 72, spd: 100 } },
  froslass: { name: 'ユキメノコ', types: ['ice', 'ghost'], base: { hp: 70, def: 70, spd: 70 } },
  farigiraf: { name: 'リキキリン', types: ['normal', 'psychic'], base: { hp: 120, def: 70, spd: 70 } },
  incineroar: { name: 'ガオガエン', types: ['fire', 'dark'], base: { hp: 95, def: 90, spd: 90 } },
  whimsicott: { name: 'エルフーン', types: ['grass', 'fairy'], base: { hp: 60, def: 85, spd: 75 } },
  torkoal: { name: 'コータス', types: ['fire'], base: { hp: 70, def: 140, spd: 70 } },
  kangaskhan: { name: 'ガルーラ', types: ['normal'], base: { hp: 105, def: 80, spd: 80 } },
  sylveon: { name: 'ニンフィア', types: ['fairy'], base: { hp: 95, def: 65, spd: 130 } },
  raichu: { name: 'ライチュウ', types: ['electric'], base: { hp: 60, def: 55, spd: 80 } },
  gardevoir: { name: 'サーナイト', types: ['psychic', 'fairy'], base: { hp: 68, def: 65, spd: 115 } },
  milotic: { name: 'ミロカロス', types: ['water'], base: { hp: 95, def: 79, spd: 125 } },
  basculegion: { name: 'イダイトウ', types: ['water', 'ghost'], base: { hp: 120, def: 65, spd: 75 } },
  kingambit: { name: 'ドドゲザン', types: ['dark', 'steel'], base: { hp: 100, def: 120, spd: 85 } },
  blastoise: { name: 'カメックス', types: ['water'], base: { hp: 79, def: 100, spd: 105 } },
  charizard: { name: 'リザードン', types: ['fire', 'flying'], base: { hp: 78, def: 78, spd: 85 } },
  venusaur: { name: 'フシギバナ', types: ['grass', 'poison'], base: { hp: 80, def: 83, spd: 100 } },
  pelipper: { name: 'ペリッパー', types: ['water', 'flying'], base: { hp: 60, def: 100, spd: 70 } },
  swampert: { name: 'ラグラージ', types: ['water', 'ground'], base: { hp: 100, def: 90, spd: 90 } },
  archaludon: { name: 'ブリジュラス', types: ['steel', 'dragon'], base: { hp: 90, def: 130, spd: 65 } },
  grimmsnarl: { name: 'オーロンゲ', types: ['dark', 'fairy'], base: { hp: 95, def: 65, spd: 75 } },
};

export const DEFENSE_PRESETS = {
  uninvested: '無振り', hp: 'HP振り', bmax: 'B特化', dmax: 'D特化', custom: 'カスタム',
};

export const TYPE_CHART = {
  normal: { rock: 0.5, ghost: 0, steel: 0.5 },
  fire: { fire: 0.5, water: 0.5, grass: 2, ice: 2, bug: 2, rock: 0.5, dragon: 0.5, steel: 2 },
  water: { fire: 2, water: 0.5, grass: 0.5, ground: 2, rock: 2, dragon: 0.5 },
  electric: { water: 2, electric: 0.5, grass: 0.5, ground: 0, flying: 2, dragon: 0.5 },
  grass: { fire: 0.5, water: 2, grass: 0.5, poison: 0.5, ground: 2, flying: 0.5, bug: 0.5, rock: 2, dragon: 0.5, steel: 0.5 },
  ice: { fire: 0.5, water: 0.5, grass: 2, ice: 0.5, ground: 2, flying: 2, dragon: 2, steel: 0.5 },
  fighting: { normal: 2, ice: 2, poison: 0.5, flying: 0.5, psychic: 0.5, bug: 0.5, rock: 2, ghost: 0, dark: 2, steel: 2, fairy: 0.5 },
  poison: { grass: 2, poison: 0.5, ground: 0.5, rock: 0.5, ghost: 0.5, steel: 0, fairy: 2 },
  ground: { fire: 2, electric: 2, grass: 0.5, poison: 2, flying: 0, bug: 0.5, rock: 2, steel: 2 },
  flying: { electric: 0.5, grass: 2, fighting: 2, bug: 2, rock: 0.5, steel: 0.5 },
  psychic: { fighting: 2, poison: 2, psychic: 0.5, dark: 0, steel: 0.5 },
  bug: { fire: 0.5, grass: 2, fighting: 0.5, poison: 0.5, flying: 0.5, psychic: 2, ghost: 0.5, dark: 2, steel: 0.5, fairy: 0.5 },
  rock: { fire: 2, ice: 2, fighting: 0.5, ground: 0.5, flying: 2, bug: 2, steel: 0.5 },
  ghost: { normal: 0, psychic: 2, ghost: 2, dark: 0.5 },
  dragon: { dragon: 2, steel: 0.5, fairy: 0 },
  dark: { fighting: 0.5, psychic: 2, ghost: 2, dark: 0.5, fairy: 0.5 },
  steel: { fire: 0.5, water: 0.5, electric: 0.5, ice: 2, rock: 2, steel: 0.5, fairy: 2 },
  fairy: { fire: 0.5, fighting: 2, poison: 0.5, dragon: 2, dark: 2, steel: 0.5 },
};
