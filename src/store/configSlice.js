const { createSlice } = require("@reduxjs/toolkit")

const initialState = {
    mode: null
}

const configSlice = createSlice({
    name: 'config',
    initialState,
    reducers: {
        setMode: (state, action) => {
            state.mode = action.payload;
            localStorage.setItem('mode', action.payload);
        },
        toggleMode: (state) => {
            state.mode = state.mode === 'light' ? 'dark' : 'light';
            localStorage.setItem('mode', state.mode);
        },
    }
})

export const configActions = configSlice.actions;
export default configSlice;