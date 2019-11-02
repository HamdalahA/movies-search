<template>
  <div id="app">
    <search @search="changeMoviesResult"></search>
  </div>
</template>

<script>
import Search from "./components/Search";
export default {
  name: "app",
  components: {
    Search
  },
  data() {
    return {
      movies: []
    };
  },
  methods: {
    changeMoviesResult(results) {
      this.movies = results;
    }
  }
};
</script>
<style></style>
