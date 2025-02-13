<script>
    import Rangeselector from "$lib/components/rangeselector.svelte";
    import RangeControls from "$lib/components/rangecontrols.svelte";
    //import PocketBase from 'pocketbase';

   // const pb = new PocketBase('http://127.0.0.1:8090');

    let { name = '', position = '', stackSize = '' } = $state({});
    
    const positions = ['UTG', 'MP', 'CO', 'BTN', 'SB', 'BB'];
    const stackSizes = ['10BB', '20BB', '50BB'];

    const ranks = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];

    let selectedHands = $state({});
    let selectedAction = $state('fold');
    let isDragging = $state(false);

    function handleActionChange(event) {
        selectedAction = event.detail;
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

<div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-6">Create New Range</h1>

    <div class="form-control w-full max-w-xs mb-4">
        <label class="label" for="range-name">
            <span class="label-text">Range Name</span>
        </label>
        <input 
            id="range-name"
            type="text" 
            bind:value={name} 
            placeholder="Button 20BB Aggressive" 
            class="input input-bordered w-full"
        />
    </div>

    <div class="form-control w-full max-w-xs mb-4">
        <label class="label" for="position">
            <span class="label-text">Position</span>
        </label>
        <select id="position" bind:value={position} class="select select-bordered w-full">
            <option value="">Select Position</option>
            {#each positions as pos}
                <option value={pos}>{pos}</option>
            {/each}
        </select>
    </div>

    <div class="form-control w-full max-w-xs mb-6">
        <label class="label" for="stack-size">
            <span class="label-text">Stack Size</span>
        </label>
        <select id="stack-size" bind:value={stackSize} class="select select-bordered w-full">
            <option value="">Select Stack Size</option>
            {#each stackSizes as size}
                <option value={size}>{size}</option>
            {/each}
        </select>
    </div>

    <div class="mb-6">
        <Rangeselector 
            bind:selectedHands
            {selectedAction}
            {isDragging}
            showControls={true}
            on:startSelection={startSelection}
            on:continueSelection={continueSelection}
            on:stopSelection={stopSelection}
        />
    </div>

    <button 
        on:click={saveRange} 
        disabled={!name || !position || !stackSize}
        class="btn btn-primary"
    >
        Save Range
    </button>
</div>

<style>
    /* Add any custom styles here */
</style>
