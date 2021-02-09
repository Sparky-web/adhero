import React, {useContext} from 'react';
import {CellButton, Div, Group, Text, Title} from "@vkontakte/vkui/dist";
import {MainPanel} from "../../types/app";
import {NavigationContext} from "../../context/NavigationContext";

function Select() {
    const {go} = useContext(NavigationContext)

    const proceed = (panel: MainPanel) => {
        go({
            panel,
            view: "main",
            canGoBack: true
        })
    }

    return (
        <div className={"onboard__panel"}>
            <Div><Title weight={"bold"} level={"2"}>Выберете</Title></Div>
            <Div><Text weight={"regular"}>Тип кабинета можно будет изменить позже</Text></Div>

            <Group>
                <CellButton onClick={() => proceed("main.ad")} color={"secondary"}>Я рекламодатель</CellButton>
                <CellButton onClick={() => proceed("main.owner")} color={"secondary"}>Я владелец группы</CellButton>
            </Group>
        </div>
    );
}

export default Select;