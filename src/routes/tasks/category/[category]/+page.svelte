<script>
  import { taskStore } from '../../../stores/taskStore';
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { isLoggedIn } from '../../../stores/userStore';

  let tasks = [];
  let errorMessage = '';
  let CategoryFilter;
  let SortTasks;
  let TaskCard;
  let loadingCategoryFilter = true;
  let loadingSortTasks = true;
  let loadingTaskCard = true;

  const allowedCategories = ['Work', 'Personal', 'Others'];

  $: category = $page.params.category;

  $: {
    if (category && !allowedCategories.includes(category)) {
      errorMessage = 'Invalid category';
      goto('/'); // Redirect to a custom 404 page if category is invalid
    } else {
      errorMessage = '';
      tasks = $taskStore.filteredTasks;
    }
  }

  const handleDelete = async (event) => {
    const taskId = event.detail;
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(`${apiUrl}/tasks/${taskId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      taskStore.deleteTask(taskId);
    } catch (error) {
      console.error('Failed to delete task:', error);
      errorMessage = 'Failed to delete task';
    }
  };

  async function loadCategoryFilter() {
    const module = await import('../../../components/CategoryFilter.svelte');
    CategoryFilter = module.default;
    loadingCategoryFilter = false;
  }

  async function loadSortTasks() {
    const module = await import('../../../components/SortTasks.svelte');
    SortTasks = module.default;
    loadingSortTasks = false;
  }

  async function loadTaskCard() {
    const module = await import('../../../components/TaskCard.svelte');
    TaskCard = module.default;
    loadingTaskCard = false;
  }

  $: if (category) {
    if (allowedCategories.includes(category)) {
      // Reset filters and sort when category changes
      taskStore.setFilter('status', '');
      taskStore.setFilter('dueDate', '');
      taskStore.resetSort();
      taskStore.setFilter('category', category);
    }
  }

  onMount(() => {
    loadCategoryFilter();
    loadSortTasks();
    loadTaskCard();
  });
</script>

{#if $isLoggedIn}

{#if errorMessage}
  <p class="text-red-500">{errorMessage}</p>
{:else}
  <div>
    <h2 class="text-lg font-semibold">Tasks in {category}</h2>

    {#if loadingCategoryFilter}
      <p>Loading category filter...</p>
    {:else}
      <svelte:component this={CategoryFilter} />
    {/if}

    {#if loadingSortTasks}
      <p>Loading sort tasks...</p>
    {:else}
      <svelte:component this={SortTasks} />
    {/if}

    {#if loadingTaskCard}
      <p>Loading tasks...</p>
    {:else}
      <div class="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {#each tasks as task (task.id)}
          <svelte:component this={TaskCard} {task} on:delete={handleDelete} />
        {/each}
      </div>
    {/if}
  </div>
{/if}
{:else}
  <div class="p-4">
    <p>Please <a href="/login" class="text-blue-500">login</a> to manage your tasks.</p>
  </div>
{/if}
