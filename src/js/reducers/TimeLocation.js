import { 
	REQUEST_TIME,
	RECEIVE_TIME  
} from '../actions';

const initialState={};

export default function timeLocation(state=initialState, action) {
	switch(action.type) {
		case REQUEST_TIME:
			return {
				timeFetch: true,
			};

		case RECEIVE_TIME:
			return {
				timeFetch: false,
				data: action.payload.json
			};
			
		default: 
			return state;	
	}
}
