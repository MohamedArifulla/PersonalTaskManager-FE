<script>
    import { currentUser } from '../stores/userStore';
  
    $: user = $currentUser;
  </script>
  
  <div class="bg-white p-4 rounded shadow">
    <h3 class="text-lg font-bold">User Profile</h3>
    <p>Username: {user.username}</p>
    <p>Email: {user.email}</p>
  </div>
  