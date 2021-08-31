const userList = document.querySelector('.userList')

const getId = document.getElementById('Id')
const getFirstName = document.getElementById('FirstName')
const getLastName = document.getElementById('LastName')
const getAge = document.getElementById('Age')
const getSalary = document.getElementById('Salary')
const getEmail = document.getElementById('Email')
const getDelId = document.getElementById('delId')
const getDelFirstName = document.getElementById('delFirstName')
const getDelLastName = document.getElementById('delLastName')
const getDelAge = document.getElementById('delAge')
const getDelSalary = document.getElementById('delSalary')
const getDelEmail = document.getElementById('delEmail')

const btnSubmit = document.querySelector('.btnSubmit')
const url = 'http://localhost:8080/api/users'
let allUsers = ''

const renderUsers = (users) => {
    users.forEach(user => {
        allUsers += `
                        <tr>
                            <td id="editId">${user.id}</td>
                            <td id="editFirstName">${user.firstName}</td>
                            <td id="editLastName">${user.lastName}</td>
                            <td id="editAge">${user.age}</td>
                            <td id="editSalary">${user.salary}</td>
                            <td id="editEmail">${user.email}</td>
                            <td id="editRoles"></td>
                            <td>
                                <button type="button" id="edit-user" 
                                class="btn btn-info text-light">Редактировать
                                </button>
                            </td>
                            <td>
                                <button type="button" id="delete-user" 
                                class="btn btn-danger text-light">Удалить
                                </button>
                            </td>
                        </tr>
                        `
    })
    userList.innerHTML = allUsers
}

fetch(url)
    .then(response => response.json())
    .then(data => renderUsers(data))

const navTabLeft = document.querySelectorAll('.nav-link.leftNav')
const navTabRight = document.querySelectorAll('.nav-link.rightNav')
const content = document.querySelectorAll('.card')

navTabLeft.forEach(onTabCLickLeft)
navTabRight.forEach(onTabCLickRight)

function onTabCLickLeft(item) {
    item.addEventListener('click', function () {
        let cardId = item.getAttribute('data-tab')
        let currentTab = document.querySelector(cardId)

        if (!item.classList.contains('active')) {
            navTabLeft.forEach(item => {
                item.classList.remove('active')
            })
            content.forEach(item => {
                $(currentTab).hide()
            })
            item.classList.add('active')
            $(currentTab).show()
        }
    })
}

function onTabCLickRight(item) {
    item.addEventListener('click', function () {

        let cardId = item.getAttribute('data-tab')
        let admin = document.getElementById('admin')
        let create = document.getElementById('create')
        if (!item.classList.contains('active')) {
            navTabRight.forEach(item => {
                item.classList.remove('active')
            })
            item.classList.add('active')
        }
        if (cardId === '#admin') {
            $(create).hide()
            $(admin).show()
        } else {
            $(admin).hide()
            $(create).show()
        }

    })
}


userList.addEventListener('click', (event) => {
    let editButtonPressed = event.target.id === 'edit-user'
    let deleteButtonPressed = event.target.id === 'delete-user'
    const parent = event.target.parentElement.parentElement
    let id = parent.querySelector('#editId').textContent
    if (editButtonPressed) {
        getId.setAttribute('value', id)
        getFirstName.setAttribute('value', parent.querySelector('#editFirstName').textContent)
        getLastName.setAttribute('value', parent.querySelector('#editLastName').textContent)
        getAge.setAttribute('value', parent.querySelector('#editAge').textContent)
        getSalary.setAttribute('value', parent.querySelector('#editSalary').textContent)
        getEmail.setAttribute('value', parent.querySelector('#editEmail').textContent)
        $('.editForm #editModal').modal()
        btnSubmit.addEventListener('click', (e) => {
            e.preventDefault()
            fetch('http://localhost:8080/api/users/40', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    firstName: getFirstName.getAttribute('value'),
                    lastName: getLastName.getAttribute('value'),
                    salary: getSalary.getAttribute('value'),
                    email: getEmail.getAttribute('value'),
                    age: getAge.getAttribute('value'),
                })
            })
                .then(response => response.json())
        })

    } else if (deleteButtonPressed) {
        getDelId.setAttribute('value', id)
        getDelFirstName.setAttribute('value', parent.querySelector('#editFirstName').textContent)
        getDelLastName.setAttribute('value', parent.querySelector('#editLastName').textContent)
        getDelAge.setAttribute('value', parent.querySelector('#editAge').textContent)
        getDelSalary.setAttribute('value', parent.querySelector('#editSalary').textContent)
        getDelEmail.setAttribute('value', parent.querySelector('#editEmail').textContent)
        $('.delForm #delModal').modal()
        btnSubmit.addEventListener('click', () => {
            fetch(`${url}/${id}`, {
                method: 'DELETE',
            })
                .then(response => response.json())
        })
    }
})