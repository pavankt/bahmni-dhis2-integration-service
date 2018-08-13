import {hideSpinner, showHome, showMessage} from '../../../main/client/common/Actions';

describe('Actions', () => {
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

    describe('showMessage', () => {
        it('should return empty message and type on default', () => {
           const expected = {
               type: "showMessage",
               responseMessage: "",
               responseType: ""
           };

           expect(expected).toEqual(showMessage())
        });

        it('should return object with given message and type on default', () => {
           const expected = {
               type: "showMessage",
               responseMessage: "test message",
               responseType: "error"
           };

           expect(expected).toEqual(showMessage("test message", "error"));
        });
    });

    describe('showHomeAction', () => {
        it('should return showHome value as true as default', () => {
            const expected = {
                type: "showHome",
                show: true
            };
            let result = showHome();
            expect(expected).toEqual(result);
        });

        it('should return given value as showHome value', () => {
            const expected = {
                type: "showHome",
                show: false
            };
            let result = showHome(false);
            expect(expected).toEqual(result);
        })
    });
});
