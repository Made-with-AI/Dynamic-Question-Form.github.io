let questionCount = 0;

function addQuestion() {
    const questionType = document.getElementById('questionType').value;
    const questionsContainer = document.getElementById('questionsContainer');
    
    questionCount++;
    let questionHtml = '';

    if (questionType === 'rangeCheck') {
        questionHtml = `
            <div id="question${questionCount}" class="card question-card">
                <div class="card-body">
                    <h5 class="card-title">Numerical Range Check Question ${questionCount}</h5>
                    <div class="form-group">
                        <label for="number1_${questionCount}">Enter Number 1:</label>
                        <input type="number" id="number1_${questionCount}" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label for="number2_${questionCount}">Enter Number 2:</label>
                        <input type="number" id="number2_${questionCount}" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label for="number3_${questionCount}">Enter Number 3:</label>
                        <input type="number" id="number3_${questionCount}" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label for="marksAwarded_${questionCount}">Marks Awarded:</label>
                        <input type="number" id="marksAwarded_${questionCount}" class="form-control" placeholder="Enter marks for correct answer" required>
                    </div>
                    <div class="form-group">
                        <label for="marksDeducted_${questionCount}">Marks Deducted:</label>
                        <input type="number" id="marksDeducted_${questionCount}" class="form-control" placeholder="Enter marks deducted for incorrect answer" required>
                    </div>
                    <button type="button" class="btn btn-danger" onclick="removeQuestion(${questionCount})">Remove</button>
                </div>
            </div>`;
    } else if (questionType === 'mcq') {
        questionHtml = `
            <div id="question${questionCount}" class="card question-card">
                <div class="card-body">
                    <h5 class="card-title">MCQ Question ${questionCount}</h5>
                    <div class="form-group">
                        <p>Select the correct option:</p>
                        <div>
                            <label><input type="radio" name="option_${questionCount}" value="A" required> Option A</label>
                        </div>
                        <div>
                            <label><input type="radio" name="option_${questionCount}" value="B"> Option B</label>
                        </div>
                        <div>
                            <label><input type="radio" name="option_${questionCount}" value="C"> Option C</label>
                        </div>
                        <div>
                            <label><input type="radio" name="option_${questionCount}" value="D"> Option D</label>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="correctAnswer_${questionCount}">Correct Answer:</label>
                        <input type="text" id="correctAnswer_${questionCount}" class="form-control" placeholder="Enter correct answer (A, B, C, or D)" required>
                    </div>
                    <div class="form-group">
                        <label for="marksAwarded_${questionCount}">Marks Awarded:</label>
                        <input type="number" id="marksAwarded_${questionCount}" class="form-control" placeholder="Enter marks for correct answer" required>
                    </div>
                    <div class="form-group">
                        <label for="marksDeducted_${questionCount}">Marks Deducted:</label>
                        <input type="number" id="marksDeducted_${questionCount}" class="form-control" placeholder="Enter marks deducted for incorrect answer" required>
                    </div>
                    <button type="button" class="btn btn-danger" onclick="removeQuestion(${questionCount})">Remove</button>
                </div>
            </div>`;
    } else if (questionType === 'msq') {
        questionHtml = `
            <div id="question${questionCount}" class="card question-card">
                <div class="card-body">
                    <h5 class="card-title">MSQ Question ${questionCount}</h5>
                    <div class="form-group">
                        <p>Select all correct options:</p>
                        <div>
                            <label><input type="checkbox" name="option_${questionCount}" value="A"> Option A</label>
                        </div>
                        <div>
                            <label><input type="checkbox" name="option_${questionCount}" value="B"> Option B</label>
                        </div>
                        <div>
                            <label><input type="checkbox" name="option_${questionCount}" value="C"> Option C</label>
                        </div>
                        <div>
                            <label><input type="checkbox" name="option_${questionCount}" value="D"> Option D</label>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="correctAnswers_${questionCount}">Correct Answers:</label>
                        <input type="text" id="correctAnswers_${questionCount}" class="form-control" placeholder="Enter correct answers (comma separated, e.g., A,B)" required>
                    </div>
                    <div class="form-group">
                        <label for="marksAwarded_${questionCount}">Marks Awarded:</label>
                        <input type="number" id="marksAwarded_${questionCount}" class="form-control" placeholder="Enter marks for each correct answer" required>
                    </div>
                    <div class="form-group">
                        <label for="marksDeducted_${questionCount}">Marks Deducted:</label>
                        <input type="number" id="marksDeducted_${questionCount}" class="form-control" placeholder="Enter marks deducted for each incorrect answer" required>
                    </div>
                    <button type="button" class="btn btn-danger" onclick="removeQuestion(${questionCount})">Remove</button>
                </div>
            </div>`;
    }

    const questionDiv = document.createElement('div');
    questionDiv.innerHTML = questionHtml;
    questionsContainer.appendChild(questionDiv);
}

