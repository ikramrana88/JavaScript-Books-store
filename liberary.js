class Book {
    constructor(bookName, authorName, bookType) {
        this.bookName = bookName;
        this.authorName = authorName;
        this.bookType = bookType;
    };
};


class Display {
    static add(obj) {

        let local = localStorage.getItem('local')

        if (local == null) {

            obj = [];

        } else {
            obj = JSON.parse(local);
        };

        let data = "";
        obj.forEach(function (element, index) {
            data += `<div class="text">
                        <tr >
                        <th scope="col">${index + 1}</th>

                        <td>${element.name}</td>
                        <td>${element.author}</td>
                        <td>${element.type}</td>
                        <td><button id="${index}" onclick="deleteBook(this.id)" class="btn btn-danger">Delete</button></td>

                        </tr>
                    </div>`;
        });


        let tableBody = document.getElementById('tableBody');


        if (obj.length != 0) {

            tableBody.innerHTML = data;

        } else {
            tableBody.innerHTML = `<br> No books to show`;
        };



    };

    clear() {
        let liberaryForm = document.getElementById('liberaryForm');
        liberaryForm.reset();
    };

    validate(bookDetail) {
        if (bookDetail.bookName.length < 2 || bookDetail.authorName.length < 2) {
            return false;
        } else {
            return true;
        };
    };

    show(type) {
        let message = document.getElementById('message');

        if (type == 'Success') {
            message.innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
            <strong>Congratulations! </strong>    "Book has been added in the list"
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>`;

        } else {

            message.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
            <strong>Error! </strong>    "You should enter book detail to add it to the list"
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>`;
        };

        setTimeout(() => {
            message.innerHTML = "";
        }, 5000);

    };




}

Display.add();

let liberaryForm = document.getElementById('liberaryForm');

liberaryForm.addEventListener('submit', liberaryFormSubmit);

function liberaryFormSubmit(e) {
    e.preventDefault();

    let bookName = document.getElementById('bookName').value;
    let authorName = document.getElementById('authorName').value;
    let type;
    let Islamic = document.getElementById('Islamic');
    let programming = document.getElementById('programming');
    let dataBase = document.getElementById('dataBase');

    if (Islamic.checked) {
        type = Islamic.value;
    } else if (programming.checked) {
        type = programming.value;
    } else {
        type = dataBase.value;
    };

    let bookDetail = new Book(bookName, authorName, type);



    let display = new Display();

    if (display.validate(bookDetail)) {

        let local = localStorage.getItem('local')

        if (local == null) {

            obj = [];

        } else {
            obj = JSON.parse(local);
        };


        let object = {
            name: bookName,
            author: authorName,
            type: type
        };
        obj.push(object);
        localStorage.setItem('local', JSON.stringify(obj));


        Display.add(bookDetail);
        display.clear();
        display.show('Success');

    } else {
        display.show('Error!');
    };



};

function deleteBook(index) {

    let local = localStorage.getItem('local')

    if (local == null) {

        obj = [];

    } else {
        obj = JSON.parse(local);
    };

    obj.splice(index, 1);
    localStorage.setItem('local', JSON.stringify(obj));
    Display.add();
}




let search = document.getElementById('searchText');

search.addEventListener("input", function () {

    console.log("input search");

    let inputValue = search.value.toLowerCase();
    let uper = search.value.toUpperCase();

    let book = document.getElementsByClassName('text');

    Array.from(book).forEach(function (element) {

        let Txt = element.getElementsByTagName("tr")[0].innerText;

        if (Txt.includes(inputValue) || Txt.includes(uper)) {

            element.style.display = "block";

        } else {
            element.style.display = "none";
        };

    });

});