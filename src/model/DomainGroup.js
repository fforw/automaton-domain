
import { action, computed, makeObservable, observable } from "mobx";

export default class DomainGroup
{
    constructor( types=[] )
    {
        makeObservable(this);

        this.types = types;
    }


    /**
     *
     * @type Array<String>
     * @public
     */
    @observable
    types = []
}
