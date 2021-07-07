<template>
  <center>
    <br />
    <h1>This is the Mypage component</h1>
    <Userlist/>
  </center>
</template>

<script>
import Userlist from "@/components/Userlist";
export default {
  components: {Userlist},
  data() {
    return {};
  }
};
</script>

<style scoped></style>
