const form = document.getElementById('apnForm');
const profileLink = document.getElementById('profileLink');
const downloadLink = document.getElementById('downloadLink');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const response = await fetch('/generate-profile');
  const xmlContent = await response.text();

  const blob = new Blob([xmlContent], { type: 'application/xml' });
  const url = URL.createObjectURL(blob);

  profileLink.href = url;
  downloadLink.style.display = 'block';
});