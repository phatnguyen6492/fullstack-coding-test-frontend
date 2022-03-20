import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import DeliveryStatusPicker from "../component/DeliveryStatusPicker";
import './Products.css'

const Actions = ({productId, reloadCallBack}) => {
  const navigate = useNavigate();
  const goToDetail = () => {
    navigate(`/product/${productId}`)
  }
  return (
    <React.Fragment>
      <DeliveryStatusPicker productId={productId} callback={reloadCallBack}></DeliveryStatusPicker>
      <button className="detail-button" onClick={goToDetail} style={{marginLeft: 8}}>Detail</button>
    </React.Fragment>
  );
}

const Products = () => {
  const [rowData, setRowData] = useState([]);
  const gridRef = useRef();

  const _fetchData = () => {
    const httpRequest = new XMLHttpRequest();

    httpRequest.open(
      "GET",
      "http://localhost:3000/product?size=100000&page=0"
    );
    httpRequest.send();
    httpRequest.onreadystatechange = () => {
      if (httpRequest.readyState === 4 && httpRequest.status === 200) {
        const response = JSON.parse(httpRequest.responseText)
        if (response.hasOwnProperty('items')) {
          const items = response.items;
          items.forEach((item) => {
            item.customer_name = item.customer.name;
            item.product_name = item.customer.name;
          })
          setRowData(response.items);
        }
      }
    };
  }

  useEffect(() => {
    _fetchData();
  }, []);

  const [columnDefs] = useState([
    { field: 'product_name', flex: 1, headerName: 'Product' },
    { field: 'customer_name', flex: 1, headerName: 'Customer' },
    { field: 'delivery_status', flex: 1, headerName: 'Delivery Status'},
    { field: 'delivery_address', flex: 1, headerName: 'Delivery Address' },
    { field: 'estimated_delivery_date', flex: 1, headerName: 'Estimated Delivery Date' },
    {
      field: '_id',
      minWidth: 210,
      flex: 1,
      headerName: 'Actions',
      cellClass: 'custom-action-cell',
      cellRendererSelector: params => {
        return {
          component: Actions,
          params: {productId: params.value, reloadCallBack: _fetchData}
        };
      }
    },
  ])

  return (
    <div style={{padding: '16px'}}>
      <h2>Products List</h2>
      <div className="ag-theme-alpine" style={{height: '560px', width: '100%'}}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          ref={gridRef}
          pagination={true}
          paginationPageSize={10}
          rowSelection={false}
          enableCellTextSelection={false}
        >
        </AgGridReact>
      </div>
    </div>
  );
};

export default Products;
