<script>
  import { createEventDispatcher } from 'svelte';
  import { goto } from '$app/navigation';

  export let task;
  const dispatch = createEventDispatcher();

  function deleteTask() {
    dispatch('delete', task._id);
  }

  function viewTask() {
    goto(`/tasks/${task._id}`);
  }
</script>

<style>
  .task-button {
    position: relative;
    padding: 1rem;
    background-color: #ffffff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 0.25rem;
    cursor: pointer;
  }

  .delete-button {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    background-color: #ff0000;
    color: #ffffff;
    border: none;
    border-radius: 50%;
    padding: 0.25rem;
    font-size: 1rem;
    width: 1.5rem;
    height: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .task-values {
    text-align: left;
  }

  .truncated-description {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .truncated-title {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
</style>

<button class="task-button" on:click={viewTask}>
  <button on:click|stopPropagation={deleteTask} class="delete-button">X</button>
  <h3 class="truncated-title text-lg font-semibold">{task.title}</h3>
  <div class="task-values">
    <p class="truncated-description">{task.description}</p>
    <p>Due: {task.dueDate}</p>
    <p>Category: {task.category}</p>
    <p>Status: {task.status}</p>
    <p>Priority: {task.priority}</p>
  </div>
</button>
