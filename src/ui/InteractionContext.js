import React, { useContext } from "react";
import { action, makeObservable, observable, reaction } from "mobx";
import { observer } from "mobx-react-lite";


export class InteractionContextState {

    @observable
    focused = null;

    @observable
    hovered = null;

    @observable
    infos = new Map();

    constructor()
    {
        makeObservable(this);
    }

    @action
    register(id, info)
    {
        this.infos.set(id, info);

        return () => {
            this.infos.delete(id);
        }
    }

    @action
    setFocused(id)
    {
        this.focused = id;
    }


    @action
    setHovered(id)
    {
        this.hovered = id;
    }
}


export const FocusContainer = observer(
    props => {

        const ctx = useContext(InteractionContext);

        const elems = []
        for (let [id, info] of ctx.infos)
        {
            elems.push(
                <a
                    key={ id }
                    id={ "svgprx-" + id }
                    className="hidden"
                    onFocus={
                        () => ctx.setFocused(id)
                    }
                    onBlur={
                        () => ctx.setFocused(null)
                    }
                    onClick={
                        ev => {
                            ev.preventDefault();
                            document.getElementById("svgbtn-" + id).click();
                        }
                    }
                    href={ "#" + id }
                >
                    {
                        info.label
                    }
                </a>
            )
        }

        return (
            <div className="focus-container">
                {
                    elems
                }
            </div>
        );
    }
);

const InteractionContext = React.createContext(null);

export default InteractionContext;


