
import { action, computed, makeObservable, observable } from "mobx";
import FieldType from "./FieldType";
import SourceField from "./SourceField";
import TargetField from "./TargetField";

export const Kind = {
    SCALAR: "SCALAR",
    OBJECT: "OBJECT",
    KEY: "KEY",
    HIDDEN: "HIDDEN",
    LIST: "LIST"
};

export default class DomainField
{
    domainType = null;

    
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


    constructor(domainType, name = "", description = "", type)
    {
        makeObservable(this);

        this.domainType = domainType

        this.name = name;
        this.description = description;
        this.type = type;
    }

    @computed
    get kind()
    {
        const { name } = this;
        const { relations } = this.domainType;

        const rel = relations.find(r => r.sourceField !== SourceField.NONE && r.sourceFields[0] === name);
        if (rel)
        {
            return rel.sourceField === SourceField.SCALAR ? Kind.KEY : Kind.HIDDEN;
        }

        if (relations.find( r => r.sourceField !== SourceField.NONE && r.sourceField !== SourceField.SCALAR && r.leftSideObjectName === name ))
        {
            return Kind.OBJECT;
        }

        const rel2 = relations.find(r => r.targetField !== TargetField.NONE && r.rightSideObjectName === name );
        if (rel2)
        {
            return rel2.targetType === TargetField.ONE ? Kind.OBJECT : Kind.LIST;
        }

        //console.log("KIND", name, this.domainType.name, "relations", relations)

        return Kind.SCALAR
    }
}
