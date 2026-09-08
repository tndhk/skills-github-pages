import { TEAM, MOVES, OPPONENTS, DEFENSE_PRESETS } from './data.js';
import { MEGA_OPPONENTS, getOpponentVariant, getOpponentFormOptions } from './mega-data.js';
import { buildOpponentStats } from './stats.js';
import { calculateMatchup } from './damage.js';

const TYPE_LABELS = {
  normal: 'ノーマル', fire: 'ほのお', water: 'みず', electric: 'でんき', grass: 'くさ', ice: 'こおり',
  fighting: 'かくとう', poison: 'どく', ground: 'じめん', flying: 'ひこう', psychic: 'エスパー',
  bug: 'むし', rock: 'いわ', ghost: 'ゴースト', dragon: 'ドラゴン', dark: 'あく', steel: 'はがね', fairy: 'フェアリー',
};

const state = {
  memberId: 'charizard',
  form: 'normal',
  moveId: 'heatWave',
  opponentId: 'garchomp',
  opponentForm: 'normal',
  preset: 'uninvested',
  custom: { hp: 183, def: 115, spd: 105 },
  board: {
    weather: 'none', attackStage: 0, defenseStage: 0,
    burn: false, reflect: false, lightScreen: false,
    spread: true, critical: false,
  },
};

const $ = (id) => document.getElementById(id);
const els = {
  teamGrid: $('team-grid'), formToggle: $('form-toggle'), moveGrid: $('move-grid'),
  opponentSearch: $('opponent-search'), opponentResults: $('opponent-results'),
  opponentFormBlock: $('opponent-form-block'), opponentFormToggle: $('opponent-form-toggle'),
  presetGrid: $('preset-grid'), customDefense: $('custom-defense'), customHp: $('custom-hp'),
  customDef: $('custom-def'), customSpd: $('custom-spd'), weatherGrid: $('weather-grid'),
  attackStage: $('attack-stage'), defenseStage: $('defense-stage'), burn: $('burn'),
  reflect: $('reflect'), lightScreen: $('light-screen'), spread: $('spread'), critical: $('critical'),
  resultContext: $('result-context'), resultMove: $('result-move'), damageRange: $('damage-range'),
  damagePercent: $('damage-percent'), koLabel: $('ko-label'), rolls: $('rolls'),
};

function button(label, className, active, onClick, extra = '') {
  const el = document.createElement('button');
  el.type = 'button';
  el.className = `${className}${active ? ' active' : ''}`;
  el.innerHTML = `${label}${extra}`;
  el.setAttribute('aria-pressed', active ? 'true' : 'false');
  el.addEventListener('click', onClick);
  return el;
}

function currentOpponentVariant() {
  return getOpponentVariant(state.opponentId, OPPONENTS[state.opponentId], state.opponentForm);
}

function syncCustomFromOpponent() {
  const stats = buildOpponentStats(currentOpponentVariant(), 'uninvested');
  state.custom = { ...stats };
}

function renderTeam() {
  els.teamGrid.replaceChildren();
  for (const [id, member] of Object.entries(TEAM)) {
    const typeText = member.types.map((type) => TYPE_LABELS[type]).join(' / ');
    els.teamGrid.append(button(
      member.name,
      'choice-button',
      id === state.memberId,
      () => selectMember(id),
      `<small>${typeText}</small>`,
    ));
  }
}

function renderFormToggle() {
  const member = TEAM[state.memberId];
  const hasMega = member.forms.includes('mega');
  els.formToggle.hidden = !hasMega;
  els.formToggle.replaceChildren();
  if (!hasMega) return;
  els.formToggle.append(
    button('通常', '', state.form === 'normal', () => selectForm('normal')),
    button('メガ', '', state.form === 'mega', () => selectForm('mega')),
  );
}

function renderOpponentFormToggle() {
  const options = getOpponentFormOptions(state.opponentId);
  const hasMega = options.length > 1;
  els.opponentFormBlock.hidden = !hasMega;
  els.opponentFormToggle.replaceChildren();
  if (!hasMega) {
    state.opponentForm = 'normal';
    return;
  }
  if (!options.some((option) => option.id === state.opponentForm)) state.opponentForm = 'normal';
  els.opponentFormToggle.append(
    ...options.map((option) => button(
      option.label,
      '',
      state.opponentForm === option.id,
      () => selectOpponentForm(option.id),
    )),
  );
}

