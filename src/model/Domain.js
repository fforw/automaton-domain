import { makeObservable, observable } from "mobx";
import DomainType from "./DomainType";
import DomainField from "./DomainField";
import FieldType from "./FieldType";
import { ENUM, OBJECT } from "domainql-form/lib/kind"
import { isNonNull } from "domainql-form/lib/InputSchema";
import unwrapAll from "domainql-form/lib/util/unwrapAll";
import EnumType from "./EnumType";
import RelationModel from "./RelationModel";


function findFieldInfo(collection, domainType, fieldName)
{
    for (let i = 0; i < collection.length; i++)
    {
        const element = collection[i];
        if (element.domainType === domainType && element.fieldName === fieldName)
        {
            return element;
        }
    }
    return {
        length: 100,
        precision: 19,
        scale: 2
    };
}

export const INTERACTIVE_QUERY = "de.quinscape.automaton.model.data.InteractiveQuery"

function getIQueryTypesSet(data)
{
    const iQueryTypes = new Set();
    const ignoredTypes = new Set();

    const { genericTypes } = data;

    if (genericTypes)
    {
        genericTypes.forEach( gt => {
            if (gt.genericType === INTERACTIVE_QUERY)
            {
                ignoredTypes.add(gt.type)
                iQueryTypes.add(gt.typeParameters[0])
            }
        })
    }

    ignoredTypes.add("QueryType")
    ignoredTypes.add("MutationType")

    return [iQueryTypes, ignoredTypes];

}

export default class Domain
{

    
    /**
     * 
     * @type String
     * @public
     */
    @observable
    description = ""
    

    /**
     * 
     * @type Array<DomainType>
     * @public
     */
    @observable
    domainTypes = []
    

    /**
     * 
     * @type Array<EnumType>
     * @public
     */
    @observable
    enumTypes = []

    /**
     *
     * @type Array<RelationModel>
     * @public
     */
    @observable
    relations = []

    /**
     *
     * @type Array<DomainGroup>
     * @public
     */
    @observable
    groups = []

    constructor(description = "", relations = [])
    {
        makeObservable(this);

        this.description = description;
        this.relations = relations;

    }

    
    static importSchema(data)
    {
        const [iQueryTypes, ignoredTypes] = getIQueryTypesSet(data);

        const { relations } = data;

        const newDomain = new Domain(
            null,
            relations.map(r => new RelationModel(r))
        );


        newDomain.domainTypes = data.types
            .filter( t => t.kind === OBJECT && t.name[0] !== "_" && !ignoredTypes.has(t.name))
            .map(
            gqlType => {
                const domainTypeName = gqlType.name;
                const domainType = new DomainType(
                    newDomain,
                    domainTypeName,
                    gqlType.description
                );

                domainType.fields =  gqlType.fields
                    .filter(f => f.name !== "id" )
                    .map(
                        f => {
                            const unwrapped = unwrapAll(f.type)

                            const field = new DomainField(
                                domainType,
                                f.name,
                                f.description,
                                unwrapped.name
                            );

                            if (unwrapped.name === FieldType.BigDecimal)
                            {
                                const dp = findFieldInfo(data.decimalPrecision, domainTypeName, f.name)
                                field.scale = dp.scale;
                                field.precision = dp.precision;

                                field.notNull = isNonNull()
                            }
                            else if (unwrapped.name === FieldType.String)
                            {
                                const fl = findFieldInfo(data.fieldLengths, domainTypeName, f.name)
                                field.maxLength = fl.length;
                            }

                            field.notNull = isNonNull(f.type);

                            return field;
                        }
                    )


                domainType.hasIQuery = iQueryTypes.has(domainType.name);

                return domainType;
            }
        )

        newDomain.enumTypes = data.types
            .filter( t => t.kind === ENUM && t.name[0] !== "_")
            .map(
                gqlType => {
                    const domainTypeName = gqlType.name;
                    return new EnumType(
                        domainTypeName,
                        gqlType.description,
                        gqlType.enumValues.map(
                            el => el.value
                        )
                    );
                }
            )



        console.log("Number of Types", newDomain.domainTypes.length + newDomain.enumTypes.length)

        return newDomain;
    }

}
