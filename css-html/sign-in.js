document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('signinForm');

  //event listener - function
  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const email = document.getElementById('floatingInput').value;
    const password = document.getElementById('floatingPassword').value;

    //check if field is empty
    if (email.trim() === '' || password.trim() === '') {
      alert('Please fill in both fields.'); //error message
      document.getElementById('floatingInput').value = ''; //clears the entries
      document.getElementById('floatingPassword').value = '';
      
    } else {

      window.location.href = 'mainMenu.html';
    }
  });
});
