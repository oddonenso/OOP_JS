let root = document.createElement("div");
document.body.appendChild(root);
let array = [];

function ChangeProduct(index) {
    let obj = array[index];
    add.Edit(obj);
}

class Contact {
    constructor(id, name, age, phoneNumber, homeNumber) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.phoneNumber = phoneNumber;
        this.homeNumber = homeNumber;
    }
  
    set Name(  value) {
        this.  name = value;
        this.h2.innerText = value;
    }

    set Age(value) {
        this.age = value;
        this.h3Age.innerText = "Возраст: " + value;
    }

    set PhoneNumber(value) {
        this.phoneNumber = value;
        this.h3PhoneNumber.innerText = "Мобильный телефон: " + value;
    }

    set HomeNumber(value) {
        this.homeNumber = value;
        this.h3HomeNumber.innerText = "Домашний телефон: " + value;
    }

    Create() {
        array.push(this);
        let div = document.createElement("div");
        div.id = "contact" + this.id;

        let imgClose = document.createElement("img");
        imgClose.src = "Images/icons8-close-40.png";
        imgClose.alt = "Close";
        imgClose.style.cursor = "pointer"; // установка курсора на картинку
        imgClose.onclick = () => this.Delete();
        imgClose.classList.add("close-icon");

        let imgEdit = document.createElement("img");
        imgEdit.src = "Images/icons8-edit-40.png";
        imgEdit.alt = "Edit";
        imgEdit.style.cursor = "pointer"; // установка курсора на картинку
        imgEdit.onclick = () => ChangeProduct(array.indexOf(this)); // Передаем индекс текущего объекта
        imgEdit.classList.add("edit-icon");

        this.h2 = document.createElement("h2");
        this.h2.innerText = this.name;
        this.h2.style.color = "green";

        this.h3Age = document.createElement("h3");
        this.h3Age.innerText = "Возраст: " + this.age;

        this.h3PhoneNumber = document.createElement("h3");
        this.h3PhoneNumber.innerText = "Мобильный телефон: " + this.phoneNumber;

        this.h3HomeNumber = document.createElement("h3");
        this.h3HomeNumber.innerText = "Домашний телефон: " + this.homeNumber;

        div.className = "box";

        div.appendChild(imgClose);
        div.appendChild(imgEdit);
        div.appendChild(this.h2);
        div.appendChild(this.h3Age);
        div.appendChild(this.h3PhoneNumber);
        div.appendChild(this.h3HomeNumber);

        root.appendChild(div);
    }

    Delete() {
        let index = array.indexOf(this);
        if (index > -1) {
            array.splice(index, 1);
            document.getElementById("contact" + this.id).remove();
        }
    }
}

let contact = new Contact(1, "Елена Кулакова", 19, "+7 999 468 59 06", ""); // НЕ УДАЛЯТЬ
contact.Create();

class SuperAdd {
    constructor() {
        this.div = document.createElement("div");
        this.div.className = "visability-container";
        this.div.style.display = "none"; // Initially hide the form

        let nameContact = this.createRow("Имя: ", "text", "nameContact");
        this.div.appendChild(nameContact);

        let ageContact = this.createRow("Возраст: ", "number", "ageContact");
        this.div.appendChild(ageContact);

        let phoneContact = this.createRow("Мобильный телефон: ", "text", "phoneContact");
        this.div.appendChild(phoneContact);

        let homeContact = this.createRow("Домашний телефон:", "text", "homeContact");
        this.div.appendChild(homeContact);

        this.saveButton = document.createElement("button");
        this.saveButton.onclick = () => this.Create();
        this.saveButton.textContent = "Сохранить контакт";
        this.div.appendChild(this.saveButton);

        root.appendChild(this.div);
    }

    Edit(obj) {
        this.div.style.display = "inline";
        let nameContact = document.getElementById("nameContact");
        let ageContact = document.getElementById("ageContact");
        let phoneContact = document.getElementById("phoneContact");
        let homeContact = document.getElementById("homeContact");

        nameContact.value = obj.name;
        ageContact.value = obj.age;
        phoneContact.value = obj.phoneNumber;
        homeContact.value = obj.homeNumber;

        this.saveButton.textContent = "Изменить";
        this.saveButton.onclick = () => {
            obj.Name = nameContact.value;
            obj.Age = ageContact.value;
            obj.PhoneNumber = phoneContact.value;
            obj.HomeNumber = homeContact.value;
            this.Toggle();
        };
    }

    Create() {
        let nameContact = document.getElementById("nameContact");
        let ageContact = document.getElementById("ageContact");
        let phoneContact = document.getElementById("phoneContact");
        let homeContact = document.getElementById("homeContact");

        if (this.isValidPhoneNumber(phoneContact.value) && this.isValidPhoneNumber(homeContact.value)) {
            let newContact = new Contact(array.length + 1, nameContact.value, ageContact.value, phoneContact.value, homeContact.value);
            newContact.Create();
            nameContact.value = "";
            ageContact.value = "";
            phoneContact.value = "";
            homeContact.value = "";
            this.Toggle();
            row.resetForm();
        } else {
            this.showMessage("Неверный формат номера телефона");
        }
    }
    showMessage(message) {
        let messageDiv = $('<div>').addClass('message').text(message);
        $('body').append(messageDiv);

        setTimeout(function() {
            messagediv.fadeOut(500, function(){
                $(this).remove();
            })
        }, 3000)
    }

    createRow(text, typeinput, idInput) {
        let row = document.createElement("div");
        row.className = "row";

        let label = document.createElement("label");
        label.textContent = text;
        row.appendChild(label);

        let input = document.createElement("input");
        input.type = typeinput;
        input.id = idInput;
        row.appendChild(input);

        return row;
    }

    Toggle() {
        if (this.div.style.display === "inline" || this.div.style.display === "") {
            this.div.style.display = "none";
        } else {
            this.div.style.display = "inline";
        }
    }

    isValidPhoneNumber(phoneNumber) {
        let regex = /^\+7 \d{3} \d{3} \d{2} \d{2}$/;
        return regex.test(phoneNumber);
    }
    resetForm() {
        this.saveButton.textContent = "Сохранить контакт"
        this.saveButton.onclick=()=>this.Create();
    }
}

let add = new SuperAdd();
function CreateContact() {
    add.Toggle();
    add.resetForm();
}
