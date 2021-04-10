import React, { useRef } from "react"
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import useWindowSize from "../util/useWindowSize";

import pkgJSON from "../../package.json"
import { observer, Observer, useLocalObservable } from "mobx-react-lite";
import JSONDump from "./JSONDump";
import AppState from "../model/AppState";
import Domain from "../model/Domain";
import { toJS } from "mobx";


function loadJSON(ev)
{
    return new Promise((resolve, reject) => {

        const file = ev.target.files[0];

        const fileReader = new FileReader();

        fileReader.onload = () => resolve(JSON.parse(fileReader.result));

        fileReader.onerror = reject;

        fileReader.readAsText(file);

    })
}


const App = observer(({}) => {

    const state = useLocalObservable(
        () => {
            const appState = new AppState();
            appState.domain = Domain.importSchema(require("../../test/schema.json"))
            console.log("IMPORTED", toJS(appState))
            return appState;
        }
    )

    const {width, height} = useWindowSize();

    const schemaUploadRef = useRef(null);

    return (
        <Observer>
            {
                () => (
                    <>
                        <svg
                            key={ state.id }
                            width={ width }
                            height={ height}
                        >


                        </svg>


                        <Modal isOpen={!state.domain}>
                            <ModalHeader>
                                Automaton Domain v{pkgJSON.version}
                            </ModalHeader>
                            <ModalBody>
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col">
                                            <h1>Welcome to Automaton Domain</h1>

                                            <form className="form mt-3">
                                                <button
                                                    type="button"
                                                    className="btn btn-primary mb-3"
                                                    onClick={() => {
                                                        state.newDomain()
                                                    }}
                                                >
                                                    New Domain
                                                </button>

                                                <div className="form-group">
                                                    <label
                                                        htmlFor="schemaUpload"
                                                    >
                                                        Import
                                                    </label>
                                                    <input
                                                        ref={ schemaUploadRef }
                                                        className="form-control-file"
                                                        type="file"
                                                        placeholder="schema introspection JSON"
                                                        accept="application/json"
                                                        onChange={ ev => loadJSON(ev).then(
                                                                    data => state.import(data)
                                                                )}
                                                    />
                                                </div>
                                            </form>
                                        </div>
                                    </div>

                                </div>
                            </ModalBody>
                        </Modal>

                    </>
                )
            }
        </Observer>

    );
});

export default App;
