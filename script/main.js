function toggleDropdown() {
  document.getElementById("myDropdown").classList.toggle('open');
}

window.addEventListener('click', (event) => {
  if (!event.target.closest('.head button') && !event.target.closest('.dropdown')) {
    document.getElementById("myDropdown").classList.remove('open');
  }
});

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const smallText = document.getElementById('footer');
smallText.addEventListener('click', () => {
  window.location.href = 'null.html';
});