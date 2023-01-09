export interface sheetConfig
{
    presets : sheetData[],
}

export interface sheetData
{
    sheetName : string,
    checkItems : checkItem[],
}

export interface checkItem
{
    id : string,
    caption : string,
    type: "input" | "checkbox" | "select" | "checkbox-selecter" | "radio-selecter",
    
    children : checkItem[],

    isRequired? : boolean,

    value? : string,
    checkedLabel? : "あり" | string,
    checked? : boolean,
    selected? : string,

    /*すべてチェックが必要 - checkbox-selecterのみ*/
    isComplete?: boolean,

    list?: string[],
    selection? : string[],
}