function renderMoves() {
  els.moveGrid.replaceChildren();
  for (const moveId of TEAM[state.memberId].moves) {
    const move = MOVES[moveId];
    const status = move.damaging === false;
    const detail = status ? '変化技' : `${TYPE_LABELS[move.type]} / 威力${move.power}`;
    const el = button(move.name, `choice-button${status ? ' status' : ''}`, moveId === state.moveId, () => selectMove(moveId), `<small>${detail}</small>`);
    els.moveGrid.append(el);
  }
}

function renderPresets() {
  els.presetGrid.replaceChildren();
  for (const [id, label] of Object.entries(DEFENSE_PRESETS)) {
    els.presetGrid.append(button(label, 'preset-button', id === state.preset, () => selectPreset(id)));
  }
  const showCustom = state.preset === 'custom';
  els.customDefense.hidden = !showCustom;
  if (showCustom) {
    els.customHp.value = state.custom.hp;
    els.customDef.value = state.custom.def;
    els.customSpd.value = state.custom.spd;
  }
}

function renderWeather() {
  for (const el of els.weatherGrid.querySelectorAll('[data-weather]')) {
    const active = el.dataset.weather === state.board.weather;
    el.classList.toggle('active', active);
    el.setAttribute('aria-pressed', active ? 'true' : 'false');
  }
}

function renderBoardInputs() {
  els.attackStage.value = String(state.board.attackStage);
  els.defenseStage.value = String(state.board.defenseStage);
  els.burn.checked = state.board.burn;
  els.reflect.checked = state.board.reflect;
  els.lightScreen.checked = state.board.lightScreen;
  els.spread.checked = state.board.spread;
  els.critical.checked = state.board.critical;
  renderWeather();
}

function practicalKoLabel(result, hp) {
  if (result.ko.hits > 0) return result.ko.label;
  for (let hits = 2; hits <= 4; hits += 1) {
    if (result.min * hits >= hp) return `確定${hits}発`;
    if (result.max * hits >= hp) return `乱数${hits}発`;
  }
  return '4発以上';
}

function renderResult() {
  let result;
  try {
    result = calculateMatchup({
      memberId: state.memberId,
      form: state.form,
      moveId: state.moveId,
      opponentId: state.opponentId,
      opponentForm: state.opponentForm,
      preset: state.preset,
      custom: state.custom,
      board: state.board,
    });
  } catch (error) {
    els.resultContext.textContent = '入力を確認してください';
    els.resultMove.textContent = error.message;
    els.damageRange.textContent = '—';
    els.damagePercent.textContent = '—';
    els.koLabel.textContent = '計算できません';
    els.rolls.textContent = '';
    return;
  }

  const formPrefix = state.form === 'mega' ? 'メガ' : '';
  els.resultContext.textContent = `${formPrefix}${result.attackerName} → ${result.opponentName}`;
  els.resultMove.textContent = result.moveName;

  if (result.nonDamaging) {
    els.damageRange.textContent = 'ダメージなし';
    els.damagePercent.textContent = '—';
    els.koLabel.textContent = '変化技';
    els.rolls.textContent = '';
    return;
  }

  const eff = result.effectiveness;
  els.resultMove.textContent = `${result.moveName}  ×${eff}`;
  els.damageRange.textContent = `${result.min}〜${result.max}`;
  els.damagePercent.textContent = `${result.minPercent.toFixed(1)}〜${result.maxPercent.toFixed(1)}%`;
  const defender = buildOpponentStats(currentOpponentVariant(), state.preset, state.custom);
  els.koLabel.textContent = practicalKoLabel(result, defender.hp);
  els.rolls.textContent = `乱数: ${result.rolls.join(' / ')}`;
}

function selectMember(memberId) {
  state.memberId = memberId;
  state.form = 'normal';
  state.moveId = TEAM[memberId].moves[0];
  state.board.spread = Boolean(MOVES[state.moveId].spread);
  renderTeam();
  renderFormToggle();
  renderMoves();
  renderBoardInputs();
  renderResult();
}

