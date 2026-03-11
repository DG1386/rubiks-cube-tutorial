/**
 * 3D Cube State Definitions for each step
 * Shared between EN and HE — colors are language-independent.
 * Each defines 6 faces × 9 cells showing the goal state of that step.
 *
 * Cell order per face (looking at the face):
 *   0=TL  1=TC  2=TR
 *   3=ML  4=MC  5=MR
 *   6=BL  7=BC  8=BR
 */

// Helper: build a solid 9-cell face of one color
const _f = c => [c,c,c,c,c,c,c,c,c];

const CUBE3D_STATES = {
  step1: {
    colors: {
      top:    ['gray','white','gray','white','yellow','white','gray','white','gray'],
      front:  ['gray','gray','gray','gray','red','gray','gray','gray','gray'],
      right:  ['gray','gray','gray','gray','blue','gray','gray','gray','gray'],
      back:   ['gray','gray','gray','gray','orange','gray','gray','gray','gray'],
      left:   ['gray','gray','gray','gray','green','gray','gray','gray','gray'],
      bottom: ['gray','gray','gray','gray','white','gray','gray','gray','gray']
    },
    rotX: -25, rotY: -30
  },
  step2: {
    colors: {
      top:    ['gray','gray','gray','gray','yellow','gray','gray','gray','gray'],
      front:  ['gray','gray','gray','gray','red','gray','gray','red','gray'],
      right:  ['gray','gray','gray','gray','blue','gray','gray','blue','gray'],
      back:   ['gray','gray','gray','gray','orange','gray','gray','orange','gray'],
      left:   ['gray','gray','gray','gray','green','gray','gray','green','gray'],
      bottom: ['gray','white','gray','white','white','white','gray','white','gray']
    },
    rotX: 25, rotY: -30
  },
  step3: {
    colors: {
      top:    ['gray','gray','gray','gray','yellow','gray','gray','gray','gray'],
      front:  ['gray','gray','gray','gray','red','gray','red','red','red'],
      right:  ['gray','gray','gray','gray','blue','gray','blue','blue','blue'],
      back:   ['gray','gray','gray','gray','orange','gray','orange','orange','orange'],
      left:   ['gray','gray','gray','gray','green','gray','green','green','green'],
      bottom: _f('white')
    },
    rotX: 25, rotY: -30
  },
  step4: {
    colors: {
      top:    ['gray','gray','gray','gray','yellow','gray','gray','gray','gray'],
      front:  ['gray','gray','gray','red','red','red','red','red','red'],
      right:  ['gray','gray','gray','blue','blue','blue','blue','blue','blue'],
      back:   ['gray','gray','gray','orange','orange','orange','orange','orange','orange'],
      left:   ['gray','gray','gray','green','green','green','green','green','green'],
      bottom: _f('white')
    },
    rotX: 15, rotY: -30
  },
  step5: {
    colors: {
      top:    ['gray','yellow','gray','yellow','yellow','yellow','gray','yellow','gray'],
      front:  ['gray','gray','gray','red','red','red','red','red','red'],
      right:  ['gray','gray','gray','blue','blue','blue','blue','blue','blue'],
      back:   ['gray','gray','gray','orange','orange','orange','orange','orange','orange'],
      left:   ['gray','gray','gray','green','green','green','green','green','green'],
      bottom: _f('white')
    },
    rotX: -25, rotY: -30
  },
  step6: {
    colors: {
      top:    _f('yellow'),
      front:  ['gray','gray','gray','red','red','red','red','red','red'],
      right:  ['gray','gray','gray','blue','blue','blue','blue','blue','blue'],
      back:   ['gray','gray','gray','orange','orange','orange','orange','orange','orange'],
      left:   ['gray','gray','gray','green','green','green','green','green','green'],
      bottom: _f('white')
    },
    rotX: -25, rotY: -30
  },
  step7: {
    colors: {
      top:    _f('yellow'),
      front:  ['red','gray','red','red','red','red','red','red','red'],
      right:  ['blue','gray','blue','blue','blue','blue','blue','blue','blue'],
      back:   ['orange','gray','orange','orange','orange','orange','orange','orange','orange'],
      left:   ['green','gray','green','green','green','green','green','green','green'],
      bottom: _f('white')
    },
    rotX: -15, rotY: -30
  },
  step8: {
    colors: {
      top:    _f('yellow'),
      front:  _f('red'),
      right:  _f('blue'),
      back:   _f('orange'),
      left:   _f('green'),
      bottom: _f('white')
    },
    rotX: -20, rotY: -30
  }
};

