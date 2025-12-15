<script lang="ts">
    // Assets

    import image1 from "$lib/images/endings/horseByGates.jpg";
    import image2 from "$lib/images/endings/horseTorsoFail.jpg";
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

    $storage.endings[1] = true;
</script>

<Ending
    texts={[
        T.endingSecond1,
        T.endingSecond2,
        T.endingSecond3,
        T.endingSecond4,
        T.endingSecond5,
        T.endingSecond6,
        T.endingSecond7,
    ]}
    pictures={[image1, image2, image3]}
    good={true}
/>

<style lang="scss">
</style>
