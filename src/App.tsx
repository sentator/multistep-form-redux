import { Routes, Route } from "react-router-dom";

import { Homepage, SuccessPage } from "./pages";
import { deliveryFormPaths } from "./pages/paths";
import { DeliveryForm, Documents, Address, ConfirmData } from "./pages/deliveryForm";
import GeneralInformationWrapper from "./pages/deliveryForm/GeneralInformationWrapper";
import ScrollToTop from "./components/ScrollToTop";

function App() {
	return (
		<div className="app">
			<ScrollToTop />
			<Routes>
				<Route path="/" element={<Homepage />} />
				<Route path={deliveryFormPaths["/new-order"]} element={<DeliveryForm />}>
					<Route
						path={deliveryFormPaths["/new-order/general-information"]}
						element={<GeneralInformationWrapper />}
					/>
					<Route path={deliveryFormPaths["/new-order/documents"]} element={<Documents />} />
					<Route path={deliveryFormPaths["/new-order/address"]} element={<Address />} />
					<Route path={deliveryFormPaths["/new-order/confirm-data"]} element={<ConfirmData />} />
				</Route>
				<Route path="/success" element={<SuccessPage />} />
			</Routes>
		</div>
	);
}

export default App;
