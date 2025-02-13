<script>
    import { enhance } from '$app/forms';
    import RangeSelector from '$lib/components/RangeSelector.svelte';

    const { data } = $props();
    let user = data.user;
    let ranges = data.ranges;
    let selectedRange = $state(ranges[0].range); // Initialize as null

    function selectRange(range) {
        selectedRange = range.range;
        console.log('Selected:', selectedRange);
    }
    
</script>

{#if user}
    <h1>Welcome, {user.name}!</h1>
    <RangeSelector selectedHands={selectedRange} showControls={false}  showcontrols={true} selectable={false}/>

    <div class="overflow-x-auto my-8 px-4">
        <table class="table w-full">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Position</th>
                    <th>Stack Size</th>
                    <th>Created</th>
                </tr>
            </thead>
            <tbody>
                {#each ranges as range}
                    <tr 
                        class="cursor-pointer"
                        class:bg-base-200={selectedRange && selectedRange.id === range.id}
                        onclick={() => selectRange(range)}
                    >
                        <td>{range.name}</td>
                        <td>{range.position}</td>
                        <td>{range.stackSize}</td>
                        <td>{new Date(range.created).toLocaleDateString()}</td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>


    <a href="/ranges/create" class="btn btn-primary">Create Range</a>
    <a href="/training/create" class="btn btn-primary ml-4">Create Training Scenario</a>

    <form method="POST" action="/logout" >
        <button class="btn btn-primary" type="submit">Logout</button>
    </form>

{:else}
    <p>You are not logged in.</p>
    <a href="/login">Login</a>
{/if}
