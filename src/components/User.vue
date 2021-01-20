<template>
  <div class="user__wrapper">
    <div class="user-info">
      <img :src="user.avatar_url" :alt="user.login">
      <div>
        <span>{{ user.name || user.login }}</span>
        <p>Count of repos: {{ repos.length }} </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true,
    },
    repos: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.user__wrapper {
  margin: 20px 0;
  width: 400px;
  .user-info {
    display: flex;
  }
  img {
    width: 80px;
    margin-right: 20px;
  }
}
</style>
