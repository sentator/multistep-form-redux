import React from "react";

import "./ordersTablePagination.scss";

interface OrdersTablePaginationProps {
	currentPage: number;
	pages: number;
	canPreviousPage: boolean;
	canNextPage: boolean;
	gotoPreviousPage: () => void;
	gotoNextPage: () => void;
	gotoStart: () => void;
	gotoEnd: () => void;
}

const OrdersTablePagination: React.FC<OrdersTablePaginationProps> = ({
	currentPage,
	pages,
	canPreviousPage,
	canNextPage,
	gotoPreviousPage,
	gotoNextPage,
	gotoStart,
	gotoEnd,
}) => {
	return (
		<div className="table-pagination">
			<div className="table-pagination__pages-info">
				<span>Сторінка: </span>
				<span className="table-pagination__current-page">{currentPage}</span>
				<span> із </span>
				<span className="table-pagination__pages-quantity">{pages}</span>
			</div>
			<div className="table-pagination__buttons">
				<button
					className="table-pagination__button table-pagination__button--first"
					onClick={gotoStart}
					disabled={!canPreviousPage}
				>
					{"<<"}
				</button>
				<button className="table-pagination__button" onClick={gotoPreviousPage} disabled={!canPreviousPage}>
					Назад
				</button>
				<button className="table-pagination__button" onClick={gotoNextPage} disabled={!canNextPage}>
					Вперед
				</button>
				<button
					className="table-pagination__button table-pagination__button--last"
					onClick={gotoEnd}
					disabled={!canNextPage}
				>
					{">>"}
				</button>
			</div>
		</div>
	);
};

export default OrdersTablePagination;
