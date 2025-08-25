/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import * as Blockly from 'blockly/core';

const storageKey = 'mainWorkspace';

/**
 * Saves the state of the workspace to browser's local storage.
 * @param {Blockly.Workspace} workspace Blockly workspace to save.
 */
export const save = function (workspace) {
  const data = Blockly.serialization.workspaces.save(workspace);
  window.localStorage?.setItem(storageKey, JSON.stringify(data));
};

// Example programs for users to try
const examplePrograms = {
  helloWorld: {
    "blocks": {
      "languageVersion": 0,
      "blocks": [
        {
          "type": "add_text",
          "id": "hello1",
          "x": 50,
          "y": 50,
          "inputs": {
            "TEXT": {
              "shadow": {
                "type": "text",
                "id": "text1",
                "fields": {
                  "TEXT": "Hello, World! Welcome to Blockly!"
                }
              }
            }
          }
        }
      ]
    }
  },
  interactiveGreeting: {
    "blocks": {
      "languageVersion": 0,
      "blocks": [
        {
          "type": "add_text",
          "id": "greeting1",
          "x": 50,
          "y": 50,
          "inputs": {
            "TEXT": {
              "shadow": {
                "type": "text",
                "id": "greeting_text",
                "fields": {
                  "TEXT": "Hello, World! This is an interactive greeting."
                }
              }
            }
          }
        }
      ]
    }
  },
  simpleCalculator: {
    "blocks": {
      "languageVersion": 0,
      "blocks": [
        {
          "type": "controls_repeat_ext",
          "id": "loop1",
          "x": 50,
          "y": 50,
          "inputs": {
            "TIMES": {
              "shadow": {
                "type": "math_number",
                "id": "num_loops",
                "fields": {
                  "NUM": 3
                }
              }
            },
            "DO": {
              "block": {
                "type": "simple_calculator",
                "id": "calc1",
                "fields": {
                  "OP": "ADD"
                },
                "inputs": {
                  "A": {
                    "shadow": {
                      "type": "math_number",
                      "id": "num1",
                      "fields": {
                        "NUM": 15
                      }
                    }
                  },
                  "B": {
                    "shadow": {
                      "type": "math_number",
                      "id": "num2",
                      "fields": {
                        "NUM": 25
                      }
                    }
                  }
                }
              }
            }
          }
        }
      ]
    }
  },
  numberGame: {
    "blocks": {
      "languageVersion": 0,
      "blocks": [
        {
          "type": "random_number_game",
          "id": "game1",
          "x": 50,
          "y": 50,
          "inputs": {
            "MIN": {
              "shadow": {
                "type": "math_number",
                "id": "min1",
                "fields": {
                  "NUM": 1
                }
              }
            },
            "MAX": {
              "shadow": {
                "type": "math_number",
                "id": "max1",
                "fields": {
                  "NUM": 20
                }
              }
            }
          }
        }
      ]
    }
  },
  madLibs: {
    "blocks": {
      "languageVersion": 0,
      "blocks": [
        {
          "type": "variables_set",
          "id": "set_noun",
          "x": 50,
          "y": 50,
          "fields": {
            "VAR": "noun"
          },
          "inputs": {
            "VALUE": {
              "shadow": {
                "type": "text",
                "fields": {
                  "TEXT": "dog"
                }
              }
            }
          },
          "next": {
            "block": {
              "type": "variables_set",
              "id": "set_verb",
              "fields": {
                "VAR": "verb"
              },
              "inputs": {
                "VALUE": {
                  "shadow": {
                    "type": "text",
                    "fields": {
                      "TEXT": "running"
                    }
                  }
                }
              },
              "next": {
                "block": {
                  "type": "variables_set",
                  "id": "set_adjective",
                  "fields": {
                    "VAR": "adjective"
                  },
                  "inputs": {
                    "VALUE": {
                      "shadow": {
                        "type": "text",
                        "fields": {
                          "TEXT": "happy"
                        }
                      }
                    }
                  },
                  "next": {
                    "block": {
                      "type": "add_text",
                      "id": "print_story",
                      "inputs": {
                        "TEXT": {
                          "block": {
                            "type": "text_join",
                            "id": "join_story",
                            "extraState": {
                              "itemCount": 7
                            },
                            "inputs": {
                              "ADD0": {
                                "shadow": {
                                  "type": "text",
                                  "fields": {
                                    "TEXT": "The"
                                  }
                                }
                              },
                              "ADD1": {
                                "shadow": {
                                  "type": "text",
                                  "fields": {
                                    "TEXT": " "
                                  }
                                }
                              },
                              "ADD2": {
                                "block": {
                                  "type": "variables_get",
                                  "id": "get_adjective",
                                  "fields": {
                                    "VAR": "adjective"
                                  }
                                }
                              },
                              "ADD3": {
                                "shadow": {
                                  "type": "text",
                                  "fields": {
                                    "TEXT": " "
                                  }
                                }
                              },
                              "ADD4": {
                                "block": {
                                  "type": "variables_get",
                                  "id": "get_noun",
                                  "fields": {
                                    "VAR": "noun"
                                  }
                                }
                              },
                              "ADD5": {
                                "shadow": {
                                  "type": "text",
                                  "fields": {
                                    "TEXT": " is "
                                  }
                                },
                                "block": {
                                  "type": "variables_get",
                                  "id": "get_verb",
                                  "fields": {
                                    "VAR": "verb"
                                  }
                                }
                              },
                              "ADD6": {
                                "shadow": {
                                  "type": "text",
                                  "fields": {
                                    "TEXT": " in the park."
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      ]
    }
  }
};

/**
 * Loads saved state from local storage into the given workspace.
 * @param {Blockly.Workspace} workspace Blockly workspace to load into.
 */
export const load = function (workspace) {
  const data = window.localStorage?.getItem(storageKey);
  if (data) {
    // Don't emit events during loading.
    Blockly.Events.disable();
    Blockly.serialization.workspaces.load(JSON.parse(data), workspace, false);
    Blockly.Events.enable();
  } else {
    // Load the hello world example if no saved data
    loadExample(workspace, 'helloWorld');
  }
};

/**
 * Load an example program into the workspace.
 * @param {Blockly.Workspace} workspace Blockly workspace to load into.
 * @param {string} exampleName Name of the example to load.
 */
export const loadExample = function (workspace, exampleName) {
  const example = examplePrograms[exampleName];
  if (!example) return;

  // Don't emit events during loading.
  Blockly.Events.disable();
  workspace.clear();
  Blockly.serialization.workspaces.load(example, workspace, false);
  Blockly.Events.enable();
};

/**
 * Get list of available examples.
 * @return {Array} List of example names.
 */
export const getExamples = function () {
  return Object.keys(examplePrograms);
};
