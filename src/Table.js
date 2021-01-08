import React, {useState} from "react";
import {useTable, useFilters, useSortBy } from "react-table";
import styled from "styled-components";

const Styles = styled.div`
    /* My New CSS for Tooltip */
    .new-tooltip span {
      visibility: hidden;
      width: 400px;
      background-color: black;
      color: #fff;
      text-align: center;
      border-radius: 6px;
      padding: 5px 0;
      position: absolute;
      z-index: 1;
      bottom: 80%;
      left: 50%;
      margin-left: -60px;
      cursor: pointer;
    }

    .new-tooltip:hover span {
      visibility: visible;
    }
`;

export default function Table({ columns, data}) {
    const [filterInput, setFilterInput] = useState("");

    const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setFilter
} = useTable({
    columns,
    data
},
    useFilters,
    useSortBy
)
    const handleFilterChange = e => {
        const value = e.target.value || undefined;
        setFilter("name", value);
        setFilterInput(value)
    };
return (
    <Styles>
        <input
            value={filterInput}
            onChange={handleFilterChange}
            placeholder={"Search name"}
        />
    <table {...getTableProps()}>
        <thead>
        {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                    <th {...column.getHeaderProps(column.getSortByToggleProps())}
                    className={
                        column.isSorted ? column.isSortedDesc ? "sort-desc" : "sort-asc" : ""
                    }
                    >{column.render("Header")}</th>
                ))}
            </tr>
        ))}
        </thead>
        <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
            prepareRow(row);
            return (
                <tr {...row.getRowProps()}>
                    {row.cells.map((cell, index) => {
                        if (cell.column.Header === "Followers") {
                            return <td className="new-tooltip" {...cell.getCellProps()}>{cell.render("Cell")}{<span>{row.original.names}</span>}</td>
                        }
                        else{
                            return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    }})}
                </tr>
            )
        })}
        </tbody>
    </table>
    </Styles>
)
}