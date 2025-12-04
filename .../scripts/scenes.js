function openScene(id, z = 0) {
    document
        .querySelector(`.scenes #scene-${id}`)
        .style.setProperty("--move", "0dvw, 0dvh");

    document
        .querySelector(`.scenes #scene-${id}`)
        .style.setProperty("--zindex", z.toString());
}

function closeScene(id, tox = 100, toy = 0) {
    document
        .querySelector(`.scenes #scene-${id}`)
        .style.setProperty("--move", `${tox}dvw, ${toy}dvh`);
}
