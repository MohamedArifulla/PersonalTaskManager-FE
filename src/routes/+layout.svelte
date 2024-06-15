<script>
  import "../app.css";
  import { onDestroy } from 'svelte';
  import { page } from '$app/stores';
  import Header from './components/Header.svelte';
  import Footer from './components/Footer.svelte';
  import ErrorComponent from './+error.svelte';

  // Local state for error handling
  let error = null;
  let status = null;

  $: {
    if ($page.status >= 400) {
      error = $page.error;
      status = $page.status;
    }
  }

  function resetError() {
    error = null;
    status = null;
  }

  // Reset error state on component destruction
  onDestroy(() => {
    resetError();
  });
</script>

<div id="app">
  <Header />
  <main>
    {#if status !== null}
      <ErrorComponent {error} {status} on:dismiss={resetError} />
    {:else}
      <slot />
    {/if}
  </main>
  <Footer />
</div>
<!-- <link rel="stylesheet" href="/build/app.css"> -->