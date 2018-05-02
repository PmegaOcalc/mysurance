/* eslint-env jest */

import { shallow, mount } from "enzyme";
import React from "react";
import renderer from "react-test-renderer";

import App from "../../pages/index.js";

import testData from "../../utils/test_data";
import insuranceListItems from "../../data/insurance_items";

describe("Homepage", () => {
  it("Starts empty", () => {
    const app = shallow(<App />);

    expect(app.find("a").text()).toEqual("Add insurance");
  });

  it("Shows insurance list", () => {
    const app = mount(<App />);
    app.setState({ items: testData });
    expect(app.find(".insuranceList-item-text").first().text()).toEqual(
      "Intraterrestrial insurance"
    );
  });

  it("Removes insurance from the list", () => {
    insuranceListItems.items = testData;
    const app = mount(<App />);
    app.find(".insuranceList-item-remove").first().simulate("click");

    expect(app.find(".insuranceList-item").length).toEqual(1);
  });
});
