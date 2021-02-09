import React from 'react';
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../redux";
import * as Yup from "yup"
import {Button, FormItem, FormLayoutGroup, Input, ModalPage, ModalPageHeader, PanelHeaderButton} from "@vkontakte/vkui";
import {Icon24Cancel, Icon24Done} from "@vkontakte/icons";
import {Div} from "@vkontakte/vkui/dist";
import {updateFilters} from "../redux/selectGroupsSlice";
import {ModalProps} from "./index";

const valuesSchema = Yup.object({
    subsMin: Yup.number().min(0).max(1000000).required(),
    subsMax: Yup.number().min(0).max(1000000).required(),
    priceMax: Yup.number().min(0).max(1000000).required(),
    priceMin: Yup.number().min(0).max(1000000).required(),
})

type Values = Yup.InferType<typeof valuesSchema>

function Filters(props: ModalProps) {
    const filters = useSelector((state: RootState) => state.selectGroups.filters)

    const dispatch = useDispatch()

    const values: Values = {
        subsMin: filters.subscribers.min,
        subsMax: filters.subscribers.max,
        priceMax: filters.price.max,
        priceMin: filters.price.min,
    }

    const formik = useFormik({
        initialValues: values,
        onSubmit: values => {
            dispatch(updateFilters({
                price: {
                    min: values.priceMin,
                    max: values.priceMax
                },
                subscribers: {
                    min: values.subsMin,
                    max: values.subsMax
                }
            }))
            back()
        },
        validationSchema: valuesSchema
    })

    const back = () => window.history.back()

    return (
        <ModalPage
            id={props.id}
            settlingHeight={100}
            header={<ModalPageHeader
                className={"modal"}
                left={<PanelHeaderButton onClick={back}><Icon24Cancel/></PanelHeaderButton>}
                right={<PanelHeaderButton onClick={() => formik.handleSubmit()}><Icon24Done/></PanelHeaderButton>}
            >Фильтры</ModalPageHeader>}
        >
            <FormLayoutGroup mode={"horizontal"} className={"filters__two-cols"}>
                <Field className={""} label="Подписчики" formik={formik} name={"subsMin"} type={"number"}/>
                <Field className={"filters__dash"} label="‏‏‎ ‎" formik={formik} name={"subsMax"} type={"number"}/>
            </FormLayoutGroup>

            <FormLayoutGroup mode={"horizontal"} className={"filters__two-cols"}>
                <Field className={"filters__currency"} label="Цена" formik={formik} name={"priceMin"} type={"number"}/>
                <Field className={"filters__dash filters__currency"} label="‏‏‎ ‎" formik={formik} name={"priceMax"}
                       type={"number"}/>
            </FormLayoutGroup>
            <Div><Button
                disabled={!formik.isValid || formik.isSubmitting}
                mode={"commerce"} size={"l"} stretched type={"submit"}
                onClick={() => formik.handleSubmit()}
            >Применить</Button></Div>
        </ModalPage>
    );
}

//@ts-ignore
const Field = ({formik, name, type, label, className}) => {
    return (
        <FormItem
            className={className}
            top={label}
            status={formik.errors[name] ? "error" : "default"}
            bottom={formik.errors[name]}
        >
            <Input {...formik.getFieldProps(name)} type={type}/>
        </FormItem>
    )
};

export default Filters;