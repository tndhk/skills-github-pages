export function calcHpStat(base, ap) {
  return base + 75 + ap;
}

export function calcOtherStat(base, ap, natureMultiplier = 1) {
  return Math.floor((base + 20 + ap) * natureMultiplier);
}

export function applyStage(value, stage) {
  const s = Math.max(-6, Math.min(6, Number(stage) || 0));
  const numerator = s >= 0 ? 2 + s : 2;
  const denominator = s >= 0 ? 2 : 2 - s;
  return Math.floor((value * numerator) / denominator);
}

const TEAM_STAT_MODELS = {
  charizard: {
    ap: { hp: 20, atk: 0, def: 3, spa: 21, spd: 0, spe: 22 },
    nature: { hp: 1, atk: 0.9, def: 1, spa: 1.1, spd: 1, spe: 1 },
    forms: {
      normal: { hp: 78, atk: 84, def: 78, spa: 109, spd: 85, spe: 100 },
      mega: { hp: 78, atk: 104, def: 78, spa: 159, spd: 115, spe: 100 },
    },
  },
  swampert: {
    ap: { hp: 14, atk: 20, def: 0, spa: 0, spd: 3, spe: 29 },
    nature: { hp: 1, atk: 1.1, def: 1, spa: 0.9, spd: 1, spe: 1 },
    forms: {
      normal: { hp: 100, atk: 110, def: 90, spa: 85, spd: 90, spe: 60 },
      mega: { hp: 100, atk: 150, def: 110, spa: 95, spd: 110, spe: 70 },
    },
  },
  venusaur: {
    ap: { hp: 2, atk: 0, def: 0, spa: 32, spd: 0, spe: 32 },
    nature: { hp: 1, atk: 0.9, def: 1, spa: 1.1, spd: 1, spe: 1 },
    forms: { normal: { hp: 80, atk: 82, def: 83, spa: 100, spd: 100, spe: 80 } },
  },
  pelipper: {
    ap: { hp: 31, atk: 0, def: 0, spa: 0, spd: 25, spe: 10 },
    nature: { hp: 1, atk: 0.9, def: 1.1, spa: 1, spd: 1, spe: 1 },
    forms: { normal: { hp: 60, atk: 50, def: 100, spa: 95, spd: 70, spe: 65 } },
  },
  archaludon: {
    ap: { hp: 27, atk: 0, def: 5, spa: 1, spd: 25, spe: 8 },
    nature: { hp: 1, atk: 0.9, def: 1, spa: 1, spd: 1.1, spe: 1 },
    forms: { normal: { hp: 90, atk: 105, def: 130, spa: 125, spd: 65, spe: 85 } },
  },
  grimmsnarl: {
    ap: { hp: 32, atk: 0, def: 9, spa: 0, spd: 25, spe: 0 },
    nature: { hp: 1, atk: 1, def: 1, spa: 1, spd: 1.1, spe: 0.9 },
    forms: { normal: { hp: 95, atk: 120, def: 65, spa: 95, spd: 75, spe: 60 } },
  },
};

export function getTeamFormStats(memberId, form = 'normal') {
  const model = TEAM_STAT_MODELS[memberId];
  if (!model) throw new Error(`Unknown team member: ${memberId}`);
  const bases = model.forms[form] ?? model.forms.normal;
  if (!bases) throw new Error(`Unknown form ${form} for ${memberId}`);
  const { ap, nature } = model;
  return {
    hp: calcHpStat(bases.hp, ap.hp),
    atk: calcOtherStat(bases.atk, ap.atk, nature.atk),
    def: calcOtherStat(bases.def, ap.def, nature.def),
    spa: calcOtherStat(bases.spa, ap.spa, nature.spa),
    spd: calcOtherStat(bases.spd, ap.spd, nature.spd),
    spe: calcOtherStat(bases.spe, ap.spe, nature.spe),
  };
}

function requirePositiveInteger(value, label) {
  const number = Number(value);
  if (!Number.isInteger(number) || number <= 0) throw new Error(`${label} must be a positive integer`);
  return number;
}

export function buildOpponentStats(opponent, preset = 'uninvested', custom = {}) {
  if (!opponent?.base) throw new Error('Opponent base stats are required');
  const { hp, def, spd } = opponent.base;
  switch (preset) {
    case 'uninvested':
      return { hp: calcHpStat(hp, 0), def: calcOtherStat(def, 0), spd: calcOtherStat(spd, 0) };
    case 'hp':
      return { hp: calcHpStat(hp, 32), def: calcOtherStat(def, 0), spd: calcOtherStat(spd, 0) };
    case 'bmax':
      return { hp: calcHpStat(hp, 32), def: calcOtherStat(def, 32, 1.1), spd: calcOtherStat(spd, 0) };
    case 'dmax':
      return { hp: calcHpStat(hp, 32), def: calcOtherStat(def, 0), spd: calcOtherStat(spd, 32, 1.1) };
    case 'custom':
      return {
        hp: requirePositiveInteger(custom.hp, 'HP'),
        def: requirePositiveInteger(custom.def, 'B'),
        spd: requirePositiveInteger(custom.spd, 'D'),
      };
    default:
      throw new Error(`Unknown defense preset: ${preset}`);
  }
}
