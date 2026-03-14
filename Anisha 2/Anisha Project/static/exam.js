// ========== EXAM JS ==========

// Mock exam questions - CET Mathematics
const examQuestions = [
    { id: 1, text: 'The point of intersection of circle x² + y² + 5x + 1 = 0 and line 3y + x = 3 is:', options: { A: '(5,6)', B: '(3,-6)', C: '(6,-3)', D: '(-3,6)' }, correct: 'C' },
    { id: 2, text: 'Number of solutions of sin x = sin 3x in [0, π]?', options: { A: '4', B: '6', C: '5', D: '2' }, correct: 'C' },
    { id: 3, text: 'In ΔABC, sec A + sec B + sec C ≥ ?', options: { A: '1', B: '8', C: '3', D: '2' }, correct: 'C' },
    { id: 4, text: 'Equation of line perpendicular to x − 2y = 1 through (1,1)?', options: { A: 'x + 2y = 3', B: '3x + y = 2', C: 'y = 2x − 3', D: 'y = −2x + 3' }, correct: 'D' },
    { id: 5, text: 'Area between y² = x and y = |x|?', options: { A: '2/3', B: '1', C: '1/8', D: '1/3' }, correct: 'A' },
    { id: 6, text: 'If f(x) = 2x + 3, find f(-1)?', options: { A: '-1', B: '1', C: '5', D: '-5' }, correct: 'B' },
    { id: 7, text: 'Derivative of x³ + 2x² - 5x + 7 is?', options: { A: '3x² + 4x - 5', B: '3x² + 4x', C: '3x + 4', D: 'x² + 4x - 5' }, correct: 'A' },
    { id: 8, text: 'If tan θ = 3/4, then sin θ = ?', options: { A: '3/5', B: '4/5', C: '3/4', D: '4/3' }, correct: 'A' },
    { id: 9, text: 'Distance between points (2,3) and (5,7) is?', options: { A: '5', B: '7', C: '√34', D: '√25' }, correct: 'C' },
    { id: 10, text: 'Integral of 2x dx = ?', options: { A: 'x²', B: 'x² + C', C: '2x + C', D: '2x²' }, correct: 'B' },
    { id: 11, text: 'If log₁₀ 2 = 0.301, then log₁₀ 20 = ?', options: { A: '1.301', B: '0.602', C: '2.301', D: '3.01' }, correct: 'A' },
    { id: 12, text: 'Solution of 2x + 3 = 9?', options: { A: '2', B: '3', C: '4', D: '-3' }, correct: 'B' },
    { id: 13, text: 'Roots of x² - 5x + 6 = 0?', options: { A: '1, 6', B: '2, 3', C: '1, 5', D: '-2, -3' }, correct: 'B' },
    { id: 14, text: 'If sin θ = 1/2, then θ = ?', options: { A: '30°', B: '60°', C: '45°', D: '90°' }, correct: 'A' },
    { id: 15, text: 'Sum of angles in a triangle?', options: { A: '90°', B: '180°', C: '360°', D: '270°' }, correct: 'B' },
    { id: 16, text: 'Slope of line 3x + 4y = 12?', options: { A: '3/4', B: '-3/4', C: '4/3', D: '-4/3' }, correct: 'B' },
    { id: 17, text: 'Area of circle with radius 5?', options: { A: '10π', B: '25π', C: '50π', D: '100π' }, correct: 'B' },
    { id: 18, text: 'If 3^x = 27, then x = ?', options: { A: '1', B: '2', C: '3', D: '4' }, correct: 'C' },
    { id: 19, text: 'cos(60°) = ?', options: { A: '1/2', B: '√3/2', C: '√2/2', D: '1' }, correct: 'A' },
    { id: 20, text: 'tan(45°) = ?', options: { A: '0', B: '1', C: '∞', D: '-1' }, correct: 'B' },
    { id: 21, text: 'If a + b = 10 and a - b = 4, then a = ?', options: { A: '6', B: '7', C: '8', D: '5' }, correct: 'B' },
    { id: 22, text: 'Circumference of circle with radius 7?', options: { A: '7π', B: '14π', C: '49π', D: '28π' }, correct: 'B' },
    { id: 23, text: 'If x² = 16, then x = ?', options: { A: '4', B: '-4', C: '±4', D: '2' }, correct: 'C' },
    { id: 24, text: 'Volume of sphere with radius 2?', options: { A: '8π', B: '16π/3', C: '32π/3', D: '64π/3' }, correct: 'C' },
    { id: 25, text: 'sin(30°) = ?', options: { A: '1/2', B: '√3/2', C: '1', D: '0' }, correct: 'A' },
    { id: 26, text: 'If y = 2x - 3, then at x = 2, y = ?', options: { A: '1', B: '2', C: '3', D: '4' }, correct: 'A' },
    { id: 27, text: 'HCF of 24 and 36?', options: { A: '6', B: '8', C: '12', D: '4' }, correct: 'C' },
    { id: 28, text: 'LCM of 12 and 18?', options: { A: '24', B: '36', C: '48', D: '60' }, correct: 'B' },
    { id: 29, text: 'What is 15% of 200?', options: { A: '20', B: '30', C: '40', D: '50' }, correct: 'B' },
    { id: 30, text: 'If 2x + 5 = 13, then x = ?', options: { A: '4', B: '5', C: '6', D: '3' }, correct: 'A' },
    { id: 31, text: 'Median of 2, 4, 6, 8, 10?', options: { A: '4', B: '6', C: '8', D: '5' }, correct: 'B' },
    { id: 32, text: 'Mean of 3, 5, 7?', options: { A: '5', B: '6', C: '7', D: '4' }, correct: 'A' },
    { id: 33, text: 'If |x| = 5, then x = ?', options: { A: '5', B: '-5', C: '±5', D: '0' }, correct: 'C' },
    { id: 34, text: 'Perimeter of square with side 8?', options: { A: '16', B: '24', C: '32', D: '64' }, correct: 'C' },
    { id: 35, text: 'Area of rectangle 5×12?', options: { A: '17', B: '34', C: '60', D: '120' }, correct: 'C' },
    { id: 36, text: 'If 5x = 25, then x = ?', options: { A: '3', B: '4', C: '5', D: '6' }, correct: 'C' },
    { id: 37, text: 'What is √144?', options: { A: '10', B: '11', C: '12', D: '13' }, correct: 'C' },
    { id: 38, text: 'Cube root of 64 is?', options: { A: '3', B: '4', C: '5', D: '6' }, correct: 'B' },
    { id: 39, text: '2³ = ?', options: { A: '6', B: '8', C: '9', D: '12' }, correct: 'B' },
    { id: 40, text: '5² = ?', options: { A: '10', B: '20', C: '25', D: '30' }, correct: 'C' },
    { id: 41, text: 'Sum of 1 + 2 + 3 + ... + 10?', options: { A: '50', B: '55', C: '60', D: '45' }, correct: 'B' },
    { id: 42, text: 'If x/2 = 6, then x = ?', options: { A: '3', B: '6', C: '12', D: '24' }, correct: 'C' },
    { id: 43, text: 'What is 20% of 150?', options: { A: '20', B: '25', C: '30', D: '35' }, correct: 'C' },
    { id: 44, text: 'If 3x - 2 = 7, then x = ?', options: { A: '2', B: '3', C: '4', D: '5' }, correct: 'B' },
    { id: 45, text: 'Vertex form of parabola y = x²?', options: { A: '(0,1)', B: '(0,0)', C: '(1,0)', D: '(0,-1)' }, correct: 'B' },
    { id: 46, text: 'If cos θ = 0, then θ = ?', options: { A: '0°', B: '45°', C: '90°', D: '180°' }, correct: 'C' },
    { id: 47, text: 'Evaluate: 100 - 25 + 15 - 10?', options: { A: '70', B: '75', C: '80', D: '85' }, correct: 'C' },
    { id: 48, text: 'If a = 2, b = 3, find 2a + 3b?', options: { A: '13', B: '15', C: '12', D: '10' }, correct: 'A' },
    { id: 49, text: 'Prime factors of 24?', options: { A: '2,3', B: '2,12', C: '3,8', D: '4,6' }, correct: 'A' },
    { id: 50, text: 'If y = x + 2, and x = 3, then y = ?', options: { A: '2', B: '3', C: '5', D: '6' }, correct: 'C' },
    { id: 51, text: 'Slope of vertical line?', options: { A: '0', B: '1', C: 'Undefined', D: '-1' }, correct: 'C' },
    { id: 52, text: 'What is the range of |x|?', options: { A: 'All real', B: '[0,∞)', C: '(-∞,0)', D: '[-1,1]' }, correct: 'B' },
    { id: 53, text: 'If x² - 3x + 2 = 0, roots are?', options: { A: '1,2', B: '1,3', C: '2,3', D: '-1,-2' }, correct: 'A' },
    { id: 54, text: 'Discriminant of ax² + bx + c = 0?', options: { A: 'a + b + c', B: 'b² - 4ac', C: 'b + 4ac', D: 'b² + 4ac' }, correct: 'B' },
    { id: 55, text: 'If sin θ = 0, then θ = ?', options: { A: '30°', B: '0°', C: '90°', D: '180°' }, correct: 'B' },
    { id: 56, text: 'Area of equilateral triangle with side a?', options: { A: 'a²/2', B: '√3a²/4', C: 'a²/4', D: 'a²' }, correct: 'B' },
    { id: 57, text: 'What is (x + y)²?', options: { A: 'x² + y²', B: 'x² + 2xy + y²', C: 'x² - y²', D: '2x + 2y' }, correct: 'B' },
    { id: 58, text: 'If 10% = x/100, then x = ?', options: { A: '1', B: '10', C: '100', D: '1000' }, correct: 'B' },
    { id: 59, text: 'Complementary angle of 35°?', options: { A: '55°', B: '145°', C: '90°', D: '45°' }, correct: 'A' },
    { id: 60, text: 'Supplementary angle of 120°?', options: { A: '30°', B: '50°', C: '60°', D: '75°' }, correct: 'C' }
];

