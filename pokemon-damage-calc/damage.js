import { TYPE_CHART, TEAM, MOVES, OPPONENTS } from './data.js';
import { MEGA_OPPONENTS, getOpponentVariant } from './mega-data.js';
import { applyStage, getTeamFormStats, buildOpponentStats } from './stats.js';

const MOD_BASE = 4096;
const MOD = {
  half: 2048,
  doublesScreen: 2732,
  spread: 3072,
  oneAndHalf: 6144,
};

function halfDownDiv(numerator, denominator) {
  const q = Math.floor(numerator / denominator);
  const r = numerator % denominator;
  return q + (r > denominator / 2 ? 1 : 0);
}

function applyFixedModifier(value, modifier) {
  return halfDownDiv(value * modifier, MOD_BASE);
}

function applyTypeMultiplier(value, multiplier) {
  if (multiplier === 0) return 0;
  if (multiplier === 0.25) return Math.floor(value / 4);
  if (multiplier === 0.5) return Math.floor(value / 2);
  if (multiplier === 1) return value;
  if (multiplier === 2) return value * 2;
  if (multiplier === 4) return value * 4;
  return Math.floor(value * multiplier);
}

function baseDamage(power, attack, defense) {
  const step1 = Math.floor((22 * power * attack) / Math.max(1, defense));
  return Math.floor(step1 / 50) + 2;
}

export function resolveMove(move, weather = 'none') {
  if (!move?.weatherBall) return { ...move };
  if (weather === 'sun') return { ...move, type: 'fire', power: 100 };
  if (weather === 'rain') return { ...move, type: 'water', power: 100 };
  return { ...move, type: 'normal', power: 50 };
}

export function typeEffectiveness(moveType, defenderTypes = []) {
  const row = TYPE_CHART[moveType] ?? {};
  return defenderTypes.reduce((multiplier, type) => multiplier * (row[type] ?? 1), 1);
}

function weatherModifier(weather, moveType) {
  if (weather === 'sun') {
    if (moveType === 'fire') return MOD.oneAndHalf;
    if (moveType === 'water') return MOD.half;
  }
  if (weather === 'rain') {
    if (moveType === 'water') return MOD.oneAndHalf;
    if (moveType === 'fire') return MOD.half;
  }
  return MOD_BASE;
}

export function summarizeKo(rolls, defenderHp) {
  const hits = rolls.filter((damage) => damage >= defenderHp).length;
  const total = rolls.length;
  const probability = total ? hits / total : 0;
  let label;
  if (hits === total && total > 0) label = '確定1発';
  else if (hits > 0) label = `乱数1発 (${(probability * 100).toFixed(1)}%)`;
  else label = '1発では倒せない';
  return { hits, total, probability, label };
}

export function calcDamage(input) {
  const {
    attacker,
    defender,
    weather = 'none',
    burn = false,
    reflect = false,
    lightScreen = false,
    spread = false,
    critical = false,
  } = input;

  const move = resolveMove(input.move, weather);
  if (!move || move.damaging === false || !move.power) return { nonDamaging: true };

  const category = move.category;
  const rawAttack = category === 'physical' ? attacker.atk : attacker.spa;
  const rawDefense = category === 'physical' ? defender.def : defender.spd;
  const requestedAttackStage = Number(input.attackStage) || 0;
  const requestedDefenseStage = Number(input.defenseStage) || 0;
  const attackStage = critical && requestedAttackStage < 0 ? 0 : requestedAttackStage;
  const defenseStage = critical && requestedDefenseStage > 0 ? 0 : requestedDefenseStage;
  const attack = applyStage(rawAttack, attackStage);
  const defense = applyStage(rawDefense, defenseStage);
  const effectiveness = typeEffectiveness(move.type, defender.types);

  if (effectiveness === 0) {
    const rolls = Array(16).fill(0);
    return {
      rolls,
      min: 0,
      max: 0,
      minPercent: 0,
      maxPercent: 0,
      ko: summarizeKo(rolls, defender.hp),
      effectiveness,
      resolvedMove: move,
    };
  }

  const base = baseDamage(move.power, attack, defense);
  const rolls = [];
  for (let random = 85; random <= 100; random += 1) {
    let damage = base;
    if (spread) damage = applyFixedModifier(damage, MOD.spread);
    damage = applyFixedModifier(damage, weatherModifier(weather, move.type));
    if (critical) damage = applyFixedModifier(damage, MOD.oneAndHalf);
    damage = Math.floor((damage * random) / 100);
    if (attacker.types?.includes(move.type)) damage = applyFixedModifier(damage, MOD.oneAndHalf);
    damage = applyTypeMultiplier(damage, effectiveness);
    if (burn && category === 'physical') damage = applyFixedModifier(damage, MOD.half);

    const screenActive = !critical && (
      (category === 'physical' && reflect) ||
      (category === 'special' && lightScreen)
    );
    if (screenActive) damage = applyFixedModifier(damage, MOD.doublesScreen);

    damage = Math.max(1, damage);
    rolls.push(damage);
  }

  const min = rolls[0];
  const max = rolls[rolls.length - 1];
  return {
    rolls,
    min,
    max,
    minPercent: (min / defender.hp) * 100,
    maxPercent: (max / defender.hp) * 100,
    ko: summarizeKo(rolls, defender.hp),
    effectiveness,
    resolvedMove: move,
  };
}

export function calculateMatchup({
  memberId,
  form = 'normal',
  moveId,
  opponentId,
  opponentForm = 'normal',
  preset = 'uninvested',
  custom = {},
  board = {},
}) {
  const member = TEAM[memberId];
  const move = MOVES[moveId];
  const opponent = OPPONENTS[opponentId];
  if (!member) throw new Error(`Unknown team member: ${memberId}`);
  if (!move) throw new Error(`Unknown move: ${moveId}`);
  if (!opponent) throw new Error(`Unknown opponent: ${opponentId}`);
  if (opponentForm === 'mega' && !MEGA_OPPONENTS[opponentId]) throw new Error(`Mega form unavailable: ${opponentId}`);

  const defenderVariant = getOpponentVariant(opponentId, opponent, opponentForm);
  const attackerStats = getTeamFormStats(memberId, form);
  const defenderStats = buildOpponentStats(defenderVariant, preset, custom);
  const result = calcDamage({
    attacker: { ...attackerStats, types: member.types },
    defender: { ...defenderStats, types: defenderVariant.types },
    move,
    weather: board.weather ?? 'none',
    attackStage: (board.attackStage ?? 0) + (move.preAttackStage ?? 0),
    defenseStage: board.defenseStage ?? 0,
    burn: board.burn ?? false,
    reflect: board.reflect ?? false,
    lightScreen: board.lightScreen ?? false,
    spread: board.spread ?? false,
    critical: board.critical ?? false,
  });

  if (result.nonDamaging) {
    return {
      ...result,
      attackerName: member.name,
      formName: form === 'mega' ? 'メガ' : '通常',
      moveName: move.name,
      opponentName: defenderVariant.name,
    };
  }

  return {
    ...result,
    attackerName: member.name,
    formName: form === 'mega' ? 'メガ' : '通常',
    moveName: result.resolvedMove?.name ?? move.name,
    opponentName: defenderVariant.name,
    effectiveness: result.effectiveness,
  };
}
