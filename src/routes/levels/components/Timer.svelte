<script lang="ts">
    // Assets

    import back from "$lib/images/interface/clock/back.png";
    import minute_hand from "$lib/images/interface/clock/minute-hand.png";
    import hour_hand from "$lib/images/interface/clock/hour-hand.png";

    import { T } from "$lib/Localization";

    // Props

    import { storage } from "$lib/Storage";
    import { fly } from "svelte/transition";
    import { onMount } from "svelte";

    // Content

    let formattedTime: string[] = $derived(
        (($storage.time / 100).toFixed(1) + T.secondsShort).split("")
    );

    onMount(() => {
        const destroyID = setInterval(() => {
            if (!$storage.timeFrozen) $storage.time++;
        }, 10);

        return () => clearInterval(destroyID);
    });
</script>

<div class="time" class:frozen={$storage.timeFrozen}>
    <div class="clock">
        <img src={back} alt={T.altTimerClock} class="back" />
        <img
            src={hour_hand}
            alt={T.altTimerHand}
            class="hand minutes"
            style:--minutes={($storage.time / 100 / 60) % 12}
        />
        <img
            src={minute_hand}
            alt={T.altTimerHand}
            class="hand seconds"
            style:--seconds={($storage.time / 100) % 60}
        />
    </div>
    <div class="counter">
        {#each formattedTime as ch}
            <div class="digit">
                {#key ch}
                    <span
                        in:fly={{
                            delay: 100,
                            duration: 100,
                            opacity: 0.1,
                            y: "0.25em",
                        }}
                        out:fly={{ duration: 100, opacity: 0.1, y: "-0.25em" }}
                    >
                        {ch}
                    </span>
                {/key}
            </div>
        {/each}
    </div>
</div>

<style lang="scss">
    .time {
        grid-column: 9 / span 2;
        grid-row: 1 / span 2;

        font-size: 2rem;

        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        flex-wrap: nowrap;

        &.frozen {
            filter: hue-rotate(135deg);
            color: var(--text-muted);
        }

        .clock {
            position: relative;

            height: 7rem;
            aspect-ratio: 1 / 1;

            img {
                --seconds: 0;
                --minutes: 0;

                position: absolute;

                height: 7rem;
                aspect-ratio: 1 / 1;

                &.seconds {
                    transition: 1s transform ease;
                    transform: rotateZ(
                        calc((var(--seconds) - 8.5) / 60 * 360deg)
                    );
                }

                &.minutes {
                    transition: 1s transform ease;
                    transform: rotateZ(
                        calc((var(--minutes) + 2) / 12 * 360deg)
                    );
                }
            }
        }

        .counter {
            width: 40%;
            height: 1em;
            text-align: center;

            display: flex;
            justify-content: center;
            align-items: center;

            .digit {
                display: inline-block;
                min-width: 0.6em;
                height: 1em;
                text-align: center;
                position: relative;

                span {
                    min-width: 0.6em;
                    text-align: center;
                    position: absolute;
                }
            }
        }
    }
</style>
