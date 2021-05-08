import * as logInLogOutHelper from '../helpers/logInOutHelper'


describe('Log in and Out', function(){
       
    it('LogOut', function(){

        logInLogOutHelper.logOut(cy)
    })

     it('LogOut', function(){

         logInLogOutHelper.logInWithWrongCredentials(cy, 'Tester01', 'DontKnowThePassword')
     })
    
})

