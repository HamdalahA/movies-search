<template>
  <ul>
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

<style></style>
