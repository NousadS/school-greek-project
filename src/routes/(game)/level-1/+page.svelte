<script lang="ts">
    // Assets

    import backgroundImage1 from "$lib/images/level-1/image-1.png";

    import resourceImage1 from "$lib/images/level-1/image-1-plank-1.png";
    import resourceImage2 from "$lib/images/level-1/image-1-plank-2.png";

    // Components

    import Button from "$lib/components/common/Button.svelte";
    import Introduction from "$lib/components/game/level/Introduction.svelte";

    // Localization

    import {
        localization,
        type Localization,
        type LocalizationEntry,
    } from "$lib/Localization";
    import { storage } from "$lib/Storage";

    const T: LocalizationEntry = localization.level[0];

    // Content

    const resources: Array<{
        resource: "wood" | "rope" | "rock";
        image: string;
        element: HTMLImageElement | null;
    }> = [
        { resource: "wood", image: resourceImage1, element: null },
        { resource: "wood", image: resourceImage2, element: null },
    ];

    function onclick(index: number) {
        const target = resources[index];

        if (target.element) {
            target.element.style.top = "-10px";
            target.element.style.left = "-100px";
            target.element.style.opacity = "0";
        }

        $storage[target.resource] += 2;
    }
</script>

<Introduction level={0}>s</Introduction>

<div class="container">
    <div class="image-1">
        <img src={backgroundImage1} alt="Background" />

        {#each resources as resource, index}
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
            <img
                src={resource.image}
                alt="Resource"
                class="resource"
                id="resource-{index}"
                onclick={() => onclick(index)}
                bind:this={resource.element}
            />
        {/each}
    </div>
</div>

<style lang="scss">
    .container {
        z-index: 0;

        width: 100%;
        height: 100%;

        display: flex;
        justify-content: center;
        align-items: center;

        .image-1 {
            position: relative;

            .resource {
                position: absolute;

                cursor: pointer;

                opacity: 1;

                transition:
                    1s top ease,
                    1s left ease,
                    0.75s opacity ease,
                    0.25s transform ease,
                    0.25s filter ease;

                filter: drop-shadow(1px 1px 2px #ffffff55)
                    drop-shadow(-1px -1px 2px #ffffff55);

                &:hover {
                    transform: scale(1.25);
                    filter: drop-shadow(1px 1px 2px white)
                        drop-shadow(-1px -1px 2px white);
                }

                &#resource-0 {
                    top: calc(646px - 72px);
                    left: 150px;
                }

                &#resource-1 {
                    top: 390px;
                    left: 725px;
                }
            }
        }
    }
</style>