function removeQuestion(id) {
    const questionDiv = document.getElementById(`question${id}`);
    questionDiv.remove();
}

function submitForm() {
    let score = 0;
    const reportData = [];

    for (let i = 1; i <= questionCount; i++) {
        const questionDiv = document.getElementById(`question${i}`);
        if (questionDiv) {
            let questionType = '';
            let correctAnswer = '';
            let choicesMade = '';
            let marksAwarded = 0;
            let marksDeducted = 0;
            let totalMarks = 0;

            if (questionDiv.querySelector(`input[id^="number1_"]`)) {
                questionType = 'Numerical Range Check';
                const num1 = parseInt(questionDiv.querySelector(`input[id^="number1_"]`).value);
                const num2 = parseInt(questionDiv.querySelector(`input[id^="number2_"]`).value);
                const num3 = parseInt(questionDiv.querySelector(`input[id^="number3_"]`).value);
                marksAwarded = parseInt(questionDiv.querySelector(`input[id^="marksAwarded_"]`).value);
                marksDeducted = parseInt(questionDiv.querySelector(`input[id^="marksDeducted_"]`).value);
                const min = Math.min(num2, num3);
                const max = Math.max(num2, num3);

                if (num1 >= min && num1 <= max) {
                    score += marksAwarded;
                    totalMarks = marksAwarded;
                } else {
                    score -= marksDeducted;
                    totalMarks = -marksDeducted;
                }
            } else if (questionDiv.querySelector(`input[id^="correctAnswer_"]`)) {
                questionType = 'MCQ';
                const selectedOption = questionDiv.querySelector(`input[name^="option_"]:checked`);
                correctAnswer = questionDiv.querySelector(`input[id^="correctAnswer_"]`).value;
                marksAwarded = parseInt(questionDiv.querySelector(`input[id^="marksAwarded_"]`).value);
                marksDeducted = parseInt(questionDiv.querySelector(`input[id^="marksDeducted_"]`).value);
                
                choicesMade = selectedOption ? selectedOption.value : 'None';
                if (selectedOption && selectedOption.value === correctAnswer) {
                    score += marksAwarded;
                    totalMarks = marksAwarded;
                } else {
                    score -= marksDeducted;
                    totalMarks = -marksDeducted;
                }
            } else if (questionDiv.querySelector(`input[id^="correctAnswers_"]`)) {
                questionType = 'MSQ';
                const selectedOptions = questionDiv.querySelectorAll(`input[name^="option_"]:checked`);
                const correctAnswers = questionDiv.querySelector(`input[id^="correctAnswers_"]`).value.split(',');
                marksAwarded = parseInt(questionDiv.querySelector(`input[id^="marksAwarded_"]`).value);
                marksDeducted = parseInt(questionDiv.querySelector(`input[id^="marksDeducted_"]`).value);
                
                selectedOptions.forEach(option => {
                    choicesMade += option.value + ', ';
                    if (correctAnswers.includes(option.value)) {
                        score += marksAwarded;
                        totalMarks += marksAwarded;
                    } else {
                        score -= marksDeducted;
                        totalMarks -= marksDeducted;
                    }
                });
                choicesMade = choicesMade.slice(0, -2); // remove last comma and space
            }

            // Prepare data for report
            const questionData = {
                questionType: questionType,
                correctAnswer: correctAnswer,
                choicesMade: choicesMade,
                marksAwarded: marksAwarded,
                marksDeducted: marksDeducted,
                totalMarks: totalMarks
            };
            reportData.push(questionData);
        }
    }

    document.getElementById('result').innerText = `Net Score: ${score}`;
    generateReport(reportData);
}

function generateReport(reportData) {
    const reportContainer = document.getElementById('reportContainer');
    reportContainer.innerHTML = '';

    if (reportData.length === 0) {
        reportContainer.innerHTML = '<p>No questions submitted yet.</p>';
        return;
    }

    let reportHtml = `
        <h2>Question Report</h2>
        <div class="table-responsive">
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Question Type</th>
                        <th>Correct Answer</th>
                        <th>Choices Made</th>
                        <th>Marks Awarded</th>
                        <th>Marks Deducted</th>
                        <th>Total Marks</th>
                    </tr>
                </thead>
                <tbody>
    `;

    reportData.forEach((data, index) => {
        reportHtml += `
            <tr>
                <td>${index + 1}</td>
                <td>${data.questionType}</td>
                <td>${data.correctAnswer}</td>
                <td>${data.choicesMade}</td>
                <td>${data.marksAwarded}</td>
                <td>${data.marksDeducted}</td>
                <td>${data.totalMarks}</td>
            </tr>
        `;
    });

    reportHtml += `
                </tbody>
            </table>
        </div>
    `;

    reportContainer.innerHTML = reportHtml;
}

function printReport() {
    const reportContainer = document.getElementById('reportContainer').innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = reportContainer;
    window.print();
    document.body.innerHTML = originalContents;
}
