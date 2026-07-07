const menuBtn = document.querySelector('.menu-btn');
  const nav = document.querySelector('.Header nav');

  menuBtn.addEventListener('click', () => {
    nav.classList.toggle('open');
  });

  document.getElementById("becomeDonorBtn").addEventListener("click", function () {
      window.location.href = "donor-form.html";
    });

