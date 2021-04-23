interface SettingsScreen {
    SIGN_IN: string;
    SIGN_OUT: string;
    LANG_BTN: string[];
    LANG_BTN_TITLE: string;
    HOMESCREEN_BTN: string[];
    HOMESCREEN_BTN_TITLE: string;
    APIRENCE_BTN: string[];
    APIRENCE_BTN_TITLE: string;
}

const en: SettingsScreen = {
  SIGN_IN: "Sign in with google",
  SIGN_OUT: "Sign out",

  LANG_BTN: ["Slovak", "English"],
  LANG_BTN_TITLE: "Language: ",

  HOMESCREEN_BTN: ["Settings", "Home", "Saved"],
  HOMESCREEN_BTN_TITLE: "Home screen: ",

  APIRENCE_BTN: ["Light", "Dark"],
  APIRENCE_BTN_TITLE: "App apirence: ",
};

const sk: SettingsScreen = {
  SIGN_IN: "Prihlásiť sa cez Google",
  SIGN_OUT: "Odhlásiť sa",

  LANG_BTN: ["Slovenský", "Anglický"],
  LANG_BTN_TITLE: "Jazyk: ",

  HOMESCREEN_BTN: ["Nastavenia", "Domov", "Uložené"],
  HOMESCREEN_BTN_TITLE: "Domovská obrazovka: ",

  APIRENCE_BTN: ["Svetlý", "Tmavý"],
  APIRENCE_BTN_TITLE: "Vzhľad aplikácie: ",
};

const language: { [key: string]: SettingsScreen } = {
    "sk": sk,
    "en": en
}

export default language;
