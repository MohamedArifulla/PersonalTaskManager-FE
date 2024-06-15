<script>
  import { createEventDispatcher } from 'svelte';

  export let editingTask = null;
  export let isEditing = false;

  let formData = {
    title: '',
    description: '',
    dueDate: '',
    category: '',
    status: 'Pending',
    priority: 'Low',
  };
  let errorMessage = '';
  let successMessage = '';

  const dispatch = createEventDispatcher();

  function setFormData(task) {
    if (task) {
      formData = {
        title: task.title,
        description: task.description,
        dueDate: new Date(task.dueDate).toISOString().split('T')[0], // Convert to yyyy-MM-dd
        category: task.category,
        status: task.status,
        priority: task.priority,
      };
    } else {
      formData = {
        title: '',
        description: '',
        dueDate: '',
        category: '',
        status: 'Pending',
        priority: 'Low'
      };
    }
  }

  $: setFormData(editingTask);

  async function handleSubmit() {
    errorMessage = '';
    successMessage = '';

    if (formData.title && formData.description && formData.dueDate && formData.category) {
      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const method = isEditing ? 'PUT' : 'POST';
        const url = isEditing ? `${apiUrl}/tasks/${editingTask._id}` : `${apiUrl}/tasks`;

        const response = await fetch(url, {
          method,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify(formData)
        });

        if (response.ok) {
          const data = await response.json();
          dispatch('taskUpdated', data);
          successMessage = isEditing ? 'Task updated successfully' : 'Task created successfully';
          if (!isEditing) {
            setFormData(null); // Reset form if creating a new task
          }
        } else {
          const errorData = await response.json();
          errorMessage = errorData.message || 'Failed to save task';
        }
      } catch (error) {
        console.error('Error saving task:', error);
        errorMessage = 'Failed to save task';
      }
    } else {
      errorMessage = 'All fields are required';
    }
  }

  function handleCancel() {
    dispatch('cancel');
  }
</script>

<div class="p-4 bg-white shadow-md rounded-md">
  <h2 class="text-lg font-semibold">{isEditing ? 'Edit Task' : 'Create Task'}</h2>
  <div class="space-y-2">
    <input type="text" placeholder="Title" bind:value={formData.title} class="w-full p-2 border border-gray-300 rounded" />
    <textarea placeholder="Description" bind:value={formData.description} class="w-full p-2 border border-gray-300 rounded"></textarea>
    <input type="date" bind:value={formData.dueDate} class="w-full p-2 border border-gray-300 rounded" />
    <select bind:value={formData.category} class="w-full p-2 border border-gray-300 rounded">
      <option value="" disabled>Select Category</option>
      <option value="Work">Work</option>
      <option value="Personal">Personal</option>
      <option value="Others">Others</option>
    </select>
    <select bind:value={formData.priority} class="w-full p-2 border border-gray-300 rounded">
      <option value="" disabled>Select Priority</option>
      <option value="Low">Low</option>
      <option value="Medium">Medium</option>
      <option value="High">High</option>
    </select>
    <select bind:value={formData.status} class="w-full p-2 border border-gray-300 rounded">
      <option value="" disabled>Select Status</option>
      <option value="Pending">Pending</option>
      <option value="In Progress">In Progress</option>
      <option value="Completed">Completed</option>
    </select>
    {#if errorMessage}
      <div class="bg-red-100 text-red-800 p-2 rounded">{errorMessage}</div>
    {/if}
    {#if successMessage}
      <div class="bg-green-100 text-green-800 p-2 rounded">{successMessage}</div>
    {/if}
    <div class="flex space-x-2">
      <button on:click|preventDefault={handleSubmit} class="p-2 bg-blue-500 text-white rounded">{isEditing ? 'Update' : 'Create'}</button>
      {#if isEditing}
        <button on:click|preventDefault={handleCancel} class="p-2 bg-gray-500 text-white rounded">Cancel</button>
      {/if}
    </div>
  </div>
</div>