/** Side faces base for step 5/6 patterns (bottom 2 layers solved) */
const _sideBase = {
  front:  ['gray','gray','gray','red','red','red','red','red','red'],
  right:  ['gray','gray','gray','blue','blue','blue','blue','blue','blue'],
  back:   ['gray','gray','gray','orange','orange','orange','orange','orange','orange'],
  left:   ['gray','gray','gray','green','green','green','green','green','green'],
  bottom: _f('white')
};

/** 3D states for Step 5 patterns */
const PATTERN3D_S5 = {
  dot:       { colors: { ..._sideBase, top: ['gray','gray','gray','gray','yellow','gray','gray','gray','gray'] }, rotX:-25, rotY:-30 },
  line:      { colors: { ..._sideBase, top: ['gray','gray','gray','yellow','yellow','yellow','gray','gray','gray'] }, rotX:-25, rotY:-30 },
  boomerang: { colors: { ..._sideBase, top: ['gray','yellow','gray','yellow','yellow','gray','gray','gray','gray'] }, rotX:-25, rotY:-30 },
  cross:     { colors: { ..._sideBase, top: ['gray','yellow','gray','yellow','yellow','yellow','gray','yellow','gray'] }, rotX:-25, rotY:-30 }
};

/** 3D states for Step 6 patterns */
const PATTERN3D_S6 = {
  turtle: {
    colors: { ..._sideBase, top: ['gray','yellow','gray','yellow','yellow','yellow','gray','yellow','gray'] },
    rotX: -25, rotY: -30
  },
  fish: {
    colors: {
      top:    ['yellow','yellow','gray','yellow','yellow','yellow','gray','yellow','gray'],
      front:  ['orange','gray','gray','red','red','red','red','red','red'],
      right:  ['gray','gray','gray','blue','blue','blue','blue','blue','blue'],
      back:   ['gray','gray','gray','orange','orange','orange','orange','orange','orange'],
      left:   ['gray','gray','gray','green','green','green','green','green','green'],
      bottom: _f('white')
    },
    rotX: -25, rotY: -30
  },
  crab: {
    colors: { ..._sideBase, top: ['yellow','yellow','gray','yellow','yellow','yellow','gray','yellow','yellow'] },
    rotX: -25, rotY: -30
  },
  allYellow: null
};


/**
 * Tutorial Step Data
 * Each step contains: title, subtitle, goal, algorithm info,
 * instructions, tips, and optional pattern/diagram data.
 */

