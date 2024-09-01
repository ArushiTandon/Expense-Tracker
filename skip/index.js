// Add the Edit Button:
document.querySelectorAll('.fruit').forEach(function(item) {
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.className = 'edit-btn';
    item.appendChild(editBtn);
  });
// Implement the code as in video but with one extra 'Edit' button in 'li'

const form = document.querySelector('form');
const fruits = document.querySelector('.fruits');

form. addEventListener('submit', function(event){
event.preventDefault();
// Selected the input element
const fruitToAdd = document.getElementById('fruit-to-add');

// Created the Li
const newLi = document.createElement('li');
const newLiText = document.createTextNode(fruitToAdd.value);
newLi.appendChild(newLiText);
newLi.className = 'fruit';
// Create a delete button to be added inside Li
const deleteBtn = document.createElement('button');
const deleteBtnText = document.createTextNode('x');
deleteBtn.appendChild(deleteBtnText);
deleteBtn.className = 'delete-btn';
newLi.appendChild(deleteBtn);

// Create an edit button to be added inside Li
const editBtn = document.createElement('button');
const editBtnText = document.createTextNode('Edit');
editBtn.appendChild(editBtnText);
editBtn.className = 'edit-btn';
newLi.appendChild(editBtn);


// Adding Li as the last element of unordered list
fruits.appendChild(newLi);

fruits.addEventListener('click', function(event){
    if(event.target.classList.contains('delete-btn')){
        const fruitToDelete = event.target.parentElement;
    fruits.removeChild(fruitToDelete);
    }
})

});