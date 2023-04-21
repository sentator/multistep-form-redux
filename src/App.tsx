import { Routes, Route } from "react-router-dom";

import { Homepage, SuccessPage } from "./pages";
import { createOrderFormPaths, editOrderFormUserPaths } from "./pages/paths";
import {
	GeneralInformationWrapper,
	CreateOrderForm,
	Documents,
	Address,
	ConfirmData,
} from "./pages/deliveryForm/createOrder";
import EditOrderFormAdmin from "./pages/deliveryForm/editOrder/admin/EditOrderFormAdmin";
import {
	EditOrderFormUser,
	GeneralInformationWrapper as GeneralInformationWrapperUser,
	Documents as DocumentsUser,
	Address as AddressUser,
	ConfirmData as ConfirmDataUser,
} from "./pages/deliveryForm/editOrder/user";
import ScrollToTop from "./components/ScrollToTop";

function App() {
	return (
		<div className="app">
			<ScrollToTop />
			<Routes>
				<Route path="/" element={<Homepage />} />
				<Route path={createOrderFormPaths["/new-order"]} element={<CreateOrderForm />}>
					<Route
						path={createOrderFormPaths["/new-order/general-information"]}
						element={<GeneralInformationWrapper />}
					/>
					<Route path={createOrderFormPaths["/new-order/documents"]} element={<Documents />} />
					<Route path={createOrderFormPaths["/new-order/address"]} element={<Address />} />
					<Route path={createOrderFormPaths["/new-order/confirm-data"]} element={<ConfirmData />} />
				</Route>
				<Route path="/admin/orders/:orderId" element={<EditOrderFormAdmin />} />
				<Route path={editOrderFormUserPaths["/user/orders"]} element={<EditOrderFormUser />}>
					<Route
						path={editOrderFormUserPaths["/user/orders/:orderId/general-information"]}
						element={<GeneralInformationWrapperUser />}
					/>
					<Route
						path={editOrderFormUserPaths["/user/orders/:orderId/documents"]}
						element={<DocumentsUser />}
					/>
					<Route path={editOrderFormUserPaths["/user/orders/:orderId/address"]} element={<AddressUser />} />
					<Route
						path={editOrderFormUserPaths["/user/orders/:orderId/confirm-data"]}
						element={<ConfirmDataUser />}
					/>
				</Route>
				<Route path="/success" element={<SuccessPage />} />
			</Routes>
		</div>
	);
}

export default App;
