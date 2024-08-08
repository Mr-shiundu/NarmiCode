// Variables for storing elements
const loginPage = document.getElementById('login-page');
const homePage = document.getElementById('home-page');
const loginForm = document.getElementById('login-form');
const logoutButton = document.getElementById('logout-button');
const membersList = document.getElementById('members');
const searchInput = document.getElementById('search-input');
const userInfo = document.getElementById('user-info');

// Members array to store registered members
let members = JSON.parse(localStorage.getItem('narmiCodeMembers')) || [];

// Function to display the home page
function displayHomePage() {
    loginPage.style.display = 'none';
    homePage.style.display = 'block';

    const username = localStorage.getItem('username');
    const memberSince = localStorage.getItem('memberSince');

    userInfo.innerHTML = `Logged in as ${username} since ${memberSince}`;

    // Display Telegram link
    const telegramLink = document.createElement('p');
    telegramLink.innerHTML = 'Join our Telegram channel: <a href="https://t.me/NarmiCode" target="_blank">NarmiCode Community</a>';
    homePage.appendChild(telegramLink);

    displayMembers();
}

// Function to display members
function displayMembers() {
    membersList.innerHTML = '';
    members.forEach(member => {
        const listItem = document.createElement('li');
        listItem.textContent = `${member.name} (${member.specialization}) - Member since ${member.memberSince}`;
        membersList.appendChild(listItem);
    });
}

// Function to add a new member
function addMember(name, specialization) {
    const memberSince = new Date().toLocaleString();
    members.push({ name, specialization, memberSince });
    localStorage.setItem('narmiCodeMembers', JSON.stringify(members));
    displayMembers();
}

// Function to search members
function searchMembers(query) {
    const filteredMembers = members.filter(member =>
        member.name.toLowerCase().includes(query.toLowerCase())
    );
    membersList.innerHTML = '';
    filteredMembers.forEach(member => {
        const listItem = document.createElement('li');
        listItem.textContent = `${member.name} (${member.specialization}) - Member since ${member.memberSince}`;
        membersList.appendChild(listItem);
    });
}

// Function to handle login form submission
loginForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const techArea = document.getElementById('tech-area').value;

    if (username && techArea) {
        if (!members.some(member => member.name === username)) {
            addMember(username, techArea);
        }
        localStorage.setItem('username', username);
        localStorage.setItem('memberSince', new Date().toLocaleString());
        localStorage.setItem('loggedInUser', true);

        displayHomePage();
    } else {
        alert('Please enter all fields.');
    }
});

// Handle search input
searchInput.addEventListener('input', (e) => {
    searchMembers(e.target.value);
});

// Handle logout
logoutButton.addEventListener('click', () => {
    localStorage.clear();
    homePage.style.display = 'none';
    loginPage.style.display = 'block';
});

// Function to check login status and display the appropriate page
document.addEventListener('DOMContentLoaded', () => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
        displayHomePage();
    } else {
        loginPage.style.display = 'block';
        homePage.style.display = 'none';
    }
});

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Animation on scroll (optional)
window.addEventListener('scroll', () => {
    const elements = document.querySelectorAll('section');
    elements.forEach(element => {
        const position = element.getBoundingClientRect().top;
        if (position < window.innerHeight && position > 0) {
            element.style.animation = 'fadeIn 2s ease-in-out';
        }
    });
});

if (username === '' || specialization === '') {
    alert('Please fill in all fields');
    return;
}

document.addEventListener('DOMContentLoaded', function() {
    const adminImg = document.querySelector('.admin-img');
    adminImg.classList.add('fade-in');
});

document.querySelectorAll('.icon').forEach(icon => {
    icon.addEventListener('mouseenter', function() {
        icon.classList.add('bounce');
    });
    icon.addEventListener('mouseleave', function() {
        icon.classList.remove('bounce');
    });
});


