interface SaveModalLang {
    NOTICE: string,
    SIGN_IN: string
}

const en: SaveModalLang = {
    NOTICE: "You must log in before saving",
    SIGN_IN: "Sign in with google"
};

const sk: SaveModalLang = {
    NOTICE: "Pred uložením sa musíte prihlásiť",
    SIGN_IN: "Prihlásiť sa cez google"
};

const language: { [key: string]: SaveModalLang } = {
    "sk": sk,
    "en": en
}

export default language;
