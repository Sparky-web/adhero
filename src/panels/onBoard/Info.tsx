import React, {useContext} from 'react';
import image from "./connection.png"
import {Button, Div, Text, Title} from "@vkontakte/vkui/dist";
import {NavigationContext} from "../../context/NavigationContext";

function Info() {
    const {go} = useContext(NavigationContext)

    const start = () => {
        go({
            view: "onboard",
            panel: "onboard.select",
            canGoBack: false,
        })
    }

    return (
        <div className={"onboard__panel"}>
            <Div>
                <Title level={"1"} weight={"bold"}>AdHero</Title>
            </Div>
            <Div>
                <Text weight={"regular"}>
                    Легко покупайте и продавайте рекламу в группах ВКонтакте
                </Text>
            </Div>
            <Div>
                <Button size={"l"} onClick={start}>Начать</Button>
            </Div>
            <img src={image} alt="" className={"onboard__image"}/>
        </div>
    );
}

export default Info