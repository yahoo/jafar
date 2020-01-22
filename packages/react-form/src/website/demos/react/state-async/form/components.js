import checkboxCollection from '@jafar-org/react-components/edit/CheckboxCollection';
import mockService from './mocks/service';

export default {
  asyncCheckboxCollection: { 
    renderer: checkboxCollection, 
    stateChange: async (props) => {
      // if prevState isn't defined (i.e this is first call), or the search filter has changed,
      // then - return object with cleared items and change isLoading indication to true
      if (!props.prevState || props.prevState.search.value !== props.state.search.value) {
        return { ...props.state, items: [], isLoading: true };
      }
  
      // otherwise, if isLoading changes to true,
      // begin search and return promise which resolves an object of: { items: [ ... ], isLoading: false }
      if (props.state.isLoading) {
        // mock server call
        const items = await mockService.fetchItems(props.state.search.value);
        return { ...props.state, items, isLoading: false };
      }
  
      // no more changes needed
      return undefined;
    },
  },
};
