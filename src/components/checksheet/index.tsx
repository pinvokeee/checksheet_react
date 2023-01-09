import { Box } from "@mui/material";

interface IGroupProps
{
    disabled?: boolean,
    children: React.ReactNode,
}

export const InputGroup = (props: IGroupProps) =>
{
    const bgcolor = props.disabled ? "lightgray" : "inherit";

    return (
        <>
            <Box sx={{ backgroundColor: bgcolor }}>
                {props.children}
            </Box>            
        </>
    )
}