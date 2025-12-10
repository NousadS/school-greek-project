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
        else if (button == 1) $storage.trust--;
        else if (button == 2) {
            $storage.trust = 0;

            setTimeout(() => (location.href = "/endings/fourth"), 1000);
        }

        $storage.trust = Math.max(0, Math.min(8, $storage.trust));

        if (currentMessage + 1 >= 4) {
            if ($storage.trust > 4) location.href = "/endings/first";
            else location.href = "/endings/fourth";
        } else {
            currentMessage++;
        }
    }

    function shuffle() {
        let a: Array<number> = [Math.ceil(Math.random() * 3) % 3];

        let t: number = Math.ceil(Math.random() * 3) % 3;

        while (a.includes(t)) t = Math.ceil(Math.random() * 3) % 3;

        a.push(t);

        if (a.includes(0) && a.includes(1)) a.push(2);
        else if (a.includes(0) && a.includes(2)) a.push(1);
        else if (a.includes(1) && a.includes(2)) a.push(0);

        return a;
    }
</script>

<Introduction level={2}>{T.introductionThird}</Introduction>

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
        {#each shuffle() as index}
            <div class="choice choide-{index}">
                <Button onclick={() => onclick(index)}>
                    {messaging[currentMessage][
                        ["a", "b", "c"][index] as "a" | "b" | "c"
                    ]}
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

    <div class="timer"><Timer /></div>

    <div class="black" class:showed={$storage.trust == 0}></div>
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

                transition:
                    0.5s width ease,
                    0.5s background-color ease;
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
            top: 10dvh;
            left: 0;

            width: 30dvw;
        }

        .timer {
            position: absolute;
            top: 7dvh;
            right: 10dvh;
        }

        .black {
            opacity: 0;
            position: absolute;
            width: 100dvw;
            height: 100dvh;
            background-color: #000000;
            transition: 0.8s opacity ease;
            z-index: 4;
            pointer-events: none;

            &.showed {
                opacity: 1;
            }
        }
    }
</style>
