import React from "react";
import { render, act } from "@testing-library/react";
import SignupForm from "../../components/auth/SignupForm";
import { MemoryRouter } from "react-router";

it("renders SignupForm without crashing", function () {
  act(() => {
    render(
      <MemoryRouter>
        <SignupForm />
      </MemoryRouter>
    );
  });
});
