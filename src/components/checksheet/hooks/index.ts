import { useState } from "react";
import { checkItem, sheetConfig, sheetData } from "../../../interface/interface";

export interface IUseSheetState
{
    sheet: sheetData,

    setInputValue: (item: checkItem, newValue: string) => void,
    setCheckedValue: (item: checkItem, newValue: boolean) => void,
    setSelection: (item : checkItem, newValue : string, checked: boolean) => void,
    setRadioSelection: (item : checkItem, newValue : string) => void,
}

export const useSheetState = (baseSheetData : sheetData) : IUseSheetState =>
{
    // const base : sheetData = useMemo(() => baseSheetData);
    const [sheet, setSheetState] = useState(baseSheetData);

    const setInputValue = (item : checkItem, newValue : string) =>
    {
        item.value = newValue;
        setSheetState({...sheet});

        // console.log(JSON.stringify(sheet));
    }

    const setCheckedValue = (item : checkItem, newValue : boolean) =>
    {
        item.checked = newValue;
        setSheetState({...sheet});
    }

    const setSelection = (item : checkItem, newValue : string, checked: boolean) =>
    {
        item.selection = item.selection?.filter(v => newValue != v);
        if (checked) item.selection?.push(newValue);
        setSheetState({...sheet});
    }

    const setRadioSelection = (item : checkItem, newValue : string) =>
    {
        item.selection = [newValue];
        setSheetState({...sheet});
    }

    return {
        sheet,
        setInputValue,
        setCheckedValue,
        setSelection,
        setRadioSelection
    }
}