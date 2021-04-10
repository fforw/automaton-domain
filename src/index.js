import domready from "domready"
import React from "react"
// noinspection ES6UnusedImports
import STYLE from "./style.css"
import renderToRoot from "./util/renderToRoot";

import App from "./ui/App"
import { configure, toJS, runInAction } from "mobx";

// set MobX configuration
configure({
    enforceActions: "observed",
    useProxies: "always"
});

domready(
    () => {

        return renderToRoot(
            <App/>
        )
        .then(
            () => console.log("ready")
        );
    }
);

export {
    runInAction,
    toJS
}
