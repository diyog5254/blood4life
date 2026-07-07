const menuBtn = document.querySelector('.menu-btn');
  const nav = document.querySelector('.Header nav');

  menuBtn.addEventListener('click', () => {
    nav.classList.toggle('open');
  });
  
  
const form = document.getElementById("donorForm");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = form.name.value.trim();
    const dob = form.dob.value;
    const gender = document.querySelector('input[name="gender"]:checked');
    const blood = form.blood.value;
    const email = form.email.value.trim();
    const phone = form.phone.value.trim();
    const whatsapp = form.whatsapp.value.trim();
    const address = form.address.value.trim();

    // Name Validation
    const namePattern = /^[A-Za-z\s]+$/;
    if (!namePattern.test(name)) {
        alert("Please enter a valid full name.");
        form.name.focus();
        return;
    }

    // Age Validation (18+)
    if (dob === "") {
        alert("Please select your date of birth.");
        form.dob.focus();
        return;
    }

    const birthDate = new Date(dob);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();

    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    if (age < 18) {
        alert("Donor must be at least 18 years old.");
        form.dob.focus();
        return;
    }

    // Gender
    if (!gender) {
        alert("Please select your gender.");
        return;
    }

    // Blood Group
    if (blood === "") {
        alert("Please select your blood group.");
        form.blood.focus();
        return;
    }

    // Email Validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        form.email.focus();
        return;
    }

    // // Nepal Phone Number
    // const phonePattern = /^(98|97)\d{8}$/;

    // if (!phonePattern.test(phone)) {
    //     alert("Enter a valid Nepal mobile number (98XXXXXXXX or 97XXXXXXXX).");
    //     form.phone.focus();
    //     return;
    // }

    // WhatsApp (Optional)
    if (whatsapp !== "" && !phonePattern.test(whatsapp)) {
        alert("Enter a valid WhatsApp number.");
        form.whatsapp.focus();
        return;
    }

    // Address
    if (address.length < 5) {
        alert("Please enter a valid address.");
        form.address.focus();
        return;
    }

    alert("Donor Registration Successful!");

    form.reset();
});