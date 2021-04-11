import { useLayoutEffect, useRef, useState } from "react";
import useLoggedState from "./useLoggedState";

const DEFAULT_OPTIONS = {
    name: "Unnamed",
    pad: 12,
    innerPad: 1,
    minWidth: 100,
    titleRightPad: 20
}

function Layout(sizes, opts)
{
    this.sizes = sizes;
    this.opts = opts;
}

Layout.prototype.getX = function( index = -1)
{
    const x = this.sizes[4 + index * 4];

    //console.log("X = ", x)

    return x === undefined ? this.opts.pad : x;
}

Layout.prototype.getY = function( index = -1)
{
    const y = this.sizes[4 + index * 4 + 1];
    //console.log("Y = ", y)
    return y === undefined ? this.opts.innerPad : y;
}

Layout.prototype.getWidth = function( index = -1)
{
    const width = this.sizes[4 + index * 4 + 2];
    //console.log("W = ", width)
    return width === undefined ? 10 : width;
}

Layout.prototype.getHeight = function( index = -1)
{
    const height = this.sizes[4 + index * 4 + 3];
    //console.log("H = ", height)
    return height === undefined ? 10 : height;
}


function humanReadableSizes(sizes)
{
    let msg = "w = " + sizes[2] + ", h = " + sizes[3] + ":\n";

    for (let i=4 ; i < sizes.length; i+=4)
    {
        msg += sizes[i] + ", " + sizes[i+1] + " (" + sizes[i + 2] + "✖" + sizes[i + 3] + ")\n"
    }

    return msg;
}


/**
 *
 * @param ref
 * @param {Array|object}[opts]
 * @param {Array}[deps]
 * @return {Layout}
 */
export default function useSVGLayout(ref, opts = DEFAULT_OPTIONS, deps = [])
{
    const [layout, setLayout] = useState(
        () => {

            if (opts !== DEFAULT_OPTIONS)
            {
                opts = !opts ? DEFAULT_OPTIONS : {

                    ... DEFAULT_OPTIONS,
                    ... opts
                }
            }

            return new Layout(
                [],
                opts
            )
        }
    );

    useLayoutEffect(
        () => {

            //console.log("Run Layout for " + layout.opts.name )

            let current = ref.current.firstChild;

            const { opts } = layout;

            let x = opts.pad;
            let y = opts.pad;

            const sizes = [ x, y, opts.minWidth, -Infinity];

            let first = true;

            while (current)
            {
                if (current.tagName === "text")
                {
                    const r = current.getBoundingClientRect();

                    const isAdd = current.getAttribute("class").indexOf("l-add") >= 0;

                    if (isAdd)
                    {

                        const prevIndex = sizes.length - 4;
                        const prevX = sizes[prevIndex];
                        const prevWidth = sizes[prevIndex + 2];
                        const prevHeight = sizes[prevIndex + 3];
                        const w = (prevWidth + r.width + opts.pad) | 0;
                        const h = (opts.innerPad + r.height + opts.innerPad)|0;

                        sizes.push(prevX - opts.pad + prevWidth - x, y - prevHeight, w,h)

                        sizes[2] = Math.max(sizes[2], w);
                    }
                    else
                    {
                        const w = (opts.pad + r.width + opts.pad + (first ? opts.titleRightPad : 0) )|0;
                        const h = (opts.innerPad + r.height + opts.innerPad)|0;
                        sizes.push(x, y, w , h)

                        y = (y + h + opts.innerPad)|0;

                        sizes[2] = Math.max(sizes[2], w);

                    }

                    first = false;
                }
                sizes[3] = y + opts.pad;

                current = current.nextSibling;

            }

            //console.log("RAN LAYOUT EFFECT: ", humanReadableSizes(sizes))

            setLayout(
                new Layout(
                    sizes,
                    layout.opts
                )
            )
        },
        deps
    )

    return layout;
}