function selectForm(form) {
  state.form = form;
  renderFormToggle();
  renderResult();
}

function selectMove(moveId) {
  state.moveId = moveId;
  state.board.spread = Boolean(MOVES[moveId].spread);
  renderMoves();
  renderBoardInputs();
  renderResult();
}

function selectOpponent(opponentId) {
  state.opponentId = opponentId;
  state.opponentForm = 'normal';
  state.preset = 'uninvested';
  syncCustomFromOpponent();
  els.opponentSearch.value = OPPONENTS[opponentId].name;
  els.opponentResults.classList.remove('open');
  renderOpponentFormToggle();
  renderPresets();
  renderResult();
}

function selectOpponentForm(form) {
  state.opponentForm = form;
  syncCustomFromOpponent();
  renderOpponentFormToggle();
  renderPresets();
  renderResult();
}

function selectPreset(preset) {
  state.preset = preset;
  if (preset === 'custom' && (!state.custom.hp || !state.custom.def || !state.custom.spd)) syncCustomFromOpponent();
  renderPresets();
  renderResult();
}

function renderOpponentResults(query = '') {
  const normalized = query.trim();
  const matches = Object.entries(OPPONENTS).filter(([, opponent]) => !normalized || opponent.name.includes(normalized));
  els.opponentResults.replaceChildren();
  for (const [id, opponent] of matches) {
    const item = document.createElement('button');
    item.type = 'button';
    item.className = 'search-result';
    item.setAttribute('role', 'option');
    const megaBadge = MEGA_OPPONENTS[id] ? ' / メガ対応' : '';
    item.innerHTML = `<strong>${opponent.name}</strong><small>${opponent.types.map((type) => TYPE_LABELS[type]).join(' / ')}${megaBadge}</small>`;
    item.addEventListener('click', () => selectOpponent(id));
    els.opponentResults.append(item);
  }
  els.opponentResults.classList.toggle('open', matches.length > 0);
}

function setupStageSelect(select) {
  for (let stage = -6; stage <= 6; stage += 1) {
    const option = document.createElement('option');
    option.value = String(stage);
    option.textContent = stage > 0 ? `+${stage}` : String(stage);
    select.append(option);
  }
}

function setupEvents() {
  els.opponentSearch.addEventListener('focus', () => renderOpponentResults(els.opponentSearch.value));
  els.opponentSearch.addEventListener('input', () => renderOpponentResults(els.opponentSearch.value));
  els.opponentSearch.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') els.opponentResults.classList.remove('open');
  });
  document.addEventListener('click', (event) => {
    if (!event.target.closest('.search-wrap')) els.opponentResults.classList.remove('open');
  });

  els.weatherGrid.addEventListener('click', (event) => {
    const weather = event.target.closest('[data-weather]')?.dataset.weather;
    if (!weather) return;
    state.board.weather = weather;
    renderWeather();
    renderResult();
  });
  els.attackStage.addEventListener('change', () => { state.board.attackStage = Number(els.attackStage.value); renderResult(); });
  els.defenseStage.addEventListener('change', () => { state.board.defenseStage = Number(els.defenseStage.value); renderResult(); });
  for (const [element, key] of [
    [els.burn, 'burn'], [els.reflect, 'reflect'], [els.lightScreen, 'lightScreen'],
    [els.spread, 'spread'], [els.critical, 'critical'],
  ]) {
    element.addEventListener('change', () => { state.board[key] = element.checked; renderResult(); });
  }

  for (const [element, key] of [[els.customHp, 'hp'], [els.customDef, 'def'], [els.customSpd, 'spd']]) {
    element.addEventListener('input', () => {
      const value = Number(element.value);
      if (Number.isInteger(value) && value > 0) state.custom[key] = value;
      renderResult();
    });
  }
}

function init() {
  setupStageSelect(els.attackStage);
  setupStageSelect(els.defenseStage);
  syncCustomFromOpponent();
  els.opponentSearch.value = OPPONENTS[state.opponentId].name;
  renderTeam();
  renderFormToggle();
  renderOpponentFormToggle();
  renderMoves();
  renderPresets();
  renderBoardInputs();
  setupEvents();
  renderResult();
}

init();
