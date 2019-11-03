import { shallowMount } from "@vue/test-utils";

import MovieList from "../../src/components/MovieList";
import Movie from "../../src/components/Movie";

describe("MovieList Component", () => {
  it("Should pass down props to the movie component", () => {
    const movies = [
      { Title: "Mission Impossible" },
      { Title: "Mission Impossible II" },
      { Title: "Mission Impossible III" }
    ];
    const wrapper = shallowMount(MovieList, {
      propsData: { movies }
    });

    const items = wrapper.findAll(Movie);

    for (let i = 0; i < items.length; i++) {
      const item = items.at(i);
      expect(item.props().movie).toBe(movies[i]);
    }
  });
});
