import { action, makeObservable, observable, toJS } from "mobx";
import Domain from "./Domain";

let counter = 0;

export default class AppState {

    constructor()
    {
        makeObservable(this);
    }

    @observable
    id = counter++;

    @observable
    domain = null;


    @action
    newDomain()
    {
        this.id++;
        this.domain = new Domain();
    }

    @action
    import(data)
    {
        if (data.types)
        {
            if (data.genericTypes && data.nameFields && data.relations && data.decimalPrecision && data.fieldLengths)
            {
                console.log("IMPORT AUTOMATON GRAPHQL")

                this.domain = Domain.importSchema(data);

                console.log(toJS(this.domain))
            }
            else
            {
                console.log("IMPORT GRAPHQL")
            }
        }
        else if (data.description && data.domainTypes && data.enumTypes)
        {
            console.log("IMPORT DOMAIN MODEL")
        }
        else
        {
            alert("Unkown JSON format");
            console.info("Unkown JSON format", data);
        }
    }
}

