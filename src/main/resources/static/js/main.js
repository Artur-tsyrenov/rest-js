const userList = document.querySelector('.userList')

const getId = document.getElementById('Id')
const getFirstName = document.getElementById('FirstName')
const getLastName = document.getElementById('LastName')
const getAge = document.getElementById('Age')
const getSalary = document.getElementById('Salary')
const getEmail = document.getElementById('Email')
const getUsername = document.getElementById('Username')
const getPassword = document.getElementById('Password')

const getDelId = document.getElementById('delId')
const getDelFirstName = document.getElementById('delFirstName')
const getDelLastName = document.getElementById('delLastName')
const getDelAge = document.getElementById('delAge')
const getDelSalary = document.getElementById('delSalary')
const getDelEmail = document.getElementById('delEmail')
const getDelUsername = document.getElementById('delUsername')
const getDelPassword = document.getElementById('delPassword')

const btnSubmit = document.querySelector('.btnSubmit')
const btnDelSubmit = document.querySelector('.btnDelSubmit')
const url = 'http://localhost:8080/api/users'
let allUsers = ''

const renderUsers = (users) => {
    users.forEach(user => {
        allUsers += `
                        <tr>
                            <td>${user.id}</td>
                            <td>${user.firstName}</td>
                            <td>${user.lastName}</td>
                            <td>${user.age}</td>
                            <td>${user.salary}</td>
                            <td>${user.email}</td>
                            <td>${user.username}</td>
                            <td>${user.password}</td>
                            <td></td>
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
        let cardId = item.getAttribute('href')
        const pillAdmin = document.querySelector('.pillAdmin')
        const pillUser = document.querySelector('.pillUser')

        if (!item.classList.contains('active')) {
            navTabLeft.forEach(item => {
                item.classList.remove('active')
            })
            item.classList.add('active')
        }


        if (cardId === '#2') {
            pillAdmin.classList.remove('active')
            pillUser.classList.add('active')
        } else {
            pillUser.classList.remove('active')
            pillAdmin.classList.add('active')
        }

    })
}

function onTabCLickRight(item) {
    item.addEventListener('click', function () {
        let cardId = item.getAttribute('href')
        const tabAdmin = document.querySelector('.tabAdmin')
        const tabCreate = document.querySelector('.tabCreate')
        if (!item.classList.contains('active')) {
            navTabRight.forEach(item => {
                item.classList.remove('active')
            })
            item.classList.add('active')
        }
        if (cardId === '#create') {
            tabAdmin.classList.remove('active')
            tabCreate.classList.add('active')
        } else {
            tabCreate.classList.remove('active')
            tabAdmin.classList.add('active')
        }
    })
}



userList.addEventListener('click', (event) => {
    let editButtonPressed = event.target.id === 'edit-user'
    let deleteButtonPressed = event.target.id === 'delete-user'
    const parent = event.target.parentElement.parentElement
    let id = parent.children[0].innerHTML
    let username = parent.children[6].innerHTML
    let password = parent.children[7].innerHTML

    if (editButtonPressed) {
        console.log(username)
        console.log(password)
        getId.value = id
        getFirstName.value = parent.children[1].innerHTML
        getLastName.value = parent.children[2].innerHTML
        getAge.value = parent.children[3].innerHTML
        getSalary.value = parent.children[4].innerHTML
        getEmail.value = parent.children[5].innerHTML
        getUsername.value = username
        getPassword.value = password

        $('.editForm #editModal').modal()

        btnSubmit.addEventListener('click', () => {
            fetch(`${url}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: id,
                    firstName: getFirstName.value,
                    lastName: getLastName.value,
                    salary: getSalary.value,
                    email: getEmail.value,
                    age: getAge.value,
                    username: getUsername.value,
                    password: getPassword.value
                })
            })
                .then(response => response.json())
                .then(() => location.reload())
        })

    } else if (deleteButtonPressed) {
        console.log('Del')
        getDelId.value = id
        getDelFirstName.value = parent.children[1].innerHTML
        getDelLastName.value = parent.children[2].innerHTML
        getDelAge.value = parent.children[3].innerHTML
        getDelSalary.value = parent.children[4].innerHTML
        getDelEmail.value = parent.children[5].innerHTML
        getDelUsername.value = username
        getDelPassword.value = password

        $('.delForm #delModal').modal()

        btnDelSubmit.addEventListener('click', () => {
            fetch(`${url}/${id}`, {
                method: 'DELETE'
            })
                .then(response => response.json())
        })
    }
})