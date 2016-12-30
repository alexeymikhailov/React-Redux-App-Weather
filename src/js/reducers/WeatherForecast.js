import {	
	REQUEST_FORECAST,
	RECEIVE_FORECAST,
	REQUEST_FORECAST_FAILED
} from '../actions';

const initialState={};

export default function weatherForecast(state=initialState, action) {
	switch(action.type) {
		case REQUEST_FORECAST:
			return {
				weatherFetch: true
			};

		case RECEIVE_FORECAST:
			return {
				weatherFetch: false,
				data: action.payload.json,
				...state
			};

		case REQUEST_FORECAST_FAILED:
			return {
				weatherFetch: false,
				error: action.error
			};

		default:
			return state;
	}
}