
import { action, computed, makeObservable, observable } from "mobx";

export default class DTLayout
{
    constructor()
    {
        makeObservable(this);
    }

    
    /**
     * 
     * @type String
     * @public
     */
    @observable
    color = ""
    

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