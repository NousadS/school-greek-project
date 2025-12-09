type LocalizationEntry = Record<string, string>;

interface Localization {
    menu: LocalizationEntry;
    interface: LocalizationEntry;
    error: LocalizationEntry;
    bypass: LocalizationEntry;
    levelCommon: LocalizationEntry;
    level: Array<LocalizationEntry>;
    ending: Array<LocalizationEntry>;
}

const localization: Localization = {
    menu: {
        title: "Das trojanische Pferd",
        description: "Ein Spiel",
        authors: "Von Mats, Grigor und Matvei",
        button: "Start",
    },
    interface: {
        time: "Time",
        wood: "Wood",
        rope: "Rope",
        rock: "Rock",
        secondsShort: "s",
    },
    error: {
        title: "Something went wrong...",
        button: "Back",
    },
    bypass: {
        title: "Bypass",
        button: "Bypass",
    },
    levelCommon: {
        introductionTitle: "Level",
        introductionButton: "Start!",
    },
    level: [],
    ending: [],
};

export { localization, type Localization, type LocalizationEntry };
