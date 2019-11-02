import axios from "axios";
import Vue from "vue";
import { shallowMount } from "@vue/test-utils";

import Search from "../../src/components/Search";

jest.mock("axios");

describe("Search Component", () => {
  let wrapper;
  let input;

  const mockThenTrigger = response => {
    axios.get.mockImplementation(async () => response);
    input.trigger("keyup.enter");
  };

  beforeEach(() => {
    wrapper = shallowMount(Search);
    input = wrapper.find("input");
    input.setValue("little");
  });

  it("Should send request to OMDB API", () => {
    const response = { status: 200, data: { Response: true } };
    mockThenTrigger(response);

    expect(axios.get).toHaveBeenCalledWith(
      `https://www.omdbapi.com/?apikey=${process.env.VUE_APP_OMDB_KEY}&s=little`
    );
    expect(axios.get).toHaveBeenCalledTimes(1);
  });

  it("Should emit data if results are successfully created", async () => {
    const movies = ["pretty little liars", "little"];
    const response = {
      status: 200,
      data: { Response: "True", Search: movies }
    };
    mockThenTrigger(response);

    await Vue.nextTick();

    expect(wrapper.emitted("search")).toBeTruthy();
    expect(wrapper.emitted().search[0][0]).toEqual(movies);
  });

  it("Should not emit data if response is not 200", () => {
    const response = { status: 500, data: { Response: "True", Search: [] } };
    mockThenTrigger(response);

    expect(wrapper.emitted("search")).toBeFalsy();
  });
});
