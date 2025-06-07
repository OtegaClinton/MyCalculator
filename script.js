const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let currentInput = '0';

function updateDisplay() {
  display.textContent = currentInput;
}

function calculateExpression(expr) {
  // Replace custom operators with JavaScript operators
  let expression = expr
    .replace(/×/g, '*')
    .replace(/÷/g, '/')
    .replace(/\^/g, '**')
    .replace(/%/g, '/100');

  try {
    let result = eval(expression);
    if (result === Infinity || result === -Infinity) {
      return 'Error';
    }
    return result;
  } catch {
    return 'Error';
  }
}

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;

    if (button.classList.contains('clear')) {
      // Clear everything
      currentInput = '0';
      updateDisplay();
      return;
    }

    if (button.classList.contains('backspace')) {
      // Remove last character
      if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
      } else {
        currentInput = '0';
      }
      updateDisplay();
      return;
    }

    if (button.classList.contains('equal')) {
      // Calculate result
      let result = calculateExpression(currentInput);
      currentInput = result.toString();
      updateDisplay();
      return;
    }

    // For operators and numbers
    if (currentInput === '0' && !button.classList.contains('operator') && value !== '.') {
      currentInput = value;
    } else {
      currentInput += value;
    }

    updateDisplay();
  });
});

updateDisplay();
