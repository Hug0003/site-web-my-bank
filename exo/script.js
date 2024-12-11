const links = document.querySelector('.links');

links.addEventListener('click', function (e) {
  e.preventDefault();
  console.log('yes');

  const targetLink = e.target.closest('.link'); // Trouver l'élément parent <a> avec la classe "link"

  if (targetLink) {
    // Si un lien valide est trouvé
    const targetId = targetLink.getAttribute('href');
    document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
  }
});

links.addEventListener('mouseover', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('link')) {
    const l = e.target.closest('.links').querySelectorAll('.link');
    l.forEach(element => {
      if (element !== e.target) element.style.opacity = 0.5;
    });
  }
});

links.addEventListener('mouseout', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('link')) {
    const l = e.target.closest('.links').querySelectorAll('.link');
    l.forEach(element => {
      if (element !== e.target) element.style.opacity = 1;
    });
  }
});
