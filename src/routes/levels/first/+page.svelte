<script lang="ts">
    // Assets

    // Image 1

    import locationImage1 from "$lib/images/levels/first/market/image.png";

    import rock1Image1 from "$lib/images/levels/first/market/rock-1.png";
    import rock2Image1 from "$lib/images/levels/first/market/rock-2.png";
    import rock3Image1 from "$lib/images/levels/first/market/rock-3.png";
    import rock4Image1 from "$lib/images/levels/first/market/rock-4.png";

    import wood1Image1 from "$lib/images/levels/first/market/wood-1.png";
    import wood2Image1 from "$lib/images/levels/first/market/wood-2.png";
    import wood3Image1 from "$lib/images/levels/first/market/wood-3.png";
    import wood4Image1 from "$lib/images/levels/first/market/wood-4.png";
    import wood5Image1 from "$lib/images/levels/first/market/wood-5.png";
    import wood6Image1 from "$lib/images/levels/first/market/wood-6.png";
    import wood7Image1 from "$lib/images/levels/first/market/wood-7.png";

    // Image 2

    import locationImage2 from "$lib/images/levels/first/seaport/image.png";

    import rope1Image2 from "$lib/images/levels/first/seaport/rope-1.png";
    import rope2Image2 from "$lib/images/levels/first/seaport/rope-2.png";
    import rope3Image2 from "$lib/images/levels/first/seaport/rope-3.png";

    import rock1Image2 from "$lib/images/levels/first/seaport/rock-1.png";
    import rock2Image2 from "$lib/images/levels/first/seaport/rock-2.png";
    import rock3Image2 from "$lib/images/levels/first/seaport/rock-3.png";

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
                    image: rock1Image1,
                    padding: {
                        x: 11.5,
                        y: 66.4,
                    },
                },
                {
                    resource: "rock",
                    index: 1,
                    image: rock2Image1,
                    padding: {
                        x: 14.1,
                        y: 64.4,
                    },
                },
                {
                    resource: "rock",
                    index: 2,
                    image: rock3Image1,
                    padding: {
                        x: 16.6,
                        y: 64.7,
                    },
                },
                {
                    resource: "rock",
                    index: 3,
                    image: rock4Image1,
                    padding: {
                        x: 26.6,
                        y: 81.0,
                    },
                },
                {
                    resource: "wood",
                    index: 0,
                    image: wood1Image1,
                    padding: {
                        x: 20.6,
                        y: 90.6,
                    },
                },
                {
                    resource: "wood",
                    index: 1,
                    image: wood2Image1,
                    padding: {
                        x: 68.8,
                        y: 58.3,
                    },
                },
                {
                    resource: "wood",
                    index: 2,
                    image: wood3Image1,
                    padding: {
                        x: 70.8,
                        y: 74.3,
                    },
                },
                {
                    resource: "wood",
                    index: 3,
                    image: wood4Image1,
                    padding: {
                        x: 73.8,
                        y: 72.3,
                    },
                },
                {
                    resource: "wood",
                    index: 4,
                    image: wood5Image1,
                    padding: {
                        x: 8.8,
                        y: 88.3,
                    },
                },
                {
                    resource: "wood",
                    index: 5,
                    image: wood6Image1,
                    padding: {
                        x: 30.8,
                        y: 59.3,
                    },
                },
                {
                    resource: "wood",
                    index: 6,
                    image: wood7Image1,
                    padding: {
                        x: 34.8,
                        y: 68.3,
                    },
                },
            ],
        },
        {
            image: locationImage2,
            resources: [
                {
                    resource: "rope",
                    index: 0,
                    image: rope1Image2,
                    padding: {
                        x: 80.9,
                        y: 77.4,
                    },
                },
                {
                    resource: "rope",
                    index: 1,
                    image: rope2Image2,
                    padding: {
                        x: 50.9,
                        y: 86.4,
                    },
                },
                {
                    resource: "rope",
                    index: 2,
                    image: rope3Image2,
                    padding: {
                        x: 57.9,
                        y: 75.4,
                    },
                },
                {
                    resource: "rock",
                    index: 4,
                    image: rock1Image2,
                    padding: {
                        x: 40.9,
                        y: 80.4,
                    },
                },
                {
                    resource: "rock",
                    index: 5,
                    image: rock2Image2,
                    padding: {
                        x: 27.9,
                        y: 70.2,
                    },
                },
                {
                    resource: "rock",
                    index: 6,
                    image: rock3Image2,
                    padding: {
                        x: 57.9,
                        y: 65.4,
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

        if (
            Object.entries($storage.resources)
                .map((re) => re[1].discovered.reduce((pr, cr) => pr && cr))
                .reduce((pr, cr) => pr && cr)
        )
            onNextClick();
    }

    function onNextClick() {
        if ($storage.levelOnePage) location.pathname = "/levels/second";

        $storage.levelOnePage = true;
    }
</script>

<Introduction level={0} introduction={T.introductionFirst} />

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
