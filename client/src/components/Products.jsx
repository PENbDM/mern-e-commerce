import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import axios from "axios";
import { URL } from "../App";
import Product from "./Product";
import StyledLoader from "./Skeleton/Skeleton";
import { vercelURL } from "../App";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  @media screen and (max-width: 605px) {
    max-width: 700px;
    padding: 20px;
  }

  @media screen and (max-width: 500px) {
    max-width: 600px;
    padding: 20px;
  }

  @media screen and (max-width: 478px) {
    width: 500px;
    padding: 20px;
  }
`;

const Products = ({ category, filters, sort }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get(
          category ? `${vercelURL}/products?category=${category}` : `${vercelURL}/products`
        );
        setProducts(response.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, [category]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [category, filters, sort]);

  useEffect(() => {
    category &&
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [products, category, filters]);

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  const skeletons = [...new Array(10)].map((_, index) => (
    <StyledLoader key={index} />
  ));

  return (
    <Container>
      {loading
        ? skeletons
        : category
        ? filteredProducts.map((item) => <Product item={item} key={item.id} />)
        : products
            .slice(0, 8)
            .map((item) => <Product item={item} key={item.id} />)}
    </Container>
  );
};

export default Products;
