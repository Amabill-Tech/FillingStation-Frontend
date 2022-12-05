import { ANALYSIS_DATA } from '../types';

export const setAnalysisData = (param) => dispatch => {
    dispatch({ type: ANALYSIS_DATA, payload: param })
}