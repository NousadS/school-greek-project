<script lang="ts">
    // Assets

    import image1 from "$lib/images/endings/horseByGates.jpg";
    import image2 from "$lib/images/endings/troyInFires.png";

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

    $storage.endings[0] = true;
</script>

<Ending
    texts={[
        T.endingFirst1,
        T.endingFirst2,
        T.endingFirst3,
        T.endingFirst4,
        T.endingFirst5,
        T.endingFirst6,
    ]}
    pictures={[image1, image2]}
    good={false}
/>

<style lang="scss">
</style>
