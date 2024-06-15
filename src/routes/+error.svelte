
<script>
  export let error;
  export let status;

  import { createEventDispatcher } from 'svelte';
  import { goto } from '$app/navigation';
  const dispatch = createEventDispatcher();

  function dismiss() {
    goto('/');
    dispatch('dismiss');
  }
</script>

<div class="overlay">
  <div class="error-page">
    <h1>{status || ''}</h1>
    <p>{error?.message || 'An unexpected error occurred'}</p>
    {#if status === 404}
      <p>The page you are looking for does not exist.</p>
    {/if}
    {#if status >= 500}
      <p>There was a problem with the server. Please try again later.</p>
    {/if}
    <button on:click={dismiss} class="go-home">Go to Home</button>
  </div>
</div>

<style>
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent black overlay */
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999; /* Ensure the overlay is on top of other content */
  }

  .error-page {
    text-align: center;
    background-color: #ffffff; /* Set the background color for the error page */
    padding: 20px;
    border-radius: 10px;
  }

  .go-home {
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    text-decoration: none;
    border-radius: 5px;
  }
</style>




