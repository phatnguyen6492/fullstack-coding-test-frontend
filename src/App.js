import React, { useState, useEffect, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';


const App = () => {
  const [rowData, setRowData] = useState([
    // {make: "Toyota", model: "Celica", price: 35000},
    // {make: "Ford", model: "Mondeo", price: 32000},
    // {make: "Porsche", model: "Boxter", price: 72000}
  ]);
  const gridRef = useRef();

  useEffect(() => {
    const httpRequest = new XMLHttpRequest();

    httpRequest.open(
      "GET",
      "http://server:3000/product?size=-1&page=0"
    );
    httpRequest.send();
    httpRequest.onreadystatechange = () => {
      if (httpRequest.readyState === 4 && httpRequest.status === 200) {
        setRowData(JSON.parse(httpRequest.items));
      }
    };
  }, []);

  const [columnDefs] = useState([
    { field: 'product', flex: 1 },
    { field: 'customer', flex: 1 },
    { field: 'delivery_status', flex: 1 },
    { field: 'delivery_address', flex: 1 },
    { field: 'estimated_delivery_date', flex: 1 },
  ])

  return (
    <div className="ag-theme-alpine" style={{height: '100vh', width: '100vw'}}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        ref={gridRef}
        pagination={true}
        paginationPageSize={10}
      >
      </AgGridReact>
    </div>
  );
};

export default App;
