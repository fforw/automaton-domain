import fs from "fs";
import path from "path";


const names = [
    "FKLayout",
    "DTLayout",
    "DomainField",
    "DomainType",
    "EnumType",
    "Domain",
    "ConfigValue",
    "UniqueConstraint",
    "ForeignKey",
    "RelationModel"
]

import schema from "../src/model/schema.json"
import { isListType, unwrapNonNull } from "domainql-form/lib/InputSchema";


const gqlTypeToJsType = {
    "String": "String",
    "Boolean": "boolean",
    "Float": "number",
    "Byte": "number",
    "Timestamp": "Date",
    "GenericScalar": "object",
    "JSONB": "object",
    "DomainObject": "object",
    "FieldExpression": "object",
    "Long": "number",
    "Int": "number",
    "Condition": "object",
    "Date": "Date"
}

const defaultValueForJsType = {
    "String": "\"\"",
    "Boolean": "false",
    "Float": "0.0",
    "Byte": "0",
    "Timestamp": "null",
    "GenericScalar": "null",
    "JSONB": "null",
    "DomainObject": "null",
    "FieldExpression": "null",
    "Long": "0",
    "Int": "0",
    "Condition": "null",
    "Date": "null"
}


function jsType(type)
{
    const unwrapped = unwrapNonNull(type);

    if (isListType(unwrapped))
    {
        return "Array<" + jsType(unwrapNonNull(unwrapped.ofType)) + ">"
    }
    else
    {
        return gqlTypeToJsType[unwrapped.name] || unwrapped.name;
    }
}


function trimLeading(s)
{
    const m = /\n([ ]+)[a-z]/.exec(s);

    const spaces = m[1];
    return s.replace(new RegExp("^" + spaces, "mg"), "");
}


function getDefaultValue(type)
{
    const unwrapped = unwrapNonNull(type);

    if (isListType(unwrapped))
    {
        return "[]";
    }
    else
    {
        return defaultValueForJsType[unwrapped.name] || "null";
    }

}


function main()
{

    const types = schema.types.filter(t => names.indexOf(t.name) >= 0 || t.kind === "ENUM");
    for (let i = 0; i < types.length; i++)
    {
        const type = types[i];

        let source;
        if (type.kind === "ENUM")
        {
            console.log(JSON.stringify(type))
            source = trimLeading(`
                const ${type.name} = {
                ${type.enumValues.map(ev => "    " + ev.name + ": \"" + ev.name + "\"").join(",\n")  }
                };
                export default ${type.name};
                `);
        }
        else
        {

            source = trimLeading(`
                import { action, computed, makeObservable, observable } from "mobx";
                
                export default class ${type.name}
                {
                    constructor()
                    {
                        makeObservable(this);
                    }
                
                    ${type.fields
                        .filter(f => f.name !== "_")
                        .map(f => (`
                    /**
                     * ${f.description}
                     * @type ${jsType(f.type)}
                     * @public
                     */
                    @observable
                    ${f.name} = ${getDefaultValue(f.type)}
                    `)).join("\n")}
                }`
            );
        }

        fs.writeFileSync(path.resolve(__dirname, "../src/model/" + type.name + ".js"), source, "utf8");
    }

}


main();

