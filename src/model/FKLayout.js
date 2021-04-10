
import { action, computed, makeObservable, observable } from "mobx";

export default class FKLayout
{
    constructor()
    {
        makeObservable(this);
    }

    
    /**
     * 
     * @type number
     * @public
     */
    @observable
    x = 0.0
    

    /**
     * 
     * @type number
     * @public
     */
    @observable
    y = 0.0
    
}