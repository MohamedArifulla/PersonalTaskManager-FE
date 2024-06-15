<script>
  import { taskStore } from '../stores/taskStore';
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { get } from 'svelte/store';

  let selectedStatus = '';
  let dueDate = '';

  $: {
    const category = $page.params.category;
    taskStore.setFilter('category', category);
  }

  onMount(() => {
    const category = $page.params.category;
    if (category) {
      taskStore.setFilter('category', category);
    }

    const unsubscribe = taskStore.subscribe(value => {
      selectedStatus = value.filter.status;
      dueDate = value.filter.dueDate;
    });

    return () => unsubscribe();
  });

  const filterByStatus = () => {
    taskStore.setFilter('status', selectedStatus);
  };

  function handleDueDateChange(event) {
    taskStore.setFilter('dueDate', event.target.value);
  }
</script>

<div class="bg-gray-100 p-4 rounded">
  <h3 class="text-lg font-bold mt-4">Filter by Status</h3>
  <select bind:value={selectedStatus} on:change={filterByStatus} class="w-full p-2 border border-gray-300 rounded mt-2">
    <option value="">All</option>
    <option value="Pending">Pending</option>
    <option value="In Progress">In Progress</option>
    <option value="Completed">Completed</option>
  </select>
  <h3 class="text-lg font-bold mt-4">Filter by Due Date</h3>
  <input type="date" bind:value={dueDate} on:change={handleDueDateChange} placeholder="Filter by due date" class="w-full p-2 border border-gray-300 rounded mt-2"/>
</div>
