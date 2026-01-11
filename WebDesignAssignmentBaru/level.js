function selectDifficulty(level) {
  const display = document.getElementById('selected');
  display.innerHTML = `<div class="alert alert-primary" role="alert">
    You selected <strong>${level}</strong> difficulty! 🎉
  </div>`;
}
