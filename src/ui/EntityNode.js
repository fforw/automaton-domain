import React, { memo, useCallback, useContext, useMemo, useRef, useState } from "react";
import cx from "classnames";
import Vector from "../math/Vector";
import useSVGLayout from "../util/useSVGLayout";
import { hash, hashNamedArray } from "../util/util";
import { set } from "mobx";
import useLoggedState from "../util/useLoggedState";


import { Icon } from "domainql-form";
import createIconButton from "./createIconButton";
import { Kind } from "../model/DomainField";
import { observer } from "mobx-react-lite";
import InteractionContext from "./InteractionContext";



const IQueryIcon = createIconButton( () => {

    return (
        <>
            <path
                className="iq-db"
                d="M9.892 20.214a6.114 6.114 0 011.837-3.661 32 32 0 01-.948.04 29.54 29.54 0 01-1.884 0c-2.648-.073-4.758-.447-6.278-.98-.714-.241-1.325-.525-1.798-.85V18.156c1.027 1.072 4.471 2.06 9.02 2.06h.05zM8.987 15.472c.118.003.235.007.355.008a27.383 27.383 0 001.351-.008l.126-.003c4.06-.13 7.088-1.051 8.04-2.044v-3.392c-1.756 1.206-5.468 1.844-9.019 1.844S2.577 11.24.821 10.033v3.391c.952.994 3.98 1.916 8.04 2.045l.126.003z"
                fill="#375a7f"/>
            <path
                className="iq-db"
                d="M18.859 8.741V7.91c0-.061-.02-.116-.049-.166-.405-1.551-3.517-3.081-8.97-3.081-5.439 0-8.548 1.522-8.966 3.07a.35.35 0 00-.053.176V8.741c1.024 1.068 4.444 2.054 9.02 2.054 4.574 0 7.995-.986 9.018-2.054z"
                fill="#375a7f"/>
            <path
                className="iq-db"
                d="M9.858 21.33H9.84c-4.454 0-7.527-.827-9.019-1.877v2.958a.34.34 0 00.043.163C1.29 24.34 5.1 25.658 9.84 25.658c.722 0 1.418-.034 2.088-.092a6.113 6.113 0 01-2.07-4.237z"
                fill="#375a7f"/>
            <path
                className="iq-text"
                d="M7.735 12.773c-.275 0-.548.066-.793.178a.802.802 0 00-.011.004c-.231.11-.437.267-.61.447-.179.181-.328.399-.433.637a.802.802 0 00-.006.014c-.104.25-.156.519-.156.787s.053.537.152.785a.802.802 0 00.016.035c.1.219.231.424.392.604a.802.802 0 00.031.031c.177.177.384.323.604.428a.802.802 0 00.025.011 1.943 1.943 0 001.537.004.802.802 0 00.026-.011 2.155 2.155 0 001.062-1.06 1.942 1.942 0 00.016-1.643 2.127 2.127 0 00-.43-.63c-.18-.187-.4-.341-.642-.445a1.912 1.912 0 00-.78-.175zm9.23.122c-.743 0-1.466.1-2.155.294a.802.802 0 00-.002 0 7.34 7.34 0 00-1.903.846l-.004.002-.002.002a7.622 7.622 0 00-1.593 1.322 7.943 7.943 0 00-1.207 1.739 9.076 9.076 0 00-.76 2.082 10.044 10.044 0 00-.266 2.334c0 .932.14 1.814.42 2.629a.802.802 0 000 .002c.28.805.693 1.525 1.235 2.132a5.836 5.836 0 001.96 1.43.802.802 0 00.008.004c.78.343 1.647.508 2.577.508.58 0 1.132-.126 1.683-.246l1.48 2.07a.802.802 0 00.028.037c.205.255.486.464.803.58.284.11.585.158.896.158h1.553a.802.802 0 00.646-1.277l-2.267-3.082c.304-.25.63-.47.896-.767l.002-.002a7.706 7.706 0 001.178-1.731c.323-.633.57-1.315.738-2.039a10.2 10.2 0 00.254-2.305 8.02 8.02 0 00-.418-2.627 6.255 6.255 0 00-1.234-2.142 5.653 5.653 0 00-1.977-1.434c-.779-.349-1.643-.52-2.568-.52zm-.233 3.214c.47 0 .856.082 1.189.235a.802.802 0 00.004.002c.349.158.624.37.86.656a.802.802 0 00.005.006c.244.292.44.652.58 1.102.14.446.215.961.215 1.554 0 .868-.11 1.636-.318 2.307-.211.671-.503 1.22-.867 1.668-.36.443-.778.775-1.28 1.017-.482.231-1.02.35-1.642.35-.47 0-.857-.082-1.19-.234a2.46 2.46 0 01-.867-.657c-.237-.29-.43-.65-.57-1.097l-.002-.002a5.396 5.396 0 01-.205-1.555c0-.867.11-1.63.318-2.295.218-.68.51-1.235.87-1.683.36-.45.772-.78 1.263-1.014a.802.802 0 00.008-.002 3.617 3.617 0 011.629-.358zm-10.194.864a.802.802 0 00-.797.707l-1.14 9.502a.802.802 0 00.797.898h1.794a.802.802 0 00.797-.707l1.15-9.502a.802.802 0 00-.796-.898z"
                fill="#00bc8c"/>
        </>
    );
}, {
    name: "IQueryIcon"
})

