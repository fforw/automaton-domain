
import { action, computed, makeObservable, observable } from "mobx";

export default class EnumType
{
    constructor(name = "", description = "", values = [])
    {
        makeObservable(this);
        this.name = name;
        this.description = description;
        this.values = values
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
     * @type Array<String>
     * @public
     */
    @observable
    values = []
    

    /**
     * 
     * @type String
     * @public
     */
    @observable
    description = ""
    
}
