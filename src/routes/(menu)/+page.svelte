<script lang="ts">
    // Assets

    import menuImage from "$lib/images/interface/menu/background.jpg";

    import { T } from "$lib/Localization";
    import { defaultStorageState, storage } from "$lib/Storage";

    // Components

    import Button from "../components/Button.svelte";

    // Content

    let clicked: boolean = $state(false);

    function onclick() {
        clicked = true;

        $storage = defaultStorageState;

        setTimeout(() => (location.pathname = "/levels/first"), 750);
    }
</script>

<div
    class="container"
    style="background-image:
    linear-gradient(
        315deg,
        rgba(255, 255, 255, 0.5),
        rgba(128, 128, 128, 0.5)
    ),
    url({menuImage})"
>
    <h1>
        {#each T.menuTitle.split(" ") as word, _}
            <span>
                <!-- {#each Array.from(word) as s, _}
                <span>{s}</span>
            {/each} -->
                {word}
            </span>
        {/each}
    </h1>

    <div class="description">{T.menuDescription}</div>
    <div class="authors">{T.menuAuthors}</div>

    <div class="button" class:clicked>
        <Button {onclick}>{T.start} <span>➙</span></Button>
    </div>
</div>

<style lang="scss">
    .container {
        width: 100dvw;
        height: 100dvh;

        background: linear-gradient(
            315deg,
            rgba(255, 255, 255, 0.5),
            rgba(128, 128, 128, 0.5)
        );
        background-size: cover;
        background-position: center;

        display: grid;
        grid-template-columns: 25fr repeat(4, calc(50fr / 4)) 25fr;
        grid-template-rows: 25fr repeat(4, calc(50fr / 4)) 25fr;
        justify-content: center;
        align-content: center;
        justify-items: center;
        align-items: center;

        h1 {
            grid-column: 2 / span 4;
            grid-row: 2;

            font-size: 4rem;
            text-transform: uppercase;

            width: 100%;

            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-direction: row;

            margin: 0;
            padding: 0;

            font-family: var(--font-caption);
        }

        .description {
            grid-column: 2 / span 2;
            grid-row: 3;
            justify-self: start;

            text-align: left;
        }

        .authors {
            grid-column: 4 / span 2;
            grid-row: 3;
            justify-self: end;

            text-align: right;
        }

        .button {
            grid-column: 2 / span 4;
            grid-row: 4;
            justify-self: start;

            width: 12dvw;

            transition:
                0.5s width linear,
                0.25s color ease,
                0.25s transform ease;

            :global(button) {
                padding-left: 1rem;
                padding-right: 1rem;
            }

            :global(.container) {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            :global(span) {
                display: inline-block;

                font-size: 1.5em;
                line-height: 1rem;
                height: 1rem;
                // transform: translateY(0.2rem);
            }

            &.clicked {
                width: 100%;

                :global(button) {
                    transform: none;
                }
            }
        }
    }
</style>
