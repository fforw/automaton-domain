import React, { useContext, useEffect, useState } from "react"
import cx from "classnames"
import InteractionContext from "./InteractionContext";
import { observer } from "mobx-react-lite";


function createIconButton(renderFn, opts)
{
    const { name  = "IconButton", renderFocus = false, renderHover = false } = opts;

    const neutral = renderFn( false, false);
    const iconStates = [
        neutral,
        neutral,
        neutral,
        neutral
    ]
    if (renderFocus)
    {
        iconStates[1] = renderFn(true, false);
    }
    if (renderHover)
    {
        iconStates[2] = renderFn( false,  true)

        if (renderFocus)
        {
            iconStates[3] = renderFn(true, true)
        }
    }
    else
    {
        // no difference to not being hovered
        iconStates[2] = iconStates[0];
        iconStates[3] = iconStates[1];
    }

    const IconComponent = observer(
        ({ id, x = 0, y = 0, label }) => {

            const ctx = useContext(InteractionContext);

            useEffect(
                () => ctx.register(id, { label }),
                [ id ]
            )

            const focused = ctx.focused === id;
            const hovered = renderHover && ctx.hovered;

            return (
                <g
                    role="button"
                    aria-label={ label }
                    onMouseOver={ renderHover ? () => ctx.setHovered(id) : null }
                    onMouseOut={ renderHover ? () => ctx.setHovered(null) : null }
                    transform={ `translate(${x}, ${y})` }
                >
                    {
                        iconStates[ (hovered << 1) +  focused]
                    }
                </g>
            )
        }
    );

    IconComponent.displayName = name
    return IconComponent;
}


export default createIconButton;
