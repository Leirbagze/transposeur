const titre = document.querySelector('.select-title');
const items = document.querySelector('.select-items');
console.log(document.getElementsByClassName("option"))

titre.addEventListener('click', () => {
    items.style.display = items.style.display === 'none' || items.style.display === '' ? 'block' : 'none'; //toggle
});
document.querySelectorAll(".armure div").forEach(item => {
    item.addEventListener('click', function() {
        titre.innerHTML = `<img src="${this.querySelector('img').src}">`;
        document.getElementById('selected-value').value = this.getAttribute('data-value'); //envoyer données au form
        document.querySelector(".select-items").style.display = 'none';
    });
});
window.addEventListener('click', function(e) {
    if (!e.target.closest('.select')) {
        this.document.getElementsByClassName("armure").style.display = 'none';
    }
});

document.getElementById('form').addEventListener('submit', function(e) {
    e.preventDefault(); // Empêche l'envoi du formulaire au serveur

    // Récupérer la valeur sélectionnée
    const selectedValue = document.getElementById('selected-value').value;

    // Afficher le résultat sur la page
    document.getElementById('result').innerHTML = `<p>Valeur sélectionnée : ${selectedValue}</p>`;
});