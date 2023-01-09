import { Checkbox, FormControl, FormControlLabel, FormGroup, Paper, Radio, RadioGroup, Stack, styled, TextField } from "@mui/material"
import Typography from "@mui/material/Typography"
import { useState } from "react";
import { InputGroup } from "..";
import { checkItem, sheetConfig, sheetData } from "../../../interface/interface"
import { IUseSheetState, useSheetState } from "../hooks";

export interface ICheckItemProps
{
    sheet : sheetData,
}

const LabelContainer = styled("span")( (theme) =>
(
    {
        backgroundColor: "#e3f2fd",
        display: "flex",
        fontSize: "16px",
        fontWeight: "bold",
        textAlign: "left",
        boxSizing: "border-box",
        userSelect: "none",

        "&::before":
        {
            
            backgroundColor: "#90caf9",
            content: '" "',
            width: "6px",
            whiteSpace: "pre",
        }
    }
));

const Label = styled("div")( (theme) => 
(
    {
        padding: "4px",
        userSelect: "none",
    }
));

interface ICaptionProps
{
    children : React.ReactNode,
}

const Caption = (props: ICaptionProps) =>
{
    return (
        <LabelContainer>
            <Label>{props.children}</Label>
        </LabelContainer>
    )
}

const createItemTextInput = (item : checkItem, state: IUseSheetState, isEnabled?: boolean, parentItem?: checkItem) =>
{    
    return (
    <>
        <Caption>{item.caption}</Caption>
        <TextField disabled={!isEnabled} margin="normal" value={getValue(item)} onChange={(e) => onInputChange(item, e.target.value, state)}></TextField>
    </>
    );
}

const createItemCheckBox = (item : checkItem, state: IUseSheetState, parentEnabled?: boolean, parentItem?: checkItem) =>
{    
    return (
    <>
    <Caption>{item.caption}</Caption>
    <FormGroup>
    <FormControlLabel disabled={!parentEnabled}
        control={<Checkbox checked={isChecked(item)} onChange={ (e, checked) => onCheckedChange(item, checked, state)} />} 
        label={item.checkedLabel} />
    </FormGroup>
    </>
    )
}

const createItemCheckSelecter = (item : checkItem, state: IUseSheetState, parentEnabled?: boolean, parentItem?: checkItem) =>
{    
    return (
    <>
    <Caption>{item.caption}</Caption>
    <FormGroup>        
    {
        item.list == null ? <></> :
        item.list.map(select => 
        {
            return (
                <FormControlLabel disabled={!parentEnabled}
                checked={isSelection(item, select)}
                onChange={(e, value) => onSelectionChange(item, select, value, state)}
                control={<Checkbox />} 
                label={select} />
            )
        })
    }
    </FormGroup>
    </>
    )
}

const createItemRadioSelecter = (item : checkItem, state: IUseSheetState, parentEnabled?: boolean, parentItem?: checkItem) =>
{    
    return (
    <>
    <Caption>{item.caption}</Caption>
    {/* <FormControl > */}
    <RadioGroup value={ getSelection(item) } onChange={ (e, s)=> onRadioSelectionChange(item, s, state) }>
    {
        item.list == null ? <></> :
        item.list.map(select => 
        {
            return (
                <FormControlLabel disabled={!parentEnabled}
                value={ select }
                control={<Radio />} 
                label={select} />
            )
        })
    }
    </RadioGroup>
    {/* </FormControl> */}
    </>
    )
}

const createItem = (item : checkItem, state: IUseSheetState, parentEnabled?: boolean, parentItem? : checkItem) =>
{
    if (item.type == "input")
    {
        return createItemTextInput(item, state, parentEnabled, parentItem);
    }

    if (item.type == "checkbox")
    {
        return createItemCheckBox(item, state, parentEnabled, parentItem);
    }

    if (item.type == "checkbox-selecter")
    {
        return createItemCheckSelecter(item, state, parentEnabled, parentItem);
    }

    if (item.type == "radio-selecter")
    {
        return createItemRadioSelecter(item, state, parentEnabled, parentItem);
    }

    return <></>
}

const createItemTree = (item : checkItem, state: IUseSheetState, parentEnabled?: boolean, parentItem?: checkItem) =>
{
    const enabled = parentItem == null || parentEnabled;
    const checked = isChecked(item);

    return (
    <>
    { createItem(item, state, enabled, parentItem) }
    {
        item.children.length > 0 ? 
        
        <Stack sx={{ padding: "8px 0px 8px 32px" }}>
            <InputGroup disabled={!(enabled && checked)}>
                { item.children.map(it => createItemTree(it, state, enabled && checked, item)) }
            </InputGroup>
        </Stack> : <></>
    }
    </>);
}

const getValue = (item: checkItem) =>
{
    return item.value == null ? "" : item.value;
}

const getSelection = (item: checkItem) =>
{
    if (item.selection == null || item.selection.length == 0) return "";

    return item.selection[0];
}

const isChecked = (item: checkItem) =>
{
    if (item.type == "input" && (item.value != null && item.value.length > 0)) return true;

    if (item.type == "checkbox-selecter" || item.type == "radio-selecter")
    {
        return item.selection != null && item.selection.length > 0;
    }
    
    return item.checked ? true : false;
}

const isSelection = (item: checkItem, select: string) =>
{
    if (item.selection == null) return false;
    return item.selection.find(s => select == s) != null;
}

const onInputChange = (item: checkItem, newValue: string, state: IUseSheetState) =>
{
    state.setInputValue(item, newValue);
}

const onCheckedChange = (item: checkItem, newValue: boolean, state: IUseSheetState) =>
{
    state.setCheckedValue(item, newValue);
}

const onSelectionChange = (item: checkItem, newValue: string, checked: boolean, state: IUseSheetState) =>
{
    state.setSelection(item, newValue, checked);
}

const onRadioSelectionChange = (item: checkItem, newValue: string, state: IUseSheetState) =>
{
    state.setRadioSelection(item, newValue);
}

export const CheckItemList = (props : ICheckItemProps) =>
{
    const sheetHook = useSheetState(props.sheet);

    return (
        <Stack padding={2}>
            {
                sheetHook.sheet.checkItems.map(item => createItemTree(item, sheetHook, true))
            }
        </Stack>
    );
}