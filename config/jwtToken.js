const jwt=require("jsonwebtoken");

//we will use the ID to generate the token
const generateToken= (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "3d"});
}

module.exports=generateToken;

//claims = richieste

//jwt = fornisce un modo di rappresentare le richieste di trasferimento tra due parti
//      viene maggiormente utilizzato per motivi di autorizzazione (non autenticazione)
//      e' composto da tre parti: HEADER, PAYLOAD e SIGNATURE.
