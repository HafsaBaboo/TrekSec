var loggedUsers = {};


async function insertValueLogin() {
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  try {
    const response = await fetch('../api/v1/authentications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email, password: password }),
    });

    const data = await response.json();

    loggedUsers.token = data.token;
    loggedUsers.email = data.email;
    loggedUsers.id = data.id;
    loggedUsers.self = data.self;

    Enter();

    console.log(loggedUsers);

  } catch (error) {
    console.error(error);
  }
}

function ResetPasswordPage(){

  
  
  
   window.location.href = "newPassword.html";

  
  
};

async function Enter(){

  console.log("prima del controllo");

  if(loggedUsers.token && loggedUsers.email && loggedUsers.id && loggedUsers.self){

    setTimeout(function(){
      window.location.href = "map.html";
      console.log("passato pag");
      
    },100);

    

  }else{

    window.location.href ="login.html";
  }

}

