//
// HIVE TIMES - Access Portal JavaScript
// script.js
//

document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const forms = document.querySelectorAll('.form-container');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const profileTab = document.getElementById('profile-tab');
    let isLoggedIn = false; // Simple state management

    // --- Tab Switching Logic ---
    function switchTab(targetId) {
        // 1. Deactivate all tabs and hide all forms/panels
        tabButtons.forEach(btn => btn.classList.remove('active'));
        forms.forEach(form => form.classList.remove('active'));

        // 2. Activate the clicked button
        document.querySelector(`.tab-btn[data-target="${targetId}"]`).classList.add('active');

        // 3. Show the target form/panel
        document.getElementById(targetId).classList.add('active');
    }

    tabButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const target = e.target.getAttribute('data-target');
            if (target) {
                switchTab(target);
            }
        });
    });

    // --- Form Submission Simulation ---

    // Simple function to simulate a successful login/registration
    function handleSuccessfulAuth() {
        isLoggedIn = true;
        
        // 1. Hide Login/Register tabs
        document.querySelector('.tab-btn[data-target="login-form"]').style.display = 'none';
        document.querySelector('.tab-btn[data-target="register-form"]').style.display = 'none';

        // 2. Show and switch to the Profile tab
        profileTab.style.display = 'block';
        switchTab('profile-view');
        alert('Authentication successful! Welcome to your profile.');
    }

    // Login Form Submission
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // In a real application, you'd send an AJAX request here.
        console.log('Login attempt...');
        
        // Simple client-side validation check (e.g., placeholder for real logic)
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        if (email && password) {
            // Simulate successful login after a short delay
            setTimeout(handleSuccessfulAuth, 500);
        } else {
            alert('Please enter both email and password.');
        }
    });

    // Register Form Submission
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // In a real application, you'd send an AJAX request here.
        console.log('Registration attempt...');

        // Simple check for required fields
        const termsChecked = document.querySelector('.terms-label input[type="checkbox"]').checked;
        if (!termsChecked) {
            alert('You must agree to the Terms and Conditions.');
            return;
        }

        // Simulate successful registration
        setTimeout(handleSuccessfulAuth, 500);
    });

    // --- Logout Functionality ---
    window.logout = function() {
        isLoggedIn = false;

        // 1. Hide Profile tab
        profileTab.style.display = 'none';

        // 2. Show Login/Register tabs
        document.querySelector('.tab-btn[data-target="login-form"]').style.display = 'block';
        document.querySelector('.tab-btn[data-target="register-form"]').style.display = 'block';
        
        // 3. Switch back to the Login tab
        switchTab('login-form');
        alert('You have been successfully logged out.');
    };
});