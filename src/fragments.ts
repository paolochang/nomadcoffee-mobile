import { gql } from "@apollo/client";

export const SEE_COFFEE_SHOPS = gql`
  fragment SeeCoffeeShops on CoffeeShop {
    id
    name
    latitude
    longitude
    photos {
      id
      url
    }
    categories {
      name
      slug
    }
    is_mine
    created_at
    updated_at
  }
`;