// Global variables
let currentQuestion = 0;
let timerInterval;
let timeLeft = 90 * 60; // 1.5 hours in seconds
let answers = {};
let markedReview = new Set();
let skipped = new Set();

// Check if user is logged in
function checkUserLogin() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user) {
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

// Format time
function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

// Start timer
function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById('timerDisplay').textContent = formatTime(timeLeft);
        
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            submitExam();
        }
    }, 1000);
}

// Proceed to confirmation
function proceedToConfirmation() {
    document.getElementById('instructionsPage').style.display = 'none';
    document.getElementById('confirmationPage').style.display = 'block';
}

// Go back to instructions
function goBackToInstructions() {
    document.getElementById('confirmationPage').style.display = 'none';
    document.getElementById('instructionsPage').style.display = 'block';
}

// Start exam
function startExam() {
    document.getElementById('confirmationPage').style.display = 'none';
    document.getElementById('examPage').style.display = 'block';
    document.getElementById('examSidebar').style.display = 'block';
    
    startTimer();
    loadQuestion(0);
    renderQuestionPanel();
}

// Load question
function loadQuestion(index) {
    currentQuestion = index;
    const question = examQuestions[index];
    
    document.getElementById('questionNumber').textContent = `Question ${index + 1} of 60`;
    document.getElementById('questionText').textContent = question.text;
    
    document.getElementById('optionA-text').textContent = question.options.A;
    document.getElementById('optionB-text').textContent = question.options.B;
    document.getElementById('optionC-text').textContent = question.options.C;
    document.getElementById('optionD-text').textContent = question.options.D;
    
    // Clear previous selection
    document.querySelectorAll('input[name="answer"]').forEach(radio => {
        radio.checked = false;
    });
    
    // Restore saved answer if exists
    if (answers[index]) {
        document.querySelector(`input[value="${answers[index]}"]`).checked = true;
    }
    
    updateQuestionPanel();
}

