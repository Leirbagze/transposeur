const select = document.querySelector('.select-title');
const items = document.querySelector('.select-items');

select.addEventListener('click', () => {
    console.log(items.style.display === 'none'|| items.style.display === '' ? 'block' : 'none');
    items.style.display = items.style.display === 'none' || items.style.display === '' ? 'block' : 'none';
});
document.querySelectorAll('.select-items div').forEach(item => {
    item.addEventListener('click', function() {
        select.innerHTML = `<img src="${this.querySelector('img').src}">`;
        items.style.display = 'none';
    });
});
window.addEventListener('click', function(e) {
    if (!e.target.closest('.select')) {
        items.style.display = 'none';
    }
});