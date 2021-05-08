const ENDPOINT_LOGOUT = 'http://localhost:3000/api/logout'
const LOGIN_URL = 'http://localhost:3000/api/login' 

function logOut(cy){

            cy.request({
                method: "POST",
                url: ENDPOINT_LOGOUT,
                headers: {
                    'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                    'Content-Type': 'application/json'
                },
            }).then((response =>{

                expect(response.status).to.eq(200)
            }))
    }

    function logInAndLogOut(cy){
           cy.authenticateSession().then((response =>{
               cy.request({
                   method: "POST",
                   url: ENDPOINT_LOGOUT,
                   headers: {
                       'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                       'Content-Type': 'application/json'
                   },
               }).then((response =>{
   
                   expect(response.status).to.eq(200)
               }))
           }))
       }

    function logInWithWrongCredentials(cy, username, password){
    
        
        cy.request({
            method: "POST",
            url: LOGIN_URL,
            failOnStatusCode: false,
            headers: {
                'Content-Type': 'application/json'
            },
      
        }).then((response =>{
                cy.log(response.body)
                cy.log(response.status)
                 expect(response.status).to.eq(401) 
                 const responseAsString = JSON.stringify(response)
                 cy.log(responseAsString)
             })) 

            }

    module.exports = {
        logOut,
        logInAndLogOut,
        logInWithWrongCredentials
    }
