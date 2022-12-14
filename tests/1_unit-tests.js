const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver;


suite('Unit Tests', () => {
  const puzzleString = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
  const solution = '135762984946381257728459613694517832812936745357824196473298561581673429269145378';
  const invalidPuzzle = '0.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
  const noSolution = '5.65.84.352......2187....31..3.1..8.9..863..5.5..9.6..13....25........74..52.63..';
  
  // Test Validity of puzzle string
  test('#1 Puzzle string should have 81 characters', () => {
    assert.deepEqual(
      solver.validate('..9'),
      { error: 'Expected puzzle to be 81 characters long' },
      'Expected puzzle to be 81 characters long'
    );
    assert.deepEqual(
      solver.validate(puzzleString + '9'),
      { error: 'Expected puzzle to be 81 characters long' },
      'Expected puzzle to be 81 characters long'
    );
  });
  
  test('#2 Puzzle string should contain "1-9" and "." only', () => {
    assert.deepEqual(
      solver.validate(invalidPuzzle),
      { error: 'Invalid characters in puzzle' },
      'Invalid characters in puzzle'
    );
  });
  
  test('#3 Valid puzzle string', () => {
    assert.equal(
      solver.validate(puzzleString),
      true,
      'Puzzle string is valid');
  });

  // Test valid/invalid placement
  test('#4 Valid row placement', () => {
    assert.isTrue(solver.checkRowPlacement(puzzleString, 0, 2, 3));
  });
  
  test('#5 Invalid row placement', () => {
    assert.isFalse(solver.checkRowPlacement(puzzleString, 0, 2, 5));
  });
  
  test('#6 Valid column placement', () => {
    assert.isTrue(solver.checkColPlacement(puzzleString, 0, 0, 9));
  });
  
  test('#7 Invalid column placement', () => {
    assert.isFalse(solver.checkColPlacement(puzzleString, 0, 0, 8));
  });
  
  test('#8 Valid region (3x3 grid) placement', () => {
    assert.isTrue(solver.checkRegionPlacement(puzzleString, 0, 1, 7));
  });
  
  test('#9 Invalid region (3x3 grid) placement', () => {
    assert.isFalse(solver.checkRegionPlacement(puzzleString, 0, 0, 2));
  });
  
  test('#10 Valid puzzle strings pass the solver', () => {
    assert.property(solver.solve(puzzleString), 'solution');
  });
  
  test('#11 Invalid puzzle strings fail the solver', () => {
    assert.deepEqual(solver.solve(noSolution), { error: 'Puzzle cannot be solved' });
  });

  test('#12 Solver returns the expected solution', () => {
    assert.propertyVal(solver.solve(puzzleString), 'solution', solution);
  });
});
