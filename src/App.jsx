import "./App.css";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import SavedConverterCard from "./components/SavedConverterCard";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import { useMediaQuery } from "@mui/material";

function App() {
    const [liked, setLiked] = useState(false);
    const [converter, setConverter] = useState(10);
    const [measure, setMeasure] = useState("");
    const [measureIsNumeric, setMeasureIsNumeric] = useState(true);
    const [result, setResult] = useState("");
    const [savedConverterList, setSavedConverterList] = useState([]);

    const coverterUnits = new Map([
        [10, { from: "km", to: "miles" }],
        [15, { from: "miles", to: "km" }],
        [20, { from: "feet", to: "m" }],
        [25, { from: "m", to: "feet" }],
        [30, { from: "cm", to: "inches" }],
        [35, { from: "inches", to: "cm" }],
    ]);

    const handleChangeConverter = (event) => {
        setConverter(event.target.value);
    };

    useEffect(() => {
        var resultConverted;
        if (measureIsNumeric) {
            switch (converter) {
                case 10:
                    resultConverted = measure * 0.6214;
                    break;
                case 15:
                    resultConverted = measure * 1.6093;
                    break;
                case 20:
                    resultConverted = measure * 0.3048;
                    break;
                case 25:
                    resultConverted = measure * 3.280839895;
                    break;
                case 30:
                    resultConverted = measure * 0.3937;
                    break;
                case 35:
                    resultConverted = measure * 2.54;
                    break;
            }
            setResult((Math.round(resultConverted * 100) / 100).toFixed(2));
        }
    }, [measureIsNumeric, converter, measure]);

    const handleChangeMeasure = async (event) => {
        //VALIDATION IS NUMERIC INPUT
        const isNumeric =
            typeof event.target.value != "string"
                ? false
                : event.target.value === "" ||
                  (!isNaN(event.target.value) &&
                      !isNaN(parseFloat(event.target.value)));
        setMeasure(event.target.value);
        setMeasureIsNumeric(isNumeric);
    };

    const toggleLiked = () => {
        if (measureIsNumeric) {
            setLiked(!liked);
            setSavedConverterList([
                ...savedConverterList,
                {
                    measureFrom: measure,
                    unitFrom: coverterUnits.get(converter).from,
                    measureTo: result,
                    unitTo: coverterUnits.get(converter).to,
                },
            ]);
        }

        setTimeout(() => {
            setLiked(false);
            setMeasure("");
            setResult("");
        }, 800);
    };

    const handleClickToggleConverter = () => {
        if (converter % 10 === 0) setConverter(converter + 5);
        else setConverter(converter - 5);
        const auxResult = result;
        const auxMeasure = measure;
        setMeasure(auxResult);
        setResult(auxMeasure);
    };

    const handleDeleteConverterCard = (id) => {
        const listFiltered = savedConverterList.filter((_, key) => key !== id);
        console.log(listFiltered);
        setSavedConverterList(listFiltered);
    };

    const mobile = useMediaQuery("(max-width:320px)");
    return (
        <>
            <Box component="section" sx={{ p: 2, padding: "2px 0 2px" }}>
                <Typography
                    variant="h6"
                    sx={{
                        display: "flex",
                        paddingLeft: "10%",
                        alignItems: "center",
                    }}
                    gutterBottom
                >
                    <CompareArrowsIcon sx={{ marginRight: 1.5 }} />
                    unit converter
                </Typography>
                <Divider sx={{ borderBottomWidth: 3, width: "100%" }} />
            </Box>
            <Container
                style={{
                    width: mobile ? "95%" : "75%%",
                    paddingLeft: mobile ? "2.5%" : "15%",
                    paddingRight: mobile ? "2.55%" : "15%",
                    paddingTop: 30,
                }}
            >
                <Paper
                    variant="elevation"
                    sx={{
                        "& .MuiInputBase-input": {
                            color: "white",
                            borderBottom: "2px solid #ced4da",
                        },
                    }}
                    style={{
                        width: mobile ? "80%" : "95%",
                        paddingLeft: mobile ? "10%" : "2.5%",
                        paddingRight: mobile ? "10%" : "2.5%",
                        height: "auto",
                        backgroundColor: "rgb(48,4,60)",
                        color: "white",
                        borderRadius: 20,
                        paddingTop: 30,
                    }}
                >
                    <Typography
                        variant="h6"
                        style={{ textAlign: "left", width: "100%" }}
                        gutterBottom
                    >
                        convert
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            flexDirection: mobile ? "column" : "row",
                            width: "100%",
                            paddingBottom: 1,
                            paddingTop: 1,
                        }}
                    >
                        <Box
                            flex={1}
                            sx={{
                                width: "100%",
                                textAlign: "left",
                            }}
                        >
                            <Select
                                labelId="customized-select-converter"
                                id="customized-select"
                                value={converter}
                                variant="standard"
                                defaultValue={10}
                                sx={{
                                    color: "white",
                                    textAlign: "left",
                                    width: "75%",
                                    "& .MuiSelect-iconStandard": {
                                        color: "white",
                                    },
                                }}
                                onChange={handleChangeConverter}
                            >
                                <MenuItem selected value={10}>
                                    km → miles
                                </MenuItem>
                                <MenuItem value={15}>miles → km</MenuItem>
                                <MenuItem value={20}>feet → m</MenuItem>
                                <MenuItem value={25}>m → feet</MenuItem>
                                <MenuItem value={30}>cm → inches</MenuItem>
                                <MenuItem value={35}>inches → cm</MenuItem>
                            </Select>
                            <IconButton
                                style={{ color: "white" }}
                                onClick={handleClickToggleConverter}
                            >
                                <CompareArrowsIcon />
                            </IconButton>
                        </Box>
                        <Box
                            flex={1}
                            sx={{
                                textAlign: "left",
                                display: "flex",
                                justifyContent: "left",
                                alignItems: "center",
                                width: "100%",
                            }}
                        >
                            <TextField
                                id="standard-basic"
                                variant="standard"
                                helperText={
                                    measureIsNumeric ? "" : "Only numbers"
                                }
                                value={measure}
                                sx={{
                                    width: "75%",
                                    marginRight: "5%",
                                }}
                                onChange={handleChangeMeasure}
                                error={!measureIsNumeric}
                            />
                            {coverterUnits.get(converter).from}
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            flexDirection: "row",
                            width: "100%",
                            paddingBottom: 2.5,
                            paddingTop: mobile ? 2 : 1,
                        }}
                    >
                        <Box
                            flex={1}
                            sx={{
                                textAlign: "left",
                            }}
                        >
                            <IconButton
                                style={{ color: "white", padding: 0 }}
                                onClick={toggleLiked}
                            >
                                {!liked ? (
                                    <FavoriteBorderIcon />
                                ) : (
                                    <FavoriteIcon />
                                )}
                            </IconButton>
                        </Box>
                        <Box
                            flex={1}
                            sx={{
                                textAlign: "right",
                                paddingRight: "6%",
                            }}
                        >
                            <Typography
                                style={{
                                    fontSize: mobile ? "19px" : "22px",
                                    fontWeight: mobile ? "550" : "500",
                                }}
                                gutterBottom
                            >
                                {result + " " + coverterUnits.get(converter).to}
                            </Typography>
                        </Box>
                    </Box>
                </Paper>
                <Paper
                    elevation={0}
                    style={{
                        width: mobile ? "90%" : "95%",
                        paddingLeft: mobile ? "5%" : "2.5%",
                        paddingRight: mobile ? "5%" : "2.5%",
                        paddingTop: 30,
                        height: "auto",
                    }}
                >
                    <Typography
                        sx={{
                            fontWeight: 450,
                            fontSize: 18,
                            textAlign: "left",
                        }}
                        gutterBottom
                    >
                        saved
                    </Typography>

                    <Grid
                        container
                        rowSpacing={1}
                        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                        sx={{ margin: 0, padding: 0 }}
                    >
                        {savedConverterList.map((item, index) => (
                            <Grid item xs={mobile ? 10.2 : 6} key={index}>
                                <SavedConverterCard
                                    key={index}
                                    id={index}
                                    measureFrom={item.measureFrom}
                                    unitFrom={item.unitFrom}
                                    measureTo={item.measureTo}
                                    unitTo={item.unitTo}
                                    onRemove={handleDeleteConverterCard}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Paper>
            </Container>
            <Box
                component="section"
                sx={{
                    display: "flex",
                    width: "100%",

                    position: "fixed",
                    alignItems: "center",
                    flexDirection: "row",
                    bottom: 0,
                    marginTop: "500px",
                    color: "white",
                    height: 45,
                    paddingTop: 0.5,
                    backgroundColor: "rgb(48,4,60)",
                }}
            >
                <Typography
                    flex={1}
                    sx={{
                        textAlign: "right",
                        marginRight: mobile ? 2 : 5,
                        fontSize: mobile ? "13px" : "16px",
                    }}
                    gutterBottom
                >
                    Terms of service
                </Typography>
                <Typography
                    flex={1}
                    sx={{
                        textAlign: "left",
                        marginLeft: mobile ? 2 : 5,
                        fontSize: mobile ? "13px" : "16px",
                    }}
                    gutterBottom
                >
                    Privacy policy
                </Typography>
            </Box>
        </>
    );
}
export default App;
