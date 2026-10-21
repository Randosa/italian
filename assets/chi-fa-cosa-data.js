/*
 * Content for Chi fa cosa? Kept separate from rendering and scoring.
 *
 * Each scene has two panels with opposite roles. Caption positions (at) are
 * percentages across ONE panel; names must follow the person if sides change.
 * sheet selects a 2-column, 6-row image; row and scene use zero-based indexes.
 * Each scene needs one question per panel so both practice activities work.
 * Exercise sentences always start with the pronoun and end with the named subject.
 * subject/object encode gender (m/f) and number (s/p). Keep these different
 * to preserve the beginner-friendly contrasts requested for this activity.
 */
'use strict';

window.ChiFaCosaData = {
  scenes: [
    {
      sheet: 'actions',
      row: 0,
      panels: [
        {
          description: 'Giulia hugs Marco.',
          names: [
            {
              text: 'Giulia',
              at: 40,
            },
            {
              text: 'Marco',
              at: 61,
            },
          ],
        },
        {
          description: 'Marco hugs Giulia.',
          names: [
            {
              text: 'Marco',
              at: 42,
            },
            {
              text: 'Giulia',
              at: 64,
            },
          ],
        },
      ],
      note: '',
    },
    {
      sheet: 'actions',
      row: 1,
      panels: [
        {
          description: 'Giulia and Sofia greet Anna.',
          names: [
            {
              text: 'Giulia',
              at: 13,
            },
            {
              text: 'Sofia',
              at: 31,
            },
            {
              text: 'Anna',
              at: 82,
            },
          ],
        },
        {
          description: 'Anna greets Giulia and Sofia.',
          names: [
            {
              text: 'Giulia',
              at: 13,
            },
            {
              text: 'Sofia',
              at: 31,
            },
            {
              text: 'Anna',
              at: 82,
            },
          ],
        },
      ],
      note: '',
    },
    {
      sheet: 'actions',
      row: 2,
      panels: [
        {
          description: 'Giulia chases Marco and Luca.',
          names: [
            {
              text: 'Giulia',
              at: 23,
            },
            {
              text: 'Marco',
              at: 62,
            },
            {
              text: 'Luca',
              at: 84,
            },
          ],
        },
        {
          description: 'Marco and Luca chase Giulia.',
          names: [
            {
              text: 'Marco',
              at: 20,
            },
            {
              text: 'Luca',
              at: 41,
            },
            {
              text: 'Giulia',
              at: 84,
            },
          ],
        },
      ],
      note: '',
    },
    {
      sheet: 'actions',
      row: 3,
      panels: [
        {
          description: 'Marco photographs Anna and Sofia.',
          names: [
            {
              text: 'Marco',
              at: 20,
            },
            {
              text: 'Anna',
              at: 65,
            },
            {
              text: 'Sofia',
              at: 84,
            },
          ],
        },
        {
          description: 'Anna and Sofia photograph Marco.',
          names: [
            {
              text: 'Marco',
              at: 20,
            },
            {
              text: 'Sofia',
              at: 65,
            },
            {
              text: 'Anna',
              at: 84,
            },
          ],
        },
      ],
      note: '',
    },
    {
      sheet: 'actions',
      row: 4,
      panels: [
        {
          description: 'Giulia writes a letter to Marco.',
          names: [
            {
              text: 'Giulia',
              at: 23,
            },
            {
              text: 'Marco',
              at: 81,
            },
          ],
        },
        {
          description: 'Marco writes a letter to Giulia.',
          names: [
            {
              text: 'Giulia',
              at: 23,
            },
            {
              text: 'Marco',
              at: 81,
            },
          ],
        },
      ],
      note: '',
    },
    {
      sheet: 'actions',
      row: 5,
      panels: [
        {
          description: 'Marco calls Anna.',
          names: [
            {
              text: 'Marco',
              at: 23,
            },
            {
              text: 'Anna',
              at: 80,
            },
          ],
        },
        {
          description: 'Anna calls Marco.',
          names: [
            {
              text: 'Marco',
              at: 23,
            },
            {
              text: 'Anna',
              at: 80,
            },
          ],
        },
      ],
      note: 'The caller taps the phone; the other person listens.',
    },
    {
      sheet: 'more',
      row: 0,
      panels: [
        {
          description: 'Marco draws a portrait of Anna.',
          names: [
            {
              text: 'Marco',
              at: 22,
            },
            {
              text: 'Anna',
              at: 80,
            },
          ],
        },
        {
          description: 'Anna draws a portrait of Marco.',
          names: [
            {
              text: 'Marco',
              at: 22,
            },
            {
              text: 'Anna',
              at: 80,
            },
          ],
        },
      ],
      note: '',
    },
    {
      sheet: 'more',
      row: 1,
      panels: [
        {
          description: 'Anna combs Marco’s hair.',
          names: [
            {
              text: 'Anna',
              at: 32,
            },
            {
              text: 'Marco',
              at: 60,
            },
          ],
        },
        {
          description: 'Marco combs Anna’s hair.',
          names: [
            {
              text: 'Anna',
              at: 38,
            },
            {
              text: 'Marco',
              at: 72,
            },
          ],
        },
      ],
      note: '',
    },
    {
      sheet: 'more',
      row: 2,
      panels: [
        {
          description: 'Marco listens to Anna and Sofia speaking.',
          names: [
            {
              text: 'Marco',
              at: 20,
            },
            {
              text: 'Anna',
              at: 64,
            },
            {
              text: 'Sofia',
              at: 85,
            },
          ],
        },
        {
          description: 'Anna and Sofia listen to Marco speaking.',
          names: [
            {
              text: 'Marco',
              at: 20,
            },
            {
              text: 'Anna',
              at: 64,
            },
            {
              text: 'Sofia',
              at: 85,
            },
          ],
        },
      ],
      note: '',
    },
    {
      sheet: 'more',
      row: 3,
      panels: [
        {
          description: 'Anna gives a book to Marco.',
          names: [
            {
              text: 'Anna',
              at: 23,
            },
            {
              text: 'Marco',
              at: 79,
            },
          ],
        },
        {
          description: 'Marco gives a book to Anna.',
          names: [
            {
              text: 'Anna',
              at: 23,
            },
            {
              text: 'Marco',
              at: 79,
            },
          ],
        },
      ],
      note: '',
    },
    {
      sheet: 'more',
      row: 4,
      panels: [
        {
          description: 'Marco offers a flower to Anna.',
          names: [
            {
              text: 'Marco',
              at: 22,
            },
            {
              text: 'Anna',
              at: 80,
            },
          ],
        },
        {
          description: 'Anna offers a flower to Marco.',
          names: [
            {
              text: 'Marco',
              at: 22,
            },
            {
              text: 'Anna',
              at: 80,
            },
          ],
        },
      ],
      note: '',
    },
    {
      sheet: 'more',
      row: 5,
      panels: [
        {
          description: 'Anna shows a photograph to Marco.',
          names: [
            {
              text: 'Anna',
              at: 23,
            },
            {
              text: 'Marco',
              at: 80,
            },
          ],
        },
        {
          description: 'Marco shows a photograph to Anna.',
          names: [
            {
              text: 'Anna',
              at: 23,
            },
            {
              text: 'Marco',
              at: 80,
            },
          ],
        },
      ],
      note: '',
    },
  ],
  questions: [
    {
      scene: 0,
      text: 'Lo abbraccia Giulia.',
      subject: 'fs',
      object: 'ms',
      explain: 'Giulia abbraccia Marco. «Lo» refers to Marco (one man); Giulia is the subject.',
      kind: 'direct',
      sceneId: 0,
    },
    {
      scene: 1,
      text: 'Le saluta Anna.',
      subject: 'fs',
      object: 'fp',
      explain: 'Anna saluta Giulia e Sofia. «Le» refers to the two women; Anna is one person.',
      kind: 'direct',
      sceneId: 1,
    },
    {
      scene: 0,
      text: 'Li insegue Giulia.',
      subject: 'fs',
      object: 'mp',
      explain: 'Giulia insegue Marco e Luca. «Li» refers to the two men; Giulia is the subject.',
      kind: 'direct',
      sceneId: 2,
    },
    {
      scene: 1,
      text: 'Lo fotografano Anna e Sofia.',
      subject: 'fp',
      object: 'ms',
      explain:
        'Anna e Sofia fotografano Marco. «Lo» refers to one man; the two women are the subject.',
      kind: 'direct',
      sceneId: 3,
    },
    {
      scene: 1,
      text: 'La abbraccia Marco.',
      subject: 'ms',
      object: 'fs',
      explain: 'Marco abbraccia Giulia. «La» refers to Giulia (one woman); Marco is the subject.',
      kind: 'direct',
      sceneId: 0,
    },
    {
      scene: 0,
      text: 'La salutano Giulia e Sofia.',
      subject: 'fp',
      object: 'fs',
      explain: 'Giulia e Sofia salutano Anna. «La» refers to one woman; the subject is two women.',
      kind: 'direct',
      sceneId: 1,
    },
    {
      scene: 1,
      text: 'La inseguono Marco e Luca.',
      subject: 'mp',
      object: 'fs',
      explain:
        'Marco e Luca inseguono Giulia. «La» refers to one woman; the two men are the subject.',
      kind: 'direct',
      sceneId: 2,
    },
    {
      scene: 0,
      text: 'Le fotografa Marco.',
      subject: 'ms',
      object: 'fp',
      explain: 'Marco fotografa Anna e Sofia. «Le» refers to two women; Marco is one man.',
      kind: 'direct',
      sceneId: 3,
    },
    {
      scene: 0,
      text: 'Gli scrive Giulia.',
      subject: 'fs',
      object: 'ms',
      explain:
        'Giulia scrive a Marco. «Gli» means to him; Giulia writes and Marco receives the letter.',
      kind: 'indirect',
      sceneId: 4,
    },
    {
      scene: 1,
      text: 'Le scrive Marco.',
      subject: 'ms',
      object: 'fs',
      explain:
        'Marco scrive a Giulia. Indirect «le» means to her; Marco writes and Giulia receives the letter.',
      kind: 'indirect',
      sceneId: 4,
    },
    {
      scene: 0,
      text: 'Le telefona Marco.',
      subject: 'ms',
      object: 'fs',
      explain:
        'Marco telefona ad Anna. «Le» means to her; Marco makes the call and Anna receives it.',
      kind: 'indirect',
      sceneId: 5,
    },
    {
      scene: 1,
      text: 'Gli telefona Anna.',
      subject: 'fs',
      object: 'ms',
      explain:
        'Anna telefona a Marco. «Gli» means to him; Anna makes the call and Marco receives it.',
      kind: 'indirect',
      sceneId: 5,
    },
    {
      sceneId: 6,
      scene: 0,
      kind: 'direct',
      text: 'La disegna Marco.',
      subject: 'ms',
      object: 'fs',
      explain: 'Marco disegna Anna. «La» refers to Anna; Marco draws her portrait.',
    },
    {
      sceneId: 6,
      scene: 1,
      kind: 'direct',
      text: 'Lo disegna Anna.',
      subject: 'fs',
      object: 'ms',
      explain: 'Anna disegna Marco. «Lo» refers to Marco; Anna draws his portrait.',
    },
    {
      sceneId: 7,
      scene: 0,
      kind: 'direct',
      text: 'Lo pettina Anna.',
      subject: 'fs',
      object: 'ms',
      explain: 'Anna pettina Marco. «Lo» refers to Marco; Anna combs his hair.',
    },
    {
      sceneId: 7,
      scene: 1,
      kind: 'direct',
      text: 'La pettina Marco.',
      subject: 'ms',
      object: 'fs',
      explain: 'Marco pettina Anna. «La» refers to Anna; Marco combs her hair.',
    },
    {
      sceneId: 8,
      scene: 0,
      kind: 'direct',
      text: 'Le ascolta Marco.',
      subject: 'ms',
      object: 'fp',
      explain:
        'Marco ascolta Anna e Sofia. Direct «le» refers to the two women; Marco listens to them.',
    },
    {
      sceneId: 8,
      scene: 1,
      kind: 'direct',
      text: 'Lo ascoltano Anna e Sofia.',
      subject: 'fp',
      object: 'ms',
      explain: 'Anna e Sofia ascoltano Marco. «Lo» refers to one man; the two women listen to him.',
    },
    {
      sceneId: 9,
      scene: 0,
      kind: 'indirect',
      text: 'Gli dà un libro Anna.',
      subject: 'fs',
      object: 'ms',
      explain: 'Anna dà un libro a Marco. «Gli» means to him; Marco receives the book.',
    },
    {
      sceneId: 9,
      scene: 1,
      kind: 'indirect',
      text: 'Le dà un libro Marco.',
      subject: 'ms',
      object: 'fs',
      explain: 'Marco dà un libro ad Anna. «Le» means to her; Anna receives the book.',
    },
    {
      sceneId: 10,
      scene: 0,
      kind: 'indirect',
      text: 'Le offre un fiore Marco.',
      subject: 'ms',
      object: 'fs',
      explain: 'Marco offre un fiore ad Anna. «Le» means to her; Anna receives the offer.',
    },
    {
      sceneId: 10,
      scene: 1,
      kind: 'indirect',
      text: 'Gli offre un fiore Anna.',
      subject: 'fs',
      object: 'ms',
      explain: 'Anna offre un fiore a Marco. «Gli» means to him; Marco receives the offer.',
    },
    {
      sceneId: 11,
      scene: 0,
      kind: 'indirect',
      text: 'Gli mostra una foto Anna.',
      subject: 'fs',
      object: 'ms',
      explain: 'Anna mostra una foto a Marco. «Gli» means to him; Anna shows him the photograph.',
    },
    {
      sceneId: 11,
      scene: 1,
      kind: 'indirect',
      text: 'Le mostra una foto Marco.',
      subject: 'ms',
      object: 'fs',
      explain: 'Marco mostra una foto ad Anna. «Le» means to her; Marco shows her the photograph.',
    },
  ],
};
