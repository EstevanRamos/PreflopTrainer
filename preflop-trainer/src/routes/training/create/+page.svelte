<script>
    // Dummy data for ranges
    let savedRanges = [
        { name: "BTN 20BB Aggressive", position: "BTN", stackSize: "20BB" },
        { name: "CO 30BB Standard", position: "CO", stackSize: "30BB" },
        { name: "BB Defense 15BB", position: "BB", stackSize: "15BB" }
    ];

    let positions = ["UTG", "UTG+1", "UTG+2", "HJ", "LJ", "CO", "BTN", "SB", "BB"];
    let simplePositions = ["LP", "MP", "EP"];
    let stackSizes = ["10BB", "20BB", "30BB", "40BB", "50BB", "60BB", "70BB", "80BB", "90BB", "100BB"];

    // Reactive state for user selections
    let usesimplified = $state(false);
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

<div class="container mx-auto p-4 max-w-4xl">
    <div class="card bg-base-200 shadow-xl">
        <div class="card-body">
            <h1 class="card-title text-3xl font-bold text-center mb-6">Create Training Drill</h1>

            <!-- Drill Name -->
            <div class="form-control w-full">
                <label class="label" for="drillName">
                    <span class="label-text">Drill Name</span>
                </label>
                <input 
                    id="drillName" 
                    type="text" 
                    bind:value={drillName} 
                    placeholder="Enter drill name..." 
                    class="input input-bordered w-full"
                />
            </div>

            <div class="divider"></div>

            <!-- Position Style -->
            <div class="my-6">
                <h2 class="text-xl font-semibold mb-3">Select Positions</h2>
                
                <!-- Regular Positions -->
                <div class="mb-6">
                    <h3 class="text-lg font-medium mb-2">Detailed Positions</h3>
                    <div class="flex flex-wrap gap-2 justify-center">
                        {#each positions as position}
                            <button 
                                class="btn {selectedPositions.includes(position) 
                                    ? 'btn-primary' 
                                    : 'btn-ghost border-2 border-primary hover:btn-primary'}"
                                on:click={() => togglePosition(position)}
                            >
                                {position}
                            </button>
                        {/each}
                    </div>
                </div>

                <!-- Position Style Toggle -->
                <div class="flex justify-center gap-4 mb-4">
                    <label class="label cursor-pointer">
                        <input type="radio" 
                               class="radio radio-primary mr-2" 
                               bind:group={usesimplified} 
                               value={false}
                        />
                        <span class="label-text">Detailed Only</span>
                    </label>
                    <label class="label cursor-pointer">
                        <input type="radio" 
                               class="radio radio-primary mr-2" 
                               bind:group={usesimplified} 
                               value={true}
                        />
                        <span class="label-text">Include Simplified</span>
                    </label>
                </div>

                <!-- Simplified Positions (conditionally shown) -->
                {#if usesimplified}
                    <div>
                        <h3 class="text-lg font-medium mb-2">Simplified Positions</h3>
                        <div class="flex flex-wrap gap-2 justify-center">
                            {#each simplePositions as position}
                                <button 
                                    class="btn {selectedPositions.includes(position) 
                                        ? 'btn-primary' 
                                        : 'btn-ghost border-2 border-primary hover:btn-primary'}"
                                    on:click={() => togglePosition(position)}
                                >
                                    {position}
                                </button>
                            {/each}
                        </div>
                    </div>
                {/if}
            </div>

            <div class="divider"></div>

            <!-- Stack Size Multi-Selection -->
            <div class="my-6">
                <h2 class="text-xl font-semibold mb-3">Select Stack Sizes</h2>
                <div class="flex flex-wrap gap-2 justify-center">
                    {#each stackSizes as size}
                        <button 
                            class="btn {selectedStackSizes.includes(size) 
                                ? 'btn-secondary' 
                                : 'btn-ghost border-2 border-secondary hover:btn-secondary'}"
                            on:click={() => toggleStackSize(size)}
                        >
                            {size}
                        </button>
                    {/each}
                </div>
            </div>

            <div class="divider"></div>

            <!-- Saved Ranges Selection -->
            <div class="my-6">
                <h2 class="text-xl font-semibold mb-3">Select Ranges</h2>
                <div class="grid gap-2">
                    {#each savedRanges as range}
                        <div 
                            class="card bg-base-300 cursor-pointer {
                                selectedRanges.includes(range.name) 
                                    ? 'bg-primary bg-opacity-20 border-2 border-primary' 
                                    : 'hover:bg-base-100'}"
                            on:click={() => toggleRange(range.name)}
                        >
                            <div class="card-body p-4">
                                <h3 class="card-title text-lg">{range.name}</h3>
                                <p class="text-sm opacity-75">Position: {range.position} | Stack Size: {range.stackSize}</p>
                            </div>
                        </div>
                    {/each}
                </div>
            </div>

            <div class="divider"></div>

            <!-- Number of Hands -->
            <div class="form-control w-full max-w-xs mx-auto">
                <label class="label">
                    <span class="label-text">Number of Hands</span>
                </label>
                <input 
                    type="number" 
                    min="1" 
                    bind:value={numHands}
                    class="input input-bordered w-full" 
                />
            </div>

            <!-- Validation Message -->
            {#if !isValid}
                <div class="alert alert-error mt-4">
                    <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>No saved range matches the selected position & stack size.</span>
                </div>
            {/if}

            <!-- Create Drill Button -->
            <button 
                class="btn btn-primary btn-lg w-full mt-6 {!isValid ? 'btn-disabled' : ''}" 
                on:click={createDrill}
            >
                Create Drill
            </button>
        </div>
    </div>
</div>

<!-- Success Popup -->
{#if showPopup}
    <div class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
        <div class="modal-box">
            <h2 class="text-2xl font-bold mb-4">Drill Created!</h2>
            <p class="mb-6">Your drill is ready to start.</p>
            <div class="modal-action">
                <button class="btn btn-primary" on:click={startDrill}>Start Drill</button>
                <button class="btn btn-error" on:click={goHome}>Go Home</button>
            </div>
        </div>
    </div>
{/if}

