// Pokémon Champions opponent mega forms verified against current GameWith data on 2026-09-08.
// Charizard X is intentionally omitted by user preference.
export const MEGA_OPPONENTS = {
  garchomp: {
    mega: { label: 'メガ', name: 'メガガブリアス', types: ['dragon', 'ground'], base: { hp: 108, def: 115, spd: 95 } },
    megaZ: { label: 'メガZ', name: 'メガガブリアスZ', types: ['dragon'], base: { hp: 108, def: 85, spd: 85 } },
  },
  staraptor: {
    mega: { label: 'メガ', name: 'メガムクホーク', types: ['fighting', 'flying'], base: { hp: 85, def: 100, spd: 90 } },
  },
  charizard: {
    mega: { label: 'メガY', name: 'メガリザードンY', types: ['fire', 'flying'], base: { hp: 78, def: 78, spd: 115 } },
  },
  raichu: {
    megaX: { label: 'メガX', name: 'メガライチュウX', types: ['electric'], base: { hp: 60, def: 95, spd: 95 } },
    megaY: { label: 'メガY', name: 'メガライチュウY', types: ['electric'], base: { hp: 60, def: 55, spd: 80 } },
  },
  scizor: {
    mega: { label: 'メガ', name: 'メガハッサム', types: ['bug', 'steel'], base: { hp: 70, def: 140, spd: 100 } },
  },
  aerodactyl: {
    mega: { label: 'メガ', name: 'メガプテラ', types: ['rock', 'flying'], base: { hp: 80, def: 85, spd: 95 } },
  },
  venusaur: {
    mega: { label: 'メガ', name: 'メガフシギバナ', types: ['grass', 'poison'], base: { hp: 80, def: 123, spd: 120 } },
  },
  froslass: {
    mega: { label: 'メガ', name: 'メガユキメノコ', types: ['ice', 'ghost'], base: { hp: 70, def: 70, spd: 100 } },
  },
  delphox: {
    mega: { label: 'メガ', name: 'メガマフォクシー', types: ['fire', 'psychic'], base: { hp: 75, def: 72, spd: 125 } },
  },
  dragonite: {
    mega: { label: 'メガ', name: 'メガカイリュー', types: ['dragon', 'flying'], base: { hp: 91, def: 115, spd: 125 } },
  },
  swampert: {
    mega: { label: 'メガ', name: 'メガラグラージ', types: ['water', 'ground'], base: { hp: 100, def: 110, spd: 110 } },
  },
  blastoise: {
    mega: { label: 'メガ', name: 'メガカメックス', types: ['water'], base: { hp: 79, def: 120, spd: 115 } },
  },
  floetteEternal: {
    mega: { label: 'メガ', name: 'メガフラエッテ', types: ['fairy'], base: { hp: 74, def: 87, spd: 148 } },
  },
  glimmora: {
    mega: { label: 'メガ', name: 'メガキラフロル', types: ['rock', 'poison'], base: { hp: 83, def: 105, spd: 96 } },
  },
  excadrill: {
    mega: { label: 'メガ', name: 'メガドリュウズ', types: ['ground', 'steel'], base: { hp: 110, def: 100, spd: 65 } },
  },
  sableye: {
    mega: { label: 'メガ', name: 'メガヤミラミ', types: ['dark', 'ghost'], base: { hp: 50, def: 125, spd: 115 } },
  },
  metagross: {
    mega: { label: 'メガ', name: 'メガメタグロス', types: ['steel', 'psychic'], base: { hp: 80, def: 150, spd: 110 } },
  },
  gengar: {
    mega: { label: 'メガ', name: 'メガゲンガー', types: ['ghost', 'poison'], base: { hp: 60, def: 80, spd: 95 } },
  },
  mawile: {
    mega: { label: 'メガ', name: 'メガクチート', types: ['steel', 'fairy'], base: { hp: 50, def: 125, spd: 95 } },
  },
  tyranitar: {
    mega: { label: 'メガ', name: 'メガバンギラス', types: ['rock', 'dark'], base: { hp: 100, def: 150, spd: 120 } },
  },
  kangaskhan: {
    mega: { label: 'メガ', name: 'メガガルーラ', types: ['normal'], base: { hp: 105, def: 100, spd: 100 } },
  },
  scovillain: {
    mega: { label: 'メガ', name: 'メガスコヴィラン', types: ['grass', 'fire'], base: { hp: 65, def: 85, spd: 85 } },
  },
  gardevoir: {
    mega: { label: 'メガ', name: 'メガサーナイト', types: ['psychic', 'fairy'], base: { hp: 68, def: 65, spd: 135 } },
  },
  blaziken: {
    mega: { label: 'メガ', name: 'メガバシャーモ', types: ['fire', 'fighting'], base: { hp: 80, def: 70, spd: 80 } },
  },
  gallade: {
    mega: { label: 'メガ', name: 'メガエルレイド', types: ['psychic', 'fighting'], base: { hp: 68, def: 95, spd: 115 } },
  },
  chandelure: {
    mega: { label: 'メガ', name: 'メガシャンデラ', types: ['ghost', 'fire'], base: { hp: 60, def: 110, spd: 110 } },
  },
  camerupt: {
    mega: { label: 'メガ', name: 'メガバクーダ', types: ['fire', 'ground'], base: { hp: 70, def: 100, spd: 105 } },
  },
};

export function getOpponentFormOptions(opponentId) {
  const variants = MEGA_OPPONENTS[opponentId];
  if (!variants) return [{ id: 'normal', label: '通常' }];
  return [
    { id: 'normal', label: '通常' },
    ...Object.entries(variants).map(([id, variant]) => ({ id, label: variant.label ?? 'メガ' })),
  ];
}

export function getOpponentVariant(opponentId, opponent, form = 'normal') {
  if (form === 'normal') return opponent;
  const variant = MEGA_OPPONENTS[opponentId]?.[form];
  if (!variant) throw new Error(`Opponent form unavailable: ${opponentId}/${form}`);
  return variant;
}
