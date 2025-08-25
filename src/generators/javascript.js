/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import {Order} from 'blockly/javascript';

// Export all the code generators for our custom blocks,
// but don't register them with Blockly yet.
// This file has no side effects!
export const forBlock = Object.create(null);

forBlock['add_text'] = function (block, generator) {
  const text = generator.valueToCode(block, 'TEXT', Order.NONE) || "''";
  const addText = generator.provideFunction_(
    'addText',
    `function ${generator.FUNCTION_NAME_PLACEHOLDER_}(...args) {
  console.log('addText function called with:', args);
  // Join all arguments together and add text to the output area.
  const text = args.join(' ');
  const outputDiv = document.getElementById('output');
  const textEl = document.createElement('p');
  textEl.innerText = text;
  outputDiv.appendChild(textEl);
}`,
  );
  // Generate the function call for this block.
  const code = `${addText}(${text});\n`;
  return code;
};

forBlock['get_user_input'] = function (block, generator) {
  const code = generator.valueToCode(block, 'PROMPT', Order.ATOMIC) || "''";
  return [code, Order.ATOMIC];
};

forBlock['clear_output'] = function (block, generator) {
  const clearOutput = generator.provideFunction_(
    'clearOutput',
    `function ${generator.FUNCTION_NAME_PLACEHOLDER_}() {
  // Clear the output area.
  const outputDiv = document.getElementById('output');
  outputDiv.innerHTML = '';
}`,
  );
  const code = `${clearOutput}();\n`;
  return code;
};

forBlock['random_number_game'] = function (block, generator) {
  const min = generator.valueToCode(block, 'MIN', Order.NONE) || '1';
  const max = generator.valueToCode(block, 'MAX', Order.NONE) || '10';
  const numberGame = generator.provideFunction_(
    'numberGuessingGame',
    `function ${generator.FUNCTION_NAME_PLACEHOLDER_}(min, max) {
  // Start an interactive number guessing game
  const targetNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  const outputDiv = document.getElementById('output');
  
  let attempts = 0;
  let gameActive = true;
  
  const gameEl = document.createElement('div');
  gameEl.innerHTML = '<h3>Number Guessing Game!</h3><p>I\\'m thinking of a number between ' + min + ' and ' + max + '</p><p>Enter your guess and press Enter:</p>';
  outputDiv.appendChild(gameEl);
  
  // Create input field and button
  const inputContainer = document.createElement('div');
  inputContainer.style.margin = '10px 0';
  
  const input = document.createElement('input');
  input.type = 'number';
  input.min = min;
  input.max = max;
  input.placeholder = 'Enter your guess';
  input.style.padding = '5px';
  input.style.marginRight = '10px';
  input.style.width = '100px';
  
  const submitBtn = document.createElement('button');
  submitBtn.innerText = 'Guess!';
  submitBtn.style.padding = '5px 10px';
  
  inputContainer.appendChild(input);
  inputContainer.appendChild(submitBtn);
  outputDiv.appendChild(inputContainer);
  
  function makeGuess() {
    if (!gameActive) return;
    
    const guess = parseInt(input.value);
    
    if (isNaN(guess) || guess < min || guess > max) {
      const errorEl = document.createElement('p');
      errorEl.innerText = 'Please enter a valid number between ' + min + ' and ' + max;
      errorEl.style.color = 'orange';
      outputDiv.appendChild(errorEl);
      input.value = '';
      input.focus();
      return;
    }
    
    attempts++;
    input.value = '';
    
    const guessEl = document.createElement('p');
    guessEl.innerText = 'Attempt ' + attempts + ': You guessed ' + guess;
    guessEl.style.fontWeight = 'bold';
    outputDiv.appendChild(guessEl);
    
    if (guess === targetNumber) {
      const winEl = document.createElement('p');
      winEl.innerHTML = '<strong>🎉 Congratulations! You guessed it in ' + attempts + ' attempts!</strong>';
      winEl.style.color = 'green';
      outputDiv.appendChild(winEl);
      gameActive = false;
      input.disabled = true;
      submitBtn.disabled = true;
    } else if (guess < targetNumber) {
      const hintEl = document.createElement('p');
      hintEl.innerText = 'Too low! Try again.';
      hintEl.style.color = 'blue';
      outputDiv.appendChild(hintEl);
      input.focus();
    } else {
      const hintEl = document.createElement('p');
      hintEl.innerText = 'Too high! Try again.';
      hintEl.style.color = 'purple';
      outputDiv.appendChild(hintEl);
      input.focus();
    }
  }
  
  // Event listeners
  submitBtn.addEventListener('click', makeGuess);
  input.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      makeGuess();
    }
  });
  
  // Focus on input field
  input.focus();
}`,
  );
  const code = `${numberGame}(${min}, ${max});\n`;
  return code;
};

forBlock['simple_calculator'] = function (block, generator) {
  const valueA = generator.valueToCode(block, 'A', Order.NONE) || '0';
  const operator = block.getFieldValue('OP');
  const valueB = generator.valueToCode(block, 'B', Order.NONE) || '0';
  
  const calculator = generator.provideFunction_(
    'simpleCalculator',
    `function ${generator.FUNCTION_NAME_PLACEHOLDER_}(a, b, op) {
  const outputDiv = document.getElementById('output');
  let result;
  let opSymbol;
  
  switch(op) {
    case 'ADD':
      result = a + b;
      opSymbol = '+';
      break;
    case 'MINUS':
      result = a - b;
      opSymbol = '-';
      break;
    case 'MULTIPLY':
      result = a * b;
      opSymbol = '×';
      break;
    case 'DIVIDE':
      result = b !== 0 ? a / b : 'Error: Division by zero';
      opSymbol = '÷';
      break;
    default:
      result = 'Error';
      opSymbol = '?';
  }
  
  const calcEl = document.createElement('p');
  calcEl.innerText = a + ' ' + opSymbol + ' ' + b + ' = ' + result;
  calcEl.style.fontSize = '18px';
  calcEl.style.fontWeight = 'bold';
  outputDiv.appendChild(calcEl);
}`,
  );
  
  const code = `${calculator}(${valueA}, ${valueB}, '${operator}');\n`;
  return code;
};
