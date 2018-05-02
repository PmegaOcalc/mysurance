/* eslint-env jest */

import { shallow } from "enzyme";
import React from "react";
import renderer from "react-test-renderer";

import App from "../../components/add_insurance.js";

describe("Adding insurance", () => {
  it("Calls the callback with proper parameters", () => {
    const addItem = jest.fn();
    const categories = [
      {
        pageid: 34182415,
        ns: 14,
        title: "Agricultural insurance"
      }
    ];
    const app = shallow(<App addItem={addItem} items={categories} />);

    app.find(".insuranceItemCategory").first().simulate("click");

    expect(addItem).toHaveBeenCalledWith("Agricultural insurance");
  });
});
