interface SaveModalLang {
    SAVE_BTN: string,
    SAVE_SIGN_BTN: string,
    SETUP_NAME: string
}

const en: SaveModalLang = {
    SAVE_BTN: "Save",
    SETUP_NAME: "Setup name",
    SAVE_SIGN_BTN:"Sign in and save",
};

const sk: SaveModalLang = {
    SAVE_BTN: "Uložiť",
    SETUP_NAME: "Názov radenia",
    SAVE_SIGN_BTN: "Prihlásiť sa a uložiť"
};

const language: { [key: string]: SaveModalLang } = {
    "sk": sk,
    "en": en
}

export default language;
