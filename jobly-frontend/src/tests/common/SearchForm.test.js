import React from "react";
import { render } from "@testing-library/react";
import SearchForm from "../../components/common/SearchForm.js";


it("matches snapshot", function () {
  const { asFragment } = render(<SearchForm />);
  expect(asFragment()).toMatchSnapshot();
});
