import React, {createContext, ReactNode, useEffect, useState} from 'react';
import {History, HistoryItem, Modal} from "../types/app";

const initialState = {
    view: "service",
    panel: "service.loading",
    canGoBack: false,
} as HistoryItem

const NavigationContext = createContext<{
    history: History, state: HistoryItem, modal: Modal,
    go: (item: HistoryItem) => any, back: () => any, openModal: (modal: Modal) => any
}>({
    history: [],
    state: initialState,
    go: (item) => {
    },
    back: () => {
        return false
    },
    openModal: (modal) => {
    },
    modal: null
});

function NavigationProvider(props: { children: ReactNode }) {
    const [history, setHistory] = useState<History>([])
    const [state, setState] = useState<HistoryItem>(initialState)
    const [modal, setModal] = useState<Modal>(null)

    const go = (item: HistoryItem) => {
        if (item.canGoBack) window.history.pushState(item, item.panel)
        setHistory([...history, state])
        setState(item)
    }
    const back = () => {
        if (modal) {
            setModal(null)
            return true
        } else if (history.slice(-1)[0].canGoBack) {
            setState(history.slice(-1)[0])
            setHistory(history.slice(0, -1))
            return true
        } else return false
    }

    const openModal = (modal: Modal) => {
        if(modal) {
            window.history.pushState(modal, modal)
            setModal(modal)
        }
    }

    useEffect(() => {
        setTimeout(() => {
            go({
                canGoBack: true,
                modal: "",
                panel: "onboard.info",
                view: "onboard"
            })
        }, 1000)
    }, [])

    window.onpopstate = back

    return (
        <NavigationContext.Provider value={{history, state, go, back, modal, openModal}}>
            {props.children}
        </NavigationContext.Provider>
    );
}

export {NavigationContext, NavigationProvider};