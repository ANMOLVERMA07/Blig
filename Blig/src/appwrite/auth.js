import conf from '../conf/conf'       // all environment keys

import { Client, Account, ID } from "appwrite";       //  docs

export class AuthService{

    client = new Client()
    account;   // hum account yha bhi create kr skte the pr vo har baar by default bnta hi rhta to hum use object ke call hone pe hi bnaenge

    constructor(){  // ye jab hi bnega jab koi object bnega is classs ka
        this.client
            .setEndpoint(conf.appWriteUrl)
            .setProject(conf.projectId)
        this.account = new Account(this.client);
    }

    //  Signup Service
    async createAccount({email,password,name}){
        try {
            const userAccount = await this.account.create(
                ID.unique(),
                email,
                password,
                name,
            )

            if(userAccount) {
                // agr jb user account ban hi gya hai to use login hi  krva do
                return this.login({email,password});
            }else{
                    return userAccount;
            }
            
        } catch (error) {
            console.log("Appwrite :: Create Account :: error",error);
            
        }
        

    }

    // Signin Service
    async login({email,password}){
        try {
           return await this.account.createEmailPasswordSession(
                email,
                password,
            )
        } catch (error) {
            console.log("Appwrite :: Login :: error",error);
        }
    }
 
    // Ye hume btaega ki hum currently login h ya nhi
    async getCurrentStatus(){
        try {
         return await this.account.get();

        } catch (error) {
            console.log("Appwrite :: Current Status :: error",error);
        }
        
        return null;
    }


    // Logout
    async logout(){
        try {
            await this.account.deleteSessions();
            return true
        } catch (error) {
            console.log("Appwrite :: Logout :: error",error);
            return false
        }
    }
}


const authService = new AuthService();
// make a obj previously and export it bcoz after this u dont want to make an object before using all methods in any other file.


export default authService;