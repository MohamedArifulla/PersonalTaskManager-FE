<!-- src/components/TaskNavigation.svelte -->
<script>
     import { goto } from '$app/navigation';
  
    function navigateTo(path) {
      goto(path);
    }
  </script>
  
  <nav class="space-x-4">
    <button on:click={() => navigateTo('/tasks/all')} class="text-blue-500">All Tasks</button>
    <button on:click={() => navigateTo('/tasks/category/Work')} class="text-blue-500">Work</button>
    <button on:click={() => navigateTo('/tasks/category/Personal')} class="text-blue-500">Personal</button>
    <button on:click={() => navigateTo('/tasks/category/Others')} class="text-blue-500">Others</button>
  </nav>
  