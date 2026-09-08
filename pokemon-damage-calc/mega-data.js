export const MEGA_OPPONENTS = {
  garchomp: { name: 'メガガブリアス', types: ['dragon', 'ground'], base: { hp: 108, def: 115, spd: 95 } },
  charizard: { name: 'メガリザードンY', types: ['fire', 'flying'], base: { hp: 78, def: 78, spd: 115 } },
  scizor: { name: 'メガハッサム', types: ['bug', 'steel'], base: { hp: 70, def: 140, spd: 100 } },
  aerodactyl: { name: 'メガプテラ', types: ['rock', 'flying'], base: { hp: 80, def: 85, spd: 95 } },
  venusaur: { name: 'メガフシギバナ', types: ['grass', 'poison'], base: { hp: 80, def: 123, spd: 120 } },
  swampert: { name: 'メガラグラージ', types: ['water', 'ground'], base: { hp: 100, def: 110, spd: 110 } },
  blastoise: { name: 'メガカメックス', types: ['water'], base: { hp: 79, def: 120, spd: 115 } },
  sableye: { name: 'メガヤミラミ', types: ['dark', 'ghost'], base: { hp: 50, def: 125, spd: 115 } },
  metagross: { name: 'メガメタグロス', types: ['steel', 'psychic'], base: { hp: 80, def: 150, spd: 110 } },
  gengar: { name: 'メガゲンガー', types: ['ghost', 'poison'], base: { hp: 60, def: 80, spd: 95 } },
  mawile: { name: 'メガクチート', types: ['steel', 'fairy'], base: { hp: 50, def: 125, spd: 95 } },
  tyranitar: { name: 'メガバンギラス', types: ['rock', 'dark'], base: { hp: 100, def: 150, spd: 120 } },
  kangaskhan: { name: 'メガガルーラ', types: ['normal'], base: { hp: 105, def: 100, spd: 100 } },
  gardevoir: { name: 'メガサーナイト', types: ['psychic', 'fairy'], base: { hp: 68, def: 65, spd: 135 } },
  blaziken: { name: 'メガバシャーモ', types: ['fire', 'fighting'], base: { hp: 80, def: 70, spd: 80 } },
  gallade: { name: 'メガエルレイド', types: ['psychic', 'fighting'], base: { hp: 68, def: 95, spd: 115 } },
  camerupt: { name: 'メガバクーダ', types: ['fire', 'ground'], base: { hp: 70, def: 100, spd: 105 } },
};

export function getOpponentVariant(opponentId, opponent, form = 'normal') {
  if (form === 'mega' && MEGA_OPPONENTS[opponentId]) return MEGA_OPPONENTS[opponentId];
  return opponent;
}
