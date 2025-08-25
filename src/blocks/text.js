/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import * as Blockly from 'blockly/core';

// Create a custom block called 'add_text' that adds
// text to the output div on the sample app.
const addText = {
  type: 'add_text',
  message0: 'Add text %1',
  args0: [
    {
      type: 'input_value',
      name: 'TEXT',
      check: 'String',
    },
  ],
  previousStatement: null,
  nextStatement: null,
  colour: 160,
  tooltip: 'Adds text to the output area',
  helpUrl: '',
};

// Create a custom block for user input
const getUserInput = {
  type: 'get_user_input',
  message0: 'Ask user %1',
  args0: [
    {
      type: 'input_value',
      name: 'PROMPT',
      check: 'String',
    },
  ],
  output: 'String',
  colour: 180,
  tooltip: 'Gets input from the user with a prompt',
  helpUrl: '',
};

// Create a custom block for clearing output
const clearOutput = {
  type: 'clear_output',
  message0: 'Clear output',
  previousStatement: null,
  nextStatement: null,
  colour: 160,
  tooltip: 'Clears all output from the screen',
  helpUrl: '',
};

// Create a custom block for number guessing game
const randomNumber = {
  type: 'random_number_game',
  message0: 'Start number guessing game from %1 to %2',
  args0: [
    {
      type: 'input_value',
      name: 'MIN',
      check: 'Number',
    },
    {
      type: 'input_value',
      name: 'MAX',
      check: 'Number',
    },
  ],
  previousStatement: null,
  nextStatement: null,
  colour: 200,
  tooltip: 'Starts a number guessing game',
  helpUrl: '',
};

// Create a simple calculator block
const simpleCalculator = {
  type: 'simple_calculator',
  message0: 'Calculate %1 %2 %3',
  args0: [
    {
      type: 'input_value',
      name: 'A',
      check: 'Number',
    },
    {
      type: 'field_dropdown',
      name: 'OP',
      options: [
        ['+', 'ADD'],
        ['-', 'MINUS'],
        ['×', 'MULTIPLY'],
        ['÷', 'DIVIDE'],
      ],
    },
    {
      type: 'input_value',
      name: 'B',
      check: 'Number',
    },
  ],
  previousStatement: null,
  nextStatement: null,
  colour: 230,
  tooltip: 'Simple calculator that displays the operation and result',
  helpUrl: '',
};

// Create the block definitions for the JSON-only blocks.
// This does not register their definitions with Blockly.
// This file has no side effects!
export const blocks = Blockly.common.createBlockDefinitionsFromJsonArray([
  addText,
  getUserInput,
  clearOutput,
  randomNumber,
  simpleCalculator,
]);
