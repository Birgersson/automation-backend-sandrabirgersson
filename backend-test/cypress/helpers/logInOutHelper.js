const ENDPOINT_LOGOUT = 'http://localhost:3000/api/logout'

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

    // function logInWithWrongCredentials(cy){
    //     cy.authenticateSessionOwnCredentials('Tester01', 'DontKnowThePassword')
    //     .then((response =>{
    //             expect(response.status).to.eq(401) //Wanna use this somehow failOnStatusCode = false
    //             const responseAsString = JSON.stringify(response)
    //             cy.log(responseAsString)
    //         }))
    // }


    module.exports = {
        logOut,
        logInAndLogOut
    }