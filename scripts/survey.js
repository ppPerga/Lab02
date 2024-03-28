// Function to handle form submission
const firestore = firebase.firestore();

document.getElementById('surveyForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission
  
    // Get the current user
    var user = firebase.auth().currentUser;
  
    if (user) {
      // User is signed in
      var userId = user.uid;
  
      // Get answers for questions 1 to 5
      var answers = {
        q1: getSelectedOption('question1'),
        q2: getEnteredNumber('q2'),
        q3: getSelectedOption('question3'),
        q4: getSelectedOption('question4'),
        q5: getSelectedOption('question5'),
      };
      console.log(answers);

      // Push data to Firestore
      firebase.firestore()
      .collection('users')
      .doc(userId).set(answers).then(function() {
          // Clear form after successful submission
          document.getElementById('surveyForm').reset();
        }).catch(function(error) {
          console.error("Error submitting form:", error);
          alert("An error occurred. Please try again later.");
        });
    } else {
      // No user is signed in
      console.log("No user is signed in.");
      alert("Please sign in to submit your feedback.");
    }
  });
  
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
    console.log(inputElement);
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

const page2Button = document.getElementById('page2Button');

// Add a click event listener to the button
page2Button.addEventListener('click', () => {
    // Navigate to Page 2 when the button is clicked
    window.location.href = '/schedule.html';
});