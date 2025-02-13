<script>
    export let selectedAction;
    export let onSetAction;
    export let onClearRange;
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
            class="flex items-center gap-3 p-2 rounded-btn transition-colors hover:bg-base-300 {selectedAction === action.id ? 'outline outline-2 outline-warning bg-warning/20' : ''}"
            on:click={() => onSetAction(action.id)}
        >
            <div class="w-6 h-6 rounded-btn {action.color}"></div>
            <span>{action.label}</span>
        </button>
    {/each}

    <button 
        class="mt-4 btn btn-error w-full"
        on:click={onClearRange}
    >
        Clear Range
    </button>
</div>
