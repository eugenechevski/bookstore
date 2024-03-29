import Book from "classes/Book";
import Category from "classes/Category";
import fetchData from "src/utils/fetchData";

async function DataObject(): Promise<() => Promise<DataObject>> {
  /**
   * Fetches and generates the initial data
   */
  async function initializeData(): Promise<Category[]> {
    const rawData = await fetchData();
    const lists = rawData.results.lists;
    const categories = generateCategories(lists);
    return categories;
  }

  /**
   * Generates categories based on the given lists
   * @param lists An array of lists obtained from the API response
   */
  function generateCategories(lists: ListData[]): Category[] {
    const categories = [];
    for (const list of lists) {
      const category = new Category(
        list.list_name,
        list.books.map((book) =>
          new Book(
            book.title,
            book.author,
            list.list_name,
            book.book_image,
            book.rank,
            book.description,
            book.buy_links
          )
        )
      );
      categories.push(category);
    }
    return categories;
  }

  /**
   * Expands the initial data into more useful containers
   * @param categories An array of Category objects
   */
  async function expandData(
    categories: Category[]
  ): Promise<{ categories; categoryMap; bookMap; books }> {
    const categoryMap = {};
    const bookMap = {};
    const books = [];

    for (const category of categories) {
      // derive categories
      categoryMap[category.getFormattedName()] = category;

      // derive books
      const categoryBooks = category.getBooks();
      for (const book of categoryBooks) {
        bookMap[book.getFormattedTitle()] = book;
        books.push(book);
      }
    }

    return { categories, categoryMap, bookMap, books };
  }

  /**
   * Creates a DataObject from the given data containers
   * @param categories An array of Category objects
   * @param categoryMap A map of category names to their respective Category objects
   * @param bookMap A map of book titles to their respective Book objects
   * @param books An array of all Book objects
   */
  function createDataObject(
    categories: Category[],
    categoryMap: CategoryMap,
    bookMap: BookMap,
    books: Book[]
  ): DataObject {
    function getCategories() {
      return categories;
    }

    function getCategoryMap() {
      return categoryMap;
    }

    function getBookMap() {
      return bookMap;
    }

    function getBooks() {
      return books;
    }

    return {
      getCategories,
      getCategoryMap,
      getBookMap,
      getBooks,
    };
  }

  /**
   * Generates the complete DataObject
   */
  async function generateDataObject(): Promise<DataObject> {
    const categories = await initializeData();
    const expandedData = await expandData(categories);
    const dataObject = createDataObject(
      expandedData.categories,
      expandedData.categoryMap,
      expandedData.bookMap,
      expandedData.books
    );
    return dataObject;
  }

  return generateDataObject;
}

export default DataObject;
