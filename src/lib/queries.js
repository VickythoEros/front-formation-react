import {gql } from '@apollo/client';


export const GET_PRODUCTS = gql`
    query GetProducts($category:String!) {
        productByCategory(category:$category) {
            id,
            name,
            price,
            filter
        }
    }
`; 