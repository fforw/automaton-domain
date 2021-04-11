import domready from "domready"
import { getSideLengthOfSquare } from "./util/util";
import Vector from "./math/Vector";


function rot(pos, rx, ry, p)
{
    if (ry === 0)
    {
        if (rx === 1)
        {
            pos.x = p - 1 - pos.x;
            pos.y = p - 1 - pos.y;
        }
        // vertausche x und y
        const h = pos.x;
        // noinspection JSSuspiciousNameCombination
        pos.x = pos.y;
        pos.y = h;
    }
    return pos;
}


function t2xyI(t, p)
{
    let pos = new Vector(0, 0); // im Ergebnisquadrat die linke untere Ecke
    for (let m = 1; m < p; m *= 2)
    {
        const rx = 1 & t / 2;      // Binärziffer[1]: 0=links/1=rechts
        const ry = 1 & (t ^ rx); // Binärziffer[0]
        pos = rot(pos, rx, ry, m);
        pos.x += m * rx;
        pos.y += m * ry;
        t /= 4; // zur nächsten Quaternärziffer
    }
    return pos;
}


/*
// Drehspiegelung eines Quadrates
 function rot(x, y, rx, ry, p) begin
 end function
 */

let position = 0;
let items = 0;

let frame = 0;

domready(
    () => {
        const canvas = document.createElement("canvas");

        const num = 20 + (Math.random() * 295) | 0;

        const size = getSideLengthOfSquare(num);

        const tileSize = 20;

        const width = size * tileSize;
        const height = size * tileSize;

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        ctx.font = "16px sans"

        const msg = "Items: " + num + ", grid = " + size + "✖" + size;
        const textMetrics = ctx.measureText(msg);

        const minWidth = textMetrics.width + 5;

        if ( minWidth > canvas.width)
        {
            canvas.width = minWidth;
        }

        ctx.strokeStyle = "#fff";
        ctx.fillStyle = "#fff";

        for (let x = 0; x <= width; x += tileSize)
        {
            ctx.beginPath()
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
            ctx.stroke();
        }

        for (let y = 0; y <= height; y += tileSize)
        {
            ctx.beginPath()
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();

        }

        ctx.fillText(msg, 0, height - 5);


        ctx.fillStyle = "rgba(255,0,0,0.4)";

        const main = () => {

            if (frame & 511 && items < num)
            {
                let pos;
                do
                {
                    pos = t2xyI(position++, size);
                }
                while (pos.x >= size || pos.y >= size)

                items++;

                ctx.fillRect(pos.x * tileSize, pos.y * tileSize, tileSize, tileSize);
            }
            frame++;
            requestAnimationFrame(main)
        }

        requestAnimationFrame(main)

        document.getElementById("root").appendChild(canvas)
    }
)
