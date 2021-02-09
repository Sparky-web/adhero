import React, {useContext, useEffect} from 'react';
import {Avatar, Button, Div, Group, PanelHeader, Placeholder, RichCell, Spinner} from "@vkontakte/vkui";
import {Title} from "@vkontakte/vkui/dist";
import {Icon16Chevron, Icon16ChevronLeft, Icon56InfoOutline} from "@vkontakte/icons";
import {NavigationContext} from "../../../context/NavigationContext";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux";
import selectGroupsSlice, {fetchGroups} from "../../../redux/selectGroupsSlice";

function CreateAd() {
    const {openModal} = useContext(NavigationContext)

    const groups = useSelector((state: RootState) => state.selectGroups.groups)
    const selectedGroups = useSelector((state: RootState) => state.selectGroups.selectedGroups)
    const isLoading = useSelector((state: RootState) => state.selectGroups.isLoading)
    const before = useSelector((state: RootState) => state.selectGroups.before)
    const after = useSelector((state: RootState) => state.selectGroups.after)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchGroups("forward"))
        return function cleanup() {
            dispatch(selectGroupsSlice.actions.clearGroups())
        }
    }, [])

    useEffect(() => {
        if (!groups.length && after) {
            dispatch(fetchGroups("forward"))
        }
    }, [selectedGroups, groups, isLoading, after])

    const selectedPrice = selectedGroups.length ? selectedGroups.map(el => el.price).reduce((acc, val) => acc + val) : 0

    return (
        <React.Fragment>
            <PanelHeader>Создание кампании</PanelHeader>
            <Div>
                <Title weight={"regular"} level={"3"}>
                    1. Выберете группы
                </Title>
            </Div>

            <Div style={{display: 'flex'}}>
                <Button size="m" stretched style={{marginRight: 8}}
                        onClick={() => {
                            openModal("filters")
                        }}
                >Фильтры</Button>
                <Button size="m" stretched mode="secondary" onClick={() => openModal("sort")}>Сортировка</Button>
            </Div>

            {!groups.length && isLoading && <Spinner size={"large"} className={"mt-3"}/>}

            <Group className={["ad-groups", isLoading ? "ad-groups__loading" : ""].join(" ")}>
                {groups.map(el => (
                    <RichCell
                        key={el.id}
                        disabled
                        multiline
                        before={<Avatar size={48} src={el.image}/>}
                        text={`Подписчиков: ${el.subscribers}`}
                        after={`+ ${el.price} ₽`}
                        actions={<React.Fragment>
                            <Button
                                onClick={() => dispatch(selectGroupsSlice.actions.selectGroup(el))}>Добавить</Button>
                            <Button mode={"secondary"}>Статистика</Button>
                        </React.Fragment>}
                    >
                        {el.name}
                    </RichCell>
                ))}
            </Group>

            {!groups.length && !after && !isLoading &&
            <Placeholder
                icon={<Icon56InfoOutline/>}
                header={"Больше групп по заданным критериям не найдены"}
            />}

            {(before || after) && <Div className={"flex"}>
                <Button mode={"secondary"} disabled={!before || isLoading}
                        onClick={() => dispatch(fetchGroups("backward"))} stretched><Icon16ChevronLeft/></Button>
                <Button mode={"secondary"} className={"ml-2"} disabled={!after || isLoading}
                        onClick={() => dispatch(fetchGroups("forward"))} stretched><Icon16Chevron/></Button>
            </Div>}

            <Div>
                <Title level={"3"} weight={"bold"}>Выбрано групп на {selectedPrice} ₽</Title>
            </Div>

            <Div><Button size={"l"} stretched>
                Продолжить
            </Button></Div>
        </React.Fragment>
    );
}

export default CreateAd;