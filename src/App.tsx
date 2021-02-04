import React, {useContext} from "react"
import "./App.css"
import {Panel, Root, ScreenSpinner, View} from "@vkontakte/vkui";
import {NavigationContext} from "./context/NavigationContext";

import Info from "./panels/onBoard/Info";
import Select from "./panels/onBoard/Select";
import Ad from "./panels/main/Ad";
import Owner from "./panels/main/Owner";

export default function App() {
    const {state, go} = useContext(NavigationContext)
    
    return (
        <Root activeView={state.view}>
            <View activePanel={state.panel} id="main">
                <Panel id={"main.ad"}><Ad /></Panel>
                <Panel id={"main.owner"}><Owner /></Panel>
            </View>
            <View activePanel={state.panel} id="onboard">
                <Panel id={"onboard.info"}><Info/></Panel>
                <Panel id={"onboard.select"}><Select /></Panel>
            </View>
            <View activePanel={state.panel} id="service">
                <Panel id={"service.loading"}><ScreenSpinner/></Panel>
            </View>
        </Root>
    )
};

