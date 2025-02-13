<script>
import RangeControls from './RangeControls.svelte';

const ranks = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];

let {
    selectedHands = $bindable({}),
    showControls = $bindable(true),
    selectable = $bindable(true),
    controlsSelectable = $bindable(true)
} = $props();

// Initialize selectedHands if it's null
$effect(() => {
    if (selectedHands === null) {
        selectedHands = {};
    }
});

let selectedAction = $state('fold');
let isDragging = $state(false);

function setAction(action) {
    selectedAction = action;
}

function startSelection(hand) {
    isDragging = true;
    selectedHands = { ...(selectedHands || {}), [hand]: selectedAction };
}

function continueSelection(hand) {
    if (isDragging) {
        selectedHands = { ...(selectedHands || {}), [hand]: selectedAction };
    }
}

function stopSelection() {
    isDragging = false;
}

function clearRange() {
    selectedHands = {};
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

function getHandAction(hand) {
    return selectedHands[hand] || 'fold';
}

</script>


<div class="container" role="grid" tabindex="0" 
    onmouseup={selectable ? stopSelection : null}
    onmouseleave={selectable ? stopSelection : null}>
    <!-- Hand Range Grid -->
    <div class="range-border">
        <div class="grid">
            {#each ranks as row, i}
                {#each ranks as col, j}
                    {#if i === j}
                        <div
                            role="button"
                            class="hand {getHandAction(row + row)} {!selectable ? 'not-selectable' : ''}"
                            onmousedown={selectable ? () => startSelection(row + row) : null}
                            onmouseover={selectable ? () => continueSelection(row + row) : null}
                            onfocus={selectable ? () => continueSelection(row + row) : null}
                            oncontextmenu={(e) => selectable ? handleContextMenu(e, row + row) : e.preventDefault()}
                            onkeydown={e => selectable && e.key === 'Enter' && startSelection(row + row)}
                            tabindex={selectable ? "0" : "-1"}
                        >
                            {row}{row}
                        </div>
                    {:else if i < j}
                        <div
                            role="button"
                            class="hand {getHandAction(row + col + 's')} {!selectable ? 'not-selectable' : ''}"
                            onmousedown={selectable ? () => startSelection(row + col + 's') : null}
                            onmouseover={selectable ? () => continueSelection(row + col + 's') : null}
                            onfocus={selectable ? () => continueSelection(row + col + 's') : null}
                            oncontextmenu={(e) => selectable ? handleContextMenu(e, row + col + 's') : e.preventDefault()}
                            onkeydown={e => selectable && e.key === 'Enter' && startSelection(row + col + 's')}
                            tabindex={selectable ? "0" : "-1"}
                        >
                            {row}{col}s
                        </div>
                    {:else}
                        <div
                            role="button"
                            class="hand {getHandAction(col + row + 'o')} {!selectable ? 'not-selectable' : ''}"
                            onmousedown={selectable ? () => startSelection(col + row + 'o') : null}
                            onmouseover={selectable ? () => continueSelection(col + row + 'o') : null}
                            onfocus={selectable ? () => continueSelection(col + row + 'o') : null}
                            oncontextmenu={(e) => selectable ? handleContextMenu(e, col + row + 'o') : e.preventDefault()}
                            onkeydown={e => selectable && e.key === 'Enter' && startSelection(col + row + 'o')}
                            tabindex={selectable ? "0" : "-1"}
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
            {controlsSelectable}
        />
    {/if}
</div>

<style>
    .container {
        display: flex;
        flex-wrap: wrap; /* Allow controls to wrap on smaller screens */
        gap: 1rem;
        user-select: none;
        width: 100%;
        justify-content: center;
    }

    .range-border {
        padding: clamp(0.5rem, 2vw, 1rem);
        border: 4px solid hsl(var(--p));
        border-radius: calc(var(--rounded-box) + 4px);
        background: hsl(var(--b2));
        max-width: 100%;
        overflow: auto; /* Allow scrolling if grid becomes too small */
    }

    .grid {
        display: grid;
        grid-template-columns: repeat(13, minmax(30px, 1fr));
        gap: clamp(2px, 0.5vw, 4px);
        border: none;
        width: 100%;
    }

    .hand {
        display: flex;
        align-items: center;
        justify-content: center;
        aspect-ratio: 1; /* Keep squares square */
        width: 100%;
        min-width: 30px;
        font-size: clamp(0.75rem, 1.5vw, 1rem);
        text-align: center;
        border: 1px solid hsl(var(--b3));
        border-radius: var(--rounded-btn);
        transition: background 0.2s ease, transform 0.1s ease;
        cursor: pointer;
        padding: 0.25rem;
    }

    /* Media query for smaller screens */
    @media (max-width: 640px) {
        .grid {
            grid-template-columns: repeat(13, minmax(25px, 1fr));
        }

        .hand {
            min-width: 25px;
            font-size: 0.7rem;
        }
    }

    /* Media query for very small screens */
    @media (max-width: 400px) {
        .grid {
            grid-template-columns: repeat(13, minmax(20px, 1fr));
        }

        .hand {
            min-width: 20px;
            font-size: 0.6rem;
        }
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

    .not-selectable {
        cursor: default !important;
    }

    .not-selectable:hover {
        transform: none;
        filter: none;
    }
</style>