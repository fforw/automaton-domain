
import { action, computed, makeObservable, observable } from "mobx";

export default class UniqueConstraint
{
    constructor(fields=[])
    {
        makeObservable(this);

        this.fields = fields;
    }

    
    /**
     * 
     * @type Array<String>
     * @public
     */
    @observable
    fields = []
    
}
