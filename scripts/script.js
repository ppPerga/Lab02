

function sayHello() {
    
}
//sayHello();

// document.getElementById("loginBtn").addEventListener("click", function() {
//     window.location.href = "login.html";
// });

function loginbutton() {
  window.location.href = "login.html";
}

//------------------------------------------------
// Call this function when the "logout" button is clicked
//-------------------------------------------------
function logout() {
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        console.log("logging out user");
      }).catch((error) => {
        // An error happened.
      });

      
}


function handleLogout() {
  Swal.fire({
    position: "middle",
    icon: "success",
    title: "You've logged out succesfully!",
    showConfirmButton: false,
    timer: 1000
});

logout();


setTimeout(function() {
    window.location.href = "login.html";
}, 1300);
}


// document.getElementById('logout').addEventListener('click', function() {
//   handleLogout();
// });

document.getElementById('logout-setting').addEventListener('click', function() {
  console.log("Error");
  handleLogout();
});


//////////////////////////////////////////////////////////////////////////////////

// //Handle click event on delete account button
// document.getElementById("deleteAccountBt").addEventListener("click", function () {
//   // Confirm with the user before proceeding with account deletion
//   if (confirm("Are you sure you want to delete your account?")) {
//     // Reauthenticate the user
//     var user = firebase.auth().currentUser;
//     var credential;

//     // Prompt the user to re-enter their password
//     var password = prompt("Please enter your password to confirm account deletion:");

//     // Create a credential with the provided password
//     credential = firebase.auth.EmailAuthProvider.credential(
//       user.email,
//       password
//     );

//     // Reauthenticate the user with the provided credential
//     user.reauthenticateWithCredential(credential)
//       .then(function () {
//         // User successfully reauthenticated, proceed with account deletion
//         return user.delete();
//       })
//       .then(function () {
//         // Account deletion successful
//         console.log("Account deleted successfully.");
//         // Redirect to index
//         window.location.href = "login.html";
//       })
//       .catch(function (error) {
//         // Handle reauthentication errors or account deletion errors
//         console.error("Error deleting account: ", error);
//         alert("Failed to delete account. Please try again later.");
//       });
//   }
// });


document.getElementById("deleteAccountBtn").addEventListener("click", function() {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {
    if (result.isConfirmed) {
      var user = firebase.auth().currentUser;
      var credential;

      user.delete();
      
      Swal.fire({
        title: "Deleted!",
        text: "Your account has been deleted.",
        showConfirmButton: false,
        icon: "success"
      });

      setTimeout(function() {
        window.location.href = "login.html";
    }, 1300);
    }
  });
})


function darkMode() {
  var element = document.body;
  element.classList.toggle("dark-mode");
}



//   const logoutBtn = document.querySelector('#sign-out');
// logoutBtn.addEventListener('click', (e) => {
//   e.preventDefault();
//   auth.signOut().then(() => {
//     // Custom Modal from sweetalert
//     Swal.fire({
//       icon: 'success',
//       title: 'Logout successful',
//       showConfirmButton: false,
//       timer: 1500 
//     }).then(() => {
//       window.location.href = "login.html";
//     });
//   });
// });

// Swal.fire({
//   position: "top-end",
//   icon: "success",
//   title: "Your work has been saved",
//   showConfirmButton: false,
//   timer: 1500
  
// }.then(window.location.href = "login.html"));
// Logout function

