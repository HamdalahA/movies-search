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

  describe("Error handling", () => {
    it("Should display an error if the API sends back an Error property", async () => {
      const response = {
        status: 200,
        data: { Response: "False", Error: "Too many results" }
      };

      axios.get.mockImplementation(async () => response);
      input.trigger("keyup.enter");

      await Vue.nextTick();

      const error = wrapper.find("span");
      expect(error.text()).toBe(response.data.Error);
    });

    it("Should make the error disappear if a new search is successful", async () => {
      wrapper.vm.error = "Too many results.";

      let error = wrapper.find("span");
      expect(error.exists()).toBe(true);

      const response = {
        status: 200,
        data: { Response: "True", Search: ["foobar", "hello"] }
      };
      axios.get.mockImplementation(async () => response);
      input.trigger("keyup.enter");

      await Vue.nextTick();

      error = wrapper.find("span");
      expect(error.exists()).toBe(false);
    });
  });
});
