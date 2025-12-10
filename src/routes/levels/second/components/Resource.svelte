<script lang="ts">
    // Assets

    import wood from "$lib/images/interface/resource/wood.png";
    import rope from "$lib/images/interface/resource/rope.png";
    import rock from "$lib/images/interface/resource/rock.png";

    import { T } from "$lib/Localization";

    // Storage

    import { storage, type StorageResourceType } from "$lib/Storage";
    import { fly } from "svelte/transition";
    import Ornament from "../../../components/Ornament.svelte";

    // Props

    let { name }: { name: StorageResourceType } = $props();
</script>

<div class="resource">
    <Ornament />

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
        gap: 5dvh;
        padding: 1dvh;
        padding-right: 5dvh;
        backdrop-filter: blur(4px);
        border: 1px solid var(--border-color);
        user-select: none;
        pointer-events: none;

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
    }
</style>
