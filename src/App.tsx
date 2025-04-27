import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import { routes } from "./routes";

import "./App.css";
import { Modal } from "./components/share/Modal";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./api/queryClient";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <BrowserRouter>{routes}</BrowserRouter>
        <Modal />
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
