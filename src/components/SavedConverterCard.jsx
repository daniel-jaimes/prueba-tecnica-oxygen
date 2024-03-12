import { Paper } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import { useMediaQuery } from "@mui/material";

function SavedConverterCard(props) {
    const mobile = useMediaQuery("(max-width:320px)");

    return (
        <Paper
            sx={{
                width: mobile ? "100%" : "80%",
                borderRadius: 3,
                paddingLeft: 2,
                paddingRight: 2,
                paddingTop: 0.2,
                paddingBottom: 0.2,
                textAlign: "left",
                background: "#e8e4e4",
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                fontSize: 14,
            }}
        >
            <Box flex={1}>
                {props.measureFrom +
                    " " +
                    props.unitFrom +
                    " → " +
                    props.measureTo +
                    " " +
                    props.unitTo}
            </Box>

            <Box flex={0}>
                <IconButton onClick={() => props.onRemove(props.id)}>
                    <CloseIcon />
                </IconButton>
            </Box>
        </Paper>
    );
}

export default SavedConverterCard;
