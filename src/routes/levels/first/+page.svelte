<script lang="ts">
    // Assets

    // Image 1

    import locationImage1 from "$lib/images/levels/first/market/image.png";
    import resourceImage1 from "$lib/images/levels/first/market/rock-1.png";
    import resourceImage2 from "$lib/images/levels/first/market/rock-2.png";
    import resourceImage3 from "$lib/images/levels/first/market/rock-3.png";
    import resourceImage4 from "$lib/images/levels/first/market/wood-1.png";
    import resourceImage5 from "$lib/images/levels/first/market/wood-2.png";

    // Image 2

    import locationImage2 from "$lib/images/levels/first/seaport/image.png";
    import resourceImage6 from "$lib/images/levels/first/seaport/rock-1.png";
    import resourceImage7 from "$lib/images/levels/first/seaport/rope-1.png";
    import resourceImage8 from "$lib/images/levels/first/seaport/rope-2.png";

    import { T } from "$lib/Localization";

    // Components

    import Button from "../../components/Button.svelte";
    import Timer from "../components/Timer.svelte";
    import Introduction from "../components/Introduction.svelte";
    import Location from "./components/Location.svelte";
    import InterfaceResource from "./components/InterfaceResource.svelte";

    // Content

    import type { ResourceType, LocationType } from "./types";
    import { storage } from "$lib/Storage";

    const content: Array<LocationType> = $state([
        {
            image: locationImage1,
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
            image: locationImage2,
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

    let currentLocation = $derived(content[$storage.levelOnePage ? 1 : 0]);

    function onResourceClick(location: LocationType, resource: ResourceType) {
        const t = resource.index;
        const r = resource.resource;

        $storage.resources[r].discovered[t] = true;
        $storage.resources[r].got += $storage.resources[r].increment[t];
    }

    function onNextClick() {
        if ($storage.levelOnePage) location.pathname = "/levels/second";

        $storage.levelOnePage = true;
    }
</script>

<Introduction level={0}>{T.introductionFirst}</Introduction>

<div class="container">
    {#key currentLocation}
        <Location location={currentLocation} onclick={onResourceClick} />
    {/key}

    <div class="resource first"><InterfaceResource name="wood" /></div>
    <div class="resource second"><InterfaceResource name="rope" /></div>
    <div class="resource third"><InterfaceResource name="rock" /></div>

    <div class="timer"><Timer /></div>

    <div class="next">
        <Button onclick={onNextClick}>></Button>
    </div>
</div>

<style lang="scss">
    .container {
        width: 100dvw;
        height: 100dvh;

        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        position: relative;

        .resource {
            position: absolute;

            top: 0;
            left: 2.5vmin;

            z-index: 2;

            &.first {
                top: 2.5vmin;
            }

            &.second {
                top: 17.5vmin;
            }

            &.third {
                top: 32.5vmin;
            }
        }

        .timer {
            position: absolute;

            top: 2.5vmin;
            right: 10vmin;
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
