<script>

    // Dummy player positions
    let playerPositions = $state([
        { name: "Tom", stack: 100 },
        { name: "Joe", stack: 90 },
        { name: "Anna", stack: 110 },
        { name: "Mark", stack: 95 },
        { name: "Lisa", stack: 85 },
        { name: "You", stack: 120, isHero: true }
    ]);

    // Training scenario data (Dummy for now)
    let trainingScenario = $state({
        numberOfHands: 10,
        positions: ["CO", "BTN"],
        stackSizes: [10, 20, 30],
        ranges: ["AA, KK, QQ, AQs"]
    });

    let currentHandIndex = $state(0);
    let currentHand = $state({ hand: "", position: "", stackSize: "" });
    let playerActions = $state([]);

    function generateRandomHand() {
        const hands = ["AKs", "AQo", "77", "JTs", "T9s", "22", "KQo"];
        return hands[Math.floor(Math.random() * hands.length)];
    }

    function generateNewHand() {
        if (currentHandIndex >= trainingScenario.numberOfHands) return;
        
        currentHand.hand = generateRandomHand();
        currentHand.position = trainingScenario.positions[Math.floor(Math.random() * trainingScenario.positions.length)];
        currentHand.stackSize = trainingScenario.stackSizes[Math.floor(Math.random() * trainingScenario.stackSizes.length)];
    }

    function recordAction(action) {
        playerActions.push({ hand: currentHand.hand, action });
        currentHandIndex += 1;
        generateNewHand();
    }

    // Generate the first hand
    generateNewHand();
</script>

<style>
    .table-container {
        position: relative;
        width: 500px;
        height: 500px;
        border-radius: 50%;
        background: radial-gradient(circle, #333, #111);
        margin: auto;
    }

    .player {
        position: absolute;
        width: 80px;
        height: 80px;
        text-align: center;
        color: white;
        transform: translate(-50%, -50%) rotate(calc(var(--i) * 60deg))
                   translateY(-180px) rotate(calc(var(--i) * -60deg));
    }

    .player-hand {
        position: absolute;
        bottom: 10px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        gap: 10px;
    }

    .card {
        width: 50px;
        height: 70px;
        background: white;
        border-radius: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
    }

    .action-buttons {
        position: absolute;
        bottom: 80px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        gap: 15px;
    }

    button {
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        font-size: 16px;
        cursor: pointer;
    }

    .fold { background: red; color: white; }
    .call { background: blue; color: white; }
    .raise { background: green; color: white; }
</style>

<div class="table-container">
    <!-- Player Positions (Circular Layout) -->
    {#each playerPositions as player, index}
        <div class="player" style="--i: {index}">
            <div class="avatar">{player.name}</div>
            <div class="player-stack">{player.stack} BB</div>
        </div>
    {/each}

    <!-- Player's Cards (Bottom Center) -->
    <div class="player-hand">
        {#if currentHand.hand}
            <div class="card">{currentHand.hand.slice(0, -1)}</div>
            <div class="card">{currentHand.hand.slice(-1)}</div>
        {/if}
    </div>

    <!-- Action Buttons -->
    <div class="action-buttons">
        <button class="fold" on:click={() => recordAction("Fold")}>Fold</button>
        <button class="call" on:click={() => recordAction("Call")}>Call</button>
        <button class="raise" on:click={() => recordAction("Raise")}>Raise</button>
    </div>
</div>
