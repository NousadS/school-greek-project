<script lang="ts">
    // Assets

    import wood from "$lib/images/game/wood.png";
    import rope from "$lib/images/game/rope.png";
    import rock from "$lib/images/game/rock.png";

    // Localization

    import {
        localization,
        type Localization,
        type LocalizationEntry,
    } from "$lib/Localization";

    const T: LocalizationEntry = localization.interface;

    // Storage

    import { storage } from "$lib/Storage";
    import { fly } from "svelte/transition";

    // Props

    let { name }: { name: "wood" | "rope" | "rock" } = $props();
</script>

<div class="resource {name}">
    <span class="amount">
        <div class="transition">
            {#key $storage.resources[name].got}
                <span
                    in:fly={{
                        delay: 100,
                        duration: 100,
                        opacity: 0.1,
                        y: "0.25em",
                    }}
                    out:fly={{ duration: 100, opacity: 0.1, y: "-0.25em" }}
                >
                    {$storage.resources[name].got}
                </span>
            {/key}
        </div>
        /{$storage.resources[name].max}
    </span>

    <div class="icon">
        <img
            src={{
                wood: wood,
                rope: rope,
                rock: rock,
            }[name]}
            alt={name}
        />
        <span class="name">{T[name]}</span>
    </div>
</div>

<style lang="scss">
    .resource {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-self: start;
        gap: 5dvh;
        padding: 1dvh;
        padding-right: 5dvh;
        align-self: center;
        opacity: 0.75;
        backdrop-filter: blur(4px);
        border: 1px solid var(--border-color);
        opacity: 1;

        cursor: default;
        pointer-events: all;

        transition:
            0.25s transform ease,
            0.25s backdrop-filter ease,
            0.25s opacity ease;

        .amount {
            font-size: 2rem;
            width: 75%;
            text-align: center;
            text-wrap: nowrap;

            display: flex;
            justify-content: center;
            align-items: center;

            .transition {
                display: inline-block;
                position: relative;

                width: 2em;
                height: 1em;
                line-height: 1em;

                span {
                    position: absolute;
                }
            }
        }

        .icon {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            flex-wrap: nowrap;

            img {
                height: 3rem;
                aspect-ratio: 1 / 1;
            }

            .name {
                font-size: 1rem;
            }
        }

        &.wood {
            grid-column: 1 / span 2;
            grid-row: 1;
        }

        &.rope {
            grid-column: 1 / span 2;
            grid-row: 2;
        }

        &.rock {
            grid-column: 1 / span 2;
            grid-row: 3;
        }
    }
</style>
