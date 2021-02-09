import React, {useContext} from 'react';
import {ModalRoot} from "@vkontakte/vkui";
import {NavigationContext} from "../context/NavigationContext";
import Filters from "./Filters";
import Sort from "./Sort";

export type ModalProps = {id: string, onClose: () => void}

function Modals() {
    const {modal} = useContext(NavigationContext)

    const back = () => window.history.back()
    return (
        <ModalRoot activeModal={modal} >
            <Filters id="filters" onClose={back} />
            <Sort id="sort" onClose={back} />
        </ModalRoot>
    );
}

export default Modals;