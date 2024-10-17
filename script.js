const titre = document.querySelector('.titre');
const items = document.querySelector('.select-items');
const input = document.getElementById('selected-value');
const notes = [0,-5,2,-3,4,-1,-6,1,-4,3,-2,5];
const k = ["Sol","Ut 4","Ut 1","Fa 3","Ut 2","Fa","Ut 3"];

/*$('#instrument').select2({
    width: 'style'
});*/

window.onload = envoyerForm();

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
    if (!e.target.closest('.h-select')) {
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

function transposer(res, armure){
    let difference = res.armure - armure;
    let i = 0;
    if (res.armure < -7 || res.armure > 7) {
        i += (res.armure < -7) ? 1 : -1;
        res.armure += (res.armure < -7) ? 12 : -12;
    }
    if (difference > 7){
        difference -= 12;
    }
    let indice = notes.indexOf(difference);
    if (indice > 6) {
        indice -= 12;
    }
    return (Math.ceil(indice/2) - i);
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
    let test = transposer(res, armure);
    res.clé = k.at((-test + clé) % k.length);
    document.getElementById('result').style.width = window.getComputedStyle(document.getElementsByClassName("champ")[0]).width;
    document.getElementById('result').innerHTML = `
    <div class="ligne" style="flex-grow:1;">
        <div class="nom cambay-regular">
            Clé de lecture :
        </div>
        <div class="reponse" style="display:flex;justify-content:center;">
            ${res.clé}
        </div>
    </div>
    <div class="ligne" style="flex-grow:1;">
        <div class="nom cambay-regular">
            Armure :
        </div>
        <div class="reponse">
            <img src="content/${res.armure}.png">
        </div>
    </div>`;
}

document.getElementById('form').addEventListener('submit', function(e) {
    e.preventDefault();
    envoyerForm();
});
