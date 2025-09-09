// Change navbar background when scrolling
window.addEventListener('scroll', function () {
  const nav = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});


// Simple client-side form handler popup form
// document.querySelector('#brochureModal form').addEventListener('submit', function (e) {
//     e.preventDefault();
//     alert('Form submitted! (Here you can trigger a PDF download or open mailto)');
//     // Example: auto-close modal
//     const modal = bootstrap.Modal.getInstance(document.getElementById('brochureModal'));
//     modal.hide();
// });
// mail
const form = document.getElementById("form");
const result = document.getElementById("result");

form.addEventListener("submit", function (e) {
  const formData = new FormData(form);
  e.preventDefault();
  var object = {};
  formData.forEach((value, key) => {
    object[key] = value;
  });
  var json = JSON.stringify(object);
  result.innerHTML = "Please wait...";

  fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: json
  })
    .then(async (response) => {
      let json = await response.json();
      if (response.status == 200) {
        result.innerHTML = json.message;
        result.classList.remove("text-gray-500");
        result.classList.add("text-green-500");
        // Trigger PDF download after successful submission
        const link = document.createElement("a");
        link.href = "../assests/task.pdf"; // <-- Replace with your PDF file URL
        link.download = "YourFileName.pdf";  // Optional: set file name
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        console.log(response);
        result.innerHTML = json.message;
        result.classList.remove("text-gray-500");
        result.classList.add("text-red-500");
      }
    })
    .catch((error) => {
      console.log(error);
      result.innerHTML = "Something went wrong!";
    })
    .then(function () {
      form.reset();
      setTimeout(() => {
        result.style.display = "none";
      }, 5000);
    });
});
// mdle mail

const brochureForm = document.getElementById("brochureForm");
const brochureResult = document.getElementById("brochureResult");

brochureForm.addEventListener("submit", function (e) {
  e.preventDefault(); // prevent default form submission

  const formData = new FormData(brochureForm);
  let object = {};
  formData.forEach((value, key) => object[key] = value);
  let json = JSON.stringify(object);

  brochureResult.innerHTML = "Please wait...";

  fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: json
  })
    .then(async (response) => {
      let data = await response.json();
      if (response.status === 200) {
        brochureResult.innerHTML = "Form submitted successfully!";
        brochureResult.classList.remove("text-gray-500");
        brochureResult.classList.add("text-success");

        // Trigger PDF download
        const link = document.createElement("a");
        link.href = "../assests/task.pdf"; // <-- Replace with your PDF file URL
        link.download = "YourFileName.pdf";  // Optional: set file name
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Optionally close the modal after a short delay
        setTimeout(() => {
          const modal = bootstrap.Modal.getInstance(document.getElementById("brochureModal"));
          modal.hide();
        }, 500);

      } else {
        brochureResult.innerHTML = data.message || "Submission failed!";
        brochureResult.classList.remove("text-gray-500");
        brochureResult.classList.add("text-danger");
      }
    })
    .catch((error) => {
      console.error(error);
      brochureResult.innerHTML = "Something went wrong!";
    });
});
