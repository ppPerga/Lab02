let currentQuestionIndex = 0;
let nextButtonClickCount = 0;
const questions = document.querySelectorAll('.start-survey');
const nextButton = document.getElementById('nextButton');

nextButton.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default form submission

    nextButtonClickCount++;
    if (nextButtonClickCount < 5) {
        showNextQuestion();
    } else if (nextButtonClickCount === 5) {
        submitAnswers();
        nextButtonClickCount = 0;
    }
});

function showNextQuestion() {
  // Hide all questions
  questions.forEach(question => {
      question.setAttribute('hidden', true);
  });

  // Increment currentQuestionIndex
  currentQuestionIndex++;

  // Show the next question
  if (currentQuestionIndex < questions.length) {
      questions[currentQuestionIndex].removeAttribute('hidden');
      
  } else {
      // Reset the index and submit answers after the fifth click
      currentQuestionIndex = 0;
      if (nextButtonClickCount === 5) {
          submitAnswers();
      }
  }
}

function submitAnswers() {
    // Get the current user
    var user = firebase.auth().currentUser;

    if (user) {
        // User is signed in
        var userId = user.uid;

        // Get answers for questions 1 to 5
        var answers = {
            q1: getSelectedOption('question1'),
            q2: getEnteredNumber('q2'),
            q3: getEnteredNumber('q3'),
            q4: getSelectedOption('question4'),
            q5: getSelectedOption('question5'),
        };

        // Push data to Firestore
        firebase.firestore().collection('users').doc(userId).update(answers).then(function() {
            // Clear form after successful submission
            document.getElementById('surveyForm').reset();
            window.location.href = '/schedule.html';
        }).catch(function(error) {
            console.error("Error submitting form:", error);
            alert("An error occurred. Please try again later.");
        });
    } else {
        // No user is signed in
        console.log("No user is signed in.");
        alert("Please sign in to submit your feedback.");
    }
}

// Function to get the selected option for a question
function getSelectedOption(questionId) {
    var options = document.querySelectorAll('#' + questionId + ' input[type="radio"]');
    for (var i = 0; i < options.length; i++) {
        if (options[i].checked) {
            return options[i].value;
        }
    }
    return null; // If no option is selected
}

function getEnteredNumber(questionId) {
    // Get the input element associated with the question ID
    var inputElement = document.getElementById(questionId + "Input");
    // Check if the input element exists
    if (inputElement) {
        // Retrieve the entered number from the input element
        var enteredNumber = inputElement.value;
        // Return the entered number
        return enteredNumber;
    } else {
        // Return null if the input element doesn't exist
        return null;
    }
}