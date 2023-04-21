import React from "react";
import { Column } from "react-table";
import { useNavigate } from "react-router-dom";

import { OrdersTableData } from "../types";
import { formatDateForOrderStatus } from "../utils";
import Button from "../components/button/Button";

const useOrdersTableColumns = () => {
	const navigate = useNavigate();
	const columns: Column<OrdersTableData>[] = React.useMemo(
		() => [
			{
				id: "expander",
				Header: ({ getToggleAllRowsExpandedProps, isAllRowsExpanded }: any) => (
					<button {...getToggleAllRowsExpandedProps()} className="btn-expand" type="button">
						{isAllRowsExpanded ? "▼" : "►"}
					</button>
				),
				Cell: ({ row }: { row: any }) =>
					row.canExpand ? (
						<button {...row.getToggleRowExpandedProps()} className="btn-expand" type="button">
							{row.isExpanded ? "▼" : "►"}
						</button>
					) : null,
			},
			{
				Header: "Країна",
				accessor: ({ country }) => {
					return (
						<span className="cell-country">
							{country.icon ? (
								<span className="cell-country__icon">
									<img src={country.icon} alt={country.name} />
								</span>
							) : null}
							<span className="cell-country__name">{country.name}</span>
						</span>
					);
				},
			},
			{ Header: "Магазин", accessor: ({ shop }) => shop.name },
			{ Header: "Назва посилки", accessor: "parcelName" },
			{ Header: "Трек-номер", accessor: "trackNumber" },
			{
				Header: "Товари",
				columns: [
					{
						Header: "Назва товару",
						accessor: "productName",
					},
					{
						Header: "Кількість, од.",
						accessor: "quantity",
					},
					{
						Header: (
							<span>
								Вартість, всього <br /> / за 1 од.
							</span>
						),
						accessor: "totalPrice",
					},
				],
			},
			{
				Header: "Дії",
				columns: [
					{
						id: "status",
						Header: "Статус",
						accessor: "status",
						Cell: (value: any) => {
							const status = value.cell.row.original.status;
							const formattedDate = Boolean(status.createdAt)
								? formatDateForOrderStatus(new Date(status.createdAt))
								: "";
							const cellValue = (
								<>
									<span>{status.name}</span>
									<br />
									<span>{formattedDate}</span>
								</>
							);
							return cellValue;
						},
					},
					{
						id: "user",
						Header: "Користувач",
						accessor: "_id",
						Cell: (value: any) => {
							const id = value.cell.row.original._id;
							return id ? (
								<Button
									type="button"
									title="Редагувати"
									onClick={() => navigate(`/user/orders/${id}/general-information`)}
								/>
							) : (
								""
							);
						},
					},
					{
						id: "admin",
						Header: "Адміністратор",
						accessor: "_id",
						Cell: (value: any) => {
							const id = value.cell.row.original._id;
							return id ? (
								<Button
									type="button"
									title="Редагувати"
									onClick={() => navigate(`/admin/orders/${id}`)}
								/>
							) : (
								""
							);
						},
					},
				],
			},
		],
		[]
	);
	return columns;
};

export default useOrdersTableColumns;
