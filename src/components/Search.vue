<template>
  <div class="search">
    <input v-model="searchParams" @keyup.enter="search" />
    <span v-if="error">{{ error }}</span>
  </div>
</template>

<script>
import axios from "axios";
const BASE_URL = `https://www.omdbapi.com/?apikey=${process.env.VUE_APP_OMDB_KEY}`;
export default {
  name: "search",
  data() {
    return {
      searchParams: "",
      error: ""
    };
  },
  methods: {
    async search() {
      let response = await axios.get(`${BASE_URL}&s=${this.searchParams}`);
      if (response.status === 200) {
        let data = response.data;
        if (data.Response === "True") {
          this.error = "";
          return this.$emit("search", data.Search);
        }
        this.error = data.Error;
      }
    }
  }
};
</script>

<style></style>
