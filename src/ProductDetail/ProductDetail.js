import React, {useEffect, useState, useCallback} from 'react';
import {
  useParams
} from "react-router-dom";
const ProductDetail = () => {
  let { id } = useParams();
  const [product, setProduct] = useState({})

  const _fetchData = useCallback(() => {
    const httpRequest = new XMLHttpRequest();

    httpRequest.open(
      "GET",
      `http://localhost:3000/product/${id}`
    );
    httpRequest.send();
    httpRequest.onreadystatechange = () => {
      if (httpRequest.readyState === 4 && httpRequest.status === 200) {
        const response = JSON.parse(httpRequest.responseText)
        if (response) {
          setProduct(response)
        }
      }
    };
  }, []);

  useEffect(() => {
    _fetchData();
  }, [_fetchData]);


  useEffect(() => {
    _fetchData()
  }, [_fetchData])

  return (
    <div style={{
      padding: '45px 186px',
      backgroundColor: 'lightgrey'
    }}>
      <h2>
        Product detail
      </h2>
      <p>
        Product: {product.product_type && product.product_type.name}
      </p>
      <p>
        Customer: {product.customer && product.customer.name}
      </p>
      <p>
        Delivery status: {product.delivery_status}
      </p>
      <p>
        Delivery address: {product.delivery_address}
      </p>
      <p>
        Estimated delivery date: {product.estimated_delivery_date}
      </p>
    </div>
  );
};

// function handleSelection(value, event) {}

export default ProductDetail;