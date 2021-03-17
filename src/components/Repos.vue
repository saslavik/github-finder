<template>
  <div class="repos__wrapper" v-if="repos">

    <!-- repo sorting line  -->
    <div class="sort">
      <span @click="sort('name')">Title &#8595;</span>
      <span @click="sort('stargazers_count')">Stars⭐&#8595;</span>
    </div>

    <!-- repo item -->
    <div class="repo-item" v-for="repo in reposSort" :key="repo.id">
      <div class="repos-info">
        <a class="link" target="_blank" :href="repo.html_url">{{ repo.name }}</a>
        <span>{{ repo.stargazers_count }} ⭐</span>
      </div>
    </div>

    <!-- button Load More -->
    <div class="button-line">
      <button
        @click="loadMore"
        :class="{'btnDisabled': reposShow === repos.length}"
        :disabled='reposShow === repos.length'
        class="btn btnPrimary">Load more</button>
      </div>
  </div>
</template>

<script>
export default {
  props: {
    repos: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      currentSort: 'name',
      currentSortDir: 'asc',
      reposShow: 5,
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
      })
        .filter((row, index) => {
          if (index < this.reposShow) return true;
          return false;
        });
    },
  },
  methods: {
    sort(e) {
      if (e === this.currentSort) {
        this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc';
      }
      this.currentSort = e;
    },
    loadMore() {
      if (this.reposShow + 5 < this.repos.length) {
        this.reposShow += 5;
      } else this.reposShow = this.repos.length;
      return this.reposShow;
    },
  },
};
</script>

<style lang="scss">
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
button {
  margin-top: 20px;
  &.btnDisabled {
    cursor: default;
    opacity: .6;
  }
}
.button-line {
  display: flex;
  justify-content: center;
  text-align: center;
  padding: 15px 0;
}
</style>
