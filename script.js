var titre = document.querySelector('.titre');
const items = document.querySelector('.select-items');
const input = document.getElementById('selected-value');

titre.addEventListener('click', () => {
    items.style.display = items.style.display === 'none' || items.style.display === '' ? 'flex' : 'none'; //toggle
});
document.querySelectorAll(".armure div").forEach(item => {
    item.addEventListener('click', function() {
        input.value = this.getAttribute('data-value');
        if (input.value !== "0"){
            let armure = ["bemols", "dieses"];
            armure.forEach(function(id){
                if (document.getElementById(id).firstElementChild.getAttribute('data-value')==="0"){
                    swap(document.getElementById(id).firstElementChild, "0");
                    triArmure(id);
                }
            });
        }
        swap(this, input.value);
        var that = this;
        if (that.parentElement.id === "dieses"){
            triArmure("dieses");
        }
        else {
            triArmure("bemols");
        }
        document.querySelector(".select-items").style.display = 'none';
    });
});

function swap(element, armure){
    element.setAttribute("data-value", titre.getAttribute('data-value'));
    element.innerHTML = `<img src="content/${titre.getAttribute('data-value')}.png">`;
    titre.setAttribute("data-value", armure);
    titre.innerHTML = `<img src="content/${armure}.png"/>`;
}

function triArmure(id){
    let tableau = Array.from(document.querySelectorAll(`#${id} .option`));
    tableau.sort((a, b) => {
        let numA = parseInt(a.getAttribute('data-value'));
        let numB = parseInt(b.getAttribute('data-value'));
        return numA - numB;
    });
    document.getElementById(id).innerHTML = '';
    tableau.forEach(item => {
        document.getElementById(id).appendChild(item);
    });
}

document.getElementById('form').addEventListener('submit', function(e) {
    e.preventDefault(); // Empêche l'envoi du formulaire au serveur

    // Récupérer la valeur sélectionnée
    const selectedValue = document.getElementById('selected-value').value;

    // Afficher le résultat sur la page
    document.getElementById('result').innerHTML = `<p>Valeur sélectionnée : ${selectedValue}</p>`;
});