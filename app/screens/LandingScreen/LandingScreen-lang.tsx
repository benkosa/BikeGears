interface LandingScreenLang {
    NOTICE1: string,
    NOTICE2: string,
}

const en: LandingScreenLang = {
    NOTICE1: "Press ",
    NOTICE2: "for selection",
};

const sk: LandingScreenLang = {
    NOTICE1: "Stlačte ",
    NOTICE2: "pre výber",
};

const language: { [key: string]: LandingScreenLang } = {
    "sk": sk,
    "en": en
}

export default language;
