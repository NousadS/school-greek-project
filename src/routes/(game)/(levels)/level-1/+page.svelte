<script lang="ts">
    // Assets

    import backgroundImage1 from "$lib/images/level-1/image-1/image.png";
    import backgroundImage2 from "$lib/images/level-1/image-2/image.png";

    import resourceImage1 from "$lib/images/level-1/image-1/rock-1.png";
    import resourceImage2 from "$lib/images/level-1/image-1/rock-2.png";
    import resourceImage3 from "$lib/images/level-1/image-1/rock-3.png";
    import resourceImage4 from "$lib/images/level-1/image-1/wood-1.png";
    import resourceImage5 from "$lib/images/level-1/image-1/wood-2.png";
    import resourceImage6 from "$lib/images/level-1/image-2/rock-1.png";
    import resourceImage7 from "$lib/images/level-1/image-2/rope-1.png";
    import resourceImage8 from "$lib/images/level-1/image-2/rope-2.png";

    // Components

    import Button from "$lib/components/Button.svelte";
    import Introduction from "../Introduction.svelte";

    // Localization

    import {
        localization,
        type Localization,
        type LocalizationEntry,
    } from "$lib/Localization";
    import { storage } from "$lib/Storage";
    import { fly } from "svelte/transition";

    const T: LocalizationEntry = localization.level[0];

    // Content

    const content: Array<{
        image: string;
        resources: Array<{
            resource: "wood" | "rope" | "rock";
            index: number;
            image: string;
            padding: { x: number; y: number };
        }>;
    }> = $state([
        {
            image: backgroundImage1,
            resources: [
                {
                    resource: "rock",
                    index: 0,
                    image: resourceImage1,
                    padding: {
                        x: 3.9,
                        y: 69.4,
                    },
                },
                {
                    resource: "rock",
                    index: 1,
                    image: resourceImage2,
                    padding: {
                        x: 6.9,
                        y: 66.4,
                    },
                },
                {
                    resource: "rock",
                    index: 2,
                    image: resourceImage3,
                    padding: {
                        x: 10.2,
                        y: 66.6,
                    },
                },
                {
                    resource: "wood",
                    index: 0,
                    image: resourceImage4,
                    padding: {
                        x: 14.6,
                        y: 90.8,
                    },
                },
                {
                    resource: "wood",
                    index: 1,
                    image: resourceImage5,
                    padding: {
                        x: 72.8,
                        y: 60.3,
                    },
                },
            ],
        },
        {
            image: backgroundImage2,
            resources: [
                {
                    resource: "rock",
                    index: 3,
                    image: resourceImage6,
                    padding: {
                        x: 67.9,
                        y: 86.4,
                    },
                },
                {
                    resource: "rope",
                    index: 0,
                    image: resourceImage7,
                    padding: {
                        x: 5.5,
                        y: 87.4,
                    },
                },
                {
                    resource: "rope",
                    index: 1,
                    image: resourceImage8,
                    padding: {
                        x: 19.2,
                        y: 94.6,
                    },
                },
            ],
        },
    ]);

    let currentImage = $derived(content[$storage.levelOnePage ? 1 : 0]);

    function onclick(image: number, index: number) {
        const t = content[image].resources[index].index;
        const r = content[image].resources[index].resource;

        $storage.resources[r].discovered[t] = true;
        $storage.resources[r].got += $storage.resources[r].increment[t];
    }

    function next() {
        if ($storage.levelOnePage) location.pathname = "/level-2";
        
        $storage.levelOnePage = true;
    }
</script>

<Introduction level={0}>{T.introduction}</Introduction>

<div class="container">
    {#key currentImage}
        <div
            class="image"
            in:fly={{ duration: 500, delay: 500, y: "50%", opacity: 0.5 }}
            out:fly={{ duration: 500, delay: 0, y: "-50%", opacity: 0.5 }}
        >
            <img
                src={content[$storage.levelOnePage ? 1 : 0].image}
                alt="Background"
                class="background"
            />

            {#each currentImage.resources as resource, j}
                <!-- svelte-ignore a11y_click_events_have_key_events -->
                <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
                <img
                    src={resource.image}
                    alt="Resource"
                    class="resource"
                    id="resource-{j}"
                    onclick={() => onclick($storage.levelOnePage ? 1 : 0, j)}
                    style:top={`${$storage.resources[resource.resource].discovered[resource.index] ? -10 : resource.padding.y}%`}
                    style:left={`${$storage.resources[resource.resource].discovered[resource.index] ? -100 : resource.padding.x}%`}
                    style:opacity={`${$storage.resources[resource.resource].discovered[resource.index] ? 0 : 1}`}
                />
            {/each}
        </div>
    {/key}

    <div class="next">
        <Button onclick={next}>></Button>
    </div>
</div>

<style lang="scss">
    .container {
        z-index: 0;

        width: 100dvw;
        height: 100dvh;

        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        position: relative;

        .image {
            position: relative;
            height: 100%;

            .background {
                height: 100%;
            }

            .resource {
                position: absolute;

                cursor: pointer;

                top: 0px;
                left: 0px;
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
            }
        }

        .next {
            position: absolute;
            top: 50%;
            right: 5%;

            height: 7%;
            aspect-ratio: 1 / 1;

            background-color: var(--bg-back);

            transition: 0.5s opacity ease;

            :global(.wrapper) {
                background-color: var(--bg-back);
            }

            :global(*) {
                font-weight: bold !important;
                font-size: 2rem;
            }
        }
    }
</style>