const dbIcon = (
    <g className="icon">
        <g color="#000" fill="#888">
            <path
                className="iq-db"
                d="M.56 15.04v3.391c1.023 1.068 4.446 2.052 8.967 2.06h.104c4.521-.008 7.944-.992 8.966-2.06V15.04c-.472.324-1.083.608-1.797.848-1.496.526-3.568.895-6.16.976-.04 0-.08.004-.12.005-.21.007-.419.008-.627.01-.105 0-.21.005-.314.005-.312 0-.627-.005-.94-.015h-.003l-.12-.005c-2.59-.08-4.662-.45-6.158-.976-.714-.24-1.326-.524-1.798-.848z"
                overflow="visible"/>
            <path
                className="iq-db"
                d="M8.726 15.749c.118.003.235.007.354.008a27.382 27.382 0 001.352-.008l.126-.003c4.06-.13 7.088-1.052 8.04-2.045V10.31c-1.756 1.206-5.468 1.843-9.02 1.843-3.55 0-7.262-.637-9.018-1.843V13.7c.952.993 3.98 1.915 8.04 2.044l.126.003z"
                overflow="visible"/>
            <path
                className="iq-db"
                d="M18.598 9.018V8.186c0-.061-.02-.115-.05-.166-.404-1.551-3.516-3.081-8.97-3.081-5.438 0-8.547 1.522-8.965 3.07a.35.35 0 00-.053.177V9.018c1.024 1.068 4.443 2.054 9.019 2.054 4.575 0 7.995-.986 9.019-2.054zM.56 19.73v2.958a.34.34 0 00.042.162c.361 1.497 3.16 2.67 6.89 2.992.321.028.65.05.985.065l.056.003c.344.015.691.024 1.046.024.355 0 .702-.009 1.045-.024.02 0 .038-.002.057-.003.335-.014.663-.037.986-.065 3.73-.323 6.527-1.495 6.889-2.992a.34.34 0 00.041-.162v-2.959c-1.489 1.049-4.556 1.874-9 1.876H9.56c-4.443-.002-7.51-.827-9-1.876z"
                overflow="visible"/>
        </g>
    </g>
);

const dbIconActive = (
    <g className="icon">
        <g color="#000" fill="#fd7e14">
            <path
                d="M.56 15.04v3.391c1.023 1.068 4.446 2.052 8.967 2.06h.104c4.521-.008 7.944-.992 8.966-2.06V15.04c-.472.324-1.083.608-1.797.848-1.496.526-3.568.895-6.16.976-.04 0-.08.004-.12.005-.21.007-.419.008-.627.01-.105 0-.21.005-.314.005-.312 0-.627-.005-.94-.015h-.003l-.12-.005c-2.59-.08-4.662-.45-6.158-.976-.714-.24-1.326-.524-1.798-.848z"
                overflow="visible"/>
            <path
                d="M8.726 15.749c.118.003.235.007.354.008a27.382 27.382 0 001.352-.008l.126-.003c4.06-.13 7.088-1.052 8.04-2.045V10.31c-1.756 1.206-5.468 1.843-9.02 1.843-3.55 0-7.262-.637-9.018-1.843V13.7c.952.993 3.98 1.915 8.04 2.044l.126.003z"
                overflow="visible"/>
            <path
                d="M18.598 9.018V8.186c0-.061-.02-.115-.05-.166-.404-1.551-3.516-3.081-8.97-3.081-5.438 0-8.547 1.522-8.965 3.07a.35.35 0 00-.053.177V9.018c1.024 1.068 4.443 2.054 9.019 2.054 4.575 0 7.995-.986 9.019-2.054zM.56 19.73v2.958a.34.34 0 00.042.162c.361 1.497 3.16 2.67 6.89 2.992.321.028.65.05.985.065l.056.003c.344.015.691.024 1.046.024.355 0 .702-.009 1.045-.024.02 0 .038-.002.057-.003.335-.014.663-.037.986-.065 3.73-.323 6.527-1.495 6.889-2.992a.34.34 0 00.041-.162v-2.959c-1.489 1.049-4.556 1.874-9 1.876H9.56c-4.443-.002-7.51-.827-9-1.876z"
                overflow="visible"/>
        </g>
    </g>
);

