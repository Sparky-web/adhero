import React, {useEffect, useState} from 'react';
import {Button, FormItem, ModalPage, ModalPageHeader, PanelHeaderButton, Select} from "@vkontakte/vkui";
import {ModalProps} from "./index";
import {Icon24Cancel, Icon24Done} from "@vkontakte/icons";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../redux";
import {updateSort} from "../redux/selectGroupsSlice";
import {Sort as _Sort} from "../types/app";
import {Div} from "@vkontakte/vkui/dist";

function Sort(props: ModalProps) {

    const dispatch = useDispatch()
    const sort = useSelector((state: RootState) => state.selectGroups.sort)

    const [selected, setSelected] = useState("")

    const back = () => window.history.back()
    const handleSubmit = () => {
        dispatch(updateSort(selected as _Sort))
        back()
    }

    useEffect(() => {
       setSelected(sort)
    }, [sort])

    return (
        <ModalPage
            onClose={back}
            id={props.id}
            header={<ModalPageHeader
                className={"modal"}
                left={<PanelHeaderButton onClick={back}><Icon24Cancel /></PanelHeaderButton>}
                right={<PanelHeaderButton onClick={handleSubmit}><Icon24Done /></PanelHeaderButton>}
            >Сортировка</ModalPageHeader>}
        >
            <FormItem top={"Тип"}>
                <Select placeholder={"Не выбрано"} value={selected} options={[
                    {
                        label: "Цена (по возрастанию)",
                        value: "by_price"
                    },
                    {
                        label: "Подписчики (по возрастанию)",
                        value: "by_subscribers"
                    }
                ]}
                onChange={e => setSelected(e.target.value)}
                />
            </FormItem>
            <Div><Button mode={"commerce"} stretched size={"l"} onClick={handleSubmit}>Применить</Button></Div>
        </ModalPage>
    );
}

export default Sort;