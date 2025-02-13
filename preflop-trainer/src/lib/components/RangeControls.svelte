<script>
    export let selectedAction;
    export let onSetAction;
    export let onClearRange;
    export let controlsSelectable = true;
    export let actions = [
        { id: 'fold', label: 'Fold', color: 'b2' },
        { id: 'call', label: 'Call', color: 'bg-primary' },
        { id: 'raise', label: 'Raise', color: 'bg-accent' },
        { id: 'allin', label: 'All In', color: 'bg-secondary' }
    ];
</script>

<div class="flex flex-col gap-3 bg-base-200 p-4 rounded-box border border-base-300">
    {#each actions as action}
        <button
            class="flex items-center gap-3 p-2 rounded-btn transition-colors {controlsSelectable ? 'hover:bg-base-300' : ''} {controlsSelectable && selectedAction === action.id ? 'outline outline-2 outline-warning bg-warning/20' : ''}"
            onclick={() => controlsSelectable && onSetAction(action.id)}
            disabled={!controlsSelectable}
        >
            <div class="w-6 h-6 rounded-btn {action.color}"></div>
            <span>{action.label}</span>
        </button>
    {/each}

    {#if controlsSelectable}
        <button 
            class="mt-4 btn btn-error w-full"
            onclick={onClearRange}
        >
            Clear Range
        </button>
    {/if}
</div>
