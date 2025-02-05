<script>
    import Rangeselector from "$lib/components/rangeselector.svelte";
    //import PocketBase from 'pocketbase';

   // const pb = new PocketBase('http://127.0.0.1:8090');

    let { name = '', position = '', stackSize = '' } = $state({});
    
    const positions = ['UTG', 'MP', 'CO', 'BTN', 'SB', 'BB'];
    const stackSizes = ['10BB', '20BB', '50BB'];

    const ranks = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];

    let selectedHands = $state({});
    let selectedAction = $state('fold');
    let isDragging = $state(false);

    function setAction(action) {
        selectedAction = action;
    }

    function startSelection(hand) {
        isDragging = true;
        selectedHands = { ...selectedHands, [hand]: selectedAction };
    }

    function continueSelection(hand) {
        if (isDragging) {
            selectedHands = { ...selectedHands, [hand]: selectedAction };
        }
    }

    function stopSelection() {
        isDragging = false;
    }

    function clearRange() {
        selectedHands = {}; // Reset all hands to 'fold'
    }


    async function saveRange() {
        try {
            const rangeData = {
                name,
                position,
                stackSize,
                range: selectedHands
            };
            console.log(rangeData.range)
            //await pb.collection('ranges').create(rangeData);
            alert('Range saved successfully!');
        } catch (error) {
            console.error('Error saving range:', error);
            alert('Failed to save range.');
        }
    }
</script>

<h1>Create New Range</h1>

<label>
    Range Name:
    <input type="text" bind:value={name} placeholder="Button 20BB Aggressive" />
</label>

<label>
    Position:
    <select bind:value={position}>
        <option value="">Select Position</option>
        {#each positions as pos}
            <option value={pos}>{pos}</option>
        {/each}
    </select>
</label>

<label>
    Stack Size:
    <select bind:value={stackSize}>
        <option value="">Select Stack Size</option>
        {#each stackSizes as size}
            <option value={size}>{size}</option>
        {/each}
    </select>
</label>
<div class="range container">
    <Rangeselector bind:selectedHands/>
</div>
<button on:click={saveRange} disabled={!name || !position || !stackSize}>
    Save Range
</button>

<style>
</style>
