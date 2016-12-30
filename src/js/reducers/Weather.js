import { 
	REQUEST_WEATHER, 
	RECEIVE_WEATHER, 
	REQUEST_WEATHER_FAILED, 
} from '../actions';

const initialState={};

export default function weather(state=initialState, action) {
	switch(action.type) {
		case REQUEST_WEATHER: 
			return {
				weatherFetch: true
			};

		case RECEIVE_WEATHER:
			return {
				weatherFetch: false,
				data: action.payload.json,
				...state
			};

		case REQUEST_WEATHER_FAILED:
			return {
				weatherFetch: false,
				error: action.error
			};

		default: 
			return state;	
	}
}