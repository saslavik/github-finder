<template>
  <div class="wrapper-content wrapper-content--fixed">
    <section>
      <div class="container">
        <h1>Home page</h1>
          <div class="err_wrapper" v-if="err">
            <p>{{ err }}</p>
          </div>
          <search placeholder="type github name"
          :value="search"
          @search='search = $event'/>
          <button class="btn btnPrimary" @click="getRepos" v-if="!repos">Search!</button>
          <button class="btn btnPrimary" @click="getRepos" v-else>Search Again!</button>

          <!-- user info -->
          <user :user="user" :repos="repos" v-if="user"/>

          <!-- repos list -->
          <repos :user="user" :repos="repos" v-if="repos"/>
      </div>
    </section>
  </div>
</template>

<script>
import search from '@/components/Search.vue';
import axios from 'axios';
import user from '@/components/User.vue';
import repos from '@/components/Repos.vue';

export default {
  components: {
    search,
    user,
    repos,
  },
  data() {
    return {
      search: '',
      err: null,
      user: null,
      repos: null,
    };
  },
  methods: {
    getRepos() {
      axios.all([
        axios.get(`https://api.github.com/users/${this.search}`),
        axios.get(`https://api.github.com/users/${this.search}/repos`),
      ])
        .then(axios.spread((res1, res2) => {
          console.log(res1, res2);
          this.err = false;
          this.user = res1.data;
          this.repos = res2.data;
        }))
        .catch(() => {
          this.repos = null;
          this.user = null;
          this.err = "Can't find this user";
        });
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
