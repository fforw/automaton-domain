import { useMemo, useState } from "react";




export default function useLoggedState(init, msg = "useLoggedState")
{
    const [value, setValue] = useState(init)

    const cb = useMemo( () => {
        return v => {
            console.log(msg, value)
            cb(v);
        };
    }, [ setValue ]);

    return [ value, cb]
}

