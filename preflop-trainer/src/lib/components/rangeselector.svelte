
<script>
        const ranks = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];

let {selectedHands= $bindable()} = $props();
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


<div class="container" on:mouseup={stopSelection} on:mouseleave={stopSelection}>
    <!-- Hand Range Grid -->
    <div class="grid">
        {#each ranks as row, i}
            {#each ranks as col, j}
                {#if i === j}
                    <div
                        class="hand {selectedHands[row + row] || 'fold'}"
                        on:mousedown={() => startSelection(row + row)}
                        on:mouseover={() => continueSelection(row + row)}
                    >
                        {row}{row}
                    </div>
                {:else if i < j}
                    <div
                        class="hand {selectedHands[row + col + 's'] || 'fold'}"
                        on:mousedown={() => startSelection(row + col + 's')}
                        on:mouseover={() => continueSelection(row + col + 's')}
                    >
                        {row}{col}s
                    </div>
                {:else}
                    <div
                        class="hand {selectedHands[col + row + 'o'] || 'fold'}"
                        on:mousedown={() => startSelection(col + row + 'o')}
                        on:mouseover={() => continueSelection(col + row + 'o')}
                    >
                        {col}{row}o
                    </div>
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
        <!-- Clear Range Button -->
        <button class="clear-button" on:click={clearRange}>Clear Range</button>
    </div>
</div>

<style>
    .container {
        display: flex;
        gap: 20px;
        user-select: none; /* Prevent text selection while dragging */
    }

    .grid {
        display: grid;
        grid-template-columns: repeat(13, 1fr);
        gap: 2px;
        border: 2px solid #333;
        padding: 5px;
        background: #111;
    }

    .hand {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        font-size: 12px;
        text-align: center;
        border: 1px solid #555;
        background: #222;
        color: white;
        border-radius: 2px;
        transition: background 0.2s ease, transform 0.1s ease;
        cursor: pointer;
    }

    .fold { background: #444; }
    .call { background: #007bff; }
    .raise { background: #dc3545; }

    .hand:hover {
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

        /* Clear Range Button */
        .clear-button {
        margin-top: 10px;
        padding: 5px 10px;
        font-size: 14px;
        background: #ff5555;
        color: white;
        border: none;
        cursor: pointer;
        border-radius: 4px;
        text-align: center;
    }

    .clear-button:hover {
        background: #ff3333;
    }

    /* Highlight selected action */
    .selected {
        outline: 2px solid yellow;
        background: rgba(255, 255, 0, 0.2);
    }
</style>