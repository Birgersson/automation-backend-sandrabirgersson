const ENPOINT_GET_CLIENTS = 'http://localhost:3000/api/clients'
const ENDPOINT_NEW_CLIENT =  'http://localhost:3000/api/client/new'
const ENDPOINT_GET_CLIENT =  'http://localhost:3000/api/client/'


function createClientRequest(cy){
        cy.authenticateSession().then((response =>{
            const payload = {
                "name":"test1",
                "email":"sandra@test.se",
                "telephone":"0100000000"
            }
            cy.request({
                method: "POST",
                url: ENDPOINT_NEW_CLIENT,
                headers: {
                    'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                    'Content-Type': 'application/json'
                },
                body: payload
            }).then((response =>{
                //cy.log(JSON.stringify(response))
                const responseAsString = JSON.stringify(response)
                expect(responseAsString).to.have.string(payload.name)
            }))
            getRequestAllClientsWithAssertion(cy, payload.name, payload.email, payload.telephone)
        }))
    }

function getRequestAllClientsWithAssertion(cy, name, email, telephone){
         // GET request to fetch all clients
         cy.request({
            method: "GET",
            url: ENPOINT_GET_CLIENTS,
            headers:{
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
    },
            }).then((response =>{
                const responseAsString = JSON.stringify(response)
                expect(responseAsString).to.have.string(name)
                expect(responseAsString).to.have.string(email)
                expect(responseAsString).to.have.string(telephone)
        }))
}

function getAllClientsRequest(cy){
    cy.authenticateSession().then((response =>{
        cy.request({
            method: "GET",
            url: ENPOINT_GET_CLIENTS,
            headers:{
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
    },
            }).then((response =>{
                const responseAsString = JSON.stringify(response)
                cy.log(responseAsString)
        }))
    }))
}


function deleteRequestAfterGet(cy){
    // GET request to fetch all clients
    cy.request({
       method: "GET",
       url: ENPOINT_GET_CLIENTS,
       headers:{
       'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
       'Content-Type': 'application/json'
},
       }).then((response =>{
           let lastId = response.body[response.body.length-1].id
        
           cy.request({
               method:"DELETE",
               url: ENDPOINT_GET_CLIENT+lastId, //bygger på med ID efter urlen... 
               headers:{
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
                },
           }).then((response =>{
            //assert client has been deleted
            const responseAsString = JSON.stringify(response.body)
            cy.log(responseAsString)
            expect(responseAsString).to.have.string(true)
           // expect(responseAsString).to.not.have.string(payload.name)
           //man hade ju velat köra en GET och sett avsaknad av clienten... 
        }))


         //  cy.log(response.body) //array med antal clients
         //  cy.log(response.body.length) //Antal clients 
         //  cy.log(response.body[0].id) //kommer åt index 0 i arrayen, dess id
         //  cy.log(response.body[0].email) //kommer åt index 0 i arrayen, dess email
         //  cy.log(response.body[response.body.length-1].id) //id på den sista clienten
   }))
}

function createClientRequestAndDelete(cy){
    cy.authenticateSession().then((response =>{
        const payload = {
            "name":"test1",
            "email":"sandra@test.se",
            "telephone":"0100000000"
        }
        cy.request({
            method: "POST",
            url: ENDPOINT_NEW_CLIENT,
            headers: {
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },
            body: payload
        }).then((response =>{
            //cy.log(JSON.stringify(response))
            const responseAsString = JSON.stringify(response)
            expect(responseAsString).to.have.string(payload.name)
        }))
       //delete
       deleteRequestAfterGet(cy)
       
    }))
}




module.exports = {
    createClientRequest,
    getRequestAllClientsWithAssertion,
    getAllClientsRequest,
    deleteRequestAfterGet,
    createClientRequestAndDelete,
    deleteRequestAfterGet
}