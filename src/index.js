/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

console.log('Starting application load...');

import * as Blockly from 'blockly';
import {blocks} from './blocks/text';
import {forBlock} from './generators/javascript';
import {javascriptGenerator} from 'blockly/javascript';
import 'blockly/blocks'; // Import all built-in blocks including variables
import 'blockly/javascript'; // Import all built-in JavaScript generators
import {save, load, loadExample} from './serialization';
import {toolbox} from './toolbox';
import './index.css';

console.log('All imports loaded successfully');

// Register the blocks and generator with Blockly
Blockly.common.defineBlocks(blocks);
Object.assign(javascriptGenerator.forBlock, forBlock);

console.log('Blocks and generators registered');

// Add immediate test - try to access buttons without waiting for DOM
setTimeout(() => {
  console.log('Immediate test - checking if buttons exist');
  const testBtn = document.getElementById('loadHelloWorld');
  console.log('Hello World button found immediately:', !!testBtn);
  if (testBtn) {
    testBtn.style.border = '3px solid red';
    console.log('Added red border to Hello World button');
  }
}, 100);

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded event fired');
  
  // Set up UI elements and inject Blockly
  const generatedCodeEl = document.getElementById('generatedCode');
  const codeDiv = generatedCodeEl ? generatedCodeEl.querySelector('code') : null;
  const outputDiv = document.getElementById('output');
  const blocklyDiv = document.getElementById('blocklyDiv');
  
  console.log('DOM elements found:', {
    generatedCode: !!generatedCodeEl,
    codeDiv: !!codeDiv,
    outputDiv: !!outputDiv,
    blocklyDiv: !!blocklyDiv
  });
  
  if (!blocklyDiv) {
    console.error('blocklyDiv not found!');
    return;
  }
  
  const ws = Blockly.inject(blocklyDiv, {toolbox});
  console.log('Blockly workspace injected:', !!ws);

  // This function resets the code and output divs, shows the
  // generated code from the workspace, and evals the code.
  // In a real application, you probably shouldn't use `eval`.
  const runCode = () => {
    const code = javascriptGenerator.workspaceToCode(ws);
    console.log('Generated Code:\n', code);
    codeDiv.innerText = code;

    outputDiv.innerHTML = '';

    try {
      eval(code);
      console.log('Code executed successfully.');
    } catch (e) {
      console.error('Error during code execution:', e);
      outputDiv.innerHTML += `<p style="color: red;">Error: ${e.message}</p>`;
    }
  };

  // Clear localStorage to avoid cached variable issues
  localStorage.clear();
  
  // Load the initial state from storage and run the code.
  load(ws);
  runCode();

  // Every time the workspace changes state, save the changes to storage.
  ws.addChangeListener((e) => {
    // UI events are things like scrolling, zooming, etc.
    // No need to save after one of these.
    if (e.isUiEvent) return;
    save(ws);
  });

  // Whenever the workspace changes meaningfully, run the code again.
  ws.addChangeListener((e) => {
    // Don't run the code when the workspace finishes loading; we're
    // already running it once when the application starts.
    // Don't run the code during drags; we might have invalid state.
    // Don't run the code for field changes (like typing in text inputs).
    if (
      e.isUiEvent ||
      e.type == Blockly.Events.FINISHED_LOADING ||
      e.type == Blockly.Events.BLOCK_FIELD_INTERMEDIATE_CHANGE ||
      ws.isDragging()
    ) {
      return;
    }
    runCode();
  });

  // Add event listeners for example buttons
  const helloWorldBtn = document.getElementById('loadHelloWorld');
  const greetingBtn = document.getElementById('loadGreeting');
  const calculatorBtn = document.getElementById('loadCalculator');
  const numberGameBtn = document.getElementById('loadNumberGame');
  const clearBtn = document.getElementById('clearWorkspace');
  
  console.log('Button elements found:', {
    helloWorld: !!helloWorldBtn,
    greeting: !!greetingBtn,
    calculator: !!calculatorBtn,
    numberGame: !!numberGameBtn,
    clear: !!clearBtn
  });
  
  const madLibsBtn = document.getElementById('loadMadLibs');

  console.log('Button elements found:', {
    helloWorld: !!helloWorldBtn,
    greeting: !!greetingBtn,
    calculator: !!calculatorBtn,
    numberGame: !!numberGameBtn,
    madLibs: !!madLibsBtn,
    clear: !!clearBtn
  });
  
  if (!helloWorldBtn || !greetingBtn || !calculatorBtn || !numberGameBtn || !madLibsBtn || !clearBtn) {
    console.error('Some button elements not found! Check HTML IDs.');
    console.log('Missing buttons:', {
      helloWorld: !helloWorldBtn,
      greeting: !greetingBtn,
      calculator: !calculatorBtn,
      numberGame: !numberGameBtn,
      madLibs: !madLibsBtn,
      clear: !clearBtn
    });
    return;
  }
  
  helloWorldBtn.addEventListener('click', () => {
    console.log('Hello World button clicked');
    outputDiv.innerHTML += '<p style="color: green;">Hello World button clicked!</p>';
    try {
      loadExample(ws, 'helloWorld');
      runCode();
      console.log('Hello World example loaded successfully');
    } catch (error) {
      console.error('Error loading Hello World example:', error);
      outputDiv.innerHTML += `<p style="color: red;">Error loading Hello World: ${error.message}</p>`;
    }
  });

  greetingBtn.addEventListener('click', () => {
    console.log('Interactive Greeting button clicked');
    outputDiv.innerHTML += '<p style="color: green;">Interactive Greeting button clicked!</p>';
    try {
      loadExample(ws, 'interactiveGreeting');
      runCode();
      console.log('Interactive Greeting example loaded successfully');
    } catch (error) {
      console.error('Error loading Interactive Greeting example:', error);
      outputDiv.innerHTML += `<p style="color: red;">Error loading Interactive Greeting: ${error.message}</p>`;
    }
  });

  calculatorBtn.addEventListener('click', () => {
    console.log('Simple Calculator button clicked');
    outputDiv.innerHTML += '<p style="color: green;">Simple Calculator button clicked!</p>';
    try {
      loadExample(ws, 'simpleCalculator');
      runCode();
      console.log('Simple Calculator example loaded successfully');
    } catch (error) {
      console.error('Error loading Simple Calculator example:', error);
      outputDiv.innerHTML += `<p style="color: red;">Error loading Simple Calculator: ${error.message}</p>`;
    }
  });

  numberGameBtn.addEventListener('click', () => {
    console.log('Number Game button clicked');
    outputDiv.innerHTML += '<p style="color: green;">Number Game button clicked!</p>';
    try {
      loadExample(ws, 'numberGame');
      runCode();
      console.log('Number Game example loaded successfully');
    } catch (error) {
      console.error('Error loading Number Game example:', error);
      outputDiv.innerHTML += `<p style="color: red;">Error loading Number Game: ${error.message}</p>`;
    }
  });

  madLibsBtn.addEventListener('click', () => {
    console.log('Mad Libs button clicked');
    outputDiv.innerHTML += '<p style="color: green;">Mad Libs button clicked!</p>';
    try {
      loadExample(ws, 'madLibs');
      runCode();
      console.log('Mad Libs example loaded successfully');
    } catch (error) {
      console.error('Error loading Mad Libs example:', error);
      outputDiv.innerHTML += `<p style="color: red;">Error loading Mad Libs: ${error.message}</p>`;
    }
  });

  clearBtn.addEventListener('click', () => {
    console.log('Clear Workspace button clicked');
    try {
      ws.clear();
      outputDiv.innerHTML = '';
      codeDiv.innerText = '';
      console.log('Workspace cleared successfully');
    } catch (error) {
      console.error('Error clearing workspace:', error);
      outputDiv.innerHTML += `<p style="color: red;">Error clearing workspace: ${error.message}</p>`;
    }
  });
});
