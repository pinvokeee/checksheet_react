const sheet_data = 
{
    presets :
    [
        {
            sheetName : "test",

            checkItems : 
            [
                {
                    caption: "キャプション",
                    type: "input",
                    children: 
                    [
                        {
                            caption: "チェックボックスA",
                            checkedLabel: "テストですよA",
                            type: "checkbox",
                            children: 
                            [
                                {
                                    caption: "チェックボックスA-1",
                                    checkedLabel: "テストですよB",
                                    type: "checkbox",
                                    children: 
                                    [
                                        
                                    ]
                                }
                            ]
                        }
                    ],

                    value: "",
                },

                {
                    caption: "インプット1",
                    type: "input",
                    children:
                    [

                    ]
                },

                {
                    caption: "チェックボックスB",
                    type: "checkbox",
                    children: 
                    [

                    ]
                },

                {
                    caption: "チェックボックスリスト",
                    type: "radio-selecter",
                    list:
                    [
                        "A-1",
                        "A-2",
                        "A-3",
                        "A-1",
                    ],

                    children: 
                    [
                        {
                            caption: "ラジオリスト",
                            type: "radio-selecter",
                            list:
                            [
                                "A-1",
                                "A-2",
                                "A-3",
                                "A-1",
                            ],
        
                            selection:
                            [
                                "A-1",
                            ],
        
                            children: 
                            [
        
                            ]
                        }
                    ]
                },


            ]
        },

        {
            sheetName : "test",

            checkItems : 
            [
                {
                    caption: "キャプション",
                    type: "input",
                    children: 
                    [
                        {
                            caption: "キャプション",
                            type: "checkbox",
                            children: 
                            [
                                
                            ]
                        }
                    ]
                },

                {
                    caption: "キャプション",
                    type: "input",
                    children: 
                    [
                        {
                            caption: "キャプション",
                            type: "checkbox",
                            children: 
                            [
        
                            ]
                        }
                    ]
                },

                {
                    caption: "キャプション",
                    type: "checkbox",
                    children: 
                    [

                    ]
                }
            ]
        },
    ]
}