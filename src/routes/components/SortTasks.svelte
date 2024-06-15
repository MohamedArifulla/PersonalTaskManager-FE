<script>
  import { taskStore } from '../stores/taskStore';
  import { onDestroy } from 'svelte'; // Importing onDestroy correctly

  let sortBy = 'dueDate';
  let sortDirection = 'asc';

  const handleSortChange = (event) => {
    sortBy = event.target.value;
    taskStore.sortTasks(sortBy);
  };

  const handleSortDirectionChange = (event) => {
    sortDirection = event.target.value;
    taskStore.setSortDirection(sortDirection);
  };

  const unsubscribe = taskStore.subscribe(value => {
    sortBy = value.sortBy;
    sortDirection = value.sortDirection;
  });

  onDestroy(() => {
    unsubscribe();
  });
</script>

<div class="bg-gray-100 p-4 rounded">
  <h3 class="text-lg font-bold mt-4">Sort Tasks</h3>
  <select bind:value={sortBy} on:change={handleSortChange} class="w-full p-2 border border-gray-300 rounded mt-2">
    <option value="dueDate">Due Date</option>
    <option value="priority">Priority</option>
  </select>

  <select bind:value={sortDirection} on:change={handleSortDirectionChange} class="w-full p-2 border border-gray-300 rounded mt-2 mt-4">
    <option value="asc">Ascending</option>
    <option value="desc">Descending</option>
  </select>
</div>
