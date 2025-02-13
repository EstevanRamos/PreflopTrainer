<script>
import RangeControls from './RangeControls.svelte';

const ranks = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];

let {selectedHands = $bindable(), showControls = $bindable(true)} = $props();
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

function selectLine(hand) {
    const [first, second, type] = hand.match(/([AKQJT98765432])([AKQJT98765432])(o|s)?/).slice(1);
    const newSelectedHands = { ...selectedHands };
    
    if (first === second) { // Pairs
        // Select all pairs above this one
        const startIdx = ranks.indexOf(first);
        for (let i = 0; i <= startIdx; i++) {
            newSelectedHands[ranks[i] + ranks[i]] = selectedAction;
        }
    } else if (type === 's') { // Suited
        // Select all hands to the left in the same row
        const rowIdx = ranks.indexOf(first);
        const colIdx = ranks.indexOf(second);
        for (let j = 0; j <= colIdx; j++) {
            if (rowIdx < ranks.indexOf(ranks[j])) {
                newSelectedHands[first + ranks[j] + 's'] = selectedAction;
            }
        }
    } else { // Offsuit
        // Select all hands in the same column
        const rowIdx = ranks.indexOf(first);
        const colIdx = ranks.indexOf(second);
        console.log(rowIdx, colIdx)
        for (let i = colIdx; i > 0; i--) {
    // Skip the hand against itself
                newSelectedHands[ranks[rowIdx] + ranks[i] + 'o'] = selectedAction;
        }
    }
    
    selectedHands = newSelectedHands;
}

function handleContextMenu(event, hand) {
    event.preventDefault(); // Prevent default context menu
    selectLine(hand);
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


<div class="container" role="grid" tabindex="0" 
    onmouseup={stopSelection}
    onmouseleave={stopSelection}>
    <!-- Hand Range Grid -->
    <div class="range-border">
        <div class="grid">
            {#each ranks as row, i}
                {#each ranks as col, j}
                    {#if i === j}
                        <div
                            role="button"
                            class="hand {selectedHands[row + row] || 'fold'}"
                            onmousedown={() => startSelection(row + row)}
                            onmouseover={() => continueSelection(row + row)}
                            onfocus={() => continueSelection(row + row)}
                            oncontextmenu={(e) => handleContextMenu(e, row + row)}
                            onkeydown={e => e.key === 'Enter' && startSelection(row + row)}
                            tabindex="0"
                        >
                            {row}{row}
                        </div>
                    {:else if i < j}
                        <div
                            role="button"
                            class="hand {selectedHands[row + col + 's'] || 'fold'}"
                            onmousedown={() => startSelection(row + col + 's')}
                            onmouseover={() => continueSelection(row + col + 's')}
                            onfocus={() => continueSelection(row + col + 's')}
                            oncontextmenu={(e) => handleContextMenu(e, row + col + 's')}
                            onkeydown={e => e.key === 'Enter' && startSelection(row + col + 's')}
                            tabindex="0"
                        >
                            {row}{col}s
                        </div>
                    {:else}
                        <div
                            role="button"
                            class="hand {selectedHands[col + row + 'o'] || 'fold'}"
                            onmousedown={() => startSelection(col + row + 'o')}
                            onmouseover={() => continueSelection(col + row + 'o')}
                            onfocus={() => continueSelection(col + row + 'o')}
                            oncontextmenu={(e) => handleContextMenu(e, col + row + 'o')}
                            onkeydown={e => e.key === 'Enter' && startSelection(col + row + 'o')}
                            tabindex="0"
                        >
                            {col}{row}o
                        </div>
                    {/if}
                {/each}
            {/each}
        </div>
    </div>

    {#if showControls}
        <RangeControls
            {selectedAction}
            onSetAction={setAction}
            onClearRange={clearRange}
        />
    {/if}
</div>

<style>
    .container {
        display: flex;
        gap: 2rem;
        user-select: none;
    }

    .range-border {
        padding: 16px;
        border: 4px solid hsl(var(--p));
        border-radius: calc(var(--rounded-box) + 4px);
        background: hsl(var(--b2));
    }

    .grid {
        display: grid;
        grid-template-columns: repeat(13, 1fr);
        gap: 4px;
        border: none;
    }

    .hand {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        font-size: 14px;
        text-align: center;
        border: 1px solid hsl(var(--b3));
        border-radius: var(--rounded-btn);
        transition: background 0.2s ease, transform 0.1s ease;
        cursor: pointer;
    }

    .hand:hover {
        transform: scale(1.1);
        filter: brightness(1.2);
    }

    .fold {
        background-color: var(--color-base-200);
    }

    .call {
        background-color: var(--color-primary);
    }

    .raise {
        background-color: var(--color-accent);
    }

    .allin {
        background-color: var(--color-secondary);
  
    }

    .selected {
        outline: 2px solid hsl(var(--wa));
        background: hsl(var(--wa) / 0.2);
    }
</style>