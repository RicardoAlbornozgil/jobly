import React from "react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { render } from "@testing-library/react";
import CompanyDetail from "../../components/company/CompanyDetail";
import { UserProvider } from "../testUtils";

it("matches snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter initialEntries={["/company/ibm"]}>
      <UserProvider>
        <Routes>
          <Route path="/company/:handle" element={<CompanyDetail />} />
        </Routes>
      </UserProvider>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
