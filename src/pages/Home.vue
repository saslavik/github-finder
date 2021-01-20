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
          <div class="user__wrapper" v-if="user">
            <div class="user-info">
              <img :src="user.avatar_url" :alt="user.login">
              <div>
                <span>{{ user.name || user.login }}</span>
                <p>Count of repos: {{ repos.length }} </p>
              </div>
            </div>
          </div>
          <div class="repos__wrapper" v-if="repos">
            <!-- repo item -->
            <div class="sort">
              <span @click="sort('name')">Title &#8595;</span>
              <span @click="sort('stargazers_count')">Stars⭐&#8595;</span>
            </div>
            <div class="repo-item" v-for="repo in reposSort" :key="repo.id">
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
      currentSort: 'name',
      currentSortDir: 'asc',
      err: null,
      user: null,
      repos: null,
    };
  },
  computed: {
    reposSort() {
      return this.repos.slice().sort((a, b) => {
        let mod = 1;
        if (this.currentSortDir === 'desc') mod = -1;
        if (a[this.currentSort] < b[this.currentSort]) return -1 * mod;
        if (a[this.currentSort] > b[this.currentSort]) return 1 * mod;
        return 0;
      });
    },
  },
  methods: {
    getRepos() {
      // console.log(`get user ${this.search} repos`);
      axios.all([
        axios.get(`https://api.github.com/users/${this.search}`),
        axios.get(`https://api.github.com/users/${this.search}/repos`),
      ])
        .then(axios.spread((res1, res2) => {
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
    sort(e) {
      if (e === this.currentSort) {
        this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc';
      }
      this.currentSort = e;
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

.repos__wrapper {
  width: 400px;
  margin: 30px 0;
  .sort {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    span {
      cursor: pointer;
    }
  }
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
