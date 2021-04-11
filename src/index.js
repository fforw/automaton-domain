import domready from "domready"
import React from "react"
// noinspection ES6UnusedImports
import STYLE from "./style.css"
import renderToRoot from "./util/renderToRoot";

import App from "./ui/App"
import { configure, toJS, runInAction, reaction } from "mobx";
import { useLocalObservable } from "mobx-react-lite";
import AppState from "./model/AppState";
import Domain from "./model/Domain";

// set MobX configuration
configure({
    enforceActions: "observed",
    useProxies: "always"
});

const state = new AppState();

//reaction( () => state.interaction.focused, id => console.log("FOCUSED", id));

domready(
    () => {

        (state.domain = Domain.importSchema(require("../test/schema.json"))) && console.log("IMPORTED", toJS(state.domain))

        return renderToRoot(
            <App state={ state }/>
        )
        .then(
            () => console.log("ready")
        );
    }
);

export {
    runInAction,
    toJS,
    state
}
