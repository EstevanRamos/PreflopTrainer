<script>
    import { enhance } from '$app/forms';
</script>

<h2>Sign Up</h2>

<form method="post" action="/register" use:enhance>
    <input type="name"  name="name" placeholder="Name" required />
    <input type="email"  name="email" placeholder="Email" required />
    <input type="password"  name="password" placeholder="Password" required />
    <input type="password"  name="passwordConfirm" placeholder="Confirm Password" required />

    <button style="btn-primary" type="submit">register</button>
</form>

<a href="/login">Already have an account? Login</a>
