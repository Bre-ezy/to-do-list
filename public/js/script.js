let listContainer = document.getElementById("list-row");

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

async function insertListCard(list) {
    let card = document.createElement("div");
    card.setAttribute("class", "card col-lg-3 col-md-6 col-sm-12 list-card");
    card.setAttribute("style", "width: 18rem");

    let cardHeader = document.createElement("div");
    cardHeader.setAttribute("class", "card-header bg-dark text-white");

    let cardTitle = document.createElement("h5");
    cardTitle.setAttribute("class", "card-title text-center");
    cardTitle.innerText = list.name;

    cardHeader.appendChild(cardTitle);
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

        let listItemForm = document.createElement("div");
        listItemForm.setAttribute("class", "form-check");

        let listItemCheckBox = document.createElement("input");
        listItemCheckBox.setAttribute("class", "form-check-input");
        listItemCheckBox.setAttribute("type", "checkbox");
        listItemCheckBox.setAttribute("value", "");
        listItemCheckBox.setAttribute("id", String(list.name + index));
        listItemCheckBox.setAttribute("autocomplete", "off");

        if (item.done) {
            listItemCheckBox.setAttribute("checked", "true");
        }

        let listItemLabel = document.createElement("label");
        listItemLabel.setAttribute("class", "form-check-label");
        listItemLabel.setAttribute("for", String(list.name + index));
        listItemLabel.innerText = item.name

        listItemForm.appendChild(listItemCheckBox);
        listItemForm.appendChild(listItemLabel);

        listItem.appendChild(listItemForm);

        listItems.push(listItem);
    })

    listItems.forEach((listItem) => {
        listOfItems.appendChild(listItem)
    })

    listOfItemsBox.appendChild(listOfItems);

    card.appendChild(listOfItemsBox);

    let cardFooter = document.createElement("div");
    cardFooter.setAttribute("class", "list-card-footer border-top border-dark text-end");

    let addListItemButton = document.createElement("button");
    addListItemButton.setAttribute("class", "btn btn-outline-dark add-item-button");
    addListItemButton.innerHTML = `<i class="fa-regular fa-plus"></i>`

    cardFooter.appendChild(addListItemButton);

    card.appendChild(cardFooter);

    listContainer.appendChild(card);
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

window.addEventListener('load', async (event) => {
    await populateUserLists();
})