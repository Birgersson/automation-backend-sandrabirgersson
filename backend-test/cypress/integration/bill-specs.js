import * as billHelpers from '../helpers/billHelpers'
import * as logInLogOutHelper from '../helpers/logInOutHelper'


describe('Testing bills', function(){
       
    it('Get Bills', function(){

        billHelpers.getRequestAllBillsWithAssertion(cy, 4500, false)
        logInLogOutHelper.logOut(cy)
    })

    it('Create new Bill', function(){

        billHelpers.createBillsRequest(cy)
        logInLogOutHelper.logOut(cy)
    })

    it('Delete Bill', function(){

        billHelpers.createBillRequestAndDelete(cy)
        logInLogOutHelper.logOut(cy)
    })

    it('Edit Bill', function(){

        billHelpers.createBillRequestAndEdit(cy)
        logInLogOutHelper.logOut(cy)
    })

    
})

