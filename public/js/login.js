const loginForm = document.querySelector("#loginForm");

loginForm.addEventListener("submit", e => {
  e.preventDefault();
  navigator.geolocation.getCurrentPosition(function(data) {
      const userObj = {
        username: document.querySelector("#loginUsername").value,
        password: document.querySelector("#loginPassword").value,
        latitude:data.coords.latitude,
        longitude:data.coords.longitude
      };
    console.log(data);
    console.log(userObj)
    fetch("/api/volunteers/login", {
      method: "POST",
      body: JSON.stringify(userObj),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => {
      if (res.ok) {
        location.href = "/";
      } else {
        alert("trumpet sound");
      }
    });
  });
});
const signupForm = document.querySelector("#signupForm");

signupForm.addEventListener("submit", e => {
  e.preventDefault();

  const userObj = {
    username: document.querySelector("#signupUsername").value,
    password: document.querySelector("#signupPassword").value
  };
  fetch("/api/volunteers/", {
    method: "POST",
    body: JSON.stringify(userObj),
    headers: {
      "Content-Type": "application/json"
    }
  }).then(res => {
    if (res.ok) {
      alert("signup sucessful, please login!");
    } else {
      alert("trumpet sound");
    }
  });
});
