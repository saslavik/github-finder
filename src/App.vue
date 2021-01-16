<template>
  <div class="wrapper">
    <!-- header -->
    <header>
      <div class="navbar">
        <div class="container">
          <div class="logo">LOGO</div>
        </div>
      </div>
    </header>
    <router-view></router-view>
    <!-- footer -->
  </div>
</template>

<script>

export default {
  data() {
    return {
      links: [
        {
          title: 'Home',
          url: '/',
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.navbar-link{
  &.router-link-exact-active {
    color: blue;
  }
}
</style>
