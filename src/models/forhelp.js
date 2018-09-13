import { fetchForHelpData } from '@/services/api1';

export default {
  namespace: 'forhelp',

  state: {
    list: [],
  },

  effects: {
    *fetch(_, { call, put }) {
        console.log('dispatch for help')
      const response = yield call(fetchForHelpData);
      console.log(response)
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
