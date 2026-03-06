// JavaScript Calculator  

const readlineSync = require('readline-sync');

// track operaton history 
// empty array to store history
const calculationHistory = []; 

// creates calculation object & adds to history array
function addToHistory (operand1, operand2, operator, result) {
    const calculation = {
        operand1: operand1, 
        operand2: operand2, 
        operator: operator, 
        result: result
    };
    calculationHistory.push(calculation); 
}

// displays history or informs if empty 
function displayHistory() {
    if (calculationHistory.length === 0) {
        console.log("History Empty"); 
    } else {
        console.log("--- Current Calculation History ---"); 
        calculationHistory.forEach((calc, index) => {
            console.log(`[${index + 1}]: ${calc.operand1} ${calc.operator} ${calc.operand2} = ${calc.result}`);
        });
        console.log("-----------------"); 
    }
}

// add two numbers 
function addNumbers(a, b) { return a + b; }

// subtract two numbers 
function subtractNumbers(a, b) { return a - b; } 

// multiply two numbers 
function multiplyNumbers(a, b) { return a * b; }

// divide two numbers 
function divideNumbers(a, b) {
   if (b === 0) return "Error: Division by zero"; 
   return a / b; 
}

function runCalculator() {
    let keepRunning = true;
    console.log("Welcome to JS Calculator");

    while (keepRunning) {
        console.log("\n--- New Calculation ---");
        
        // 1. Get first number
        let num1Input = readlineSync.question("Enter first value (or 'q' to quit): ");
        if (num1Input.toLowerCase() === 'q') break;
        let n1 = parseFloat(num1Input);

        // 2. Get operator
        let operator = readlineSync.question("Enter operator (+, -, *, /): ");

        // 3. Get second number
        let n2 = parseFloat(readlineSync.question("Enter second value: "));

        // 4. Perform Calculation
        let result;
        if (isNaN(n1) || isNaN(n2)) {
            result = "Error: Invalid Number";
        } else {
            switch (operator) {
                case '+': result = addNumbers(n1, n2); break;
                case '-': result = subtractNumbers(n1, n2); break;
                case '*': result = multiplyNumbers(n1, n2); break;
                case '/': result = divideNumbers(n1, n2); break;
                default: result = "Error: Invalid Operator";
            }
        }

        // 5. Save and Display Result
        console.log(`Result: ${result}`);
        if (!result.toString().startsWith("Error")) {
            addToHistory(n1, n2, operator, result);
        }

        // 6. Ask to show history
        let showHist = readlineSync.question("Display history? (y/n): ");
        if (showHist.toLowerCase() === 'y') displayHistory();
        
        // 7. Check if user wants to continue
        let cont = readlineSync.question("Run another calculation? (y/n): ");
        if (cont.toLowerCase() !== 'y') keepRunning = false;
    }
    console.log("Ended Calculator!");
}

// Start calculator
runCalculator();