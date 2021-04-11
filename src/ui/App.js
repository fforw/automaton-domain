import React, { useEffect, useState } from "react"
import cx from "classnames";
import { toJS } from "mobx";
import { observer, Observer, useLocalObservable } from "mobx-react-lite";

import useWindowSize from "../util/useWindowSize";

import AppState from "../model/AppState";
import Domain from "../model/Domain";
import EntityNode from "./EntityNode";
import WelcomeModal from "./WelcomeModal";
import Vector from "../math/Vector";
import IconButton from "./createIconButton";
import InteractionContext, { FocusContainer } from "./InteractionContext";

// XXX: hack.. couldn't figure out how to get onMouseMove to see the current offset state
let offsetX = 0, offsetY = 0;

const App = observer(({state: appState}) => {

    const [pan, setPan] = useState(false);
    const [offset, setOffset] = useState(new Vector(0,0));
    const [panOffset, setPanOffset] = useState(new Vector(0,0));


    const setOffsetHack = (x,y) => {
        setOffset( offset => {

            const newOffset = offset.copy().subtract(x, y);
            offsetX = newOffset.x;
            offsetY = newOffset.y;
            return newOffset;
        })

    }

    useEffect(
        () => {

            if (pan)
            {
                //console.log("PAN ON", panOffset )

                const onMouseMove = ev => {

                    const x = (ev.pageX + offsetX + panOffset.x);
                    const y = (ev.pageY + offsetY + + panOffset.y);
                    setOffsetHack(x,y);
                }

                const onMouseUp = ev => {

                    const x = (ev.pageX + offsetX + panOffset.x);
                    const y = (ev.pageY + offsetY + + panOffset.y);

                    setPan(false);
                    setOffsetHack(x,y);

                    //console.log("PAN OFF")
                };

                document.addEventListener("mousemove", onMouseMove, true)
                document.addEventListener("mouseup", onMouseUp, true)

                return () => {
                    document.removeEventListener("mousemove", onMouseMove, true)
                    document.removeEventListener("mouseup", onMouseUp, true)
                }
            }
        },
        [ pan ]
    )

    useEffect(
        () => {

            const onKeyPress = ev => {

                if (ev.keyCode === 36)
                {
                    setOffsetHack(0,0)
                }
            }

            window.addEventListener("keydown", onKeyPress, true)

            return () =>  {
                window.removeEventListener("keydown", onKeyPress, true)
            }
        },
        []
    )


    const {width, height} = useWindowSize();

    return (
        <>
            {
                !!appState.domain && width && height && (
                    <InteractionContext.Provider value={ appState.interaction }>
                        <svg
                            key={ appState.id }
                            className={ cx(pan && "pan") }
                            width={ width }
                            height={ height }
                            viewBox={ offset.x + "  " + offset.y+ " " + width + " " + height }
                            onMouseDown={
                                ev => {
                                    const startPan = ev.button === 1 || ev.button === 0 && ev.shiftKey;
                                    if (startPan)
                                    {
                                        setPan(true)
                                        setPanOffset(new Vector(  - ev.pageX - offset.x, - ev.pageY - offset.y ));
                                        ev.preventDefault();
                                    }
                                }
                            }
                        >
                            {
                                !!appState.domain && (
                                    appState.domain.domainTypes.map(
                                        (t, idx) => (
                                            <EntityNode
                                                key={ t.name }
                                                type={ t }
                                                index={ idx }
                                                onClick={ () => console.log("CLICK", t.name )}
                                            />
                                        )
                                    )
                                )
                            }

                        </svg>
                        <FocusContainer/>
                    </InteractionContext.Provider>
                )
            }

            <WelcomeModal
                state={appState}
            />

        </>
    );
});

export default App;

