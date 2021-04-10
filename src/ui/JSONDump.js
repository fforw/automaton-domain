import React from "react"
import cx from "classnames"
import { observer } from "mobx-react-lite";


const JSONDump = observer(({data}) => {

    return (
        <pre>
            {
                JSON.stringify(data, null ,4)
            }
        </pre>
    );
});

export default JSONDump;
