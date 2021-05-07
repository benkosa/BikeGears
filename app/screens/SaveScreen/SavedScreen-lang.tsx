interface SaveModalLang {
    NOTICE: string,
    SIGN_IN: string,
    DELETE_BTN: string,
}

const en: SaveModalLang = {
    NOTICE: "You must log in before saving",
    SIGN_IN: "Sign in with google",
    DELETE_BTN: "Remove",
};

const sk: SaveModalLang = {
    NOTICE: "Pred uložením sa musíte prihlásiť",
    SIGN_IN: "Prihlásiť sa cez google",
    DELETE_BTN: "Zmazať",
};

const language: { [key: string]: SaveModalLang } = {
    "sk": sk,
    "en": en
}

export default language;
