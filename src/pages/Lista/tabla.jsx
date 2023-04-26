import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'producto', headerName: 'Producto', width: 130 },
    { field: 'cantidad', headerName: 'Cantidad (gr)', width: 200 },
    { field: 'precio', headerName: 'Precio', width: 130},
];

const rows = [
    { id: 1, producto: 'Pastelito Zebra', cantidad: '369 Gr', precio: 82 },
    { id: 2, producto: 'Mayonesa', cantidad: 'Hellmans Clasica 507 Gr', precio: 51 },
    { id: 3, producto: 'Atun', cantidad: 'En Agua Lata 140 Gr', precio: 17 },
    { id: 4, producto: 'Galletas Oreo', cantidad: 'Original Vainilla 273.6 Gr', precio: 36 },
];

export default function DataTable() {
    return (
        <div style={{ marginTop: 70, height: 400, width: '99%' }}>
        <DataGrid
            rows={rows}
            columns={columns}
            paginationModel={{ page: 0, pageSize: 9 }}
            checkboxSelection
        />
        </div>
    );
}