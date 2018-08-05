import { hideSpinner } from '../../../main/client/common/Reducers';

describe('HideSpinnerReducer', () => {
   it('should return true with default params', () => {
       expect(hideSpinner()).toBeTruthy();
   });

   it('should return hideSpinner value as action.hideSpinner value when action type is hideSpinner', () => {
       const action = {
         type: 'hideSpinner',
         hideSpinner : true
       };
       expect(hideSpinner(false, action)).toBeTruthy();
   });

   it('should return state value when action.type is not hideSpinner', () => {
       const action = {
         type: 'showSpinner'
       };
       expect(hideSpinner(false, action)).toBeFalsy();
   })
});