<script>
  import { taskStore } from '../../stores/taskStore';
  import { isLoggedIn } from '../../stores/userStore';
  import { onMount } from 'svelte';

  let tasks = [];
  let errorMessage = '';
  let CategoryFilter = null;
  let SortTasks = null;
  let TaskCard = null;
  let loadingCategoryFilter = true;
  let loadingSortTasks = true;
  let loadingTaskCard = true;

  $: tasks = $taskStore.filteredTasks;

  async function loadCategoryFilter() {
    try {
      CategoryFilter = (await import('../../components/CategoryFilter.svelte')).default;
      loadingCategoryFilter = false;
      await loadSortTasks();
    } catch (error) {
      console.error('Error loading CategoryFilter:', error);
    }
  }

  async function loadSortTasks() {
    try {
      SortTasks = (await import('../../components/SortTasks.svelte')).default;
      loadingSortTasks = false;
      await loadTaskCard();
    } catch (error) {
      console.error('Error loading SortTasks:', error);
    }
  }

  async function loadTaskCard() {
    try {
      TaskCard = (await import('../../components/TaskCard.svelte')).default;
      loadingTaskCard = false;
    } catch (error) {
      console.error('Error loading TaskCard:', error);
    }
  }

  function resetFilters() {
    taskStore.setFilter('status', '');
    taskStore.setFilter('dueDate', '');
  }

  onMount(() => {
    resetFilters();
    loadCategoryFilter();
    taskStore.fetchTasks(); // Fetch tasks when the component mounts
  });

  const handleDelete = async (event) => {
    const taskId = event.detail;
    if (!taskId) {
      errorMessage = 'Task ID is null';
      console.error('Task ID is null');
      return;
    }
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(`${apiUrl}/tasks/${taskId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Error: ${response.statusText}`);
      }

      taskStore.deleteTask(taskId);
    } catch (error) {
      errorMessage = error.message;
      console.error('Failed to delete task:', error);
    }
  };

  // Debugging logs
  $: console.log('isLoggedIn:', $isLoggedIn);
  $: console.log('tasks:', tasks);
</script>

{#if $isLoggedIn}
  {#if loadingCategoryFilter}
    <p>Loading category filter...</p>
  {:else}
    <svelte:component this={CategoryFilter} />
  {/if}

  {#if !loadingCategoryFilter && loadingSortTasks}
    <p>Loading sort tasks...</p>
  {:else if !loadingCategoryFilter}
    <svelte:component this={SortTasks} />
  {/if}

  {#if !loadingCategoryFilter && !loadingSortTasks && loadingTaskCard}
    <p>Loading tasks...</p>
  {:else if !loadingCategoryFilter && !loadingSortTasks}
    <div class="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {#each tasks as task (task._id)}
        <svelte:component this={TaskCard} {task} on:delete={handleDelete} />
      {/each}
    </div>
  {/if}

  {#if errorMessage}
    <p class="text-red-500">{errorMessage}</p>
  {/if}
{:else}
  <div class="p-4">
    <p>Please <a href="/login" class="text-blue-500">login</a> to manage your tasks.</p>
  </div>
{/if}
