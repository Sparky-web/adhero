import React, {useContext} from 'react';
import {Button, Div, PanelHeader, Placeholder} from "@vkontakte/vkui";
import {Icon56UsersOutline} from "@vkontakte/icons";
import {NavigationContext} from "../../../context/NavigationContext";

function Ad() {
    const {go} = useContext(NavigationContext)
    const create = () => {
        go({
            view: "main",
            panel: "main.ad.create-ad",
            canGoBack: true,
        })
    }


    return (
        <React.Fragment>
            <PanelHeader>
                Кабинет рекламодателя
            </PanelHeader>
            <Div>
                <Placeholder
                    icon={<Icon56UsersOutline/>}
                    header="Кампаний пока нет"
                    action={<Button size="m" onClick={create}>Создать</Button>}
                >
                    Создайте кампанию для начала продвижения вашей группы/товара/услуги
                </Placeholder>
            </Div>
        </React.Fragment>
    );
}

export default Ad;