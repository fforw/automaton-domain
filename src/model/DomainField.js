
import { action, computed, makeObservable, observable } from "mobx";
import FieldType from "./FieldType";

export default class DomainField
{
    constructor(name = "", description = "", type)
    {
        makeObservable(this);

        this.name = name;
        this.description = description;
        this.type = type;
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
    description = ""
    

    /**
     * 
     * @type FieldType
     * @public
     */
    @observable
    type = null
    

    /**
     * 
     * @type boolean
     * @public
     */
    @observable
    notNull = false
    

    /**
     * 
     * @type number
     * @public
     */
    @observable
    maxLength = -1

    /**
     *
     * @type number
     * @public
     */
    @observable
    precision = -1

    /**
     *
     * @type number
     * @public
     */
    @observable
    scale = -1

    /**
     * 
     * @type boolean
     * @public
     */
    @observable
    unique = false
    
}
