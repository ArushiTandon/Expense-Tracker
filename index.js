function saveToLocalStorage(event) {
    event.preventDefault();

    const amount = event.target.amount.value;
    const description = event.target.text.value;
    const category = event.target.expense.value;

    let newEntry = {
        Amount: amount,
        Description: description,
        Category: category,
    };
    
    let userString = JSON.stringify(newEntry);
    localStorage.setItem(category, userString);

    displayEntry(newEntry);

    // Clear input fields
    event.target.amount.value = '';
    event.target.text.value = '';
    event.target.expense.value = '';
}

function displayEntry(entry) {
    const userListElement = document.getElementById("userList");
    const listItem = document.createElement("li");
    listItem.textContent = `${entry.Amount} - ${entry.Description} - ${entry.Category}  `;

    // Create delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete Expense";
    deleteBtn.onclick = () => {
        localStorage.removeItem(entry.Category);
        listItem.remove();
    };

    // Create edit button
    const editBtn = document.createElement("button"); 
    editBtn.textContent = "Edit Expense";
    editBtn.onclick = () => {
        document.getElementById("amount").value = entry.Amount;
        document.getElementById("text").value = entry.Description;
        document.getElementById("expense").value = entry.Category;

        localStorage.removeItem(entry.Category);
        listItem.remove();
    };

    listItem.appendChild(deleteBtn);
    listItem.appendChild(editBtn);
    userListElement.appendChild(listItem);
}

function loadEntries() {
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const entry = JSON.parse(localStorage.getItem(key));
        displayEntry(entry);
    }
}

// Load entries when the page loads
window.onload = loadEntries;
