<script>
    import { isLoggedIn, currentUser } from '../stores/userStore';
    import { jwtDecode } from 'jwt-decode';
    import { goto } from '$app/navigation';

    let loginEmail = '';
    let loginPassword = '';
    let message = '';
    let token = '';

    const login = async () => {
        try {
            const apiUrl = import.meta.env.VITE_API_URL;
            const response = await fetch(`${apiUrl}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: loginEmail, password: loginPassword })
            });
            const data = await response.json();
            if (response.ok) {
                
                token = data.token;
                localStorage.setItem('token', token);
                message = 'Login successful';
                const decodedToken = jwtDecode(token);
                         
                currentUser.set({ username: decodedToken.username, email: decodedToken.email });
                isLoggedIn.set(true);
                
                goto('/tasks');
            } else {
                message = data.message;
            }
        } catch (error) {
            message = 'An error occurred: ' + error.message;
            console.error('Login error:', error);
        }
    };
</script>


<style lang="postcss">
    .container {
        @apply mx-auto max-w-md mt-10 p-6 bg-white rounded-lg shadow-lg;
    }
</style>

<div class="container">
    <h1 class="text-2xl font-bold mb-4">Login</h1>
    <form class="space-y-4">
        <div>
            <label for="email" class="block text-gray-700">Email</label>
            <input type="email" bind:value={loginEmail} class="w-full p-2 border border-gray-300 rounded mt-1" />
        </div>
        <div>
            <label for="password" class="block text-gray-700">Password</label>
            <input type="password" bind:value={loginPassword} class="w-full p-2 border border-gray-300 rounded mt-1" />
        </div>
        <button type="button" on:click={login} class="w-full bg-blue-500 text-white p-2 rounded mt-4">Login</button>
        <p class="mt-4 text-red-500">{message}</p>
    </form>
</div>
