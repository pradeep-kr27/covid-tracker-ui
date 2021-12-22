import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { basicStats } from './statsAPI';

// const IndianStates = ['AN', 'AP', 'AR', 'AS', 'BR', 'CH', 'CT', 'DL', 'DN', 'GA', 'GJ', 'HP', 'HR', 'JH', 'JK', 'KA', 'KL', 'LA', 'LD', 'MH', 'ML', 'MN', 'MP', 'MZ', 'NL', 'OR', 'PB', 'PY', 'RJ', 'SK', 'TG', 'TN', 'TR', 'TT', 'UN', 'UP', 'UT', 'WB']

export interface Districts {
    districts: []
}
interface InitialState {
    basicStats: []
    indianStates: []
    filteredBasicStats: []
}
const initialState: InitialState = {
    basicStats: [],
    indianStates: [],
    filteredBasicStats: [],
}
export const statsSlice = createSlice({
    name: 'stats',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setBasicStats: (state, action) => {
            state.basicStats = action.payload
        },
        setIndianStates: (state, action) => {
            state.indianStates = action.payload
        },
        setFilteredBasicStats: (state, action) => {
            state.filteredBasicStats = action.payload
        },
    },

});
export const { setBasicStats, setIndianStates, setFilteredBasicStats } = statsSlice.actions;
export default statsSlice.reducer;

export const mapBasicStats = (): AppThunk => async (
    dispatch,
    getState
) => {

    const response = await basicStats();
    if (response) {
        dispatch(setIndianStates(Object.keys(response)))
        let state = getState()
        let IndianStates = [...state.stats.indianStates]
        let BasicStats: any = []
        IndianStates && IndianStates.length > 0 && IndianStates.forEach((STATE: string) => {
            let statsForEachState: Districts = { districts: [] }
            let responseForEachState = response[STATE]
            if (responseForEachState) {
                let statsForDistricts: any = []
                let responseForDistricts = responseForEachState["districts"]
                responseForDistricts && Object.keys(responseForDistricts).forEach((DISTRICT: string) => {
                    if (responseForDistricts[DISTRICT]) {
                        let statsForEachDistrict: any = []
                        if (responseForDistricts[DISTRICT]["delta"]) {
                            statsForEachDistrict = [...statsForEachDistrict, { "delta": responseForDistricts[DISTRICT]["delta"] }]
                        }
                        if (responseForDistricts[DISTRICT]["delta7"]) {
                            statsForEachDistrict = [...statsForEachDistrict, { "delta7": responseForDistricts[DISTRICT]["delta7"] }]
                        }
                        if (responseForDistricts[DISTRICT]["total"]) {
                            statsForEachDistrict = [...statsForEachDistrict, { "total": responseForDistricts[DISTRICT]["total"] }]
                        }
                        statsForDistricts = [...statsForDistricts, { [DISTRICT]: statsForEachDistrict }]
                    }
                })
                let statsForEntireState: any = []
                statsForEntireState = responseForEachState["delta"] ? [...statsForEntireState, { "delta": responseForEachState["delta"] }] : statsForEntireState
                statsForEntireState = responseForEachState["delta7"] ? [...statsForEntireState, { "delta7": responseForEachState["delta7"] }] : statsForEntireState
                statsForEntireState = responseForEachState["total"] ? [...statsForEntireState, { "total": responseForEachState["total"] }] : statsForEntireState
                statsForDistricts = [...statsForDistricts, { "TOTAL": statsForEntireState }]
                statsForEachState = { districts: statsForDistricts }
                BasicStats = [...BasicStats, { [STATE]: statsForEachState }]
            }
        })
        if (BasicStats && BasicStats.length > 0) {
            dispatch(setBasicStats(BasicStats))
            dispatch(setFilteredBasicStats(BasicStats))
        }
    }
}

