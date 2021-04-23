interface SettingsScreen {
HOME: string,
SETTINGS: string,
SAVE: string
}

const en: SettingsScreen = {
    HOME: "Home",
    SETTINGS: "Settings",
    SAVE: "Save"
};

const sk: SettingsScreen = {
    HOME: "Domov",
    SETTINGS: "Nastavenia",
    SAVE: "Uložené"
};

const language: { [key: string]: SettingsScreen } = {
    "sk": sk,
    "en": en
}

export default language;
