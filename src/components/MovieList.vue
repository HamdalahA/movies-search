<template>
  <ul class="grid">
    <movie v-for="movie in movies" :movie="movie" :key="movie.imdbID">{{
      movie.Title
    }}</movie>
  </ul>
</template>

<script>
import Movie from "./Movie";
export default {
  name: "movie-list",
  props: {
    movies: {
      type: Array,
      required: true
    }
  },
  components: {
    Movie
  }
};
</script>

<style lang="scss" scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
  grid-column-gap: 6rem;
  grid-row-gap: 3rem;
  padding: 0;
  margin-top: 4rem;

  @media screen and (max-width: 700px) {
    grid-template-columns: repeat(auto-fill, minmax(25rem, 1fr));
    margin-top: 2rem;
  }
}
</style>
