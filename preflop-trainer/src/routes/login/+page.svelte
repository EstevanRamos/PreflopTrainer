<script>
    import { enhance } from '$app/forms';
    import { goto } from '$app/navigation';

    let errorMessage = '';

    async function handleSubmit({ result }) {
        console.log("submitting form");
        if (result.success) {
            goto('/dashboard');
        } else {
            errorMessage = result.error;
        }
    }
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

<style>
    .login-container {
        max-width: 400px;
        margin: 100px auto;
        padding: 20px;
        background: #1e1e1e;
        border-radius: 8px;
        text-align: center;
    }

    label {
        display: block;
        margin: 10px 0;
    }

    input {
        width: 100%;
        padding: 10px;
        margin-top: 5px;
        border-radius: 4px;
        border: 1px solid #555;
    }

    button {
        width: 100%;
        padding: 10px;
        background: #4CAF50;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }

    .error {
        color: red;
        margin-bottom: 10px;
    }
</style>
