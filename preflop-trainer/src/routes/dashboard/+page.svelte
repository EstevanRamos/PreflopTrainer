<script>
    import { enhance } from '$app/forms';
    export let data;
    let user = data.user;
    console.log(user);
</script>

{#if user}
    <h1>Welcome, {user.name}!</h1>
    <p>Email: {user.email}</p>
    <form method="POST" action="/logout" >
        <button class="btn btn-primary" type="submit">Logout</button>
    </form>

{:else}
    <p>You are not logged in.</p>
    <a href="/login">Login</a>
{/if}
