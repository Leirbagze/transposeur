const titre = document.querySelector('.titre');
const items = document.querySelector('.select-items');
const input = document.getElementById('selected-value');
const notes = [0,-5,2,-3,4,-1,-6,1,-4,3,-2,5];
const k = ["Sol","Ut 4","Ut 1","Fa 3","Ut 2","Fa","Ut 3"];

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
        let that = this;
        if (that.parentElement.id === "dieses"){
            triArmure("dieses");
        }
        else {
            triArmure("bemols");
        }
        document.querySelector(".select-items").style.display = 'none';
    });
});
window.addEventListener('click', function(e) {
    if (!e.target.closest('.select')) {
        items.style.display = 'none';
    }
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
        let numA = Math.abs(parseInt(a.getAttribute('data-value')));
        let numB = Math.abs(parseInt(b.getAttribute('data-value')));
        return numA - numB;
    });
    document.getElementById(id).innerHTML = '';
    tableau.forEach(item => {
        document.getElementById(id).appendChild(item);
    });
}

function transposer(Narmure, armure){
    let i = 0;
    if (Narmure < -7 || Narmure > 7) {
        i += (Narmure < -7) ? 1 : -1;
        Narmure += (Narmure < -7) ? 12 : -12;
    }
    let indice = notes.indexOf(armure);
    if (indice > 6) {
        indice -= 12;
    }
    return Math.ceil(indice/2) - i;
}

function envoyerForm(){
    let armure = parseInt(document.getElementById('selected-value').value);
    let instrument = parseInt(document.getElementById('instrument').value);
    let clé = parseInt(document.getElementById('clé').value);
    let partition = parseInt(document.getElementById('partition').value);
    let res = {
        armure: armure + partition - instrument,
        clé,
    }
    let armure2 = res.armure - armure;
    /*let i = 0;
    if (Narmure < -7 || Narmure > 7) {
        i += (Narmure < -7) ? 1 : -1;
        Narmure += (Narmure < -7) ? 12 : -12;
    }
    let indice = notes.indexOf(armure2);
    if (indice > 6) {
        indice -= 12;
    }
    Nclé = Math.ceil(indice/2) - i;*/
    // Nclé = transposer(armure2);
    res.clé = k.at((-transposer(res.armure,armure2) + clé) % k.length);
    document.getElementById('result').innerHTML = `<p>Clé de lecture : ${res.clé}<br>Armure : <img src="content/${res.armure}.png"></p>`;
}

document.getElementById('form').addEventListener('submit', function(e) {
    e.preventDefault();
    envoyerForm();
});
