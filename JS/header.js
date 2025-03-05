// Mobile menu toggle
document.getElementById("mobile-menu-toggle").addEventListener("click", function () {
    var menu = document.getElementById("mobile-menu");
    menu.classList.toggle("show");
});

// Suggestions array with categories
const suggestions = [
    { text: "Serengeti", category: "Tours", url: "../../Home/View-more/9sec-days-general.html" },
    { text: "Ngorongoro", category: "Tours", url: "../../Home/View-more/9sec-days-general.html" },
    { text: "Tanzania National Parks", category: "Tours", url: "../../Home/View-more/10 Days-Tanzania-safari-all-northern-parks-general.html" },
    { text: "Adventure Packages", category: "Tours", url: "../../Home/View-more/9-days-general.html" },
    { text: "Zanzibar Beach", category: "Tours", url: "../../Home/View-more/13 DAYS-SAFARI + ZANZIBAR-GENERAL.html" },
    { text: "Wildlife Experiences", category: "Activities", url: "../../Home/View-more/7-days-general.html" },
    { text: "Cultural Tours", category: "Tours", url: "../../Home/View-more/4-days-general.html" },
    { text: "Mt.Kilimanjaro", category: "Hiking", url: "../../Home/View-more/10-days-kilimanjaro-machame-general.html" },
    { text: "Custom Itineraries", category: "Services", url: "custom-itineraries.html" },
    { text: "Hiking Adventures", category: "Activities", url: "../../Home/View-more/8-days-kilimanjaro.machame-general.html" }
];


// Search functionality
function filterSuggestions() {
    const searchInput = document.getElementById('search-input');
    const suggestionBox = document.getElementById('suggestion-box');
    const query = searchInput.value.toLowerCase().trim();
    const currentLang = localStorage.getItem('language') || 'en'; // Default to 'en'

    suggestionBox.innerHTML = ""; // Clear previous suggestions

    if (query.length > 0) {
        const filteredSuggestions = suggestions.filter(item =>
            item.text.toLowerCase().includes(query) ||
            item.category.toLowerCase().includes(query)
        );

        if (filteredSuggestions.length > 0) {
            const groupedSuggestions = filteredSuggestions.reduce((acc, item) => {
                if (!acc[item.category]) acc[item.category] = [];
                acc[item.category].push(item);
                return acc;
            }, {});

            Object.entries(groupedSuggestions).forEach(([category, items]) => {
                const categoryEl = document.createElement('div');
                categoryEl.className = 'suggestion-category';
                categoryEl.textContent = category; // Category names could also be translated
                suggestionBox.appendChild(categoryEl);

                items.forEach(item => {
                    const suggestionItem = document.createElement('div');
                    suggestionItem.className = 'suggestion-item';
                    const translatedText = translations[currentLang][item.text] || item.text;
                    const highlightedText = translatedText.replace(
                        new RegExp(query, 'gi'),
                        match => `<span class="highlight">${match}</span>`
                    );
                    suggestionItem.innerHTML = highlightedText;

                    // Append language parameter to URL
                    const urlWithLang = `${item.url}${item.url.includes('?') ? '&' : '?'}lang=${currentLang}`;
                    suggestionItem.onclick = () => (window.location.href = urlWithLang);

                    suggestionBox.appendChild(suggestionItem);
                });
            });
        } else {
            suggestionBox.innerHTML = `
                <div class="no-results">
                    <div class="no-results-icon">🔍</div>
                    <div>No matching results found</div>
                    <div class="no-results-help">Try different keywords or check spelling</div>
                </div>
            `;
        }
        suggestionBox.style.display = 'block';
    } else {
        suggestionBox.style.display = 'none';
    }
}

