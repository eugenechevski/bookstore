import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import Page from "components/general/Page";
import DataObject from "utils/DataObject";

describe("OffCanvas component", () => {
  let categories: ICategory[];

  beforeAll(async () => {
    categories = (
      await DataObject().then((createDataObject) => createDataObject())
    ).getCategories();
  });

  beforeEach(async () => {
    cleanup();
    render(
      <MemoryRouter>
        <Page content={<></>} blank={false} testCategories={categories}></Page>
      </MemoryRouter>
    );
  });

  it("renders category links", () => {
    for (let i = 0; i < categories.length; i++) {
      expect(screen.getByText(categories[i].getName())).toBeInTheDocument();
    }
  });

  it("redirects to a category page", () => {
    const redirect = jest.fn();

    for (let i = 0; i < categories.length; i++) {
      const link = screen.getByText(categories[i].getName());

      link.addEventListener("click", () => redirect());
      userEvent.click(link);

      expect(redirect).toHaveBeenCalled();
    }
  });
});
