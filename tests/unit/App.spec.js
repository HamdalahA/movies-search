import { shallowMount } from "@vue/test-utils";

import App from "../../src/App";
import Search from "../../src/components/Search";
import MovieList from "../../src/components/MovieList";

describe("App Component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(App);
  });

  it("should change result when search event is triggered", () => {
    expect(wrapper.vm.movies).toEqual([]);

    const movies = ["pretty little liars", "little"];
    let searchParameter = wrapper.find(Search);
    searchParameter.vm.$emit("search", movies);

    expect(wrapper.vm.movies).toBe(movies);
  });

  it("Should pass the movies props to MovieList", () => {
    const movieList = wrapper.find(MovieList);

    expect(movieList.props().movies).toBe(wrapper.vm.movies);
  });
});
