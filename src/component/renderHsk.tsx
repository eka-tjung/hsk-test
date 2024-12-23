import { Button, Container, FormControlLabel, FormGroup, Grid, IconButton, Switch, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import React from 'react';
import Speech from 'speak-tts';
import hsk1 from '../assets/new-hsk1.json';
import hsk2 from '../assets/new-hsk2.json';
import hsk3 from '../assets/new-hsk3.json';
import hsk4 from '../assets/new-hsk4.json';
import hsk5 from '../assets/new-hsk5.json';
import hsk6 from '../assets/new-hsk6.json';
import hsk789 from '../assets/new-hsk7-9.json';
import { VolumeUp } from '@mui/icons-material';

type hskModel = {
    simplified: string,
    pinyin: string,
    meaning: string,
    traditional?: string,
}

type renderHskProps = {
    hsk: Array<hskModel>;
}

export default class RenderHSK extends React.Component<renderHskProps> {
    state = {
        simplified: true,
        traditional: false,
        pinyin: false,
        meaning: false,
        index: 0,
        alignment: 'hsk1',
        hsk: hsk1.slice(100,150),
    }
    speech;

    constructor(props: renderHskProps) {
        super(props);

        //        console.log(hsk6.map((item) => item.simplified));
        this.speech = new Speech();

        this.speech.init({
            'volume': 1,
            'lang': 'zh-CN',
            'rate': 0.7,
            'pitch': 1,
            'splitSentences': true,
            'listeners': {
                'onvoiceschanged': (voices: any) => {
                    console.log("Event voiceschanged", voices)
                }
            }
        });
    }
    changePinyin = () => {
        this.setState({ ...this.state, pinyin: !this.state.pinyin });
    }
    changeSimplified = () => {
        this.setState({ ...this.state, simplified: !this.state.simplified });
    }
    changeTraditional = () => {
        this.setState({ ...this.state, traditional: !this.state.traditional });
    }
    changeMeaning = () => {
        this.setState({ ...this.state, meaning: !this.state.meaning });
    }
    incrementIndex = () => {
        let newIdx = this.state.index + 1;
        if (newIdx > this.state.hsk.length - 1) {
            newIdx = 0;
        }
        this.setState({ ...this.state, index: newIdx });
    }
    decrementIndex = () => {
        let newIdx = this.state.index - 1;
        if (newIdx < 0) {
            newIdx = this.state.hsk.length - 1;
        }
        this.setState({ ...this.state, index: newIdx });
    }
    randomize = () => {
        this.setState({ ...this.state, index: 0, hsk: this.shuffleHSK(this.state.hsk) })
    }

    shuffleHSK = (array: Array<hskModel>) => {
        return array.sort(() => Math.random() - 0.5);
    }

    getHsk = (aligment: string) => {
        switch (aligment) {
            case "hsk1":
                return hsk1;
            case "hsk2":
                return hsk2;
            case "hsk3":
                return hsk3;
            case "hsk4":
                return hsk4;
            case "hsk5":
                return hsk5;
            case "hsk6":
                return hsk6;
            case "hsk789":
                return hsk789;
            default:
                return hsk1;
        }
    }
    handleHskChange = (event: any, newAlignment: string) => {
        if (!newAlignment || newAlignment === this.state.alignment) {
            return;
        }

        this.setState({ ...this.state, index: 0, hsk: this.getHsk(newAlignment), alignment: newAlignment })
    }

    handleSpeak = () => {
        this.speech.speak({
            text: this.state.hsk[this.state.index].simplified
        });
    }

    render() {
        const hskItem = this.state.hsk[this.state.index];
        return (
            <Container maxWidth="sm" style={{ marginTop: '10px' }}>
                <div>
                    <ToggleButtonGroup
                        color="primary"
                        value={this.state.alignment}
                        exclusive
                        onChange={this.handleHskChange}
                        aria-label="Platform"
                    >
                        <ToggleButton value="hsk1">HSK 1</ToggleButton>
                        <ToggleButton value="hsk2">HSK 2</ToggleButton>
                        <ToggleButton value="hsk3">HSK 3</ToggleButton>
                        <ToggleButton value="hsk4">HSK 4</ToggleButton>
                        <ToggleButton value="hsk5">HSK 5</ToggleButton>
                        <ToggleButton value="hsk6">HSK 6</ToggleButton>
                        <ToggleButton value="hsk789">HSK 7,8,9</ToggleButton>
                    </ToggleButtonGroup>

                    <IconButton aria-label="speak" onClick={this.handleSpeak}>
                        <VolumeUp />
                    </IconButton>
                </div>
                <div>
                    <FormGroup sx={{ position: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <FormControlLabel control={<Switch defaultChecked onClick={this.changeSimplified} />} label="Chinese" />
                        <FormControlLabel control={<Switch onClick={this.changeTraditional} />} label="Traditional" />
                        <FormControlLabel control={<Switch onClick={this.changePinyin} />} label="Pinyin" />
                        <FormControlLabel control={<Switch onClick={this.changeMeaning} />} label="Meaning" />
                    </FormGroup>
                </div>
                <div>
                    <Grid container style={{ marginTop: '10px' }}>
                        <Grid item xs={6}>
                            <Typography variant="h5" align="center" color="textSecondary" gutterBottom>Simplified</Typography>
                            <Typography variant="h2" align="center" color="textPrimary" gutterBottom>
                                {this.state.simplified ? hskItem.simplified : ""}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="h5" align="center" color="textSecondary" gutterBottom>Traditional</Typography>
                            <Typography variant="h2" align="center" color="textPrimary" gutterBottom>
                                {this.state.traditional ? hskItem.traditional : ""}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Typography variant="h6" align="center" color="textSecondary" gutterBottom>
                        {`${this.state.index+1} out of ${this.state.hsk.length}`}
                    </Typography>
                    <Typography variant="h6" align="center" color="textSecondary" gutterBottom>
                        {this.state.pinyin ? hskItem.pinyin : "Pinyin Disabled"}
                    </Typography>
                    <Typography variant="h6" align="center" color="textSecondary" paragraph>
                        {this.state.meaning ? hskItem.meaning : "Meaning Disabled"}
                    </Typography>
                </div>
                <div>
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item>
                            <Button variant="contained" color="primary" onClick={this.randomize}>
                                Randomize
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" color="primary" onClick={this.decrementIndex} disabled={this.state.index == 0}>
                                Previous
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" color="primary" onClick={this.incrementIndex} disabled={this.state.index == this.state.hsk.length - 1}>
                                Next
                            </Button>
                        </Grid>
                    </Grid>
                </div>
            </Container>
        );
    }
}