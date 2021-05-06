import * as billHelpers from '../helpers/billHelpers'


describe('Testing bills', function(){
       
    it('Get Bills', function(){

        billHelpers.getRequestAllBillsWithAssertion(cy, 4500, false)
    })

    it('Create new Bill', function(){

        billHelpers.createBillsRequest(cy)
    })

    it('Delete Bill', function(){

        billHelpers.createBillRequestAndDelete(cy)
    })

    it('Edit Bill', function(){

        billHelpers.createBillRequestAndEdit(cy)
    })

    
})

