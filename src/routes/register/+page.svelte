<script>
    import { onMount } from 'svelte';

    let username = '';
    let email = '';
    let password = '';
    let confirmPassword = '';
    let contactNumber = ''; // Change to contactNumber
    let message = '';
    let token = '';
    let showConfirmPassword = false;
    let messageClass = ''; // Variable to hold the class for the message

    const register = async () => {
        if (password !== confirmPassword) {
            message = 'Passwords do not match';
            messageClass = 'text-red-500'; // Error message in red
            return;
        }
        if (!/^\d{10}$/.test(contactNumber)) { // Change to contactNumber
            message = 'Contact number should be exactly 10 digits';
            messageClass = 'text-red-500'; // Error message in red
            return;
        }
        try {
            const apiUrl = import.meta.env.VITE_API_URL;
            const response = await fetch(`${apiUrl}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, email, password, contactNumber }) // Change to contactNumber
            });
            const data = await response.json();
            if (response.ok) {
                message = data.message;
                messageClass = 'text-green-500'; // Success message in green
                // Clear the success message after 5 seconds
                setTimeout(() => {
                    message = '';
                }, 5000);
            } else {
                message = data.error;
                messageClass = 'text-red-500'; // Error message in red
            }
        } catch (error) {
            message = 'An error occurred: ' + error.message;
            messageClass = 'text-red-500'; // Error message in red
        }
    };

    const handlePasswordInput = () => {
        showConfirmPassword = password.length > 0;
    };
</script>

<style lang="postcss">
    .container {
        @apply mx-auto max-w-md mt-10 p-6 bg-white rounded-lg shadow-lg;
    }
</style>

<div class="container">
    <h1 class="text-2xl font-bold mb-4">Register</h1>
    <form class="space-y-4">
        <div>
            <label for="username" class="block text-gray-700">Username</label>
            <input type="text" id="username" bind:value={username} class="w-full p-2 border border-gray-300 rounded mt-1" />
        </div>
        <div>
            <label for="email" class="block text-gray-700">Email</label>
            <input type="email" id="email" bind:value={email} class="w-full p-2 border border-gray-300 rounded mt-1" />
        </div>
        <div>
            <label for="password" class="block text-gray-700">Password</label>
            <input type="password" id="password" bind:value={password} class="w-full p-2 border border-gray-300 rounded mt-1" on:input={handlePasswordInput} />
        </div>
        {#if showConfirmPassword}
            <div>
                <label for="confirmPassword" class="block text-gray-700">Confirm Password</label>
                <input type="password" id="confirmPassword" bind:value={confirmPassword} class="w-full p-2 border border-gray-300 rounded mt-1" />
            </div>
        {/if}
        <div>
            <label for="contactNumber" class="block text-gray-700">Contact Number</label>
            <input 
                type="text" 
                id="contactNumber" 
                bind:value={contactNumber} 
                class="w-full p-2 border border-gray-300 rounded mt-1" 
                on:input={(e) => {
                    if (!/^\d*$/.test(e.target.value)) {
                        e.target.value = contactNumber; // Change to contactNumber
                    } else {
                        contactNumber = e.target.value.slice(0, 10); // Change to contactNumber
                    }
                }}
            />
        </div>
        <button type="button" on:click={register} class="w-full bg-blue-500 text-white p-2 rounded mt-4">Register</button>
        <p class="mt-4 {messageClass}">{message}</p>
    </form>
</div>
