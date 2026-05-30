//jQuery UI for date picker
$(function () {
    $("#dob").datepicker({
      changeMonth: true,
      changeYear: true,
      yearRange: "1970:2025",
      dateFormat: "yy-mm-dd"
    });
  });

  const form = document.getElementById('enrollForm');
  const output = document.getElementById('output');
  const enrolledStudents = [];//Array to store multiple enrolled data

  function clearErrors() {
    document.querySelectorAll('.error').forEach(el => el.textContent = '');
  }

  function showError(id, message) {
    document.getElementById(id).textContent = message;
  }

  function isValidAge(dob) {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age >= 18;
  }

  function isValidGmail(email) {
    return (
      email.includes("@") &&
      email.includes("gmail") &&
      email.includes(".") &&
      email.endsWith(".com")
    );
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    clearErrors();

    const name = document.getElementById('name').value.trim();
    const dob = document.getElementById('dob').value.trim();
    const email = document.getElementById('email').value.trim();
    const course = document.getElementById('course').value;

    let hasError = false;

    // Name validation
    if (name.length < 3 || name.length > 50) {
      showError("nameError", "Name must be between 3 and 50 characters.");
      hasError = true;
    }

    // DOB / Age validation
    if (!dob) {
      showError("dobError", "Please enter your date of birth.");
      hasError = true;
    } else if (!isValidAge(dob)) {
      showError("dobError", "You must be at least 18 years old.");
      hasError = true;
    }

    // Email validation
    if (!isValidGmail(email)) {
      showError("emailError", "Email must include '@', 'gmail', and end with '.com'.");
      hasError = true;
    }

    // Course validation
    if (!course) {
      showError("courseError", "Please select a course.");
      hasError = true;
    }

    if (hasError) return;

    const formData = { name, dob, email, course };

    $.ajax({
  url: '/submit-enrollment',
  method: 'POST',
  data: JSON.stringify(formData),
  contentType: 'application/json',

      success: function () {
        enrolledStudents.push(formData);
        displayStudents();
        form.reset();
      },
      error: function () {
        alert('Submission failed. Please try again.');
      }
    });
  });

  function displayStudents() {
    if (enrolledStudents.length === 0) {
      output.textContent = "No data submitted yet.";
      return;
    }

    output.textContent = enrolledStudents
      .map((student, index) => `#${index + 1}\n` + JSON.stringify(student, null, 2))
      .join('\n\n------------------------\n\n');
  }




  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  const links = navLinks.querySelectorAll('a');

  // Toggle sidebar
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('show');
  });

  // Close sidebar when a link is clicked
  links.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('show');
    });
  });