const STEPS = {
  step1: {
    number: 1,
    title: 'The Daisy',
    subtitle: 'Build the foundation by placing white edges around yellow',
    goal: 'Create a "daisy" pattern: four white edge pieces surrounding the yellow center piece on top of the cube.',
    algorithm: null,
    algoNote: 'No algorithm needed — this step is intuitive! Just find white edges and move them next to the yellow center.',
    instructions: [
      {
        title: 'Hold yellow on top',
        text: 'Orient your cube so the yellow center piece faces up. This is your workspace for the daisy.'
      },
      {
        title: 'Find a white edge piece',
        text: 'Look around the cube for edge pieces that have a white sticker. Edge pieces are the ones in the middle of each edge (not corners). You need to find 4 of them.'
      },
      {
        title: 'Move it to the top',
        text: 'If the white edge is on a side face, rotate that face to bring the white sticker up next to the yellow center. If it\'s on the bottom, rotate the appropriate side face twice (180°) to bring it up.'
      },
      {
        title: 'Avoid collisions',
        text: 'Before moving a white edge up, rotate the top layer (U) to make sure you\'re not knocking away a white edge you already placed. Create an empty spot first, then bring the piece up.'
      },
      {
        title: 'Repeat for all 4 edges',
        text: 'Keep finding white edge pieces and placing them around the yellow center until you have four white "petals" forming a daisy pattern on top.'
      }
    ],
    tips: [
      'Ignore corner pieces for now — they have three colored stickers and sit in the cube\'s corners',
      'If a white edge is stuck between other pieces, rotate a side face to free it first',
      'Practice until you can build the daisy in under a minute',
      'The other color on each white edge doesn\'t matter yet — just get all 4 white edges on top'
    ],
    diagram: {
      face: 'top',
      // W = white, Y = yellow, G = gray (don't care)
      cells: ['G','W','G', 'W','Y','W', 'G','W','G']
    },
    cube3d: CUBE3D_STATES.step1
  },

  step2: {
    number: 2,
    title: 'The White Cross',
    subtitle: 'Turn the daisy into a proper white cross',
    goal: 'Transform the daisy into a white cross on the bottom of the cube, where each arm of the cross matches the center color of its side.',
    algorithm: null,
    algoNote: 'No algorithm — match each petal\'s side color to a center, then flip that face 180°.',
    instructions: [
      {
        title: 'Look at a petal\'s side color',
        text: 'Pick one of the four white "petals" on top. Look at the non-white color on that same edge piece — it will be facing outward on one of the sides.'
      },
      {
        title: 'Match it to the center below',
        text: 'Hold the top layer still and rotate the bottom two layers (or the whole cube keeping the top steady) until the petal\'s side color lines up with the matching center piece below it.'
      },
      {
        title: 'Flip it down',
        text: 'Once matched, rotate that entire side face 180° (two turns). The white petal moves from the top to the bottom, and the side colors will match.'
      },
      {
        title: 'Repeat for all 4 petals',
        text: 'Do this for each of the remaining white petals. After all four, you should have no white pieces left on the yellow side.'
      },
      {
        title: 'Verify',
        text: 'Flip the cube over so white is on top. You should see a white cross, and the four arms of the cross should each have matching colors running down both adjacent sides (like a T-shape on each side).'
      }
    ],
    tips: [
      'Always match the side color to the center BEFORE flipping',
      'If you flip the wrong one, just flip it back (another 180°) and try again',
      'The cross arms should create a "T" shape of matching color on each side face',
      'Try to complete this step in under 90 seconds'
    ],
    diagram: {
      face: 'bottom-view',
      cells: ['G','W','G', 'W','W','W', 'G','W','G']
    },
    cube3d: CUBE3D_STATES.step2
  },

  step3: {
    number: 3,
    title: 'White Corners — Find the Lost Dogs',
    subtitle: 'Complete the entire white face',
    goal: 'Fill in all four white corners so the entire top face is white, and each side shows an upside-down "T" pattern of matching colors.',
    algorithm: {
      moves: "R' D' R D",
      mnemonic: '"Hide the dog, bring down the farmer, retrieve the dog" — repeat until the corner is solved'
    },
    instructions: [
      {
        title: 'Find a white corner ("dog") in the bottom layer',
        text: 'Look at the bottom layer for corner pieces that have a white sticker. Note which other two colors are on that corner piece.'
      },
      {
        title: 'Position it below its home',
        text: 'Rotate the bottom layer (D) until the white corner is directly below the spot where it needs to go. The two non-white colors should match the center colors of the two adjacent sides.'
      },
      {
        title: 'Check white sticker direction',
        text: 'Is the white sticker facing left, right, or down? This tells you how many times you need to repeat the algorithm.'
      },
      {
        title: 'Execute: R\' D\' R D',
        text: 'Perform the move sequence: Right face counter-clockwise, Bottom counter-clockwise, Right face clockwise, Bottom clockwise. Repeat this 1-5 times until the white corner pops into its correct position on top.'
      },
      {
        title: 'Repeat for all 4 corners',
        text: 'Find each remaining white corner in the bottom layer and solve it the same way. If a corner is stuck in the top layer but in the wrong spot, use the same algorithm once to knock it down to the bottom layer first.'
      }
    ],
    tips: [
      'If a white corner is already in the top layer but twisted wrong, do R\' D\' R D once to knock it to the bottom, then solve normally',
      'The algorithm always works — just keep repeating until the corner slides into place',
      'After this step, the entire white face should be complete with matching colors on all sides',
      'If a corner won\'t solve after 6 repetitions, it\'s probably positioned below the wrong slot — check the colors again'
    ],
    diagram: {
      face: 'top',
      cells: ['W','W','W', 'W','W','W', 'W','W','W']
    },
    cube3d: CUBE3D_STATES.step3
  },

  step4: {
    number: 4,
    title: 'The ABCs — Middle Layer',
    subtitle: 'Solve the middle layer edges',
    goal: 'Complete the first two layers of the cube. The top (white) and middle layers will be fully solved.',
    algorithm: {
      moves: "U R U' R' U' F' U F",
      movesAlt: "U' L' U L U F U' F'",
      mnemonic: 'Right version: moves the edge RIGHT. Left version: moves the edge LEFT. Form a "T" shape first, then decide direction.'
    },
    instructions: [
      {
        title: 'Flip the cube — yellow on top',
        text: 'Turn the cube upside down so yellow is now facing up and the completed white face is on the bottom. Keep it this way for the rest of the solve.'
      },
      {
        title: 'Find an edge without yellow',
        text: 'Look at the top layer edges (not corners). Find one where NEITHER color is yellow. This piece belongs in the middle layer.'
      },
      {
        title: 'Create the "T" shape',
        text: 'Rotate the top layer (U) until the front-facing color of your edge matches the center piece of that side, forming a "T" shape.'
      },
      {
        title: 'Determine left or right',
        text: 'Look at the color on TOP of your edge piece. Does it match the center on the left side or the right side? This tells you which algorithm to use.'
      },
      {
        title: 'Execute the algorithm',
        text: 'If the piece needs to go RIGHT: U R U\' R\' U\' F\' U F. If it needs to go LEFT: U\' L\' U L U F U\' F\'. The edge will slot into the middle layer.'
      },
      {
        title: 'Repeat for all 4 middle edges',
        text: 'Find and solve each middle layer edge. If a middle edge is in the right spot but flipped, use either algorithm to knock it out, then re-solve it.'
      }
    ],
    tips: [
      'If all top-layer edges have yellow, an edge from the middle layer is in the wrong place — use the algorithm to pop it out, then solve correctly',
      'The "T" shape is key — always form it before deciding left or right',
      'After this step, only the yellow face and top layer remain unsolved',
      'Say the direction out loud ("RIGHT" or "LEFT") before executing — it helps avoid mistakes'
    ],
    diagram: {
      face: 'side-view',
      label: 'After step 4, the bottom two layers are complete'
    },
    cube3d: CUBE3D_STATES.step4
  },

  step5: {
    number: 5,
    title: 'The Yellow Cross — FUR URF',
    subtitle: 'Create a yellow plus sign on top',
    goal: 'Form a yellow cross (plus sign) on the yellow face. Only the edges need to be yellow — corners don\'t matter yet.',
    algorithm: {
      moves: "F U R U' R' F'",
      mnemonic: '"FUR - URF" — Forward, Up, Right (clockwise), then Up, Right, Forward (counter-clockwise)'
    },
    instructions: [
      {
        title: 'Position yellow on top',
        text: 'Make sure the yellow face is on top. Look at the yellow side and identify which pattern you see.'
      },
      {
        title: 'Identify your starting pattern',
        text: 'You\'ll see one of three patterns: a DOT (only the center is yellow), a LINE (center + two opposite edges), or a BOOMERANG / L-shape (center + two adjacent edges).'
      },
      {
        title: 'Orient correctly before the algorithm',
        text: 'DOT: orientation doesn\'t matter. LINE: hold it horizontal (left-right). BOOMERANG: hold it so the L points to the back-left (like a 9 o\'clock position).'
      },
      {
        title: 'Execute: F U R U\' R\' F\'',
        text: 'Perform the algorithm: Front clockwise, Up clockwise, Right clockwise, Up counter-clockwise, Right counter-clockwise, Front counter-clockwise.'
      },
      {
        title: 'Check and repeat',
        text: 'After each execution: DOT becomes LINE or BOOMERANG, LINE becomes a CROSS, BOOMERANG becomes a CROSS. If you still don\'t have a cross, re-orient and repeat.'
      }
    ],
    tips: [
      'From a DOT, it takes 3 executions. From a LINE, 1 execution. From a BOOMERANG, 2 executions.',
      'Orientation matters! If the line isn\'t horizontal or the boomerang isn\'t at 9 o\'clock, you\'ll go backwards',
      'Remember: "FUR" (all clockwise), then "URF" (all counter-clockwise)',
      'The side colors of the cross edges don\'t need to match yet — that comes later'
    ],
    patterns: [
      { name: 'The Dot', cells: ['G','G','G', 'G','Y','G', 'G','G','G'], note: 'Only center — do algorithm 3x', cube3d: PATTERN3D_S5.dot },
      { name: 'The Line', cells: ['G','G','G', 'Y','Y','Y', 'G','G','G'], note: 'Hold horizontal — do 1x', cube3d: PATTERN3D_S5.line },
      { name: 'The Boomerang', cells: ['G','Y','G', 'Y','Y','G', 'G','G','G'], note: 'Hold at 9 o\'clock — do 2x', cube3d: PATTERN3D_S5.boomerang },
      { name: 'The Cross', cells: ['G','Y','G', 'Y','Y','Y', 'G','Y','G'], note: 'Done! Move to step 6', cube3d: PATTERN3D_S5.cross }
    ],
    diagram: {
      face: 'top',
      cells: ['G','Y','G', 'Y','Y','Y', 'G','Y','G']
    },
    cube3d: CUBE3D_STATES.step5
  },

  step6: {
    number: 6,
    title: 'The Yellow Fish',
    subtitle: 'Complete the entire yellow face',
    goal: 'Make the entire top face yellow. All 9 squares on top should be yellow.',
    algorithm: {
      moves: "R U R' U R U2 R'",
      mnemonic: '"Clock, Clock, Counter, Clock, Clock, Flip, Counter" — always alternating Right and Up (start with Right)'
    },
    instructions: [
      {
        title: 'Check what you have',
        text: 'With yellow on top and the cross completed, look at the four corners. You may already have 0, 1, or 2 yellow corners in place.'
      },
      {
        title: 'Look for the "fish" pattern',
        text: 'Rotate the top layer and look for a pattern that resembles a fish: the yellow cross plus exactly one yellow corner, creating a shape like a fish with a tail.'
      },
      {
        title: 'Position the fish correctly',
        text: 'Hold the cube so the single solved yellow corner (the "fish\'s eye") is in the bottom-left of the yellow face (facing you). The fish should be "swimming" to the left.'
      },
      {
        title: 'Execute: R U R\' U R U2 R\'',
        text: 'Right clockwise, Up clockwise, Right counter-clockwise, Up clockwise, Right clockwise, Up twice (180°), Right counter-clockwise.'
      },
      {
        title: 'Repeat if needed',
        text: 'After the algorithm, check the top face. If it\'s not all yellow, find the fish pattern again, re-orient, and repeat. It may take up to 3 repetitions.'
      }
    ],
    tips: [
      'If you see NO yellow corners, the orientation doesn\'t matter — just do the algorithm once to get a fish',
      'The fish\'s "eye" (solved yellow corner) must be in the bottom-left when facing you',
      'If you keep getting stuck in a loop, double-check that you\'re doing U2 (180°) and not just U on the 6th move',
      'After this step, the entire yellow face should be solid yellow'
    ],
    patterns: [
      { name: 'The Turtle', cells: ['G','Y','G', 'Y','Y','Y', 'G','Y','G'], note: '0 yellow corners — do algorithm from any position', cube3d: PATTERN3D_S6.turtle },
      { name: 'The Fish', cells: ['Y','Y','G', 'Y','Y','Y', 'G','Y','G'], note: 'Eye bottom-left, look for fish food on front', cube3d: PATTERN3D_S6.fish },
      { name: 'The Crab', cells: ['Y','Y','G', 'Y','Y','Y', 'G','Y','Y'], note: '2 yellow corners — claws at back, do algorithm', cube3d: PATTERN3D_S6.crab },
      { name: 'All Yellow', cells: ['Y','Y','Y', 'Y','Y','Y', 'Y','Y','Y'], note: 'Done!', cube3d: PATTERN3D_S6.allYellow }
    ],
    diagram: {
      face: 'top',
      cells: ['Y','Y','Y', 'Y','Y','Y', 'Y','Y','Y']
    },
    cube3d: CUBE3D_STATES.step6
  },

  step7: {
    number: 7,
    title: 'Thumbs Up — Position Corners',
    subtitle: 'Get the corner colors to match on every side',
    goal: 'Position the four yellow corners so that the corner colors match the side centers on all four sides.',
    algorithm: {
      moves: "R' F R' B2 R F' R' B2 R2",
      mnemonic: '"Counter, Clock, Counter, Flip, Clock — Counter, Counter, Flip, Flip" — using Right, Front, Right, Back pattern'
    },
    instructions: [
      {
        title: 'Look at the corners of each side',
        text: 'With yellow still on top, examine the four sides. Look at just the top corner colors on each side. Do any sides have BOTH top corners matching the same color?'
      },
      {
        title: 'Find matching corners',
        text: 'Rotate the top layer (U) to try to get a side where BOTH upper corners match each other (and ideally match the center too). If you find one, put that side at the BACK.'
      },
      {
        title: 'Place your left thumb',
        text: 'Put your left thumb on the top-left of the yellow face. Your thumb stays there as an anchor throughout the algorithm.'
      },
      {
        title: 'Execute the 9-move algorithm',
        text: 'R\' (Right CCW), F (Front CW), R\' (Right CCW), B2 (Back 180°), R (Right CW), F\' (Front CCW), R\' (Right CCW), B2 (Back 180°), R2 (Right 180°).'
      },
      {
        title: 'Check and repeat',
        text: 'After the algorithm, check if all corners match. If not, find the side with matching corners, put it at the back, and repeat. It takes at most 2 repetitions.'
      }
    ],
    tips: [
      'If NO side has matching corners, just do the algorithm once from any position — after that, one side will have matching corners',
      'The side with matching corners always goes to the BACK',
      'Make sure B2 is a full 180° turn, not just 90° — this is a common mistake',
      'After this step, all corners will be in the right position but the edges may still be wrong'
    ],
    diagram: {
      face: 'top',
      cells: ['Y','Y','Y', 'Y','Y','Y', 'Y','Y','Y']
    },
    cube3d: CUBE3D_STATES.step7
  },

  step8: {
    number: 8,
    title: 'Final Edges — Finish Him!',
    subtitle: 'The last step to a solved cube!',
    goal: 'Cycle the last few edge pieces into their correct positions to completely solve the Rubik\'s cube!',
    algorithm: {
      moves: "R2 U R U R' U' R' U' R' U R'",
      mnemonic: '"Flip, Clock 1-2-3, Counter 1-2-3-4-5, Clock, Counter" — always alternating Right and Up'
    },
    instructions: [
      {
        title: 'Find the most solved side',
        text: 'Look at all four sides. Find the one where the top edge already matches (the entire top row is one color). Put that side at the BACK. If no side is fully solved, just pick any position.'
      },
      {
        title: 'Execute the algorithm',
        text: 'R2 (Right 180°), U (Up CW), R (Right CW), U (Up CW), R\' (Right CCW), U\' (Up CCW), R\' (Right CCW), U\' (Up CCW), R\' (Right CCW), U (Up CW), R\' (Right CCW).'
      },
      {
        title: 'Check the result',
        text: 'Look at the cube — is it solved? If not, find the solved side again, put it at the back, and repeat the algorithm one more time.'
      },
      {
        title: 'Celebrate!',
        text: 'Congratulations — you\'ve solved the Rubik\'s cube! With practice, you\'ll be able to solve it faster and faster. Many people can get under 2 minutes with this beginner method.'
      }
    ],
    tips: [
      'This algorithm only needs to be done 1-3 times maximum',
      'The most complete side always goes to the BACK',
      'Say the moves aloud as you go: "Flip... Clock 1, Clock 2, Clock 3... Counter 1, Counter 2, Counter 3, Counter 4, Counter 5... Clock, Counter"',
      'If you\'ve done it 4+ times and it\'s not solving, you may have made an error in a previous step — check that the yellow face and corners are correct'
    ],
    diagram: null,
    cube3d: CUBE3D_STATES.step8
  }
};

