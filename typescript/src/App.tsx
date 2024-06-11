import "./App.css";
import Layout from "./components/layout/Layout";
import { LinkProvider } from "./contexts/LinkContext";
import { MainFlowProvider } from "./contexts/MainFlow";
import { GlobalContextProvider } from "./contexts/GlobalContext";

function App() {
  return (
    <div className="plm-app-main-container">
      <GlobalContextProvider>
        <MainFlowProvider>
          <LinkProvider>
              <Layout />
          </LinkProvider>
        </MainFlowProvider>
      </GlobalContextProvider>
    </div>
  );
}

export default App;
