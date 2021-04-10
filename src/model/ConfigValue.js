
import { action, computed, makeObservable, observable } from "mobx";

export default class ConfigValue
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
    name = ""
    

    /**
     * 
     * @type String
     * @public
     */
    @observable
    value = ""
    
}