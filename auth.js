function signup() {

const user = {
name: document.getElementById("signupName").value,
email: document.getElementById("signupEmail").value,
password: document.getElementById("signupPassword").value
};

localStorage.setItem(
"user",
JSON.stringify(user)
);

alert("Account Created!");

window.location.href = "login.html";

}

function login() {

const saved =
JSON.parse(localStorage.getItem("user"));

const email =
document.getElementById("loginEmail").value;

const password =
document.getElementById("loginPassword").value;

if (
saved &&
saved.email === email &&
saved.password === password
) {

localStorage.setItem(
"loggedIn",
"true"
);

window.location.href = "index.html";

} else {

alert("Invalid Login");

}

  }
