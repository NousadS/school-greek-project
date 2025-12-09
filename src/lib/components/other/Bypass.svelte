<script lang="ts">
    // Localization

    import {
        localization,
        type Localization,
        type LocalizationEntry,
    } from "$lib/Localization";

    const T: LocalizationEntry = localization.bypass;

    // Storage

    import { storage } from "$lib/Storage";

    // Content

    let dialog: HTMLDialogElement;
    let form: HTMLFormElement;
    let select: HTMLSelectElement;

    let show: boolean = $state(false);
    let sequence: number = $state(0);

    function onkeydown(event: KeyboardEvent): void {
        if (event.code === "ControlLeft") sequence++;
        else sequence = 0;

        if (event.code === "ControlLeft") console.log("Sequence", sequence);

        if (sequence == 2) {
            show = !show;
            sequence = 0;

            if (show) dialog.show();
            else dialog.close();
        }
    }

    function onsubmit(event: SubmitEvent) {
        show = false;

        const selected: string = select.selectedOptions.item(0)?.value || "";
        select.selectedIndex = 0;

        if (selected.startsWith("goto")) {
            const g: string = selected.substring(5);
            let d: string = "error";

            if (g == "menu") d = "";
            if (g == "error") d = "error";
            if (g.startsWith("level")) d = g;
            if (g.startsWith("ending")) d = g;

            console.log("Goto bypass:", g);

            location.pathname = d;
        } else if (selected.startsWith("time")) {
            const t: string = selected.substring(5);

            if (t.startsWith("pause")) $storage.timeFreeze = true;
            else if (t.startsWith("unpause")) $storage.timeFreeze = false;
            else if (t.startsWith("reset")) $storage.time = 0;
            else if (t.startsWith("seconds"))
                $storage.time += parseInt(t.substring(8)) * 100;

            console.log("Time bypass:", t);
        } else if (selected.startsWith("resource")) {
            const r: string = selected.substring(9, 9 + 4);
            const a: number = parseInt(selected.substring(9 + 4 + 1));

            if (r == "wood") $storage.wood += a;
            if (r == "rope") $storage.rope += a;
            if (r == "rock") $storage.rock += a;

            console.log("Resource bypass:", r, a);
        } else {
            console.error("Undefined Behaviour:", selected);
        }
    }
</script>

<svelte:window {onkeydown} />

<dialog bind:this={dialog}>
    <form bind:this={form} method="dialog" {onsubmit}>
        <select bind:this={select} onchange={() => form.requestSubmit()}>
            <option value="Bypass" hidden>Bypass</option>

            <optgroup label="Goto">
                <option value="goto-menu">Menu</option>
                <option value="goto-error">Error</option>
            </optgroup>

            <optgroup label="Goto: Level">
                {#each { length: 8 }, level}
                    <option value="goto-level-{level}">Level {level}</option>
                {/each}
            </optgroup>

            <optgroup label="Goto: Ending">
                {#each { length: 8 }, ending}
                    <option value="goto-ending-{ending}">Ending {ending}</option
                    >
                {/each}
            </optgroup>

            <optgroup label="Time">
                <option value="time-pause">Pause</option>
                <option value="time-unpause">Unpause</option>
                <option value="time-reset">Reset</option>

                {#each [-120, -60, -30, -10, -5, -1, 1, 5, 10, 30, 60, 120] as amount}
                    <option value="time-seconds-{amount}"
                        >{amount < 0 ? `${amount}` : `+${amount}`} seconds</option
                    >
                {/each}
            </optgroup>

            {#each ["wood", "rope", "rock"] as resource}
                <optgroup
                    label="Resources: {resource[0].toUpperCase() +
                        resource.substring(1)}"
                >
                    {#each [-10, -5, -1, 1, 5, 10] as amount}
                        <option value="resource-{resource}-{amount}"
                            >{amount < 0 ? `${amount}` : `+${amount}`}</option
                        >
                    {/each}
                </optgroup>
            {/each}
        </select>
    </form>
</dialog>

<style lang="scss">
    dialog {
        display: block;

        margin: 0;
        padding: 0;

        border: none;
        background-color: transparent;

        position: absolute;
        left: -20dvw;
        top: 1dvw;

        transition: 0.25s left ease;

        &[open] {
            left: 1dvw;
        }

        form {
            width: 15dvw;
            height: calc(100dvh - 2dvw - 0.65rem);

            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-direction: column;

            padding: 0.2rem;

            select {
                width: 100%;

                color: var(--text);
                background-color: var(--bg-middle);

                outline: none;

                padding: 0.2rem;
                border-radius: 5px;
            }
        }
    }
</style>
