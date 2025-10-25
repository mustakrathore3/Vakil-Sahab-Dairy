import { auth, db, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, doc, setDoc, getDoc, collection, addDoc, query, where, getDocs } from './firebase.js';

document.addEventListener('DOMContentLoaded', () => {
    // Registration Form
    const regForm = document.getElementById('regForm');
    if (regForm) {
        regForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = regForm.querySelector('input[placeholder="Advocate Name"]').value;
            const dob = regForm.querySelector('input[placeholder="Date of Birth"]').value;
            const office = regForm.querySelector('input[placeholder="Advocate Office/Chamber Name"]').value;
            const mobile = regForm.querySelector('input[placeholder="Mobile Number"]').value;
            const email = regForm.querySelector('input[placeholder="Email Id"]').value;
            const captcha = regForm.querySelector('input[placeholder="Captcha (Enter 1234)"]').value;
            if (captcha !== '1234') { alert('Invalid Captcha'); return; }

            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, 'Admin@123');
                await setDoc(doc(db, 'advocates', userCredential.user.uid), { name, dob, office, mobile, email });
                alert('Registration successful! Default password sent to email.');
            } catch (error) {
                alert('Error: ' + error.message);
            }
        });
    }

    // Login Form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const userId = document.getElementById('userId').value;
            const password = document.getElementById('password').value;
            const type = document.getElementById('loginType').value;

            try {
                if (type === 'Client Login') {
                    alert('OTP sent to mobile. Enter OTP.');
                } else {
                    await signInWithEmailAndPassword(auth, userId, password);
                    alert('Login successful!');
                }
            } catch (error) {
                alert('Error: ' + error.message);
            }
        });

        document.getElementById('forgetPass').addEventListener('click', async () => {
            const email = document.getElementById('userId').value;
            try {
                await sendPasswordResetEmail(auth, email);
                alert('Password reset email sent.');
            } catch (error) {
                alert('Error: ' + error.message);
            }
        });
    }

    // Dropdown for user menu
    const userMenus = document.querySelectorAll('.user-menu');
    userMenus.forEach(menu => {
        menu.addEventListener('click', () => {
            const dropdown = menu.nextElementSibling;
            dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
        });
    });

    // New Case Form
    const newCaseForm = document.getElementById('newCaseForm');
    if (newCaseForm) {
        newCaseForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const data = {
                fileName: newCaseForm.querySelector('input[placeholder="Main File Name"]').value,
                clientName: newCaseForm.querySelector('input[placeholder="Client Name"]').value,
                mobile: newCaseForm.querySelector('input[placeholder="Client Mobile Number"]').value,
                village: newCaseForm.querySelector('input[placeholder="Village/Town"]').value,
                court: newCaseForm.querySelector('select').value,
                act: newCaseForm.querySelector('input[placeholder="Act / अधिनियम"]').value,
                newCaseNum: newCaseForm.querySelector('input[placeholder="New Case Number (optional)"]').value,
                oldCaseNum: newCaseForm.querySelector('input[placeholder="Old Case Number (optional)"]').value,
                stage: newCaseForm.querySelector('input[placeholder="Current Stage"]').value
            };
            try {
                await addDoc(collection(db, 'cases'), data);
                alert('Case added!');
            } catch (error) {
                alert('Error: ' + error.message);
            }
        });
    }

    // Add more for other modules (e.g., fetch cases for client)
});