import {renderApp} from "./renderClient";

renderApp();
if (module.hot) {
    module.hot.accept();
    renderApp();
}