/**
 * Cheat Sheet data for quick reference
 */
const CHEATSHEET = [
  { step: 1, name: 'The Daisy', algo: 'No algorithm', desc: 'Intuitive — place white edges around yellow center' },
  { step: 2, name: 'The White Cross', algo: 'No algorithm', desc: 'Match petal side color to center, flip 180°' },
  { step: 3, name: 'White Corners', algo: "R' D' R D", desc: 'Repeat until corner is solved (1-5 times)' },
  { step: 4, name: 'Middle Layer (ABCs)', algo: "U R U' R' U' F' U F", algoAlt: "U' L' U L U F U' F'", desc: 'Right or Left version — form the T first' },
  { step: 5, name: 'Yellow Cross', algo: "F U R U' R' F'", desc: 'FUR-URF — orient the pattern before executing' },
  { step: 6, name: 'Yellow Face', algo: "R U R' U R U2 R'", desc: 'Fish eye bottom-left, repeat until all yellow' },
  { step: 7, name: 'Position Corners', algo: "R' F R' B2 R F' R' B2 R2", desc: 'Matching corners to the back, repeat 1-2x' },
  { step: 8, name: 'Final Edges', algo: "R2 U R U R' U' R' U' R' U R'", desc: 'Solved side to the back, repeat 1-3x' }
];

