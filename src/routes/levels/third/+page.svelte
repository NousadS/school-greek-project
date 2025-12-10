<script lang="ts">
    // Assets

    import idleFace from "$lib/images/levels/third/idle.png";
    import angryFace from "$lib/images/levels/third/angry.png";
    import happyFace from "$lib/images/levels/third/happy.png";

    import { T } from "$lib/Localization";

    // Components

    import Button from "../../components/Button.svelte";
    import Introduction from "../components/Introduction.svelte";
    import Timer from "../components/Timer.svelte";
    import Ornament from "../../components/Ornament.svelte";

    // Content

    import {
        storage,
        type StoragePartName,
        type StorageResourceType,
    } from "$lib/Storage";

    const messaging: Array<{
        question: string;
        a: string;
        b: string;
        c: string;
    }> = [
        {
            question: T.dialogSpeakerFirst,
            a: T.dialogFirstA,
            b: T.dialogFirstB,
            c: T.dialogFirstC,
        },
        {
            question: T.dialogSpeakerSecond,
            a: T.dialogSecondA,
            b: T.dialogSecondB,
            c: T.dialogSecondC,
        },
        {
            question: T.dialogSpeakerThird,
            a: T.dialogThirdA,
            b: T.dialogThirdB,
            c: T.dialogThirdC,
        },
        {
            question: T.dialogSpeakerFourth,
            a: T.dialogFourthA,
            b: T.dialogFourthB,
            c: T.dialogFourthC,
        },
    ];

    let currentMessage: number = $state(0);

    function onclick(button: number) {
        if (button == 0) $storage.trust++;
        if (button == 1) $storage.trust--;
        if (button == 2) $storage.trust = 0;
    }
</script>

<Introduction level={2}>{T.introduction}</Introduction>

<div class="container">
    <img
        src={$storage.trust <= 2
            ? angryFace
            : $storage.trust >= 6
              ? happyFace
              : idleFace}
        alt=""
        class="behind"
    />

    <div class="messaging">
        {messaging[currentMessage].question}

        <Ornament />
    </div>

    <div class="choices">
        {#each [messaging[currentMessage].a, messaging[currentMessage].b, messaging[currentMessage].c] as button, index}
            <div class="choice choide-{index}">
                <Button onclick={() => onclick(index)}>
                    {button}
                </Button>
            </div>
        {/each}
    </div>

    <div class="bar">
        <div
            class="meter"
            style:--trust={$storage.trust}
            style:background-color={$storage.trust <= 2
                ? "var(--color-danger)"
                : $storage.trust >= 6
                  ? "var(--color-success)"
                  : "var(--color-info)"}
        ></div>
        <Ornament />
    </div>
</div>

<style lang="scss">
    .container {
        background-color: #9e8d79ff;
        position: relative;

        width: 100dvw;
        height: 100dvh;

        .bar {
            position: absolute;
            top: 10dvh;
            left: 50dvw;

            width: 25dvw;
            height: 5dvh;

            display: flex;
            justify-content: center;
            align-items: center;

            .meter {
                width: calc(100% * (var(--trust) / 8));
                height: 75%;

                transition: 0.5s width ease, 0.5s background-color ease;
            }
        }

        .messaging {
            position: absolute;
            top: 22dvh;
            left: 31dvw;

            width: 61.5dvw;
            height: 30dvh;

            font-size: 1.75rem;

            padding: 5dvh;
        }

        .choices {
            position: absolute;
            bottom: 2dvh;
            left: 31dvw;

            width: 66dvw;
            height: 35dvh;

            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            flex-direction: column;

            .choice {
                height: 10dvh;
                width: 66dvw;
            }
        }

        .behind {
            position: absolute;
            top: 0;
            left: 0;

            height: 100%;
        }
    }
</style>
