import React from "react";
/* https://react-data-table-component.netlify.app/?path=/story/getting-started-intro--page*/
import DataTable from 'react-data-table-component';

export default function Listado({ data, columns = [] }) {

    return (
        <>
            {data.length > 0 && (
                <DataTable
                    columns={columns}
                    data={data}
                    pagination
                />
            )}
        </>
    );
}
