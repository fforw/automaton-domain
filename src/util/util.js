import { getImportFormat } from "../model/AppState";


export function hash(s, h = 0) {
    let l = s.length, i = 0;
    if ( l > 0 )
        while (i < l)
            h = (h << 5) - h + s.charCodeAt(i++) | 0;
    return h;
}

export function hashNamedArray(arr, h = 0) {

    for (let i = 0; i < arr.length; i++)
    {
        h = hash(arr[i].name, h);
    }
    return h;
}



/**
 * Returns the smallest power of two-side length that will fit the numbers of items
 *
 * `getSideLengthOfSquare(50)` is 8, because 8x8 is the smallest square with power of
 * two sides that will fit. 16 < 50 < 64
 *
 * 
 * @param {number} n    number of items
 * @return {number} side length pf a square with enough room for all items.
 */
export function getSideLengthOfSquare(n) {
    return Math.ceil(Math.sqrt(n));
};


export function parseImportSafely(json)
{
    try
    {
        const data = JSON.parse(json);
        return getImportFormat(data) ? data : "Wrong Format"
    } catch (e)
    {
        return "Parse Error";
    }
}
