import { action, makeObservable, observable, toJS } from "mobx";
import Domain from "./Domain";
import { InteractionContextState } from "../ui/InteractionContext";

let counter = 0;

const Format = {
    /**
     * Internal automaton schema format (GraphQL plus)
     *
     * The easiest way to get this format is to take "App.config.inputSchema.schema" from a running automaton app.
     */
    AUTOMATON: "AUTOMATON",
    /**
     * Raw GraphQL without the extra relation information etc.
     *
     * Normal GraphQL introspection result
     */
    GRAPHQL: "GRAPHQL",
    /**
     * An export from this application
     */
    DOMAIN: "DOMAIN"
};


export function getImportFormat(data)
{
    // ignore __schema level if we find it
    if (data.__schema)
    {
        data = data.__schema;
    }

    if (data.types)
    {
        if (data.genericTypes && data.nameFields && data.relations && data.decimalPrecision && data.fieldLengths)
        {
            return Format.AUTOMATON;
        }
        else
        {
            return Format.GRAPHQL;
        }
    }
    else if (data.description && data.domainTypes && data.enumTypes)
    {
        return Format.DOMAIN
    }
    else
    {
        return null;
    }

}

export default class AppState {

    constructor()
    {
        makeObservable(this);
    }

    @observable
    id = counter++;

    @observable
    domain = null;

    @observable
    interaction = new InteractionContextState();


    @action
    newDomain()
    {
        this.id++;
        this.domain = new Domain();
    }

    @action
    import(data)
    {
        const format = getImportFormat(data);


        switch (format)
        {
            case Format.AUTOMATON:
                this.domain = Domain.importSchema(data);
                break;
            case Format.GRAPHQL:
                console.log("IMPORT GRAPHQL")
                break;
            case Format.DOMAIN:
                console.log("IMPORT DOMAIN MODEL")
                break;
            default:
                alert("Unkown JSON format");
                console.info("Unkown JSON format", data);
        }
    }
}