// Save and next
function saveAndNext() {
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');
    if (selectedAnswer) {
        answers[currentQuestion] = selectedAnswer.value;
        skipped.delete(currentQuestion);
    }
    
    if (currentQuestion < 59) {
        loadQuestion(currentQuestion + 1);
    } else {
        alert('This is the last question. Click Submit Exam to finish.');
    }
}

// Skip question
function skipQuestion() {
    skipped.add(currentQuestion);
    markedReview.delete(currentQuestion);
    
    if (currentQuestion < 59) {
        loadQuestion(currentQuestion + 1);
    } else {
        alert('This is the last question. Click Submit Exam to finish.');
    }
}

// Reset question
function resetQuestion() {
    document.querySelectorAll('input[name="answer"]').forEach(radio => {
        radio.checked = false;
    });
    delete answers[currentQuestion];
    skipped.delete(currentQuestion);
}

// Mark for review
function markForReview() {
    markedReview.add(currentQuestion);
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');
    if (selectedAnswer) {
        answers[currentQuestion] = selectedAnswer.value;
    }
    updateQuestionPanel();
}

// Render question panel
function renderQuestionPanel() {
    const panel = document.getElementById('questionsPanel');
    let html = '';
    
    for (let i = 0; i < 60; i++) {
        let className = 'question-btn';
        
        if (i === currentQuestion) {
            className += ' current';
        } else if (answers[i]) {
            className += ' answered';
        } else if (markedReview.has(i)) {
            className += ' marked';
        }
        
        html += `<button class="${className}" onclick="loadQuestion(${i})">${i + 1}</button>`;
    }
    
    panel.innerHTML = html;
}

