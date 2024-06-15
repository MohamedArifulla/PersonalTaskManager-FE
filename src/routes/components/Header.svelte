<script>
  import { isLoggedIn, currentUser } from '../stores/userStore';
  import { goto } from '$app/navigation';
  import { onMount, onDestroy } from 'svelte';
  import { page } from '$app/stores';

  let showLogout = false;
  let username = '';
  let email = '';

  const logout = () => {
    isLoggedIn.set(false);
    currentUser.set({ username: '', email: '' });
    showLogout = false;
    localStorage.removeItem('token');  // Clear the token on logout
    goto('/');  // Navigate to the home page
  };

  const profile = () =>{
    goto('/userprofile');
  };

  // Subscribe to the currentUser store
  const unsubscribe = currentUser.subscribe(value => {
    username = value.username;
    email = value.email;
  });

  // Clean up the subscription when the component is destroyed
  onDestroy(() => {
    unsubscribe();
  });

  
  // Monitor URL changes
  $: currentPage = $page.url.pathname;

  // When component mounts, get the username from currentUser store
  onMount(() => {
    currentUser.subscribe(value => {
      username = value.username;
      email = value.email;
    });
  });

  
</script>

<style lang="postcss">
  .header {
    @apply flex justify-between items-center p-4 bg-blue-500 text-white;
  }
  .profile-icon {
    @apply relative cursor-pointer;
  }
  .dropdown {
    @apply absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-xl;
    top: 100%; /* Position the dropdown below the profile button */
    right: 0;
  }
  .active {
    @apply text-yellow-400;
  }
</style>

<div class="header">
  <h1 class="text-sm md:text-xl lg:text-xl">Personal Task Manager</h1>
  <div>
    
    
    {#if $isLoggedIn}
      <button class="mr-4 {currentPage === '/tasks' ? 'active' : ''}" on:click={() => goto('/tasks')}>Task Manager</button>
    {/if}
    {#if !$isLoggedIn}
    <button class="text-sm md:text-lg lg:text-lg mr-2 {currentPage === '/' ? 'active' : ''}" on:click={() => goto('/')}>Home</button>
    <button class="text-sm md:text-lg lg:text-lg mr-2 {currentPage === '/about' ? 'active' : ''}" on:click={() => goto('/about')}>About</button>
      <button class="text-sm md:text-lg lg:text-lg mr-2 {currentPage === '/login' ? 'active' : ''}" on:click={() => goto('/login')}>Login</button>
      <button class="text-sm md:text-lg lg:text-lg mr-2 {currentPage === '/register' ? 'active' : ''}" on:click={() => goto('/register')}>Register</button>
    {/if}
  </div>
  {#if $isLoggedIn}
    <div class="relative inline-block">
      <button type="button" class="profile-icon" aria-label="Profile Icon" on:click={() => showLogout = !showLogout}>
        <svg class="w-6 h-6 inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A3 3 0 018 19h8a3 3 0 012.879-1.196M15 11h.01M19.41 9.087a5 5 0 10-7.063 0L12 12l-.317-.278a5 5 0 10-7.063 0A4.996 4.996 0 004 15h16a4.996 4.996 0 00-.59-5.913z" />
        </svg>
        <span>{username}</span>
      </button>
      {#if showLogout}
        <div class="dropdown">
          <button class="block px-4 py-2 text-gray-800" on:click={profile}>Profile</button>
          <button class="block px-4 py-2 text-gray-800" on:click={logout}>Logout</button>
        </div>
      {/if}
    </div>
  {/if}
</div>
