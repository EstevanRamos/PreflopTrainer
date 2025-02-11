<script>
    import { enhance } from '$app/forms';
    import { goto } from '$app/navigation';

    let errorMessage = '';
</script>

<div class="hero min-h-screen bg-base-200">
    <div class="hero-content flex-col">
        <div class="card w-full max-w-sm shadow-2xl bg-base-100">
            <div class="card-body">
                <h1 class="text-3xl font-bold text-center">Login</h1>

                {#if errorMessage}
                    <div class="alert alert-error">
                        <span>{errorMessage}</span>
                    </div>
                {/if}

                <form method="POST" action="?/login" use:enhance>
                    <div class="form-control mb-4">
                        <label class="label" for="email">
                            <span class="label-text">Email</span>
                        </label>
                        <input type="email" id="email" name="email" required class="input input-bordered" />
                    </div>

                    <div class="form-control mb-4">
                        <label class="label" for="password">
                            <span class="label-text">Password</span>
                        </label>
                        <input type="password" id="password" name="password" required class="input input-bordered" />
                    </div>

                    <div class="form-control mt-6">
                        <button class="btn btn-primary">Login</button>
                    </div>
                </form>

                <div class="text-center mt-4">
                    <p>Don't have an account? 
                        <a href="/register" class="link link-primary">Sign up</a>
                    </p>
                </div>
            </div>
        </div>
    </div>
</div>
