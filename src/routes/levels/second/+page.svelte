<script lang="ts">
    // Assets

    import puzzlePrinted from "$lib/images/levels/second/puzzlePrint.png";

    import puzzleBase from "$lib/images/levels/second/base.png";

    import puzzleBack from "$lib/images/levels/second/back.png";
    import puzzleFront from "$lib/images/levels/second/front.png";
    import puzzleFrontRopes from "$lib/images/levels/second/frontRopes.png";
    import puzzleHead from "$lib/images/levels/second/head.png";
    import puzzleHeadRopes from "$lib/images/levels/second/headRopes.png";

    import puzzleLeftBackWheelWood from "$lib/images/levels/second/leftBackWheelWood.png";
    import puzzleLeftBackWheel from "$lib/images/levels/second/leftBackWheel.png";
    import puzzleLeftFrontWheelWood from "$lib/images/levels/second/leftFrontWheelWood.png";
    import puzzleLeftFrontWheel from "$lib/images/levels/second/leftFrontWheel.png";
    import puzzleRightBackWheelWood from "$lib/images/levels/second/rightBackWheelWood.png";
    import puzzleRightBackWheel from "$lib/images/levels/second/rightBackWheel.png";
    import puzzleRightFrontWheelWood from "$lib/images/levels/second/rightFrontWheelWood.png";
    import puzzleRightFrontWheel from "$lib/images/levels/second/rightFrontWheel.png";

    import { T } from "$lib/Localization";

    // Components

    import Button from "../../components/Button.svelte";
    import Introduction from "../components/Introduction.svelte";
    import Resource from "./components/Resource.svelte";

    // Content

    import type { PuzzlePart } from "./types";
    import Timer from "../components/Timer.svelte";
    import {
        storage,
        type StoragePartName,
        type StorageResourceType,
    } from "$lib/Storage";

    const content: Array<PuzzlePart> = [
        {
            name: "base",
            image: puzzleBase,
            padding: {
                x: 12.5,
                y: 66.6,
            },
        },
        {
            name: "back",
            image: puzzleBack,
            padding: {
                x: 49.6,
                y: 34.7,
            },
        },
        {
            name: "front",
            image: puzzleFront,
            padding: {
                x: 24.7,
                y: 16.6,
            },
        },
        {
            name: "frontRopes",
            image: puzzleFrontRopes,
            padding: {
                x: 24.7,
                y: 16.6,
            },
        },
        {
            name: "head",
            image: puzzleHead,
            padding: {
                x: 13.7,
                y: 16.4,
            },
        },
        {
            name: "headRopes",
            image: puzzleHeadRopes,
            padding: {
                x: 13.7,
                y: 16.4,
            },
        },
        {
            name: "leftBackWheelWood",
            image: puzzleLeftBackWheelWood,
            padding: {
                x: 74.6,
                y: 71.0,
            },
        },
        {
            name: "leftBackWheel",
            image: puzzleLeftBackWheel,
            padding: {
                x: 70.5,
                y: 68.6,
            },
        },
        {
            name: "leftFrontWheelWood",
            image: puzzleLeftFrontWheelWood,
            padding: {
                x: 46.7,
                y: 71.1,
            },
        },
        {
            name: "leftFrontWheel",
            image: puzzleLeftFrontWheel,
            padding: {
                x: 40.7,
                y: 68.8,
            },
        },
        {
            name: "rightBackWheelWood",
            image: puzzleRightBackWheelWood,
            padding: {
                x: 53.7,
                y: 75.2,
            },
        },
        {
            name: "rightBackWheel",
            image: puzzleRightBackWheel,
            padding: {
                x: 53.7,
                y: 75.2,
            },
        },
        {
            name: "rightFrontWheelWood",
            image: puzzleRightFrontWheelWood,
            padding: {
                x: 22.7,
                y: 72.3,
            },
        },
        {
            name: "rightFrontWheel",
            image: puzzleRightFrontWheel,
            padding: {
                x: 16.7,
                y: 72,
            },
        },
    ];

    let dragging: string = $state("");

    function ondragstart(event: DragEvent, resource: StorageResourceType) {
        event.dataTransfer?.setData("text", resource);
        dragging = resource;
    }

    function ondragend(event: DragEvent) {
        dragging = "";
    }

    function ondragover(event: DragEvent) {
        event.preventDefault();
    }

    function ondrop(event: DragEvent, partName: StoragePartName) {
        const part = $storage.parts[partName];

        if (
            event.dataTransfer?.getData("text") == part.requires &&
            $storage.resources[part.requires].got >= part.cost
        ) {
            part.discovered = true;
            $storage.resources[part.requires].got -= part.cost;
        }

        if (
            Object.entries($storage.parts)
                .map((pe) => pe[1].discovered)
                .reduce((pr, cr) => pr && cr)
        )
            onNextClick();

        event.dataTransfer?.clearData("text");
    }

    function onNextClick() {
        location.pathname = "/levels/third";
    }
