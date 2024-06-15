<script>
   
    import TaskNavigation from '../components/TaskNavigation.svelte';
    import { isLoggedIn } from '../stores/userStore';
  
    </script>
  
  {#if $isLoggedIn}
      <TaskNavigation />
      {/if}
      <slot />
     
  