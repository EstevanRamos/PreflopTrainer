<script>
    import { enhance } from '$app/forms';
</script>

<div class="hero min-h-screen bg-base-200">
    <div class="hero-content flex-col">
        <div class="text-center">
            <h2 class="text-3xl font-bold mb-6">Sign Up</h2>
        </div>
        <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div class="card-body">
                <form method="post" action="/register" use:enhance>
                    <div class="form-control">
                        <input type="name" name="name" placeholder="Name" required class="input input-bordered" />
                    </div>
                    <div class="form-control mt-4">
                        <input type="email" name="email" placeholder="Email" required class="input input-bordered" />
                    </div>
                    <div class="form-control mt-4">
                        <input type="password" name="password" placeholder="Password" required class="input input-bordered" />
                    </div>
                    <div class="form-control mt-4">
                        <input type="password" name="passwordConfirm" placeholder="Confirm Password" required class="input input-bordered" />
                    </div>
                    <div class="form-control mt-6">
                        <button class="btn btn-primary">Register</button>
                    </div>
                </form>
                <div class="text-center mt-4">
                    <a href="/login" class="link link-hover text-sm">Already have an account? Login</a>
                </div>
            </div>
        </div>
    </div>
</div>
