/* ==========================================================================
   User Authentication Controller (E-Commerce Clone)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    authController.init();
});

const authController = {
    init() {
        this.loginForm = document.getElementById('loginForm');
        this.registerForm = document.getElementById('registerForm');
        this.forgotForm = document.getElementById('forgotPasswordForm');
        this.otpForm = document.getElementById('otpVerificationForm');
        this.newPasswordForm = document.getElementById('resetPasswordForm');

        this.setupListeners();
    },

    setupListeners() {
        // 1. LOGIN SUBMIT
        if (this.loginForm) {
            this.loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const email = document.getElementById('loginEmail').value.trim();
                const pass = document.getElementById('loginPassword').value.trim();

                if (!email || !pass) {
                    window.showToast('Please fill out all fields.', 'warning');
                    return;
                }

                // Check in localStorage registered list
                const users = JSON.parse(localStorage.getItem('registeredUsers')) || [];
                const matchedUser = users.find(u => u.email === email && u.password === pass);

                // Default admin user fallback
                if ((email === 'kalai@example.com' && pass === 'password') || matchedUser) {
                    const loggedInUser = matchedUser || { fullName: 'Kalaiarasan E', email: 'kalai@example.com' };
                    localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));

                    window.showToast('Login successful! Redirecting...', 'success');
                    setTimeout(() => {
                        window.location.href = 'profile.html';
                    }, 1500);
                } else {
                    window.showToast('Invalid email or password.', 'error');
                }
            });
        }

        // 2. REGISTER SUBMIT
        if (this.registerForm) {
            this.registerForm.addEventListener('submit', (e) => {
                e.preventDefault();

                const name = document.getElementById('registerName').value.trim();
                const email = document.getElementById('registerEmail').value.trim();
                const pass = document.getElementById('registerPassword').value.trim();
                const confirmPass = document.getElementById('registerConfirmPassword').value.trim();
                const termsChecked = document.getElementById('agreeTerms').checked;

                if (!name || !email || !pass || !confirmPass) {
                    window.showToast('Please fill out all fields.', 'warning');
                    return;
                }

                if (pass !== confirmPass) {
                    window.showToast('Passwords do not match.', 'error');
                    return;
                }

                if (!termsChecked) {
                    window.showToast('You must agree to the Terms & Conditions.', 'warning');
                    return;
                }

                // Add user to registered array
                let users = JSON.parse(localStorage.getItem('registeredUsers')) || [];
                
                if (users.some(u => u.email === email)) {
                    window.showToast('Email address already registered.', 'warning');
                    return;
                }

                const newUser = {
                    id: 'usr' + Date.now(),
                    fullName: name,
                    email: email,
                    password: pass,
                    phone: '',
                    gender: 'male'
                };

                users.push(newUser);
                localStorage.setItem('registeredUsers', JSON.stringify(users));

                // Save user profile details ready for dashboard
                localStorage.setItem('userProfile', JSON.stringify(newUser));

                window.showToast('Registration successful! Please log in.', 'success');
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 1500);
            });
        }

        // 3. FORGOT PASSWORD SUBMIT (Sends OTP)
        if (this.forgotForm) {
            this.forgotForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const email = document.getElementById('forgotEmail').value.trim();
                if (!email) {
                    window.showToast('Please enter your email address.', 'warning');
                    return;
                }

                window.showToast('Verification OTP sent to your email!', 'success');
                
                // Switch panel views in page
                const inputPanel = document.getElementById('emailFormPanel');
                const otpPanel = document.getElementById('otpFormPanel');

                if (inputPanel && otpPanel) {
                    inputPanel.style.display = 'none';
                    otpPanel.style.display = 'block';
                    this.setupOtpFieldsFocus();
                }
            });
        }

        // 4. OTP VERIFICATION FORM
        if (this.otpForm) {
            this.otpForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                // Grab digit values
                const digits = Array.from(document.querySelectorAll('.otp-digit-input')).map(input => input.value).join('');

                if (digits.length < 4) {
                    window.showToast('Please enter the 4-digit code.', 'warning');
                    return;
                }

                // Accept any code for prototype (standard test: 1234)
                window.showToast('OTP verified successfully!', 'success');

                const otpPanel = document.getElementById('otpFormPanel');
                const resetPanel = document.getElementById('resetFormPanel');

                if (otpPanel && resetPanel) {
                    otpPanel.style.display = 'none';
                    resetPanel.style.display = 'block';
                }
            });
        }

        // 5. RESET PASSWORD FORM
        if (this.newPasswordForm) {
            this.newPasswordForm.addEventListener('submit', (e) => {
                e.preventDefault();

                const pass = document.getElementById('newPassword').value.trim();
                const confirmPass = document.getElementById('confirmNewPassword').value.trim();

                if (!pass || !confirmPass) {
                    window.showToast('Please enter and confirm your new password.', 'warning');
                    return;
                }

                if (pass !== confirmPass) {
                    window.showToast('Passwords do not match.', 'error');
                    return;
                }

                window.showToast('Password reset successfully! Redirecting to login...', 'success');
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 1500);
            });
        }
    },

    setupOtpFieldsFocus() {
        const inputs = document.querySelectorAll('.otp-digit-input');
        inputs.forEach((input, index) => {
            input.addEventListener('keyup', (e) => {
                if (input.value.length === 1 && index < inputs.length - 1) {
                    inputs[index + 1].focus();
                }
                if (e.key === 'Backspace' && index > 0) {
                    inputs[index - 1].focus();
                }
            });
        });
    }
};
