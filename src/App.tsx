import React, {useContext} from "react"
import "./App.css"
import {Panel, Root, ScreenSpinner, View} from "@vkontakte/vkui";
import {NavigationContext} from "./context/NavigationContext";

import Info from "./panels/onBoard/Info";
import Select from "./panels/onBoard/Select";
import Ad from "./panels/main/ad/Ad";
import Owner from "./panels/main/owner/Owner";
import CreateAd from "./panels/main/ad/CreateAd";
import Modals from "./modals";

export default function App() {
    const {state} = useContext(NavigationContext)

    return (
        <Root activeView={state.view} modal={<Modals/>}>
            <View activePanel={state.panel} id="main">
                <Panel id={"main.ad"}><Ad/></Panel>
                <Panel id={"main.owner"}><Owner/></Panel>
                <Panel id={"main.ad.create-ad"}><CreateAd/></Panel>
            </View>
            <View activePanel={state.panel} id="onboard">
                <Panel id={"onboard.info"}><Info/></Panel>
                <Panel id={"onboard.select"}><Select/></Panel>
            </View>
            <View activePanel={state.panel} id="service">
                <Panel id={"service.loading"}><ScreenSpinner/></Panel>
            </View>
        </Root>
    )
}

