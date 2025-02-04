<script>
    //import PocketBase from 'pocketbase';

    //const pb = new PocketBase('http://127.0.0.1:8090');

    let { name = '', position = '', stackSize = '' } = $state({});
    
    const positions = ['UTG', 'MP', 'CO', 'Button', 'SB', 'BB'];
    const stackSizes = ['10BB', '20BB', '50BB'];

    const ranks = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];
    
    let selectedHands = $state({});
    let selectedAction = $state('fold'); // Default action

    let isLeftClick = true;

    function setAction(action) {
        selectedAction = action;
    }

    function toggleHand(hand) {
        selectedHands = { ...selectedHands, [hand]: selectedAction };
    }

    async function saveRange() {
        try {
            const rangeData = {
                name,
                position,
                stackSize,
                range: selectedHands
            };

           // await pb.collection('ranges').create(rangeData);
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

<div class="container">
    <!-- Hand Range Grid -->
    <div class="grid">
        {#each ranks as row, i}
            {#each ranks as col, j}
                {#if i === j}
                    <button class={selectedHands[row + row] || 'fold'} on:mousedown={() => {if(isLeftClick)toggleHand(row + row)}}>
                        {row}{row}
                    </button>
                {:else if i < j}
                    <button class={selectedHands[row + col + 's'] || 'fold'} on:mousedown={() => {if(isLeftClick){toggleHand(row + col + 's')}}}>
                        {row}{col}s
                    </button>
                {:else}
                    <button class={selectedHands[col + row + 'o'] || 'fold'} on:mousedown={() => {if(isLeftClick){toggleHand(col + row + 'o')}}}>
                        {col}{row}
                    </button>
                {/if}
            {/each}
        {/each}
    </div>

    <!-- Clickable Legend -->
    <div class="legend">
        <div class="legend-item" class:selected={selectedAction === 'fold'} on:click={() => setAction('fold')}>
            <div class="legend-box fold-box"></div>
            <span>Fold</span>
        </div>
        <div class="legend-item" class:selected={selectedAction === 'call'} on:click={() => setAction('call')}>
            <div class="legend-box call-box"></div>
            <span>Call</span>
        </div>
        <div class="legend-item" class:selected={selectedAction === 'raise'} on:click={() => setAction('raise')}>
            <div class="legend-box raise-box"></div>
            <span>Raise</span>
        </div>
    </div>
</div>

<button on:click={saveRange} disabled={!name || !position || !stackSize}>
    Save Range
</button>

<style>
    .container {
        display: flex;
        gap: 20px;
    }

    .grid {
        display: grid;
        grid-template-columns: repeat(13, 1fr);
        gap: 2px;
        border: 2px solid #333;
        padding: 5px;
        background: #111;
    }

    button {
        padding: 6px;
        font-size: 12px;
        width: 32px;
        height: 32px;
        text-align: center;
        cursor: pointer;
        border: 1px solid #555;
        background: #222;
        color: white;
        border-radius: 2px;
        transition: background 0.2s ease, transform 0.1s ease;
    }

    .fold { background: #444; }
    .call { background: #007bff; }
    .raise { background: #dc3545; }

    button:hover {
        transform: scale(1.1);
        filter: brightness(1.3);
    }

    /* Clickable Legend */
    .legend {
        display: flex;
        flex-direction: column;
        gap: 10px;
        background: #222;
        padding: 10px;
        border-radius: 5px;
        border: 1px solid #555;
        cursor: pointer;
    }

    .legend-item {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 5px;
        border-radius: 4px;
        transition: background 0.2s;
    }

    .legend-item:hover {
        filter: brightness(1.2);
    }

    .legend-box {
        width: 20px;
        height: 20px;
        border-radius: 3px;
    }

    .fold-box { background: #444; }
    .call-box { background: #007bff; }
    .raise-box { background: #dc3545; }

    /* Highlight selected action */
    .selected {
        outline: 2px solid yellow;
        background: rgba(255, 255, 0, 0.2);
    }
</style>
