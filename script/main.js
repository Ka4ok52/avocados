function toggleDropdown() {
  const dropdown = document.getElementById("myDropdown");
  dropdown.classList.toggle('open');
}

window.onclick = function(event) {
  if (!event.target.matches('.head button')) {
    const dropdown = document.getElementById("myDropdown");
    if (dropdown.classList.contains('open')) {
      dropdown.classList.remove('open');
    }
  }
}

const scrollToTop = () => {
  const scroll = document.documentElement.scrollTop || document.body.scrollTop;

  if (scroll > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, scroll - scroll / 8);
  }
};