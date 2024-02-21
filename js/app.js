"use strict";

// Selecting all Element
const form = document.querySelector("form"),
  input = document.querySelector(".input"),
  profile = document.querySelector(".profile"),
  container = document.querySelector(".container"),
  alert = document.querySelector(".alert"),
  loader = document.querySelector(".loader");

// alert message
function showAlert(message, color) {
  alert.style.display = "block";
  alert.style.background = color;
  alert.textContent = message;

  // hide alert after 2 seconds
  setTimeout(() => {
    alert.style.display = "none";
  }, 3000);
}

//   submiting the form
form.addEventListener("submit", submitForm);

// init submitting the form
function submitForm(e) {
  e.preventDefault();
  if (!input.value) {
    // show alert if user don't enter value
    showAlert("Please provide username", "red");
    return;
  }

  async function fetchUser() {
    const res = await fetch(`https://api.github.com/users/${input.value}`);
    const data = await res.json();
    console.log(data);
    if (data.message === "Not Found") {
      // show alert if user not found
      showAlert("User not found", "red");
      profile.innerHTML = "";
      input.value = "";
    } else {
      profile.innerHTML = `
      <img src="${data.avatar_url}" alt='user-img'/>
      <div class='user-profile'>
      <h3>Name:<span> ${data.name}</span></h3>
      <p>Location:<span> ${data.location}</span></p>
      <p>Create-At <span> ${data.created_at}</span></p>
      <p class="bio">Biography: <span> ${data.bio}</span></p>
      <a href="${data.html_url}" target="_blank" class='repo-link'> <span>Repo Link</span></a>
      <p>Repos: <span>${data.public_repos}</span></p>
      
      </div>
      `;

      loader.style.display = "block";
      //  Show the loader for 3 seconds
      setTimeout(() => {
        loader.style.display = "none";
      }, 2000);

      // show alert after user has been found
      showAlert("Fetching User", "green");
    }

    input.value = "";
    return data;
  }
  fetchUser();
}
