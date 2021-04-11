export default class AABB
{
    x0;
    y0;

    x1;
    y1;


    constructor(x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity)
    {
        this.x0 = x0;
        this.y0 = y0;
        this.x1 = x1;
        this.y1 = y1;

    }


    extend(x,y)
    {
        //console.log("extend", this, x, y)

        this.x0 = Math.min(this.x0, x);
        this.y0 = Math.min(this.y0, y);
        this.x1 = Math.max(this.x1, x);
        this.y1 = Math.max(this.y1, y);

        return this;
    }

    get width()
    {
        return this.x1 === -Infinity && this.x0 === Infinity ? 0 : this.x1 - this.x0;
    }

    get height()
    {
        return this.y1 === -Infinity && this.y0 === Infinity ? 0 : this.y1 - this.y0;
    }
}
