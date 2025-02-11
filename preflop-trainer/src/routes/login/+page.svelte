<script>
    import { enhance } from '$app/forms';
    import { goto } from '$app/navigation';

    let errorMessage = '';

</script>

<section class="login-container">
    <h1>Login</h1>

    {#if errorMessage}
        <p class="error">{errorMessage}</p>
    {/if}

    <form method="POST" action="?/login" use:enhance>
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required />

        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required />

        <button type="submit">Login</button>
    </form>

    <p>Don't have an account? <a href="/register">Sign up</a></p>
</section>
