const ENDPOINT_GET_BILLS = 'http://localhost:3000/api/bills'
const ENDPOINT_NEW_BILL =  'http://localhost:3000/api/bill/new'
const ENDPOINT_GET_BILL =  'http://localhost:3000/api/bill/'

//create a new bill and gett all bills, asserting the new one is there.
function createBillsRequest(cy){
        cy.authenticateSession().then((response =>{
            const payload = {
                "value":"123456",
                "paid":false
            }
            cy.request({
                method: "POST",
                url: ENDPOINT_NEW_BILL,
                headers: {
                    'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                    'Content-Type': 'application/json'
                },
                body: payload
            }).then((response =>{
               
            }))
            getRequestAllBillsWithAssertion(cy, payload.value, payload.paid)
        }))
    }
//get all bills, send value and paid-bool
function getRequestAllBillsWithAssertion(cy, value, paid){
    cy.authenticateSession().then((response =>{     
        cy.request({    
            method: "GET",
            url: ENDPOINT_GET_BILLS,
            headers:{
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
    },
            }).then((response =>{
                const responseAsString = JSON.stringify(response)
                expect(responseAsString).to.have.string(value)
                expect(responseAsString).to.have.string(paid)
                expect(response.status).to.eq(200)
                cy.log(response.body.length) //Antal bills 
        }))
    }))
}
//gets all bills
function getAllBillsRequest(cy){
    cy.authenticateSession().then((response =>{
        cy.request({
            method: "GET",
            url: ENDPOINT_GET_BILLS,
            headers:{
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
    },
            }).then((response =>{
                const responseAsString = JSON.stringify(response)
                cy.log(responseAsString)
                cy.log(response.body.length) //Antal bills 
                expect(response.status).to.eq(200)
        }))
    }))
}
//
function deleteRequestAfterGet(cy){
    // GET request to fetch all bills, helpfunction only. no auth. 
    cy.request({
       method: "GET",
       url: ENDPOINT_GET_BILLS,
       headers:{
       'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
       'Content-Type': 'application/json'
},
       }).then((response =>{
           let lastId = response.body[response.body.length-1].id
           cy.log(response.body.length) //Antal bills 

           cy.request({
               method:"DELETE",
               url: ENDPOINT_GET_BILL+lastId, //bygger på med ID efter urlen... 
               headers:{
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
                },
           }).then((response =>{
            const responseAsString = JSON.stringify(response.body)
            cy.log(responseAsString)
            expect(responseAsString).to.have.string(true)
            expect(response.status).to.eq(200)
            expect(responseAsString).to.not.have.string(lastId) //might fail if there is something else with this number?
        }))
   }))
}
//create new bill and then delete it
function createBillRequestAndDelete(cy){
    cy.authenticateSession().then((response =>{
        const payload = {
            "value":"11111",
            "paid":false
        }
        cy.request({
            method: "POST",
            url: ENDPOINT_NEW_BILL,
            headers: {
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },
            body: payload
        }).then((response =>{
            const responseAsString = JSON.stringify(response)
            expect(responseAsString).to.have.string(payload.value)
            expect(response.status).to.eq(200)
        }))
       //delete the latest created bill
       deleteRequestAfterGet(cy)
       
    }))
}
//
function createBillRequestAndEdit(cy){
    cy.authenticateSession().then((response =>{
        const payload = {
            "value":"22222",
            "paid":false
        }
        cy.request({
            method: "POST",
            url: ENDPOINT_NEW_BILL,
            headers: {
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },
            body: payload
        }).then((response =>{
            const responseAsString = JSON.stringify(response)
            cy.log(responseAsString)
            expect(responseAsString).to.have.string(payload.value)
            expect(responseAsString).to.have.string(payload.paid)
            expect(response.status).to.eq(200)
        }))
       //edit the latest created bill
       EditBillAfterGet(cy)
       
    }))
}
//EDIT bill... no own auth, so only helpfunction
function EditBillAfterGet(cy){
    // GET request to fetch all bills
    cy.request({
       method: "GET",
       url: ENDPOINT_GET_BILLS,
       headers:{
       'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
       'Content-Type': 'application/json'
},
       }).then((response =>{
           let lastId = response.body[response.body.length-1].id
           const payload = {
            "value":"33333",
            "paid":true
        }

           cy.request({
               method:"PUT",
               url: ENDPOINT_GET_BILL+lastId, //bygger på med ID efter urlen... 
               headers:{
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
                },
                body: payload
           }).then((response =>{
            const responseAsString = JSON.stringify(response.body)
            cy.log(responseAsString)
            expect(responseAsString).to.have.string(payload.value)
            expect(responseAsString).to.have.string(payload.paid)
            expect(response.status).to.eq(200)
        }))
   }))
}


module.exports = {
    getAllBillsRequest,
    getRequestAllBillsWithAssertion,
    createBillsRequest,
    createBillRequestAndDelete,
    createBillRequestAndEdit
}