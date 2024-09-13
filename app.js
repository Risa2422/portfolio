const form = document.querySelector("#contact_form");
const submit = document.querySelector('button[type="submit"]');
const nameAlert = document.querySelector(".name-alert");
const emailAlert = document.querySelector(".email-alert");
const messageAlert = document.querySelector(".message-alert");

window.onload = function () {
  window.scrollTo(0, 0);
};

emailjs.init({
  publicKey: "xSEOQGryYtK6bWHTm",
});

// Entered a submit button  
form.addEventListener("submit", handleSubmit);

// Clicked a submit button
form.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    form.dispatchEvent(new Event("submit"));
  }
});

// Send the email
function handleSubmit(e) {
  const form = e.target;
  const formData = new FormData(form);
  const fullName = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");

  e.preventDefault();

  if (!validateForm()) {
    return;
  }

  let templateParams = {
    to_name: "Risa",
    from_name: `${fullName}`,
    email_address: `${email}`,
    message: `
                Message: ${message}
            `,
  };

  emailjs.send("service_np1orcb", "template_x1nyqvq", templateParams).then(
    (response) => {
      submit.classList.add("success");
      submit.textContent = "Message sent!";

      setTimeout(() => {
        formReset();
      }, 3000);
    },
    (error) => {
      submit.classList.add("failed");
      submit.textContent = "I am sorry somethinf went wrong.";

      setTimeout(() => {
        formReset();
      }, 3000);
    }
  );
}

// Validate inputs
function validateForm() {
  const formData = new FormData(form);
  const fullName = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");
  var pattern =
    /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]+.[A-Za-z0-9]+$/;

  nameAlert.classList.add("invisible");
  emailAlert.classList.add("invisible");
  messageAlert.classList.add("invisible");

  if (!fullName) {
    nameAlert.classList.remove("invisible");
    nameAlert.textContent = "Please fill in your name.";
    return false;
  } else if (!email) {
    emailAlert.classList.remove("invisible");
    emailAlert.textContent = "Please fill in your email address.";
    return false;
  } else if (!pattern.test(email)) {
    emailAlert.classList.remove("invisible");
    emailAlert.textContent =
      "Please confirm that your email address is correct.";
    return false;
  } else if (!message) {
    messageAlert.classList.remove("invisible");
    messageAlert.textContent =
      "Please fill in your message. I am looking forward to hearing from you!";
    return false;
  }

  return true;
}

// Reset the form
function formReset() {
  form.reset();
  submit.classList.remove("success");
  submit.classList.remove("failed");
  nameAlert.classList.add("invisible");
  emailAlert.classList.add("invisible");
  messageAlert.classList.add("invisible");
  submit.textContent = "Submit";
}
