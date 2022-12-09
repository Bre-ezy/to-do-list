let listContainer = document.getElementById("list-row");

const newListButton = document.getElementById("new-list-button");
newListButton.addEventListener('click', async () => {
    await addList();
})

async function sendRequest(path) {
    return await (await fetch(path, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
        },
    })).json()
}

async function getLists() {
    return await sendRequest("/lists");
}

async function addListItem(listID) {
    const itemName = prompt("Input the item name");

    if (itemName === null) {return}
    console.log(await sendRequest(`/add-list-item?listID=${listID}&itemName=${itemName}`));
    await resetUserLists();
}

async function addList() {
    const listName = prompt("Input the item name");

    if (listName === null) {return}
    console.log(await sendRequest(`/add-list?listName=${listName}`));
    await resetUserLists();
}

// Toggles a list item checkbox
async function toggleListItem(listID, listItemID, isDone) {
    console.log(await sendRequest(`/toggle-list-item?listID=${listID}&listItemID=${listItemID}&isDone=${isDone}`));
}

async function deleteListItem(listID, listItemID) {
    console.log(await sendRequest(`/delete-list-item?listID=${listID}&listItemID=${listItemID}`));
    await resetUserLists();
}

async function deleteList(listID) {
    console.log(await sendRequest(`/delete-list?listID=${listID}`));
    await resetUserLists();
}

// Inserts a new list card
async function insertListCard(list) {
    let card = document.createElement("div");
    card.setAttribute("class", "card col-lg-3 col-md-6 col-sm-12 list-card");
    card.setAttribute("style", "width: 18rem");

    let cardHeader = document.createElement("div");
    cardHeader.setAttribute("class", "card-header bg-danger text-white");
    cardHeader.style.position = "relative";

    let cardTitle = document.createElement("h5");
    cardTitle.setAttribute("class", "card-title text-center");
    cardTitle.innerText = list.name;


    let listDeleteButtonContainer = document.createElement("div");
    listDeleteButtonContainer.setAttribute("class", "d-inline text-center xmark-container");

    let listDeleteButton = document.createElement("i");
    listDeleteButton.setAttribute("class", "fa-regular fa-circle-xmark delete-button");


    listDeleteButtonContainer.appendChild(listDeleteButton);

    listDeleteButtonContainer.addEventListener('click', async(event) => {
        const listID = list._id;

        await deleteList(listID);
    });

    
    cardHeader.appendChild(cardTitle);
    cardHeader.appendChild(listDeleteButtonContainer);
    card.appendChild(cardHeader);

    let listOfItemsBox = document.createElement("div");
    listOfItemsBox.setAttribute("class", "list-items");

    let listOfItems = document.createElement("ul");
    listOfItems.setAttribute("class", "list-group list-group-flush");

    listOfItems.style.height = "15rem";

    let listItems = [];

    list.listItems.forEach((item, index) => {
        let listItem = document.createElement("li");
        listItem.setAttribute("class", "list-group-item");
        listItem.style.position = "relative";

        let listItemForm = document.createElement("div");
        listItemForm.setAttribute("class", "form-check");

        let listItemCheckBox = document.createElement("input");
        listItemCheckBox.setAttribute("class", "form-check-input");
        listItemCheckBox.setAttribute("type", "checkbox");
        listItemCheckBox.setAttribute("value", "");
        listItemCheckBox.setAttribute("id", String(list.name + index));
        listItemCheckBox.setAttribute("autocomplete", "off");

        listItemCheckBox.addEventListener("click", async (event) => {
            const listID = list._id;
            const listItemID = item._id;
            const isDone = listItemCheckBox.checked;

            await toggleListItem(listID, listItemID, isDone);
        })

        if (item.done) {
            listItemCheckBox.setAttribute("checked", "true");
        }

        let listItemLabel = document.createElement("label");
        listItemLabel.setAttribute("class", "form-check-label");
        listItemLabel.setAttribute("for", String(list.name + index));
        listItemLabel.innerText = item.name


        let listItemXMarkButtonContainer = document.createElement("div");
        listItemXMarkButtonContainer.setAttribute("class", "d-inline text-center float-end xmark-container");

        let listItemXMarkButton = document.createElement("i");
        listItemXMarkButton.setAttribute("class", "fa-regular fa-circle-xmark delete-button");

        listItemXMarkButtonContainer.appendChild(listItemXMarkButton);

        listItemXMarkButtonContainer.addEventListener('click', async(event) => {
            const listID = list._id;
            const listItemID = item._id;

            await deleteListItem(listID, listItemID);
        });

        listItemForm.appendChild(listItemCheckBox);
        listItemForm.appendChild(listItemLabel);
        listItemForm.appendChild(listItemXMarkButtonContainer)


        listItem.appendChild(listItemForm);

        listItems.push(listItem);
    })

    listItems.forEach((listItem) => {
        listOfItems.appendChild(listItem)
    })

    listOfItemsBox.appendChild(listOfItems);

    card.appendChild(listOfItemsBox);

    let cardFooter = document.createElement("div");
    cardFooter.setAttribute("class", "list-card-footer border-dark");

    let addListItemButton = document.createElement("button");
    addListItemButton.setAttribute("class", "btn btn-outline-dark add-item-button float-end");
    addListItemButton.innerHTML = `<i class="fa-regular fa-plus"></i>`;

    addListItemButton.addEventListener('click', (event) => {
        addListItem(list._id);
    })

    // addListItemButtonContainer.appendChild(addListItemButton);

    cardFooter.appendChild(addListItemButton);

    card.appendChild(cardFooter);

    listContainer.appendChild(card);
}

function dePopulateUserLists() {
    listContainer.innerHTML = null;
}

async function populateUserLists() {

    let listArray = await getLists();

    if (listArray === null) {
        listContainer.innerHTML = `<p class='text-center'>You don't have any lists</p>`
    }

    listArray.forEach((list) => {
        insertListCard(list);
    })
}

async function resetUserLists() {
    dePopulateUserLists();
    await populateUserLists();
}

window.addEventListener('load', async (event) => {
    await populateUserLists();
})