// Run with: node --test tests/chi-fa-cosa.test.cjs
// A small DOM double lets the static activity be checked without a browser build.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');

class Element {
  constructor() {
    this.children = [];
    this.style = {};
    this.dataset = {};
    this.attributes = {};
    this.events = {};
    this.disabled = false;
    this.hidden = false;
    this.textContent = '';
    this.classList = { add() {} };
  }
  setAttribute(name, value) {
    this.attributes[name] = value;
  }
  append(...children) {
    this.children.push(...children);
  }
  replaceChildren(...children) {
    this.children = children;
  }
  addEventListener(name, callback) {
    this.events[name] = callback;
  }
  querySelectorAll() {
    return this.children;
  }
  focus() {
    this.focused = true;
  }
  click() {
    if (!this.disabled) this.events.click?.();
  }
}

function createActivity(random = 0.9) {
  const ids = Object.fromEntries(
    [
      'progress',
      'score',
      'meter',
      'stage',
      'sentence',
      'cast',
      'prompt',
      'feedback',
      'next',
      'restart',
      'choices',
      'scene-preview',
    ].map((id) => [id, new Element()]),
  );
  const buttons = (key, values) =>
    values.map((value) => {
      const button = new Element();
      button.dataset[key] = value;
      return button;
    });
  const modes = buttons('mode', ['direct', 'indirect', 'mixed']);
  const activities = buttons('activity', ['pictures', 'sentences']);
  const math = Object.create(Math);
  math.random = () => random;
  const context = vm.createContext({
    window: {},
    Math: math,
    document: {
      getElementById: (id) => ids[id],
      createElement: () => new Element(),
      querySelectorAll: (selector) => (selector === '[data-mode]' ? modes : activities),
    },
  });
  vm.runInContext(read('assets/chi-fa-cosa-data.js'), context);
  vm.runInContext(read('assets/chi-fa-cosa.js'), context);
  return { ids, modes, activities, data: context.window.ChiFaCosaData };
}

function findCorrect(fixture, question, activity) {
  return fixture.ids.choices.children.find((button) =>
    activity === 'pictures'
      ? button.attributes['aria-label'].endsWith(
          fixture.data.scenes[question.sceneId].panels[question.scene].description,
        )
      : button.children[0].textContent === question.text,
  );
}

test('all 24 questions use a contrasting referent, subject-last order, and a valid paired scene', () => {
  const { data } = createActivity();
  assert.equal(data.questions.length, 24);
  assert.equal(data.questions.filter((q) => q.kind === 'direct').length, 14);
  assert.equal(data.questions.filter((q) => q.kind === 'indirect').length, 10);
  for (const q of data.questions) {
    assert.notEqual(q.subject, q.object, q.text);
    assert.match(q.text, /^(Lo|La|Li|Le|Gli) /, q.text);
    assert.match(q.text, /(?:Giulia|Marco|Anna|Sofia|Luca)\.$/, q.text);
    assert.equal(
      data.questions.filter((p) => p.sceneId === q.sceneId && p.scene !== q.scene).length,
      1,
    );
    const scene = data.scenes[q.sceneId];
    assert.ok(scene.row >= 0 && scene.row < 6);
    for (const panel of scene.panels) {
      assert.ok(panel.names.length >= 2);
      for (const name of panel.names) {
        assert.ok(name.at > 0 && name.at < 100);
        assert.ok(panel.description.includes(name.text), `${name.text}: ${panel.description}`);
      }
    }
  }
});

