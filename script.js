// == Part 1: Theme Toggle ==
const themeToggleBtn = document.getElementById('theme-toggle');
themeToggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
});

// == Part 2A: Click Counter Game ==
let count = 0;
const clickBtn = document.getElementById('click-btn');
const clickCountDisplay = document.getElementById('click-count');

clickBtn.addEventListener('click', () => {
  count++;
  clickCountDisplay.textContent = count;
});

// == Part 2B: Collapsible FAQ ==
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach((q) => {
  q.addEventListener('click', () => {
    const answer = q.nextElementSibling;
    // Toggle max-height to collapse/expand
    if (answer.style.maxHeight) {
      answer.style.maxHeight = null;
    } else {
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }
  });
});

// == Part 3: Form Validation ==
const form = document.getElementById('signup-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const feedback = document.getElementById('form-feedback');

// Utility: Show or hide error for a field
function setError(input, message) {
  const small = input.nextElementSibling;
  small.textContent = message;
  small.style.visibility = 'visible';
}
function clearError(input) {
  const small = input.nextElementSibling;
  small.textContent = '';
  small.style.visibility = 'hidden';
}

// Validation rules
function validateName() {
  const value = nameInput.value.trim();
  if (value.length < 2) {
    setError(nameInput, 'Name must be at least 2 characters.');
    return false;
  }
  clearError(nameInput);
  return true;
}
function validateEmail() {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!re.test(emailInput.value.trim())) {
    setError(emailInput, 'Enter a valid email address.');
    return false;
  }
  clearError(emailInput);
  return true;
}
function validatePassword() {
  const val = passwordInput.value;
  if (val.length < 6) {
    setError(passwordInput, 'Password must be 6+ characters.');
    return false;
  }
  clearError(passwordInput);
  return true;
}

// Real-time validation on input
[nameInput, emailInput, passwordInput].forEach((input) => {
  input.addEventListener('input', () => {
    if (input === nameInput) validateName();
    if (input === emailInput) validateEmail();
    if (input === passwordInput) validatePassword();
  });
});

// On form submit
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const isNameValid = validateName();
  const isEmailValid = validateEmail();
  const isPasswordValid = validatePassword();

  if (isNameValid && isEmailValid && isPasswordValid) {
    feedback.textContent = 'Registration successful! 🎉';
    feedback.style.color = 'green';
    form.reset();
  } else {
    feedback.textContent = 'Please fix the highlighted errors.';
    feedback.style.color = 'var(--error)';
  }
});
