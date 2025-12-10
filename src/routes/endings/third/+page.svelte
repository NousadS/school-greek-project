<script lang="ts">
    // Assets

    import image1 from "$lib/images/endings/horseByGates.jpg";
    import image2 from "$lib/images/endings/horseHeadFail.jpg";
    import image3 from "$lib/images/endings/troyNormalLife.png";

    import { T } from "$lib/Localization";

    // Components

    import Button from "../../components/Button.svelte";
    import Ending from "../components/Ending.svelte";

    // Content

    import {
        storage,
        type StoragePartName,
        type StorageResourceType,
    } from "$lib/Storage";
</script>

<Ending
    texts={[
        T.endingThird1,
        T.endingThird2,
        T.endingThird3,
        T.endingThird4,
        T.endingThird5,
        T.endingThird6,
        T.endingThird7,
    ]}
    pictures={[image1, image2, image3]}
    good={true}
/>

<style lang="scss">
</style>
