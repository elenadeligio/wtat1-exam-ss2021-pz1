
<template>
  <div>
  <h1>Current Users</h1>
  <div class="users">
    <User v-for="user in users" :key="user.id" :user="user" />
  </div>
  </div>
</template>
<script>
import User from "@/components/User.vue";
import axios from "axios";

export default {
  name: "Userlist",
  components: {
    User
  },
  data() {
    return {
      users: null
    };
  },
  created() {
    axios
      .get(
        "http://localhost:9000/api/users"
      )
      .then(response => {
        this.users = response.data;
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>

<style scoped></style>
