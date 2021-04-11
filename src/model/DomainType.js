
import { action, computed, makeObservable, observable } from "mobx";
import UniqueConstraint from "./UniqueConstraint";
import TargetField from "./TargetField";
import SourceField from "./SourceField";

export default class DomainType
{

    domain = null;
    
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

    @observable
    hasIQuery = false;

    constructor(domain, name = "", description = "")
    {
        this.domain = domain;

        makeObservable(this);

        this.name = name;
        this.description = description;

        this.primaryKey = new UniqueConstraint(["id"])
        this.foreignKeys = []
        this.uniqueConstraints = [];
    }

    @computed
    get relations()
    {
        const { relations = [] } = this.domain;
        //console.log("RELATIONS", this.name, this.domain)

        return relations.filter( r => (r.sourceType === this.name && r.sourceField !== SourceField.NONE) || (r.targetType === this.name && r.targetField !== TargetField.NONE))
    }
}
