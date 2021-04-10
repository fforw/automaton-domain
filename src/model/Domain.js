
import { action, computed, makeObservable, observable } from "mobx";
import DomainType from "./DomainType";
import DomainField from "./DomainField";
import FieldType from "./FieldType";
import { ENUM, OBJECT } from "domainql-form/lib/kind"
import { isNonNull, unwrapNonNull } from "domainql-form/lib/InputSchema";
import unwrapAll from "domainql-form/lib/util/unwrapAll";
import EnumType from "./EnumType";

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


export default class Domain
{
    constructor(description = "", domainTypes = [], enumTypes = [])
    {
        makeObservable(this);

        this.description = description;
        this.domainTypes = domainTypes;
        this.enumTypes = enumTypes;
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


    static importSchema(data)
    {
        const domainTypes = data.types
            .filter( t => t.kind === OBJECT && t.name[0] !== "_")
            .map(
            gqlType => {
                const domainTypeName = gqlType.name;
                return new DomainType(
                    domainTypeName,
                    gqlType.description,
                    gqlType.fields.map(
                        f => {
                            const unwrapped = unwrapAll(f.type)

                            const field = new DomainField(
                                f.name,
                                f.description,
                                unwrapped.type
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
                );
            }
        )

        const enumTypes = data.types
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


        return new Domain(
            null,
            domainTypes,
            enumTypes
        );
    }
}