</script>

<svelte:head>
    {#each [puzzlePrinted, puzzleBase, puzzleBack, puzzleFront, puzzleFrontRopes, puzzleHead, puzzleHeadRopes, puzzleLeftBackWheelWood, puzzleLeftBackWheel, puzzleLeftFrontWheelWood, puzzleLeftFrontWheel, puzzleRightBackWheelWood, puzzleRightBackWheel, puzzleRightFrontWheelWood, puzzleRightFrontWheel] as l}
        <link rel="preload" href={l} as="image" />
    {/each}
</svelte:head>

<Introduction level={1} introduction={T.introductionSecond} />

<div class="container">
    <div class="puzzle">
        <img src={puzzlePrinted} draggable="false" alt="..." class="printed" />

        {#each content as part}
            {#if part.name == "headRopes" ? $storage.parts.head.discovered : part.name == "frontRopes" ? $storage.parts.front.discovered : true}
                <img
                    draggable="false"
                    src={part.image}
                    alt="..."
                    class="part"
                    style:top={`${part.padding.y}%`}
                    style:left={`${part.padding.x}%`}
                    style:opacity={dragging &&
                    !$storage.parts[part.name].discovered
                        ? "0.5"
                        : ""}
                    style:transform={`scale(${
                        $storage.parts[part.name].discovered ||
                        (dragging == $storage.parts[part.name].requires &&
                            $storage.resources[
                                $storage.parts[part.name].requires
                            ].got >= $storage.parts[part.name].cost)
                            ? 1
                            : 0
                    })`}
                    style:pointer-events={$storage.parts[part.name].discovered
                        ? "none"
                        : "all"}
                    {ondragover}
                    ondrop={(event) => ondrop(event, part.name)}
                />
            {/if}
        {/each}
    </div>

    <div class="resources">
        {#each ["wood", "rope", "rock"] as Array<StorageResourceType> as r}
            <!-- svelte-ignore a11y_no_static_element_interactions -->
            <div
                class="resource"
                draggable="true"
                ondragstart={(event) => ondragstart(event, r)}
                {ondragend}
            >
                <Resource name={r} />
            </div>
        {/each}
    </div>

    <div class="timer"><Timer /></div>

    <div class="next">
        <Button onclick={onNextClick}>></Button>
    </div>
</div>

<style lang="scss">
    .container {
        display: flex;
        justify-content: center;
        align-items: center;

        .puzzle {
            position: relative;
            width: 534px;
            height: 786px;

            transform: translateY(-10dvh);

            img {
                user-select: none;
            }

            .printed {
                position: absolute;
                top: 0;
                left: 0;

                width: 100%;
                height: 100%;
            }

            .part {
                position: absolute;

                transition: 0.3s transform cubic-bezier(0.34, 1.56, 0.64, 1);
            }
        }

        .resources {
            position: absolute;
            top: 80%;
            width: 50dvw;

            display: flex;
            justify-content: space-evenly;
            align-items: center;
            flex-direction: row;
            flex-wrap: nowrap;

            .resource {
                cursor: grab;
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
