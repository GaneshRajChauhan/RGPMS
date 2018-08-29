// "use strict";
import  LocalStorageManger from './LocalStorage';

import  JwtHelper_1 from "./tokenHelper";
var dbKeys_1 = require("./dbKeys");
var User_1 = require("./User");


this.previousIsLoggedInCheck = false;
let localst=new LocalStorageManger();
var Response = /** @class */ (function () {
    function Response() {
       
    }
    Object.defineProperty(Response.prototype, "refreshToken", {
        // private _loginStatus=false;
        get: function () {
            this.reevaluateLoginStatus();
            return localst.getData(dbKeys_1.DBkeys.ACCESS_TOKEN);
        },
        enumerable: true,
    
        configurable: true
    });
    Response.prototype.reevaluateLoginStatus = function (currentUser) {
        localst.savePermanentData();
        var user = currentUser || localst.getDataObject(dbKeys_1.DBkeys.CURRENT_USER);
        var isLoggedIn = user != null;
        if (this.previousIsLoggedInCheck != isLoggedIn) {
            setTimeout(function () {
                // this._loginStatus.next(isLoggedIn);
            });
        }
        this.previousIsLoggedInCheck = isLoggedIn;
    };
    Response.prototype.processLoginResponse = function (response, rememberMe) {
        var accessToken = response.access_token;
        if (accessToken == null)
            throw new Error("Received accessToken was empty");
        var idToken = response.id_token;
        var refreshToken = response.refresh_token || this.refreshToken;
        var expiresIn = response.expires_in;
        var tokenExpiryDate = new Date();
        tokenExpiryDate.setSeconds(tokenExpiryDate.getSeconds() + expiresIn);
        var accessTokenExpiry = tokenExpiryDate;
        var jwtHelper = new JwtHelper_1();
        var decodedIdToken = jwtHelper.decodeToken(response.id_token);
        var permissions = Array.isArray(decodedIdToken.permission) ? decodedIdToken.permission : [decodedIdToken.permission];
        var user = new User_1.User(decodedIdToken.sub, decodedIdToken.name, decodedIdToken.fullname, decodedIdToken.email, decodedIdToken.jobtitle, decodedIdToken.phone, Array.isArray(decodedIdToken.role) ? decodedIdToken.role : [decodedIdToken.role]);
        user.isEnabled = true;
        this.saveUserDetails(user, permissions, accessToken, idToken, refreshToken, accessTokenExpiry, rememberMe);
        this.reevaluateLoginStatus(user);
        return user;
    };
    Response.prototype.saveUserDetails = function (user, permissions, accessToken, idToken, refreshToken, expiresIn, rememberMe) {
      
        if (rememberMe) {
        
            localst.savePermanentData()
            localst.savePermanentData(accessToken, dbKeys_1.DBkeys.ACCESS_TOKEN);
            localst.savePermanentData(idToken, dbKeys_1.DBkeys.ID_TOKEN);
            localst.savePermanentData(refreshToken, dbKeys_1.DBkeys.REFRESH_TOKEN);
            localst.savePermanentData(expiresIn, dbKeys_1.DBkeys.TOKEN_EXPIRES_IN);
            localst.savePermanentData(permissions, dbKeys_1.DBkeys.USER_PERMISSIONS);
            localst.savePermanentData(user, dbKeys_1.DBkeys.CURRENT_USER);
        }
        else {
            
            localst.saveSyncedSessionData(accessToken, dbKeys_1.DBkeys.ACCESS_TOKEN);
            localst.saveSyncedSessionData(idToken, dbKeys_1.DBkeys.ID_TOKEN);
            localst.saveSyncedSessionData(refreshToken, dbKeys_1.DBkeys.REFRESH_TOKEN);
            localst.saveSyncedSessionData(expiresIn, dbKeys_1.DBkeys.TOKEN_EXPIRES_IN);
            localst.saveSyncedSessionData(permissions, dbKeys_1.DBkeys.USER_PERMISSIONS);
            localst.saveSyncedSessionData(user, dbKeys_1.DBkeys.CURRENT_USER);
        }
        localst.savePermanentData(rememberMe, dbKeys_1.DBkeys.REMEMBER_ME);
    };
    return Response;
}());
export default Response;
//# sourceMappingURL=responsesss.js.map