// Close suggestions when clicking outside
document.addEventListener('click', (event) => {
    const suggestionBox = document.getElementById('suggestion-box');
    const searchContainer = document.querySelector('.search-container');
    if (!searchContainer.contains(event.target)) {
        suggestionBox.style.display = 'none';
    }
});

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const searchToggle = document.getElementById('search-toggle');
    const searchBar = document.getElementById('search-bar');
    const languageDropdownToggle = document.getElementById('language-dropdown-toggle');
    const languageDropdown = document.getElementById('language-dropdown');
    const languageFlag = document.getElementById('language-flag');
    const themeDropdownToggle = document.getElementById('theme-dropdown-toggle');
    const themeDropdown = document.getElementById('theme-dropdown');
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    // Toggle search bar
    searchToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        searchBar.classList.toggle('hidden');
    });

    // Toggle language dropdown
    languageDropdownToggle.addEventListener('click', () => {
        languageDropdown.classList.toggle('hidden');
    });

    // Toggle theme dropdown
    themeDropdownToggle.addEventListener('click', () => {
        themeDropdown.classList.toggle('hidden');
    });

    // Toggle mobile menu
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', (event) => {
        if (!event.target.closest('.dropdown')) {
            languageDropdown.classList.add('hidden');
            themeDropdown.classList.add('hidden');
        }
        if (!event.target.closest('.search-container')) {
            searchBar.classList.add('hidden');
        }
    });

    // Language selection
    languageDropdown.addEventListener('click', (event) => {
        if (event.target.tagName === 'A') {
            const lang = event.target.getAttribute('data-lang');
            const flagImg = event.target.querySelector('img');
            const flagSrc = flagImg ? flagImg.src : '';

            setLanguage(lang, flagSrc);
            updateLanguageSelection(lang);
            languageDropdown.classList.add('hidden');
        }
    });

    // Set language and update flag
    function setLanguage(lang, flagSrc) {
        console.log(`Language changed to: ${lang}`);
        localStorage.setItem('language', lang);
        languageFlag.src = flagSrc;
        applyLanguageToPage(lang);
    }

    // Apply language to page content
    function applyLanguageToPage(lang) {
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            element.textContent = translations[lang][key] || key;
        });
        // Re-run search to update suggestions with translated text
        filterSuggestions();
    }

    // Update selected language with a tick mark
    function updateLanguageSelection(activeLang) {
        const languageLinks = document.querySelectorAll('#language-dropdown a');
        languageLinks.forEach(link => {
            const lang = link.getAttribute('data-lang');
            link.classList.toggle('active-language', lang === activeLang);
        });
    }

    // Load saved language and apply it
    const savedLanguage = localStorage.getItem('language') || 'en';
    const defaultFlag = {
        en: 'https://flagcdn.com/w20/gb.png',
        fr: 'https://flagcdn.com/w20/fr.png',
        es: 'https://flagcdn.com/w20/es.png',
        de: 'https://flagcdn.com/w20/de.png',
    }[savedLanguage];

    const urlParams = new URLSearchParams(window.location.search);
    const urlLang = urlParams.get('lang');
    const finalLang = urlLang || savedLanguage;

    setLanguage(finalLang, defaultFlag);
    updateLanguageSelection(finalLang);
});

// Theme handling
function changeTheme(theme) {
    console.log(`Changing theme to: ${theme}`);
    const body = document.body;
    const root = document.documentElement;

    const themes = {
        light: {
            '--background-light': '#FFFFFF',
            '--background-dark': '#E5E7EB',
            '--text-light': '#111827',
            '--text-dark': '#1F2937',
            '--primary-light': '#2563EB',
            '--primary-dark': '#3B82F6',
            '--h1-color': '#1E3A8A',
            '--h2-color': '#374151',
            '--p-color': '#4B5563'
        },
        soft: {
            '--background-light': '#2C1E3F',
            '--background-dark': '#3A2A4D',
            '--text-light': '#F8E8D9',
            '--text-dark': '#CFA88E',
            '--primary-light': '#ECA869',
            '--primary-dark': '#D17860',
            '--h1-color': '#F4C37D',
            '--h2-color': '#E89B7D',
            '--p-color': '#F1D6B8'
        },
        nature: {
            '--background-light': '#F0FDF4',
            '--background-dark': '#D1FAE5',
            '--text-light': '#065F46',
            '--text-dark': '#2D3748',
            '--primary-light': '#10B981',
            '--primary-dark': '#059669',
            '--h1-color': '#047857',
            '--h2-color': '#065F46',
            '--p-color': '#374151'
        },
        dark: {
            '--background-light': '#111827',
            '--background-dark': '#1F2937',
            '--text-light': '#F3F4F6',
            '--text-dark': '#9CA3AF',
            '--primary-light': '#059669',
            '--primary-dark': '#065F46',
            '--h1-color': '#059669',
            '--h2-color': '#065F46',
            '--p-color': '#E5E7EB'
        },
        contrast: {
            '--background-light': '#000000',
            '--background-dark': '#1A1A1A',
            '--text-light': '#FFFFFF',
            '--text-dark': '#E5E5E5',
            '--primary-light': '#F59E0B',
            '--primary-dark': '#FFCC00',
            '--h1-color': '#FFCC00',
            '--h2-color': '#F59E0B',
            '--p-color': '#DDDDDD'
        }
    };

    body.classList.remove('light-theme', 'dark-theme', 'soft-theme', 'nature-theme', 'contrast-theme');
    body.classList.add(`${theme}-theme`);

    const selectedTheme = themes[theme];
    if (selectedTheme) {
        Object.keys(selectedTheme).forEach(variable => {
            root.style.setProperty(variable, selectedTheme[variable]);
        });
    }

    localStorage.setItem('preferred-theme', theme);
    updateThemeSelection(theme);
}

function updateThemeSelection(activeTheme) {
    const themeLinks = document.querySelectorAll('#theme-dropdown a');
    themeLinks.forEach(link => {
        const theme = link.getAttribute('data-theme');
        link.classList.toggle('active-theme', theme === activeTheme);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('preferred-theme') || 'light';
    changeTheme(savedTheme);

    const themeDropdown = document.getElementById('theme-dropdown');
    if (themeDropdown) {
        themeDropdown.addEventListener('click', (event) => {
            if (event.target.tagName === 'A') {
                const theme = event.target.getAttribute('data-theme');
                changeTheme(theme);
            }
        });
    }
});