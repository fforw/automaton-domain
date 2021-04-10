
import { action, computed, makeObservable, observable } from "mobx";
import UniqueConstraint from "./UniqueConstraint";

export default class DomainType
{
    constructor(name = "", description = "", fields = [])
    {
        makeObservable(this);

        this.name = name;
        this.description = description;
        this.fields = fields;

        this.primaryKey = new UniqueConstraint(["id"])
        this.foreignKeys = []
        this.uniqueConstraints = [];
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
     * @type Array<DomainField>
     * @public
     */
    @observable
    fields = []

    /**
     *
     * @type Array<DomainField>
     * @public
     */
    @observable
    relations = []

    /**
     * 
     * @type UniqueConstraint
     * @public
     */
    @observable
    primaryKey = null
    

    /**
     * 
     * @type Array<ForeignKey>
     * @public
     */
    @observable
    foreignKeys = []
    

    /**
     * 
     * @type Array<UniqueConstraint>
     * @public
     */
    @observable
    uniqueConstraints = []
    
}
