import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";

import App from "./App";
import { OrderFormContextProvider, MuiThemeProvider } from "./context";
import store from "./store";

import "./index.scss";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
	<HashRouter>
		<Provider store={store}>
			<OrderFormContextProvider>
				<MuiThemeProvider>
					<App />
				</MuiThemeProvider>
			</OrderFormContextProvider>
		</Provider>
	</HashRouter>
);
