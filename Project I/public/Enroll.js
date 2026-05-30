document.addEventListener("DOMContentLoaded", function () {
  // Hamburger functionality
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");
  const links = navLinks.querySelectorAll("a");

  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });

  links.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("show");
    });
  });

  // jQuery datepicker
  $("#dob").datepicker({
    changeMonth: true,
    changeYear: true,
    yearRange: "1970:2025",
    dateFormat: "yy-mm-dd"
  });

  const form = document.getElementById('enrollForm');

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

  // ✅ Modal helper function
  function showModal(title, message) {
    document.querySelector("#thankYouModal h2").textContent = title;
    document.querySelector("#thankYouModal p").textContent = message;
    document.getElementById("thankYouModal").style.display = "flex";
  }

  // Submit form handler
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    clearErrors();

    const name = document.getElementById('name').value.trim();
    const dob = document.getElementById('dob').value.trim();
    const email = document.getElementById('email').value.trim();
    const course = document.getElementById('course').value;

    let hasError = false;

    if (name.length < 3 || name.length > 50) {
      showError("nameError", "Name must be between 3 and 50 characters.");
      hasError = true;
    }

    if (!dob) {
      showError("dobError", "Please enter your date of birth.");
      hasError = true;
    } else if (!isValidAge(dob)) {
      showError("dobError", "You must be at least 18 years old.");
      hasError = true;
    }

    if (!isValidGmail(email)) {
      showError("emailError", "Email must include '@', 'gmail', and end with '.com'.");
      hasError = true;
    }

    if (!course) {
      showError("courseError", "Please select a course.");
      hasError = true;
    }

    if (hasError) return;

    const storedData = JSON.parse(localStorage.getItem("enrolledStudents")) || [];
    const alreadyExists = storedData.some(student => student.email === email);

    if (alreadyExists) {
      showModal("Email Already Used", "This email has already been used for enrollment.");
      return;
    }

    const formData = { name, dob, email, course, password: "" };
    storedData.push(formData);
    localStorage.setItem("enrolledStudents", JSON.stringify(storedData));

    form.reset();

    showModal("Enrollment Successful", "Your details have been successfully submitted.");
  });

  // Custom modal OK button
  document.getElementById("modalOkBtn").addEventListener("click", () => {
    document.getElementById("thankYouModal").style.display = "none";
  });

  // ✅ Hide modal on load to prevent unintended display
  document.getElementById("thankYouModal").style.display = "none";

  // Social media animation
  const toggleBtn = document.getElementById("toggleSocial");
  const icons = document.getElementById("socialIcons");
  let visible = false;

  setTimeout(() => {
    icons.classList.add("show");
    setTimeout(() => {
      icons.classList.remove("show");
      toggleBtn.style.display = "flex";
    }, 1500);
  }, 1000);

  toggleBtn.addEventListener("click", function () {
    visible = !visible;
    icons.classList.toggle("show");
    toggleBtn.classList.toggle("open", visible);
  });
});