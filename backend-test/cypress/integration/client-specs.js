import * as clientHelpers from '../helpers/clientHelpers'


describe('Create a new client', function(){
       
    it('New Client', function(){

        clientHelpers.createClientRequest(cy)
    })

    it('Get all Clients', function(){

        clientHelpers.getAllClientsRequest(cy)
    })

    it('Delete Client', function(){

        clientHelpers.createClientRequestAndDelete(cy)
    })
})

