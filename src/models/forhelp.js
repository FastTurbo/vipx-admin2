import { fetchForHelpData } from '@/services/api1';

export default {
  namespace: 'forhelp',

  state: {
    list: [],
  },

  effects: {
    *fetch(_, { call, put }) {
      
      const response = yield call(fetchForHelpData);
      
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
        list: action.payload,
      };
    },
  },
};
