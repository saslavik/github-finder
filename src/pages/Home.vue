<template>
  <div class="wrapper-content wrapper-content--fixed">
    <section>
      <div class="container">
        <h1>Home page</h1>
          <search placeholder="type github name"
          :value="search"
          @search='search = $event'/>
          <button class="btn btnPrimary" @click="getRepos">Search!</button>
      </div>
    </section>
  </div>
</template>

<script>
import search from '@/components/Search.vue';

export default {
  components: {
    search,
  },
  data() {
    return {
      search: '',
    };
  },
  methods: {
    getRepos() {
      console.log(`get user ${this.search} repos`);
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  align-items: center;
  flex-direction: column;
}
.wrapper__search {
  margin-top: 36px;
}
button {
  margin-top: 36px;
}
</style>
