import { hideSpinner } from '../../../main/client/common/Actions';

describe('HideSpinnerAction', () => {
   it('should return hideSpinner value as true as default', () => {
       const expected = {
         type: "hideSpinner",
         hideSpinner: true
       };
       let result = hideSpinner();
       expect(expected).toEqual(result);
   });

    it('should return given value as hideSpinner value', () => {
       const expected = {
         type: "hideSpinner",
         hideSpinner: false
       };
       let result = hideSpinner(false);
       expect(expected).toEqual(result);
   })
});