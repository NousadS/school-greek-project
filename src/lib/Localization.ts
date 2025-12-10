type Localization = Record<string, string>;

const T: Localization = {
    // Common

    seconds: "Sekunden",
    secondsShort: "s",
    start: "Start",
    back: "Zurück",

    // Resources

    wood: "Holz",
    rope: "Seil",
    rock: "Stein",

    // Menu

    menuTitle: "Das trojanische Pferd",
    menuDescription: "Ein Spiel",
    menuAuthors: "Von Mats, Grigor und Matvei",

    // Bypass

    bypassTitle: "Bypass",
    bypassReset: "Reset",
    bypassResetWithPause: "Reset with pause",
    bypassGoto: "Goto",
    bypassGotoMenu: "Menu",
    bypassGotoError: "Error",
    bypassGotoLevel: "Level",
    bypassGotoEnding: "Ending",
    bypassTime: "Time",
    bypassTimePause: "Pause",
    bypassTimeUnpause: "Unpause",
    bypassTimeReset: "Reset",
    bypassTimeSeconds: "seconds",
    bypassTrust: "Trust",
    bypassTrustReset: "Reset",
    bypassResources: "Resources",

    // Error

    errorTitle: "Something went wrong...",

    // Levels

    introductionTitle: "Level",

    introductionFirst: `
        Auf dieser Level ist es deine Aufgabe, die notwendigen Ressourcen zu sammeln, 
        um das Trojanische Pferd zu errichten. Zwei Orte stehen dir dabei offen: 
        der geschäftige Marktplatz und der windumtoste Hafen. 
        Suche an einem dieser Orte nach allen erforderlichen Materialien. 
        Hast du dort alles zusammengetragen, so betätige die seitlich angebrachte Schaltfläche, 
        um deinen Weg fortzusetzen und dem Plan der Achaier näherzukommen.
    `,
    introductionSecond: `
        Du schreitest zur nächsten Level vor. Hier liegt es an dir, 
        das Trojanische Pferd zu errichten - fehlerlos und mit größter Sorgfalt, 
        wie es eines Werkes der alten Meister bedarf.
        Ziehe die gesammelten Ressourcen an die vorgesehenen Stellen, um das Pferd zu vollenden 
        und seinen Platz im Lauf der Geschichte zu sichern.
    `,
    introductionThird: `
        Der letzte Schritt, um Troja zu bezwingen! Die Trojaner sind nicht überzeugt, 
        dass das Pferd ein Geschenk ist. Du wurdest als Gesandter ausgesandt und 
        musst nun diesen betagten Bürger überzeugen, dass unser Pferd keinerlei Gefahr birgt. 
        Wähle deine Worte mit Bedacht, wie es einem Diplomaten in den Geschichten der Alten gebührt, 
        und gewinne sein Vertrauen, damit sich das Tor Trojas schließlich öffnet.
    `,

    dialogSpeakerFirst: `
        Bei den grauen Augen der Athene - welcher Wahnsinn ist das? 
        Zehn Jahre lang habt ihr Achaier an unseren Mauern gekratzt wie hungernde Wölfe. 
        Und nun, plötzlich, wenden eure Schiffe den Bug dem Meer zu? 
        Sprich die Wahrheit - oder fahre rasch hinab zu Hades.
    `,
    dialogSpeakerSecond: `
        Wenn ihr wirklich flieht, dann erklärt dieses Ungeheuer aus Kiefer und Tanne, das im Sand steht. 
        Warum lasst ihr einen solchen Titanen an unserer Küste zurück? 
        Ist es ein Belagerungsturm, verborgen in der Gestalt eines Tieres?
    `,
    dialogSpeakerThird: `
        Ein Opfer, sagst du? Warum aber ist es von solcher gewaltigen Größe? 
        Es ist zu breit für unsere Tore und zu hoch für unsere Tempel. 
        Es scheint gemacht, um uns zu verhöhnen, nicht um eine Göttin zu ehren.
    `,
    dialogSpeakerFourth: `
        Deine Worte fließen wie Honig, Grieche, doch darunter rieche ich Galle. 
        Warum sollte ich nicht eine Fackel an dieses Holz legen und der Sache ein Ende bereiten?
    `,

    dialogFirstA: `
        König Agamemnon beugt sich dem Willen der Götter. Kalchas, der Seher, hat verkündet, 
        dass uns der Sieg verwehrt ist. Wir kehren nach Argos zurück, 
        um den erzürnten Himmel zu besänftigen.
    `,
    dialogFirstB: `
        Wir sind müde und gebrochen. Eure Mauern sind zu stark, 
        und Hektors Geist verfolgt unsere Träume. Wir überlassen euch das Feld.
    `,
    dialogFirstC: `
        Wir gehen, weil wir bereits gesiegt haben! 
        Dieses Land soll vergehen - es ist nicht wert des Blutes des Achilleus!
    `,

    dialogSecondA: `
        Es ist eine Weihegabe an Pallas Athene. Wir entwendeten das Palladion aus eurem Tempel, 
        und sie sandte Stürme gegen uns. Dieses Abbild soll ersetzen, was genommen wurde, 
        und uns eine sichere Heimfahrt gewähren.
    `,
    dialogSecondB: `
        Es ist ein Denkmal für die tapferen Gefallenen, Griechen wie Trojaner. 
        Ein Zeichen des Friedens, den wir nun suchen.
    `,
    dialogSecondC: `
        Es ist ein Behältnis für die Schätze, die wir nicht mitnehmen konnten - 
        ein Tribut an König Priamos für seine Barmherzigkeit.
    `,

    dialogThirdA: `
        Kalchas befahl, es so groß zu erbauen, 
        dass ihr es nicht in eure Stadt bringen könntet. 
        Denn würdet ihr es hineinziehen, 
        ginge Athenes Schutz von uns auf euch über - 
        und Troja würde niemals fallen.
    `,
    dialogThirdB: `
        Unsere Baumeister wurden vom Eifer überwältigt! 
        Wir wollten, dass die Olympier unsere Frömmigkeit selbst von den Höhen des Ida erblicken.
    `,
    dialogThirdC: `
        Wir bauten es so groß, damit es ... genügend Raum trüge 
        für all die Gebete eines jeden Kriegers auf dem Weg nach Hause.
    `,

    dialogFourthA: `
        Verbrennt es also. Wir waschen unsere Hände in Unschuld. 
        Doch wisset: Entweiht ihr Athenes Gabe, so fällt ihr Zorn nicht auf uns, 
        die Erbauer, sondern auf euch, die Zerstörer.
    `,
    dialogFourthB: `
        Ich schwöre beim Strom des Styx - ich lüge nicht! 
        Würde ein einzelner, unbewaffneter Mann ein ganzes Heer Trojaner belügen?
    `,
    dialogFourthC: `
        Dann tut es! Verbrennt es! Sehen wir doch, 
        wie sehr uns euer törichter Aberglaube kümmert!
    `,

    // Endings

    endingFirst1: `Und so, wie es das Schicksal seit jeher in die Sterne geschrieben hatte,`,
    endingFirst2: `ging der listige Plan der Griechen genau so auf, wie sie es erhofft hatten.`,
    endingFirst3: `Der Plan gelang. Troja, die große und stolze Stadt,`,
    endingFirst4: `die zehn Jahre des Krieges standgehalten hatte,`,
    endingFirst5: `wurde zerstört - zu Asche verbrannt,`,
    endingFirst6: `während die Götter selbst vom Olymp herab zusahen.`,

    endingSecond1: `Doch die Götter hatten andere Pläne,`,
    endingSecond2: `und das Glück lächelte den Griechen nicht zu.`,
    endingSecond3: `Der Plan scheiterte - die Trojaner entdeckten`,
    endingSecond4: `die verborgenen Krieger, ehe sie zuschlagen konnten.`,
    endingSecond5: `Troja, die starke und mächtige Stadt unter göttlichem Schutz,`,
    endingSecond6: `blieb bestehen - ihre Mauern noch immer stolz,`,
    endingSecond7: `ihr Volk in Sicherheit und ihr Sieg vollkommen.`,

    endingThird1: `Doch die Götter hatten andere Pläne,`,
    endingThird2: `und das Glück lächelte den Griechen nicht zu.`,
    endingThird3: `Der Plan scheiterte - die Trojaner entdeckten`,
    endingThird4: `die verborgenen Krieger, ehe sie zuschlagen konnten.`,
    endingThird5: `Troja, die starke und mächtige Stadt unter göttlichem Schutz,`,
    endingThird6: `blieb bestehen - ihre Mauern noch immer stolz,`,
    endingThird7: `ihr Volk in Sicherheit und ihr Sieg vollkommen.`,

    endingFourth1: `Doch der Gesandte sprach ungeschickt,`,
    endingFourth2: `und die Trojaner misstrauten seinen Worten.`,
    endingFourth3: `Das Pferd erreichte niemals die Tore - die Wächter zerstörten es`,
    endingFourth4: `außerhalb der Stadtmauern.`,
    endingFourth5: `Troja blieb sicher, denn die Fehler des Diplomaten`,
    endingFourth6: `warnten sie vor der griechischen List, noch ehe sie beginnen konnte.`,

    // Alts

    altOrnament: "Old greek border",
    altError: "Old greek tragedy masks",
    altTimerClock: "Clock without hands",
    altTimerHand: "Clock hand",
    altLocation: "Location",
};
export { T, type Localization };
