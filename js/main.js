const translations = {
    ru: {
        bioTitle: 'ПРО СЕБЯ',
        bioCopy: 'Я backend-разработчик, который делает упор на стабильную архитектуру, чистый код и аккуратную работу с данными. Люблю продумывать API, автоматизировать рутину и собирать проекты так, чтобы ими было удобно пользоваться и поддерживать их в долгую.',
        worksTitle: 'МОИ РАБОТЫ',
        project1: 'Проект 1',
        project2: 'Проект 2',
        project3: 'Проект 3',
        project4: 'Проект 4',
        project5: 'Проект 5',
        project6: 'Проект 6'
    },
    en: {
        bioTitle: 'ABOUT ME',
        bioCopy: 'I am a backend developer focused on stable architecture, clean code, and careful data handling. I enjoy designing APIs, automating routine processes, and building projects that are convenient to use and maintain over the long term.',
        worksTitle: 'MY WORKS',
        project1: 'Project 1',
        project2: 'Project 2',
        project3: 'Project 3',
        project4: 'Project 4',
        project5: 'Project 5',
        project6: 'Project 6'
    }
};

const ruButton = document.getElementById('lang-ru');
const enButton = document.getElementById('lang-en');

function getLangFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('lang');
}

function setLanguage(language, updateUrl = true) {
    const dictionary = translations[language] || translations.ru;

    document.documentElement.lang = language;
    localStorage.setItem('preferredLanguage', language);

    document.querySelectorAll('[data-i18n]').forEach((element) => {
        const key = element.dataset.i18n;
        const value = dictionary[key];
        if (value) {
            element.textContent = value;
        }
    });

    ruButton.classList.toggle('active', language === 'ru');
    enButton.classList.toggle('active', language === 'en');

    if (updateUrl) {
        const url = new URL(window.location.href);
        url.searchParams.set('lang', language);
        window.history.replaceState({}, '', url);
    }
}

function withLang(href, language) {
    const [beforeHash, hash = ''] = href.split('#');
    const [base, query = ''] = beforeHash.split('?');
    const params = new URLSearchParams(query);
    params.set('lang', language);
    const search = params.toString();

    return `${base}${search ? `?${search}` : ''}${hash ? `#${hash}` : ''}`;
}

function updateProjectLinksLang() {
    const language = getLangFromUrl() || localStorage.getItem('preferredLanguage') || 'ru';

    for (let index = 1; index <= 6; index += 1) {
        const link = document.getElementById(`project-link-${index}`);
        if (link) {
            const baseHref = link.dataset.baseHref || link.getAttribute('href');
            link.dataset.baseHref = baseHref;
            link.setAttribute('href', withLang(baseHref, language));
        }
    }
}

const initialLanguage = getLangFromUrl() || localStorage.getItem('preferredLanguage') || 'ru';
setLanguage(initialLanguage, false);
updateProjectLinksLang();

ruButton.addEventListener('click', () => {
    setLanguage('ru');
    updateProjectLinksLang();
});

enButton.addEventListener('click', () => {
    setLanguage('en');
    updateProjectLinksLang();
});
