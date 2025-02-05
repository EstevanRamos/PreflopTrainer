<script>
    // Dummy data for the drill
    let drill = {
        positions: ['UTG', 'MP', 'CO', 'BTN', 'SB', 'BB'],
        stackSizes: [50, 100, 150, 200, 250, 300],
        hands: 100,
        currentHand: 1,
        folded: false,
        pot: 180,
        ranges: {
            UTG: ['AA', 'KK', 'QQ', 'AK'],
            MP: ['JJ', 'TT', 'AQ', 'AJ'],
            CO: ['99', '88', 'KQ', 'KJ'],
            BTN: ['77', '66', 'QJ', 'QT'],
            SB: ['55', '44', 'JT', 'T9'],
            BB: ['33', '22', '98', '87']
        }
    };

    let selectedPosition = '';
    let selectedStackSize = 0;
    let preflopHand = '';
    let isHandInRange = false;

    // Function to start a new hand
    function startNewHand() {
        // Randomly select a position and stack size
        selectedPosition = drill.positions[Math.floor(Math.random() * drill.positions.length)];
        selectedStackSize = drill.stackSizes[Math.floor(Math.random() * drill.stackSizes.length)];

        // Randomly generate a pre-flop starting hand
        const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];
        const suits = ['s', 'h', 'd', 'c'];
        const card1 = ranks[Math.floor(Math.random() * ranks.length)] + suits[Math.floor(Math.random() * suits.length)];
        const card2 = ranks[Math.floor(Math.random() * ranks.length)] + suits[Math.floor(Math.random() * suits.length)];
        preflopHand = `${card1} ${card2}`;

        // Check if the hand is in the specified range
        isHandInRange = drill.ranges[selectedPosition].includes(preflopHand.split(' ')[0].slice(0, -1));
    }

    function fold() {
        drill.folded = true;
    }

    function nextHand() {
        if (drill.currentHand < drill.hands) {
            drill.currentHand += 1;
            drill.folded = false;
            startNewHand();
        }
    }

    // Initialize the first hand
    startNewHand();
</script>

<style>
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
        background-color: #2c3e50;
        color: white;
        font-family: Arial, sans-serif;
    }
    .info {
        margin-bottom: 20px;
        text-align: center;
    }
    .button {
        padding: 10px 20px;
        margin: 5px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        background-color: #3498db;
        color: white;
    }
    .button:disabled {
        background-color: #7f8c8d;
        cursor: not-allowed;
    }
    .hand-status {
        margin-top: 20px;
        font-size: 1.2em;
    }
</style>

<div class="container">
    <div class="info">
        <h1>Moon Poker</h1>
        <p>Hand: {drill.currentHand} / {drill.hands}</p>
        <p>Position: {selectedPosition}</p>
        <p>Stack Size: {selectedStackSize}</p>
        <p>Pre-flop Hand: {preflopHand}</p>
        <p>Pot: {drill.pot}</p>
    </div>
    <div>
        <button class="button" on:click={fold} disabled={drill.folded}>Fold</button>
        <button class="button" on:click={nextHand} disabled={!drill.folded}>Next Hand</button>
    </div>
    <div class="hand-status">
        {#if isHandInRange}
            <p>Your hand is in the range for {selectedPosition}.</p>
        {:else}
            <p>Your hand is NOT in the range for {selectedPosition}.</p>
        {/if}
    </div>
</div>