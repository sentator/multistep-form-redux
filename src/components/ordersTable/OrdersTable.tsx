// @ts-nocheck
import React from "react";
import { useTable, Column, useExpanded, useFilters, usePagination, useGlobalFilter } from "react-table";

import { OrdersTableData } from "../../types";
import { ordersTableDefaultGlobalFilter } from "../../utils";
import OrdersTableFilters from "../ordersTableFilters/OrdersTableFilters";
import OrdersTablePagination from "../ordersTablePagination/OrdersTablePagination";

import "./ordersTable.scss";

interface OrdersTableProps {
	columns: Column<OrdersTableData>[];
	data: OrdersTableData[];
}

const OrdersTable: React.FC<OrdersTableProps> = ({ columns, data }) => {
	const filterOptions = { filteredIds: ["status"] };
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
		setGlobalFilter,
	} = useTable(
		{
			columns,
			data,
			initialState: {
				pageSize: 5,
			},
			paginateExpandedRows: false,
			getSubRows: (row: any) => row.subRows,
			globalFilter: (rows, columnIds, filterValue) =>
				ordersTableDefaultGlobalFilter(rows, columnIds, filterValue, filterOptions),
		},
		useGlobalFilter,
		useFilters,
		useExpanded,
		usePagination
	);

	const { pageIndex, globalFilter }: { pageIndex: number; globalFilter: string } = state;

	return (
		<div className="orders-table">
			<div className="orders-table__header">
				<OrdersTableFilters
					filterValue={globalFilter}
					setFilterValue={setGlobalFilter}
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
