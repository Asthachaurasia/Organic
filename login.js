document.addEventListener("DOMContentLoaded", () => {
    const signInForm = document.getElementById("signin-form");
    const signUpForm = document.getElementById("signup-form");
    const switchToSignUp = document.getElementById("switchToSignUp");
    const switchToSignIn = document.getElementById("switchToSignIn");
  
    // Switch to Sign-Up form
    switchToSignUp.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(".signin").style.display = "none";
      document.querySelector(".signup").style.display = "block";
    });
  
    // Switch to Sign-In form
    switchToSignIn.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(".signup").style.display = "none";
      document.querySelector(".signin").style.display = "block";
    });
  
    // Handle Sign-Up form submission
    signUpForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("signupName").value;
      const email = document.getElementById("signupEmail").value;
      const password = document.getElementById("signupPassword").value;
      const confirmPassword = document.getElementById("signupConfirmPassword").value;
  
      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
  
      let users = JSON.parse(localStorage.getItem("users")) || [];
  
      if (users.some(user => user.email === email)) {
        alert("User already exists with this email.");
        return;
      }
  
      users.push({ name, email, password });
      localStorage.setItem("users", JSON.stringify(users));
  
      alert("Sign-Up successful! Please Sign In.");
      document.querySelector(".signup").style.display = "none";
      document.querySelector(".signin").style.display = "block";
    });
  
    // Handle Sign-In form submission
    signInForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("loginEmail").value;
      const password = document.getElementById("loginPassword").value;
  
      let users = JSON.parse(localStorage.getItem("users")) || [];
  
      const user = users.find(user => user.email === email && user.password === password);
  
      if (user) {
        alert(`Welcome back, ${user.name}!`);
        // Redirect or perform further actions here
      } else {
        alert("Invalid email or password.");
      }
    });
  });
  