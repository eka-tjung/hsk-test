import React from 'react';
import {
    Typography,
    AppBar,
    CssBaseline,
    Toolbar,
} from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import RenderHSK from './component/renderHsk';
import hsk1 from './assets/hsk1.json';

const App = () => {
    return (
        <>
            <CssBaseline />
            <AppBar position="relative">
                <Toolbar>
                    <PhotoCamera />
                    <Typography variant="h6">
                        HSK Tool
                    </Typography>
                </Toolbar>
            </AppBar>
            <main>
                <div>
                    <RenderHSK hsk={hsk1} />
                </div>
            </main>
        </>
    )
}

export default App;
