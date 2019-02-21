<template lang="pug">
  .login
    input(placehold="用户名" v-model="username")
    input(placehold="密码" v-model="password")
</template>
<script>
export default {
  data() {
    return {
      username: "",
      password: ""
    }
  }
}
</script>

