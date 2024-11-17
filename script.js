// Function to show the popup when the digit limit is exceeded
function showPopup(message) {
  const popup = document.getElementById('popup');
  popup.innerText = message;
  popup.style.display = 'block';
  setTimeout(() => {
    popup.style.display = 'none';
  }, 2000);
}

const display = document.getElementById("display");

function appendNumber(number) {
  if (display.innerText === "0" || display.innerText === "Error") {
    display.innerText = number;
  } else {
    if (display.innerText.length < 18) {
      display.innerText += number;
      adjustFontSize();
    } else {
      showPopup("You can't enter more than 18 digits!");
    }
  }
}

function appendOperator(operator) {
  const lastChar = display.innerText.slice(-1);
  if ("+-×÷%√²^".includes(lastChar)) {
    display.innerText = display.innerText.slice(0, -1) + operator;
  } else {
    display.innerText += operator;
  }
  adjustFontSize();
}

function clearDisplay() {
  display.innerText = "0";
  adjustFontSize();
}

function deleteLast() {
  if (display.innerText.length === 1 || display.innerText === "Error") {
    display.innerText = "0";
  } else {
    display.innerText = display.innerText.slice(0, -1);
  }
  adjustFontSize();
}

function calculateResult() {
  try {
    let expression = display.innerText;
    expression = expression.replace("÷", "/").replace("×", "*").replace("²", "**2").replace("√", "Math.sqrt").replace("^", "**");
    display.innerText = eval(expression);
  } catch (error) {
    display.innerText = "Error";
  }
  adjustFontSize();
}

function adjustFontSize() {
  const screenWidth = window.innerWidth;
  const digitCount = display.innerText.length;

  if (screenWidth <= 600) {
    if (digitCount > 12) {
      display.style.fontSize = `${(screenWidth / digitCount) * 1.4}px`;
    } else {
      display.style.fontSize = "2.5rem";
    }
  } else if (screenWidth <= 1024) {
    if (digitCount > 12) {
      display.style.fontSize = `${(screenWidth / digitCount) * 0.6}px`;
    } else {
      display.style.fontSize = "3rem";
    }
  } else {
    if (digitCount > 12) {
      display.style.fontSize = `${(screenWidth / digitCount) * 0.6}px`;
    } else {
      display.style.fontSize = "3.5rem";
    }
  }
}

// Vibrate when button is pressed
const buttons = document.querySelectorAll("button");
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }

    // Prevent the "=" button from being styled
    if (!button.classList.contains("equals")) {
      const originalColor = "#444"; // Default color
      const hoverColor = "#555"; // Lighter shade

      // Apply hover color on click
      button.style.backgroundColor = hoverColor;

      // Ensure color reverts back after a short delay
      setTimeout(() => {
        button.style.backgroundColor = originalColor;
      }, 200);
    }
  });
});

// Ensure all buttons reset on hover out
buttons.forEach((button) => {
  button.addEventListener("mouseleave", () => {
    const originalColor = "#444"; // Default color
    button.style.backgroundColor = originalColor;
  });
});