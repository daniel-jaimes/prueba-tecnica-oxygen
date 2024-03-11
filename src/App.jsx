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
        [20, { from: "feat", to: "m" }],
        [25, { from: "m", to: "feat" }],
        [30, { from: "cm", to: "inches" }],
        [35, { from: "inches", to: "cm" }],
    ]);

    const handleChangeConverter = (event) => {
        setConverter(event.target.value);
    };

    useEffect(() => {
        if (measureIsNumeric) {
            switch (converter) {
                case 10:
                    setResult(measure);
                    break;
                case 15:
                    setResult(measure);
                    break;
                case 20:
                    setResult(measure);
                    break;
                case 25:
                    setResult(measure);
                    break;
                case 30:
                    setResult(measure);
                    break;
                case 35:
                    setResult(measure);
                    break;
            }
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
    };

    const handleDeleteConverterCard = (id) => {
        const listFiltered = savedConverterList.filter((_, key) => key !== id);
        console.log(listFiltered);
        setSavedConverterList(listFiltered);
    };

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
                maxWidth="75%"
                style={{
                    width: "70%",
                    paddingLeft: "15%",
                    paddingRight: "15%",
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
                        width: "95%",
                        paddingLeft: "2.5%",
                        paddingRight: "2.5%",
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
                            flexDirection: "row",
                            width: "100%",
                            paddingBottom: 1,
                            paddingTop: 1,
                        }}
                    >
                        <Box
                            flex={1}
                            sx={{
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
                                <MenuItem value={20}>feat → m</MenuItem>
                                <MenuItem value={25}>m → feat</MenuItem>
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
                            paddingTop: 1,
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
                            <Typography style={{}} variant="h6" gutterBottom>
                                {result + " " + coverterUnits.get(converter).to}
                            </Typography>
                        </Box>
                    </Box>
                </Paper>
                <Paper
                    elevation={0}
                    style={{
                        width: "100%",
                        paddingLeft: "2.5%",
                        paddingRight: "2.5%",
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
                            <Grid item xs={6} key={index}>
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
                        marginRight: 5,
                    }}
                    gutterBottom
                >
                    Terms of service
                </Typography>
                <Typography
                    flex={1}
                    sx={{
                        textAlign: "left",
                        marginLeft: 5,
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