// Update question panel
function updateQuestionPanel() {
    const buttons = document.querySelectorAll('.question-btn');
    buttons.forEach((btn, index) => {
        btn.className = 'question-btn';
        
        if (index === currentQuestion) {
            btn.classList.add('current');
        } else if (answers[index]) {
            btn.classList.add('answered');
        } else if (markedReview.has(index)) {
            btn.classList.add('marked');
        }
    });
}

// Submit exam
function submitExam() {
    clearInterval(timerInterval);
    
    document.getElementById('examPage').style.display = 'none';
    document.getElementById('examSidebar').style.display = 'none';
    
    // Calculate results
    let correctCount = 0;
    let answeredCount = Object.keys(answers).length;
    
    for (let i in answers) {
        if (answers[i] === examQuestions[i].correct) {
            correctCount++;
        }
    }
    
    // Display results
    document.getElementById('totalQuestions').textContent = '60';
    document.getElementById('totalAnswered').textContent = answeredCount;
    document.getElementById('correctAnswers').textContent = correctCount;
    document.getElementById('finalScore').textContent = correctCount;
    
    // Generate result details
    let resultsHtml = '';
    for (let i = 0; i < 60; i++) {
        if (answers[i]) {
            if (answers[i] === examQuestions[i].correct) {
                resultsHtml += `<div class="result-item correct">Q${i + 1}</div>`;
            } else {
                resultsHtml += `<div class="result-item incorrect">Q${i + 1}</div>`;
            }
        } else if (skipped.has(i)) {
            resultsHtml += `<div class="result-item skipped">Q${i + 1}</div>`;
        }
    }
    
    document.getElementById('resultsGrid').innerHTML = resultsHtml;
    
    // Update user stats
    const user = JSON.parse(localStorage.getItem('currentUser'));
    user.testsCompleted = (user.testsCompleted || 0) + 1;
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    document.getElementById('resultsPage').style.display = 'block';
}

// View review
function viewReview() {
    alert('Review feature will be available soon');
}

// Retake test
function retakeTest() {
    location.reload();
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    if (checkUserLogin()) {
        // Load instructions page by default
        document.getElementById('instructionsPage').style.display = 'block';
    }
});
