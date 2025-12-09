<script lang="ts">
    // Assets

    import wood from "$lib/images/wood.png";
    import rope from "$lib/images/rope.png";
    import rock from "$lib/images/rock.png";

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
            {#key $storage[name]}
                <span
                    in:fly={{
                        delay: 100,
                        duration: 100,
                        opacity: 0.1,
                        y: "0.25em",
                    }}
                    out:fly={{ duration: 100, opacity: 0.1, y: "-0.25em" }}
                >
                    {$storage[name]}
                </span>
            {/key}
        </div>
        / {$storage[(name + "Max") as "woodMax" | "ropeMax" | "rockMax"]}
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
        align-self: center;
        opacity: 0.75;

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

        &:hover {
            border: 2px solid var(--border-color);
            transform: scale(1.5) translateX(16.5%) translateY(10%);
            backdrop-filter: blur(2px);
            opacity: 1;
        }

        &.wood {
            grid-column: 1;
            grid-row: 1;
        }

        &.rope {
            grid-column: 1;
            grid-row: 2;
        }

        &.rock {
            grid-column: 1;
            grid-row: 3;
        }
    }
</style>
