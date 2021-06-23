export const categoriesToSingleString = (data: any) => {
  let result = "";
  if (data !== undefined) {
    data.forEach((category: any, index: number) => {
      if (index > 0) result += ", " + category.name.trim();
      else result += category.name.trim();
    });
  }
  return result;
};

export const stringToCategories = (data: string) => {
  let result = data.split(",");
  result.map((cat) => ({
    __typename: "Category",
    name: cat.trim(),
    slug: cat.trim().replace(" ", "-"),
  }));
  return result;
};
