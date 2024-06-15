import { writable } from 'svelte/store';

function createTaskStore() {
  const { subscribe, set, update } = writable({
    tasks: [],
    filter: { category: '', status: '', dueDate: '' },
    filteredTasks: [],
    editingTask: null,
    sortBy: 'dueDate',
    sortDirection: 'asc'
  });

  const priorityOrder = {
    High: 1,
    Medium: 2,
    Low: 3
  };

  const applyFiltersAndSort = (store) => {
    store.filteredTasks = store.tasks
      .filter(task => {
        const categoryMatch = !store.filter.category || task.category === store.filter.category;
        const statusMatch = !store.filter.status || task.status === store.filter.status;
        const dueDateMatch = !store.filter.dueDate || new Date(task.dueDate).toDateString() === new Date(store.filter.dueDate).toDateString();
        return categoryMatch && statusMatch && dueDateMatch;
      })
      .sort((a, b) => {
        let comparison = 0;

        if (store.sortBy === 'priority') {
          const priorityA = priorityOrder[a.priority] || 4;
          const priorityB = priorityOrder[b.priority] || 4;
          comparison = priorityA - priorityB;
        } else {
          const dateA = new Date(a[store.sortBy]);
          const dateB = new Date(b[store.sortBy]);
          comparison = dateA - dateB;
        }

        return store.sortDirection === 'asc' ? comparison : -comparison;
      });

    return store;
  };

  const fetchTasks = async () => {
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

      const fetchedTasks = await response.json();
      taskStore.setTasks(fetchedTasks);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    }
  };

  return {
    subscribe,
    setFilter: (type, value) => update(store => {
      store.filter[type] = value;
      return applyFiltersAndSort(store);
    }),
    setTasks: (tasks) => update(store => {
      store.tasks = tasks.map(task => ({
        ...task,
        id: task._id || task.id || Date.now().toString() // Ensure unique ID
      }));
      return applyFiltersAndSort(store);
    }),
    createTask: (task) => update(store => {
      store.tasks = [...store.tasks, { ...task, id: Date.now().toString() }];
      return applyFiltersAndSort(store);
    }),
    updateTask: (updatedTask) => update(store => {
      store.tasks = store.tasks.map(task => task.id === updatedTask.id ? updatedTask : task);
      store.editingTask = null;
      return applyFiltersAndSort(store);
    }),
    deleteTask: (id) => update(store => {
      store.tasks = store.tasks.filter(task => task.id !== id);
      return applyFiltersAndSort(store);
    }),
    sortTasks: (sortBy) => update(store => {
      store.sortBy = sortBy;
      return applyFiltersAndSort(store);
    }),
    setSortDirection: (direction) => update(store => {
      store.sortDirection = direction;
      return applyFiltersAndSort(store);
    }),
    setEditingTask: (task) => update(store => {
      store.editingTask = task;
      return store;
    }),
    resetSort: () => update(store => {
      store.sortBy = 'dueDate';
      store.sortDirection = 'asc';
      return applyFiltersAndSort(store);
    }),
    fetchTasks
  };
}

export const taskStore = createTaskStore();
