
import { action, computed, makeObservable, observable } from "mobx";

export default class RelationModel
{
    constructor({ sourceFields, targetType, leftSideObjectName, sourceField, targetField, sourceType, rightSideObjectName, id, targetFields })
    {
        makeObservable(this);

        this.sourceFields = sourceFields;
        this.targetType = targetType;
        this.leftSideObjectName = leftSideObjectName;
        this.sourceField = sourceField;
        this.targetField = targetField;
        this.sourceType = sourceType;
        this.rightSideObjectName = rightSideObjectName;
        this.id = id;
        this.targetFields = targetFields;
    }

    
    /**
     * 
     * @type Array<String>
     * @public
     */
    @observable
    sourceFields = []
    

    /**
     * 
     * @type String
     * @public
     */
    @observable
    targetType = ""
    

    /**
     * 
     * @type String
     * @public
     */
    @observable
    leftSideObjectName = ""
    

    /**
     * 
     * @type SourceField
     * @public
     */
    @observable
    sourceField = null
    

    /**
     * 
     * @type TargetField
     * @public
     */
    @observable
    targetField = null
    

    /**
     * 
     * @type String
     * @public
     */
    @observable
    sourceType = ""
    

    /**
     * 
     * @type String
     * @public
     */
    @observable
    rightSideObjectName = ""
    

    /**
     * 
     * @type String
     * @public
     */
    @observable
    id = ""
    

    /**
     * 
     * @type Array<String>
     * @public
     */
    @observable
    targetFields = []
}












