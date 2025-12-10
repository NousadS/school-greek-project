<script lang="ts">
    // Assets

    import image1 from "$lib/images/endings/gates.png";
    import image2 from "$lib/images/endings/troyNormalLife.png";

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
        T.endingFourth1,
        T.endingFourth2,
        T.endingFourth3,
        T.endingFourth4,
        T.endingFourth5,
        T.endingFourth6,
    ]}
    pictures={[image1, image2]}
    good={true}
/>

<style lang="scss">
</style>
