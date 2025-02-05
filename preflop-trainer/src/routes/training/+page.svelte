<script>
    import { goto } from '$app/navigation';

    // Dummy data for ranges
    let savedRanges = [
        { name: "BTN 20BB Aggressive", position: "BTN", stackSize: "20BB" },
        { name: "CO 30BB Standard", position: "CO", stackSize: "30BB" },
        { name: "BB Defense 15BB", position: "BB", stackSize: "15BB" }
    ];

    // Reactive state for user selections
    let selectedPositions = $state([]);
    let selectedStackSizes = $state([]); 
    let selectedRanges = $state([]);
    let drillName = $state('');
    let numHands = $state(10); // Default number of hands
    let isValid = $state(true); // Validation flag
    let showPopup = $state(false); // Controls popup visibility

    function togglePosition(position) {
        selectedPositions = selectedPositions.includes(position)
            ? selectedPositions.filter(p => p !== position)
            : [...selectedPositions, position];
        validateDrill();
    }

    function toggleStackSize(size) {
        selectedStackSizes = selectedStackSizes.includes(size)
            ? selectedStackSizes.filter(s => s !== size)
            : [...selectedStackSizes, size];
        validateDrill();
    }

    function toggleRange(range) {
        selectedRanges = selectedRanges.includes(range)
            ? selectedRanges.filter(r => r !== range)
            : [...selectedRanges, range];
        validateDrill();
    }

    function validateDrill() {
        isValid = selectedPositions.some(position => 
            selectedStackSizes.some(stackSize => 
                savedRanges.some(range => range.position === position && range.stackSize === stackSize)
            )
        ) && numHands > 0;
    }

    function createDrill() {
        if (!isValid) return;

        console.log("Drill Created:", {
            drillName,
            selectedPositions,
            selectedStackSizes,
            selectedRanges,
            numHands
        });

        showPopup = true; // Show the popup after drill is created
    }

    function startDrill() {
        goto('/training/start'); // Navigate to the training page
    }

    function goHome() {
        showPopup = false; // Close the popup
    }
</script>

<div class="container">
    <h1>Create Training Drill</h1>

    <!-- Drill Name -->
    <div class="input-group">
        <label for="drillName">Drill Name:</label>
        <input id="drillName" bind:value={drillName} placeholder="Enter drill name..." />
    </div>

    <!-- Position Selection -->
    <div class="section">
        <h2>Select Positions</h2>
        <div class="position-buttons">
            {#each ["UTG", "MP", "CO", "BTN", "SB", "BB"] as position}
                <button class:selected={selectedPositions.includes(position)}
                        on:click={() => togglePosition(position)}>
                    {position}
                </button>
            {/each}
        </div>
    </div>

    <!-- Stack Size Multi-Selection -->
    <div class="section">
        <h2>Select Stack Sizes</h2>
        <div class="stack-size-buttons">
            {#each ["10BB", "20BB", "30BB", "40BB", "50BB"] as size}
                <button class:selected={selectedStackSizes.includes(size)}
                        on:click={() => toggleStackSize(size)}>
                    {size}
                </button>
            {/each}
        </div>
    </div>

    <!-- Saved Ranges Selection -->
    <div class="section">
        <h2>Select Ranges</h2>
        <div class="range-list">
            {#each savedRanges as range}
                <div class="range-item" class:selected={selectedRanges.includes(range.name)}
                     on:click={() => toggleRange(range.name)}>
                    {range.name} ({range.position}, {range.stackSize})
                </div>
            {/each}
        </div>
    </div>

    <!-- Number of Hands -->
    <div class="section">
        <h2>Number of Hands</h2>
        <input type="number" min="1" bind:value={numHands} />
    </div>

    <!-- Validation Message -->
    {#if !isValid}
        <p class="error-message">⚠️ No saved range matches the selected position & stack size.</p>
    {/if}

    <!-- Create Drill Button -->
    <button class="create-button" on:click={createDrill} disabled={!isValid}>Create Drill</button>
</div>

<!-- ✅ Popup -->
{#if showPopup}
    <div class="popup">
        <div class="popup-content">
            <h2>Drill Created!</h2>
            <p>Your drill is ready to start.</p>
            <div class="popup-buttons">
                <button class="start-button" on:click={startDrill}>Start Drill</button>
                <button class="home-button" on:click={goHome}>Go Home</button>
            </div>
        </div>
    </div>
{/if}

<style>
    .container {
        max-width: 600px;
        margin: auto;
        padding: 20px;
        background: #222;
        color: white;
        border-radius: 10px;
    }

    h1, h2 {
        text-align: center;
    }

    .input-group {
        margin-bottom: 15px;
    }

    input, select {
        width: 100%;
        padding: 8px;
        margin-top: 5px;
        border-radius: 5px;
        border: none;
        background: #333;
        color: white;
    }

    .section {
        margin-top: 20px;
    }

    .position-buttons, .stack-size-buttons {
        display: flex;
        gap: 10px;
        justify-content: center;
    }

    button {
        background: #444;
        color: white;
        padding: 10px 15px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: background 0.2s;
    }

    button.selected {
        background: #007bff;
    }

    .range-list {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .range-item {
        background: #333;
        padding: 10px;
        border-radius: 5px;
        cursor: pointer;
        transition: background 0.2s;
    }

    .range-item:hover {
        background: #555;
    }

    .range-item.selected {
        background: #007bff;
    }

    .error-message {
        color: #ff5555;
        text-align: center;
        margin-top: 10px;
        font-weight: bold;
    }

    .create-button {
        display: block;
        width: 100%;
        background: #28a745;
        margin-top: 20px;
        padding: 10px;
        border-radius: 5px;
        font-weight: bold;
    }

    /* ✅ Popup */
    .popup {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .popup-content {
        background: #222;
        padding: 20px;
        border-radius: 10px;
        text-align: center;
    }

    .popup-buttons {
        display: flex;
        justify-content: center;
        gap: 15px;
        margin-top: 10px;
    }

    .start-button {
        background: #007bff;
    }

    .home-button {
        background: #dc3545;
    }
</style>
