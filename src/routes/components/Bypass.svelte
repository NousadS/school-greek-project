<script lang="ts">
    // Assets

    import { T } from "$lib/Localization";

    // Storage

    import { defaultStorageState, storage, type Storage } from "$lib/Storage";

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

        if (selected == "reset") {
            $storage = defaultStorageState;

            console.log("Reset bypass");
        } else if (selected == "reset-with-pause") {
            $storage = { ...defaultStorageState, timeFrozen: true };

            console.log("Reset with pause bypass");
        } else if (selected.startsWith("goto")) {
            const g: string = selected.substring(5);
            let d: string = "error";

            const l: string = g.substring(6);
            const e: string = g.substring(7);

            if (g == "menu") d = "";
            if (g == "error") d = "error";
            if (g.startsWith("level"))
                d = `levels/${l == "1" ? "first" : l == "2" ? "second" : "third"}`;
            if (g.startsWith("ending"))
                d = `endings/${e == "1" ? "first" : e == "2" ? "second" : e == "3" ? "third" : e == "4" ? "fourth" : "fifth"}`;

            console.log("Goto bypass:", g);

            location.pathname = d;
        } else if (selected.startsWith("time")) {
            const t: string = selected.substring(5);

            if (t.startsWith("pause")) $storage.timeFrozen = true;
            else if (t.startsWith("unpause")) $storage.timeFrozen = false;
            else if (t.startsWith("reset"))
                $storage.time = defaultStorageState.time;
            else if (t.startsWith("seconds"))
                $storage.time += parseInt(t.substring(8)) * 100;

            console.log("Time bypass:", t);
        } else if (selected.startsWith("trust")) {
            const t: string = selected.substring(6);

            if (t.startsWith("reset"))
                $storage.trust = defaultStorageState.trust;
            else $storage.trust += parseInt(t);

            console.log("Time bypass:", t);
        } else if (selected.startsWith("resource")) {
            const r: string = selected.substring(9, 9 + 4);
            const a: number = parseInt(selected.substring(9 + 4 + 1));

            if (r == "wood") $storage.resources.wood.got += a;
            if (r == "rope") $storage.resources.rope.got += a;
            if (r == "rock") $storage.resources.rock.got += a;

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
            <option value="Bypass" hidden>{T.bypassTitle}</option>
            <option value="reset">{T.bypassReset}</option>
            <option value="reset-with-pause">{T.bypassResetWithPause}</option>

            <optgroup label={T.bypassGoto}>
                <option value="goto-menu">{T.bypassGotoMenu}</option>
                <option value="goto-error">{T.bypassGotoError}</option>
            </optgroup>

            <optgroup label="{T.bypassGoto}: {T.bypassGotoLevel}">
                {#each { length: 3 }, level}
                    <option value="goto-level-{level + 1}"
                        >{T.bypassGotoLevel} {level + 1}</option
                    >
                {/each}
            </optgroup>

            <optgroup label="{T.bypassGoto}: {T.bypassGotoEnding}">
                {#each { length: 4 }, ending}
                    <option value="goto-ending-{ending + 1}"
                        >{T.bypassGotoEnding} {ending + 1}</option
                    >
                {/each}
            </optgroup>

            <optgroup label={T.bypassTime}>
                <option value="time-pause">{T.bypassTimePause}</option>
                <option value="time-unpause">{T.bypassTimeUnpause}</option>
                <option value="time-reset">{T.bypassTimeReset}</option>

                {#each [-120, -60, -30, -10, -5, -1, 1, 5, 10, 30, 60, 120] as amount}
                    <option value="time-seconds-{amount}"
                        >{amount < 0 ? `${amount}` : `+${amount}`}
                        {T.bypassTimeSeconds}</option
                    >
                {/each}
            </optgroup>

            <optgroup label={T.bypassTrust}>
                <option value="trust-reset">{T.bypassTrustReset}</option>

                {#each [-2, -1, 1, 2] as amount}
                    <option value="trust-{amount}"
                        >{amount < 0 ? `${amount}` : `+${amount}`}</option
                    >
                {/each}
            </optgroup>

            {#each ["wood", "rope", "rock"] as resource}
                <optgroup label="{T.bypassResources}: {T[resource]}">
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

        z-index: 100;

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
