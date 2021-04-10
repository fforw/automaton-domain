
import { action, computed, makeObservable, observable } from "mobx";

export default class ForeignKey
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
    description = ""
    

    /**
     * 
     * @type String
     * @public
     */
    @observable
    targetType = ""
    

    /**
     * 
     * @type Array<String>
     * @public
     */
    @observable
    fields = []
    

    /**
     * 
     * @type Array<String>
     * @public
     */
    @observable
    targetFields = []
    
}