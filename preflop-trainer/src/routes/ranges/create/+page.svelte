<script>
    import Rangeselector from "$lib/components/RangeSelector.svelte";
    import RangeControls from "$lib/components/rangecontrols.svelte";
    import { invalidateAll, goto } from '$app/navigation';
    import { applyAction, deserialize } from '$app/forms';

    let { name = '', position = '', stackSize = '' } = $state({});
    
    const positions = ['UTG', 'MP', 'CO', 'BTN', 'SB', 'BB'];
    const stackSizes = ['10BB', '20BB', '50BB'];

    let selectedHands = $state({});
    let selectedAction = $state('fold');
    let isDragging = $state(false);

    async function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        formData.append('name', name);
        formData.append('position', position);
        formData.append('stackSize', stackSize);
        formData.append('range', JSON.stringify(selectedHands));


        const response = await fetch(event.currentTarget.action, {
            method: 'POST',
            body: formData
        });

        const result = deserialize(await response.text());

        if (result.type === 'success') {
            await invalidateAll();
        }

        applyAction(result);
    }

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
            on:startSelection={startSelection}
            on:continueSelection={continueSelection}
            on:stopSelection={stopSelection}
        />
    </div>
<form method="POST" action="?/create" onsubmit={handleSubmit}>
        <button 
        disabled={!name || !position || !stackSize}
        class="btn btn-primary"
        type="submit"
    >
        Save Range
    </button>
</form>

</div>

<style>
    /* Add any custom styles here */
</style>
