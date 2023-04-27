import React from "react";
import { useTable, Column, useExpanded, useFilters } from "react-table";

import { OrdersTableData } from "../../types";
import OrdersTableFilters from "../ordersTableFilters/OrdersTableFilters";

import "./ordersTable.scss";

interface OrdersTableProps {
	columns: Column<OrdersTableData>[];
	data: OrdersTableData[];
}

const OrdersTable: React.FC<OrdersTableProps> = ({ columns, data }) => {
	// @ts-ignore
	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, state, setFilter } = useTable(
		{
			columns,
			data,
		},
		useFilters,
		useExpanded
	);

	// @ts-ignore
	const { filter }: { filter: string } = state;

	return (
		<div className="orders-table">
			<div className="orders-table__header">
				<OrdersTableFilters
					filterValue={filter}
					setFilterValue={setFilter}
					columnId="status"
					options={["Заявка оброблена", "В транзиті", "На складі", "У відділенні"]}
				/>
			</div>
			<div className="orders-table__body">
				<table {...getTableProps()}>
					<thead>
						{headerGroups.map((headerGroup) => (
							<tr {...headerGroup.getHeaderGroupProps()}>
								{headerGroup.headers.map((column) => (
									<th {...column.getHeaderProps()}>{column.render("Header")}</th>
								))}
							</tr>
						))}
					</thead>
					<tbody {...getTableBodyProps()}>
						{rows.map((row) => {
							prepareRow(row);
							return (
								<tr {...row.getRowProps()}>
									{row.cells.map((cell) => {
										return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
									})}
								</tr>
							);
						})}
					</tbody>
				</table>
				{rows.length === 0 && (
					<p className="orders-table__empty">Не знайдено жодної позиції, що відповідає заданим критеріям</p>
				)}
			</div>
		</div>
	);
};

export default OrdersTable;
