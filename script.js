const select = document.querySelector('.select-title');
const items = document.querySelector('.select-items');

select.addEventListener('click', () => {
    console.log(items.style.display === 'none'|| items.style.display === '' ? 'block' : 'none');
    items.style.display = items.style.display === 'none' || items.style.display === '' ? 'block' : 'none';
});
document.querySelectorAll('.select-items div').forEach(item => {
    item.addEventListener('click', function() {
        select.innerHTML = `<img src="${this.querySelector('img').src}">`;
        document.getElementById('selected-value').value = this.getAttribute('data-value');
        items.style.display = 'none';
    });
});
window.addEventListener('click', function(e) {
    if (!e.target.closest('.select')) {
        items.style.display = 'none';
    }
});

document.getElementById('myform').addEventListener('submit', function(e) {
    e.preventDefault(); // Empêche l'envoi du formulaire au serveur

    // Récupérer la valeur sélectionnée
    const selectedValue = document.getElementById('selected-value').value;

    // Afficher le résultat sur la page
    document.getElementById('result').innerHTML = `<p>Valeur sélectionnée : ${selectedValue}</p>`;
});