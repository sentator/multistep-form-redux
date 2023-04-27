// @ts-nocheck
import React from "react";
import { useTable, Column, useExpanded, useFilters, usePagination } from "react-table";

import { OrdersTableData } from "../../types";
import OrdersTableFilters from "../ordersTableFilters/OrdersTableFilters";
import OrdersTablePagination from "../ordersTablePagination/OrdersTablePagination";

import "./ordersTable.scss";

interface OrdersTableProps {
	columns: Column<OrdersTableData>[];
	data: OrdersTableData[];
}

const OrdersTable: React.FC<OrdersTableProps> = ({ columns, data }) => {
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		page,
		nextPage,
		previousPage,
		canNextPage,
		canPreviousPage,
		pageOptions,
		gotoPage,
		pageCount,
		prepareRow,
		state,
		setFilter,
	} = useTable(
		{
			columns,
			data,
			initialState: {
				pageSize: 2,
			},
			paginateExpandedRows: false,
		},
		useFilters,
		useExpanded,
		usePagination
	);

	const { filter, pageIndex }: { filter: string; pageIndex: number } = state;

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
						{page.map((row: any) => {
							prepareRow(row);
							return (
								<tr {...row.getRowProps()}>
									{row.cells.map((cell: any) => {
										return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
									})}
								</tr>
							);
						})}
					</tbody>
				</table>
				{page.length === 0 && (
					<p className="orders-table__empty">Не знайдено жодної позиції, що відповідає заданим критеріям</p>
				)}
			</div>
			<div className="orders-table__footer">
				<OrdersTablePagination
					currentPage={pageIndex + 1}
					pages={pageOptions.length}
					canPreviousPage={canPreviousPage}
					canNextPage={canNextPage}
					gotoPreviousPage={() => previousPage()}
					gotoNextPage={() => nextPage()}
					gotoStart={() => gotoPage(0)}
					gotoEnd={() => gotoPage(pageCount - 1)}
				/>
			</div>
		</div>
	);
};

export default OrdersTable;
