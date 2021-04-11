import { observer } from "mobx-react-lite";
import React, { useRef, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { ButtonToolbar, Modal, ModalBody, ModalHeader } from "reactstrap";
import pkgJSON from "../../package.json";
import cx from "classnames";
import { parseImportSafely } from "../util/util";

function loadJSON(ev)
{
    return new Promise((resolve, reject) => {

        const file = ev.target.files[0];

        const fileReader = new FileReader();

        fileReader.onload = () => resolve(fileReader.result);

        fileReader.onerror = reject;

        fileReader.readAsText(file);

    })
}

const WelcomeModal = observer(
    ({state}) => {
        const [importMode, setImportMode] = useState(false);

        const [error, setError] = useState(null);

        const [haveJson, setHaveJson] = useState(false);

        const textAreaRef = useRef(null);
        const schemaUploadRef = useRef(null);

        const debouncedJSONParse = useDebouncedCallback(
            val => {
                const data = parseImportSafely(val);
                if (typeof data === "string")
                {
                    setError(data)
                    setHaveJson(false);
                }
                else
                {
                    setError(null)
                    setHaveJson(true);
                }

            },
            100
        );

        return (
            <Modal isOpen={!state.domain}>
                <ModalHeader>
                    {
                        importMode ? "Import" : "Automaton Domain v" + pkgJSON.version
                    }
                </ModalHeader>
                <ModalBody>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col">
                                {
                                    !importMode && (
                                        <>
                                            <h1>Welcome to Automaton Domain</h1>

                                            <form className="form mt-3">
                                                <button
                                                    type="button"
                                                    className="btn btn-primary mb-3 mr-1"
                                                    onClick={() => {
                                                        state.newDomain()
                                                    }}
                                                >
                                                    New Domain
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn btn-primary mb-3 mr-1"
                                                    onClick={() => {
                                                        setImportMode(true)
                                                    }}
                                                >
                                                    Import
                                                </button>
                                            </form>
                                        </>
                                    )
                                }
                                {
                                    !!importMode && (
                                        <>
                                            <form className="form">
                                                <div className="form-group">
                                                    <label
                                                        htmlFor="schemaUpload"
                                                    >
                                                        Import File
                                                    </label>
                                                    <input
                                                        ref={schemaUploadRef}
                                                        className="form-control-file"
                                                        type="file"
                                                        placeholder="schema introspection JSON"
                                                        accept="application/json"
                                                        onChange={ev => loadJSON(ev).then(
                                                            json => {
                                                                textAreaRef.current.value = json;
                                                                debouncedJSONParse(json)
                                                            }
                                                        )}
                                                    />
                                                </div>

                                                <div className={cx("form-group", error && "has-error")}>
                                                    <label
                                                        htmlFor="jsonTextArea"
                                                    >
                                                        JSON
                                                    </label>
                                                    <textarea
                                                        ref={textAreaRef}
                                                        cols={60}
                                                        rows={8}
                                                        className={cx("form-control", error && "is-invalid")}
                                                        onChange={ev => debouncedJSONParse(ev.target.value)}
                                                        defaultValue={
                                                            JSON.stringify(state.domain, null, 4)
                                                        }
                                                    />
                                                    <p className={cx(error && "invalid-feedback d-block")}>
                                                        {
                                                            error
                                                        }
                                                    </p>

                                                </div>

                                                <ButtonToolbar>
                                                    <button
                                                        type="button"
                                                        className="btn btn-primary mr-1"
                                                        disabled={ error || !haveJson }
                                                        onClick={() => {
                                                            const data = parseImportSafely(textAreaRef.current.value);
                                                            if (typeof data !== "string")
                                                            {
                                                                state.import(data);
                                                            }
                                                        }}
                                                    >
                                                        Import JSON
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="btn btn-primary mr-1"
                                                        onClick={() => {
                                                            setImportMode(false)
                                                        }}
                                                    >
                                                        <i className="fas fa-cancel text-danger mr-1"/>
                                                        Cancel
                                                    </button>
                                                </ButtonToolbar>
                                            </form>
                                        </>
                                    )
                                }
                            </div>
                        </div>

                    </div>
                </ModalBody>
            </Modal>
        );
    }
);

export default WelcomeModal;
