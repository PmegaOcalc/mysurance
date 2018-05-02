/* eslint-env jest */

import { shallow } from "enzyme";
import React from "react";
import renderer from "react-test-renderer";
import App from "../../pages/add.js";
import Router from "next/router";
import testData from "../../utils/test_data";
const mockedRouter = { push: () => {} };
Router.router = mockedRouter;

describe("Adding insurance", () => {
  it("Can add insurance item to the model", () => {
    const app = shallow(<App />);
    app.instance().addItem("Agricultural insurance");
    expect(app.instance().addItem("Intraterrestrial insurance")).toEqual(
      testData
    );
  });
});
