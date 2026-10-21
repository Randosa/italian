/*
 * Shared controller for both comprehension activities.
 * Content and caption positions live in chi-fa-cosa-data.js.
 * No server or saved personal data is needed; scores last for this session.
 */
'use strict';

(() => {
  const { scenes, questions } = window.ChiFaCosaData;
  const element = (id) => document.getElementById(id);
  const state = {
    activity: 'pictures',
    mode: 'direct',
    items: [],
    index: 0,
    score: 0,
    attempted: false,
    answered: false,
    complete: false,
  };

  // Fisher–Yates avoids the uneven ordering produced by a random sort comparator.
  function shuffled(values) {
    const result = [...values];
    for (let index = result.length - 1; index > 0; index--) {
      const other = Math.floor(Math.random() * (index + 1));
      [result[index], result[other]] = [result[other], result[index]];
    }
    return result;
  }

  function start() {
    const selected = questions.filter(
      (question) => state.mode === 'mixed' || question.kind === state.mode,
    );
    state.items = state.mode === 'mixed' ? shuffled(selected) : selected;
    state.index = 0;
    state.score = 0;
    state.complete = false;

    document.querySelectorAll('[data-mode]').forEach((button) => {
      button.setAttribute('aria-pressed', String(button.dataset.mode === state.mode));
    });
    document.querySelectorAll('[data-activity]').forEach((button) => {
      button.setAttribute('aria-pressed', String(button.dataset.activity === state.activity));
    });
    render();
  }

  // Labels belong to each panel, not each answer position: shuffling A/B must
  // never move a name away from the person it identifies.
  function createPicture(sceneId, panelIndex, interactive) {
    const scene = scenes[sceneId];
    const panel = scene.panels[panelIndex];
    const picture = document.createElement('span');
    picture.className = 'named-picture';
    const drawing = document.createElement('span');
    drawing.className = `scene scene--${scene.sheet}`;
    drawing.style.backgroundPosition = `${panelIndex * 100}% ${scene.row * 20}%`;
    if (interactive) {
      drawing.setAttribute('aria-hidden', 'true');
    } else {
      drawing.setAttribute('role', 'img');
      drawing.setAttribute('aria-label', panel.description);
    }

    const names = document.createElement('span');
    names.className = 'character-names';
    names.setAttribute('lang', 'it');
    panel.names.forEach(({ text, at }) => {
      const label = document.createElement('span');
      label.className = 'character-name';
      label.style.left = `${at}%`;
      label.textContent = text;
      names.append(label);
    });
    picture.append(drawing, names);
    return picture;
  }

  function createChoice(label, correct, picture) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = picture ? 'picture-choice' : 'sentence-choice';
    if (picture) {
      button.setAttribute('aria-label', label);
      button.append(picture);
    }
    const caption = document.createElement('span');
    caption.className = 'choice-letter';
    caption.textContent = label;
    if (!picture) caption.setAttribute('lang', 'it');
    button.append(caption);
    button.addEventListener('click', () => choose(button, correct));
    return button;
  }

  function render() {
    state.attempted = false;
    state.answered = false;
    const question = state.items[state.index];
    const scene = scenes[question.sceneId];
    const showPictures = state.activity === 'pictures';
    const stages = {
      direct: 'PRONOMI DIRETTI',
      indirect: 'PRONOMI INDIRETTI',
      mixed: 'RIPASSO MISTO',
    };

    element('progress').textContent = `${state.index + 1} / ${state.items.length}`;
    updateScore();
    element('meter').max = state.items.length;
    element('meter').value = state.index;
    element('meter').textContent = `${state.index} / ${state.items.length}`;
    element('stage').textContent = stages[state.mode];
    element('sentence').textContent = showPictures ? question.text : 'Guarda la scena.';
    element('cast').textContent = scene.note;
    element('cast').hidden = !scene.note;
    element('prompt').hidden = false;
    element('prompt').textContent = showPictures
      ? 'Quale immagine corrisponde alla frase?'
      : 'Quale frase corrisponde all’immagine?';
    element('feedback').textContent = '';
    element('feedback').className = 'feedback';
    element('next').hidden = true;
    element('next').textContent =
      state.index === state.items.length - 1 ? 'Risultati →' : 'Avanti →';
    element('choices').replaceChildren();
    element('choices').className = showPictures ? 'picture-grid' : 'sentence-grid';
    element('scene-preview').replaceChildren();
    element('scene-preview').hidden = showPictures;

    if (showPictures) {
      shuffled([0, 1]).forEach((panelIndex, index) => {
        const letter = index === 0 ? 'A' : 'B';
        const button = createChoice(
          letter,
          panelIndex === question.scene,
          createPicture(question.sceneId, panelIndex, true),
        );
        button.setAttribute('aria-label', `${letter}: ${scene.panels[panelIndex].description}`);
        element('choices').append(button);
      });
    } else {
      element('scene-preview').append(createPicture(question.sceneId, question.scene, false));
      // The paired sentence reverses the roles without adding unrelated vocabulary.
      const opposite = questions.find(
        (candidate) => candidate.sceneId === question.sceneId && candidate.scene !== question.scene,
      );
      shuffled([question, opposite]).forEach((candidate) => {
        element('choices').append(createChoice(candidate.text, candidate === question));
      });
    }
  }

  function updateScore() {
    element('score').textContent = `First choices correct: ${state.score}`;
  }

  function choose(button, correct) {
    // Ignore repeat activation after an answer, including programmatic clicks.
    if (state.complete || state.answered || button.disabled) return;
    if (!state.attempted) {
      if (correct) state.score++;
      state.attempted = true;
      updateScore();
    }

    if (correct) {
      state.answered = true;
      button.classList.add('correct');
      element('feedback').className = 'feedback correct';
      element('feedback').textContent = `Esatto! ${state.items[state.index].explain}`;
      element('choices')
        .querySelectorAll('button')
        .forEach((choice) => {
          choice.disabled = true;
        });
      element('next').hidden = false;
      element('next').focus();
    } else {
      button.disabled = true;
      button.classList.add('incorrect');
      element('feedback').className = 'feedback incorrect';
      element('feedback').textContent =
        'Riprova. Use the names and pronoun: who acts, and who receives?';
      // Give keyboard users an immediate route to the remaining answer.
      element('choices')
        .querySelectorAll('button')
        .forEach((choice) => {
          if (!choice.disabled) choice.focus();
        });
    }
  }

  element('next').addEventListener('click', () => {
    if (!state.answered || state.complete) return;
    state.index++;
    if (state.index < state.items.length) {
      render();
    } else {
      state.complete = true;
      element('meter').value = state.items.length;
      element('meter').textContent = `${state.items.length} / ${state.items.length}`;
      element('progress').textContent = 'Completed';
      element('sentence').textContent = 'Ben fatto!';
      element('cast').hidden = false;
      element('cast').textContent =
        `${state.score} / ${state.items.length} correct on the first choice.`;
      element('prompt').hidden = true;
      element('choices').replaceChildren();
      element('scene-preview').hidden = true;
      element('next').hidden = true;
      element('feedback').className = 'feedback';
      element('feedback').textContent =
        'Repeat this set, try the other activity, or choose another pronoun set.';
    }
    element('sentence').focus();
  });

  element('restart').addEventListener('click', () => {
    start();
    element('sentence').focus();
  });
  document.querySelectorAll('[data-mode]').forEach((button) => {
    button.addEventListener('click', () => {
      state.mode = button.dataset.mode;
      start();
      element('sentence').focus();
    });
  });
  document.querySelectorAll('[data-activity]').forEach((button) => {
    button.addEventListener('click', () => {
      state.activity = button.dataset.activity;
      start();
      element('sentence').focus();
    });
  });

  start();
})();
