<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { get } from 'svelte/store';
  import TaskForm from '../../components/TaskForm.svelte';

  let task = null;
  let error = null;
  let loading = true;
  let editingTask = null;

  async function fetchTask() {
    const { id } = get(page).params;
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(`${apiUrl}/tasks/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Task not found');
        } else {
          throw new Error('Failed to fetch task');
        }
      }

      task = await response.json();
    } catch (err) {
      error = err.message;
    } finally {
      loading = false;
    }
  }

  onMount(fetchTask);

  const handleEdit = () => {
    editingTask = { ...task };
  };

  const handleTaskUpdated = (event) => {
    task = event.detail;
    editingTask = null;
  };

  const handleCancel = () => {
    editingTask = null;
  };
</script>

<div class="p-4 bg-white shadow-md rounded-md">
  <h2 class="text-lg font-semibold">Task Details</h2>
  {#if loading}
    <p>Loading task details...</p>
  {:else if error}
    <p>Error loading task: {error}</p>
  {:else if task}
    <p><strong>Title:</strong> {task.title}</p>
    <p><strong>Description:</strong> {task.description}</p>
    <p><strong>Due Date:</strong> {task.dueDate}</p>
    <p><strong>Category:</strong> {task.category}</p>
    <p><strong>Status:</strong> {task.status}</p>
    <p><strong>Priority:</strong> {task.priority}</p>
    <button on:click={handleEdit} class="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Edit</button>
  {/if}
</div>

{#if editingTask}
  <TaskForm {editingTask} isEditing={true} on:taskUpdated={handleTaskUpdated} on:cancel={handleCancel} />
{/if}