function DBIcon({x,y, active})
{
    return (
        <g transform={ `translate(${x}, ${y})` } >
            {
                active ? dbIconActive : dbIcon
            }
        </g>
    )
}

export function hashFields(arr, h = 0) {

    for (let i = 0; i < arr.length; i++)
    {
        const field = arr[i];
        h = hash(field.name, h);
        h = hash(field.type, h);
        h += field.notNull * 17;
    }
    return h;
}


const EntityNode = observer(({type, index, onClick}) => {

    const ctx = useContext(InteractionContext);

    const [pos, setPos] = useState(() => new Vector((index % 10) * 200, Math.floor(index/10) * 150))

    //console.log("pos ", pos)

    const ref = useRef(null)

    const hashValue = hashFields(
        type.fields,
        hash(type.name) + 31
    );

    const layout = useSVGLayout(
        ref,
        {
            name: type.name,
            titleRightPad: type.hasIQuery ? 24 : 20
        },
        [
            hashValue
        ]
    );


    const active = ctx.focused === type.name;

    return (
        <>
            <g
                ref={ref}
                id={ "svgbtn-" + type.name }
                className={
                    cx(
                        "entity",
                        type.hasIQuery && "iq",
                        active && "active"
                    )
                }
                onClick={ ev => {
                    ev.preventDefault();

                    if (typeof onClick === "function")
                    {
                        onClick()
                    }
                    document.getElementById("svgprx-" + type.name).focus()
                } }
            >
                {
                    // useMemo(
                    //     () => (
                    <>
                        <rect
                            x={ pos.x + layout.getX() - layout.opts.pad }
                            y={ pos.y + layout.getY() - layout.opts.pad }
                            width={ layout.getWidth() }
                            height={ layout.getHeight() }
                            rx={ 12 }
                            ry={ 12 }
                        />
                        <text
                            className="name"
                            x={ pos.x + layout.getX(0 ) }
                            y={ pos.y + layout.getY(0) + layout.getHeight(0) * 0.8 }
                            fontSize={ 20 }
                        >
                            {
                                type.name
                            }
                        </text>
                        {
                            type.fields
                                .filter(f => f.kind !== Kind.HIDDEN)
                                .map(
                                    (f, idx) => (

                                        <React.Fragment
                                            key={f.name}
                                        >
                                            <text
                                                className="field-name"
                                                x={ pos.x + layout.getX( 1 + idx * 2 ) }
                                                y={ pos.y + layout.getY(1 + idx * 2) + layout.getHeight( 1 + idx) * 0.8}
                                            >
                                                {
                                                    f.name
                                                }
                                            </text>
                                            <text
                                                className={ cx("field-" + f.kind.toLowerCase(),  "l-add" ) }
                                                key={f.name}
                                                x={ pos.x + layout.getX( 1 + idx * 2 + 1) }
                                                y={ pos.y + layout.getY(1 + idx * 2 + 1) + layout.getHeight( 1 + idx * 2 + 1) * 0.8}
                                            >
                                                {
                                                    "\u00a0:\u00a0" + (f.kind === Kind.LIST ? "[" + f.type + "]" : f.type) + (f.notNull ? " !" : "")
                                                }
                                            </text>
                                        </React.Fragment>
                                    )
                                )
                        }



                        {
                            type.hasIQuery ? (
                                <IQueryIcon
                                    id={ type.name }
                                    x={ pos.x + layout.getX() + layout.getWidth() - 46 }
                                    y={ pos.y + layout.getY() - layout.opts.pad + 6}
                                    active={ active }
                                />
                            ) : (
                                <DBIcon
                                    id={ type.name }
                                    x={ pos.x + layout.getX() + layout.getWidth() - 42 }
                                    y={ pos.y + layout.getY() - layout.opts.pad + 6}
                                    active={ active }
                                />
                            )



                        }
                    </>
                    //     ),
                    //     [ layout ]
                    // )
                }
            </g>
        </>

    );
});
export default EntityNode
