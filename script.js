document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const mainContent = document.getElementById('main-content');
    const appTitle = document.getElementById('app-title');

    // --- 1. Theme Switching Logic ---
    const applyTheme = (theme) => {
        body.className = theme === 'dark' ? 'dark-theme' : 'light-theme';
    };

    const initializeTheme = () => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            applyTheme(savedTheme);
        } else {
            const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
            applyTheme(prefersDark ? 'dark' : 'light');
        }
    };

    themeToggle.addEventListener('click', () => {
        const newTheme = body.classList.contains('dark-theme') ? 'light' : 'dark';
        applyTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // --- 2. Content Population Logic ---
    // Example function to demonstrate using the data from data.js
    const populateContent = () => {
        // Check if appText data exists
        if (typeof appText === 'undefined') {
            mainContent.innerHTML = '<p>Error: Application data not found.</p>';
            return;
        }

        // Use the data to set content
        appTitle.textContent = appText.HomePage.title;

        // Build some HTML from the data
        let html = `
            <h2>${appText.HomePage.nonPersonalizedTitle}</h2>
            <p>${appText.HomePage.subtitle}</p>
            <input type="text" placeholder="${appText.HomePage.createForm.placeholder}" style="width: 80%; padding: 0.5rem;" />
            <br/><br/>
            <h3>Ideas:</h3>
            <ul>
                ${appText.TypeWriter.words.map(word => `<li>${appText.TypeWriter.prefix}${word}</li>`).join('')}
            </ul>
        `;
        
        mainContent.innerHTML = html;
    };

    // --- 3. Initializations ---
    initializeTheme();
    populateContent();
});