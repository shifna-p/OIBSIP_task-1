const input = document.getElementById('input');
const output = document.getElementById('output');

let ans = null;

function Pressed(value) {
    input.innerHTML += value;
}
  
function clearScreen() {
  input.innerHTML = '';
  output.innerHTML = '';
}

function deleteLast() {
  input.innerHTML = input.innerHTML.slice(0, -1);
}

function calculateResult() {
  const inputString = input.innerHTML;
  const result = evaluateExpression(inputString);

  if (result === 'Error') {
    output.innerHTML = 'Error';
  } else {
    output.innerHTML = result;
    ans = result;
  }
}

function evaluateExpression(expression) {
  try {
    let sanitizedExpression = sanitizeExpression(expression);
    sanitizedExpression = replaceAnsWithValue(sanitizedExpression);
    return eval(sanitizedExpression);
  } catch (error) {
    return 'Error';
  }
}

function sanitizeExpression(expression) {
  const sanitizedExpression = expression.replace(/[^-()\d/*+.]/g, '');
  return sanitizedExpression;
}

function replaceAnsWithValue(expression) {
  let newExpression = expression;
  while (newExpression.includes('ans')) {
    if (ans === null) {
      return 'Error';
    }
    newExpression = newExpression.replace('ans', ans);
  }
  return newExpression;
}

document.addEventListener('keydown', function(event) {
  let key = event.key;

  if (key >= 0 && key <= 9) {
    Pressed(key);
  } else if (key === '.') {
    Pressed('.');
  } else if (key === '+') {
    Pressed('+');
  } else if (key === '-') {
    Pressed('-');
  } else if (key === '*') {
    Pressed('*');
  } else if (key === '/') {
    Pressed('/');
  } else if (key === '(') {
    Pressed('(');
  } else if (key === ')') {
    Pressed(')');
  } else if (key === 'Enter') {
    calculateResult();
  } else if (key === 'Backspace') {
    deleteLast();
  }
});
