<script>
  import { onMount } from 'svelte';
  import { taskStore } from '../stores/taskStore';
  import TaskForm from '../components/TaskForm.svelte';
  import { isLoggedIn } from '../stores/userStore';
  import { page } from '$app/stores';

  let errorMessage = '';
  let editingTask = null;
  let tasks = [];

  $: editingTask = $taskStore.editingTask;
  $: tasks = $taskStore.filteredTasks;

  // Monitor URL changes
  $: currentPage = $page.url.pathname;

  onMount(async () => {
    if ($isLoggedIn) {
      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const response = await fetch(`${apiUrl}/tasks`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        taskStore.setTasks(data || []);
      } catch (error) {
        errorMessage = error.message;
        console.error('Failed to fetch tasks:', error);
      }
    }
  });
</script>

<div class="p-4">
  {#if $isLoggedIn}
    <TaskForm />
    {#if errorMessage}
      <div class="bg-red-100 text-red-800 p-2 rounded">{errorMessage}</div>
    {:else}
      <slot></slot>
    {/if}
  {:else}
    <div class="p-4">
      <p>Please <a href="/login" class="text-blue-500">login</a> to manage your tasks.</p>
    </div>
  {/if}
</div>
