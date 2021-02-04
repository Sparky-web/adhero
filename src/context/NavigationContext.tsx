import React, {createContext, ReactNode, useEffect, useRef, useState} from 'react';
import {History, HistoryItem} from "../types/app";

const initialState = {
    view: "service",
    panel: "service.loading",
    modal: "",
    canGoBack: false
} as HistoryItem

const NavigationContext = createContext<{
    history: History, state: HistoryItem,
    go: (item: HistoryItem) => any, back: () => boolean
}>({
    history: [],
    state: initialState,
    go: (item) => {},
    back: () => {return false}
});

function NavigationProvider(props: {children: ReactNode}) {
    const [history, setHistory] = useState<History>([])
    const [state, setState] = useState<HistoryItem>(initialState)

    const go = (item: HistoryItem) => {
        if(item.canGoBack) window.history.pushState(item, item.panel)
        setHistory([...history, state])
        setState(item)
    }
    const back = () => {
        if(history.slice(-1)[0].canGoBack) {
            setState(history.slice(-1)[0])
            setHistory(history.slice(0, -1))
            return true
        }
        else return false
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
        <NavigationContext.Provider value={{history, state, go, back}}>
            {props.children}
        </NavigationContext.Provider>
    );
}

export {NavigationContext, NavigationProvider};