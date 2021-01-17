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
          <button class="btn btnPrimary" @click="getRepos" v-if="repos">Search Again!</button>
          <div class="repos__wrapper" v-if="repos">
            <!-- repo item -->
            <div class="repo-item" v-for="repo in repos" :key="repo.id">
              <div class="repos-info">
                <a class="link" target="_blank" :href="repo.html_url">{{ repo.name }}</a>
                <span>{{ repo.stargazers_count }} ⭐</span>
              </div>
            </div>
          </div>
      </div>
    </section>
  </div>
</template>

<script>
import search from '@/components/Search.vue';
import axios from 'axios';

export default {
  components: {
    search,
  },
  data() {
    return {
      search: '',
      err: null,
      repos: null,
    };
  },
  methods: {
    getRepos() {
      // console.log(`get user ${this.search} repos`);
      axios
        .get(`https://api.github.com/users/${this.search}/repos`)
        .then((res) => {
          this.err = false;
          this.repos = res.data;
        })
        .catch(() => {
          this.repos = null;
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

.repos__wrapper {
  width: 400px;
  margin: 30px 0;

}
.repos-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 10px 0;
  border-bottom: 1px solid #dbdbdb;
}
</style>