/**
 * Notation reference data
 */
const NOTATION = [
  { letter: 'R', name: 'Right', desc: 'Right face clockwise' },
  { letter: "R'", name: 'Right Inverse', desc: 'Right face counter-clockwise' },
  { letter: 'L', name: 'Left', desc: 'Left face clockwise' },
  { letter: "L'", name: 'Left Inverse', desc: 'Left face counter-clockwise' },
  { letter: 'U', name: 'Up', desc: 'Top face clockwise' },
  { letter: "U'", name: 'Up Inverse', desc: 'Top face counter-clockwise' },
  { letter: 'D', name: 'Down', desc: 'Bottom face clockwise' },
  { letter: "D'", name: 'Down Inverse', desc: 'Bottom face counter-clockwise' },
  { letter: 'F', name: 'Front', desc: 'Front face clockwise' },
  { letter: "F'", name: 'Front Inverse', desc: 'Front face counter-clockwise' },
  { letter: 'B', name: 'Back', desc: 'Back face clockwise' },
  { letter: "B'", name: 'Back Inverse', desc: 'Back face counter-clockwise' },
  { letter: 'U2', name: 'Up Double', desc: 'Top face 180° (half turn)' },
  { letter: 'R2', name: 'Right Double', desc: 'Right face 180° (half turn)' }
];
