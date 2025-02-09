<script>
    import { pb } from '$lib/pocketbase';

    let email = $state('');
    let password = $state('');
    let confirmPassword = $state('');
    let errorMessage = $state('');

    async function signUp() {
        if (password !== confirmPassword) {
            errorMessage = "Passwords do not match!";
            return;
        }

        try {
            await pb.collection('users').create({
                email,
                password,
                passwordConfirm: confirmPassword
            });
            alert('Signup successful! Please log in.');
        } catch (error) {
            errorMessage = error.message;
        }
    }
</script>

<style>
    .error { color: red; }
</style>

<h2>Sign Up</h2>

<input type="email" bind:value={email} placeholder="Email" required />
<input type="password" bind:value={password} placeholder="Password" required />
<input type="password" bind:value={confirmPassword} placeholder="Confirm Password" required />

<button on:click={signUp}>Sign Up</button>

{#if errorMessage}
    <p class="error">{errorMessage}</p>
{/if}

<a href="/login">Already have an account? Login</a>
