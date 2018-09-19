import { fetchProblemClassesData } from '@/services/api1';

export default {
  namespace: 'problemClass',

  state: {
    list: {},
    days:1
  },

  effects: {
    *fetch(_, { call, put }) {
      
      const response = yield call(fetchProblemClassesData, _.params);
      
      yield put({
        type: 'save',
        payload: response,
      });
    },
    
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        list:action.payload.data.trend,
      };
    },
    daysChange(state, { payload: days }) {
      return {
        ...state,
        days: days,
      }
    }
  },
};