for (const activity of ['pictures', 'sentences']) {
  for (const [mode, count] of [
    ['direct', 14],
    ['indirect', 10],
    ['mixed', 24],
  ]) {
    test(`${activity}/${mode}: completion, retries, first-choice scoring, and restart`, () => {
      const fixture = createActivity();
      fixture.activities.find((b) => b.dataset.activity === activity).click();
      fixture.modes.find((b) => b.dataset.mode === mode).click();
      const questions = fixture.data.questions.filter((q) => mode === 'mixed' || q.kind === mode);
      assert.equal(questions.length, count);
      // Recover mixed question order from the rendered UI instead of relying on it.
      let expectedScore = 0;
      for (let index = 0; index < count; index++) {
        const question =
          activity === 'pictures'
            ? questions.find((q) => q.text === fixture.ids.sentence.textContent)
            : questions.find((q) => {
                const drawing = fixture.ids['scene-preview'].children[0].children[0];
                const scene = fixture.data.scenes[q.sceneId];
                return (
                  drawing.className === `scene scene--${scene.sheet}` &&
                  drawing.style.backgroundPosition === `${q.scene * 100}% ${scene.row * 20}%`
                );
              });
        assert.ok(question);
        const correct = findCorrect(fixture, question, activity);
        const wrong = fixture.ids.choices.children.find((button) => button !== correct);
        assert.ok(correct);
        assert.equal(fixture.ids['scene-preview'].hidden, activity === 'pictures');
        if (index % 2 === 0) {
          wrong.click();
          assert.match(fixture.ids.feedback.textContent, /Riprova/);
          assert.equal(wrong.disabled, true);
          assert.equal(fixture.ids.next.hidden, true);
          wrong.events.click(); // The controller must also reject synthetic repeats.
        } else expectedScore++;
        correct.click();
        correct.events.click();
        assert.match(fixture.ids.feedback.textContent, /Esatto/);
        assert.equal(fixture.ids.score.textContent, `First choices correct: ${expectedScore}`);
        assert.equal(fixture.ids.next.hidden, false);
        fixture.ids.next.click();
      }
      assert.equal(fixture.ids.sentence.textContent, 'Ben fatto!');
      assert.equal(fixture.ids.meter.value, count);
      assert.equal(fixture.ids.choices.children.length, 0);
      assert.equal(fixture.ids.prompt.hidden, true);
      fixture.ids.restart.click();
      assert.equal(fixture.ids.progress.textContent, `1 / ${count}`);
      assert.equal(fixture.ids.score.textContent, 'First choices correct: 0');
      assert.equal(fixture.ids.choices.children.length, 2);
    });
  }
}

test('person captions follow the panel when A/B choices swap', () => {
  for (const random of [0, 0.9]) {
    const { ids, data } = createActivity(random);
    const scene = data.scenes[data.questions[0].sceneId];
    for (const button of ids.choices.children) {
      const picture = button.children[0];
      const [drawing, names] = picture.children;
      const panelIndex = drawing.style.backgroundPosition.startsWith('100%') ? 1 : 0;
      assert.deepEqual(
        names.children.map((name) => name.textContent),
        Array.from(scene.panels[panelIndex].names, (name) => name.text),
      );
      assert.deepEqual(
        names.children.map((name) => name.style.left),
        Array.from(scene.panels[panelIndex].names, (name) => `${name.at}%`),
      );
    }
  }
});

test('changing activity or pronoun set resets the score and updates the selected control', () => {
  const fixture = createActivity();
  findCorrect(fixture, fixture.data.questions[0], 'pictures').click();
  fixture.activities[1].click();
  assert.equal(fixture.ids.score.textContent, 'First choices correct: 0');
  assert.equal(fixture.activities[1].attributes['aria-pressed'], 'true');
  assert.equal(fixture.activities[0].attributes['aria-pressed'], 'false');
  fixture.modes[1].click();
  assert.equal(fixture.ids.progress.textContent, '1 / 10');
  assert.equal(fixture.modes[1].attributes['aria-pressed'], 'true');
});

test('all local HTML references and both illustration sheets exist', () => {
  for (const file of fs
    .readdirSync(root, { recursive: true })
    .filter((file) => file.endsWith('.html'))) {
    for (const [, value] of read(file).matchAll(/(?:src|href)="([^"]+)"/g)) {
      if (/^(?:https?:|#|data:)/.test(value)) continue;
      assert.ok(
        fs.existsSync(path.resolve(root, path.dirname(file), value.split('#')[0])),
        `${file}: ${value}`,
      );
    }
  }
  for (const sheet of ['actions', 'more']) {
    assert.ok(fs.existsSync(path.join(root, `assets/chi-fa-cosa-${sheet}.png`)));
  }
});
