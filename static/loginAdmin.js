var loggedAdmin = {};


async function buttonAd() {
  var admin_email = document.getElementById("email").value;
  var admin_password = document.getElementById("password").value;

  try {
    const response = await fetch('../api/v1/authenticationsAdmin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ admin_email: admin_email, admin_password: admin_password }),
    });

    const data = await response.json();

    loggedAdmin.token = data.token;
    loggedAdmin.email = data.admin_email;
    loggedAdmin.id = data.id;
    loggedAdmin.self = data.self;
    loggedAdmin.type = data.admin_type;

    console.log(data.admin_type);
    console.log(data.admin_email);


    Enter();

    console.log(loggedAdmin);

  } catch (error) {
    console.error(error);
  }
}

async function Enter(){

  console.log("prima del controllo");

  if(loggedAdmin.token && loggedAdmin.email && loggedAdmin.id && loggedAdmin.self){
        console.log("nel controllo");
        console.log(loggedAdmin.type);

    if(loggedAdmin.type == "moderator"){
        
        console.log("passato Mod");
        window.location.href = "Moderator.html";

    }else{
        if(loggedAdmin.type == "callCenter"){
            console.log("call");

            window.location.href = "CallCenter.html";

        }else{

            if(loggedAdmin.type == "tecnicalSupport"){
            console.log("tecnical");

            window.location.href = "tecnicalSupport.html";
            }

        }

    }
  }else{

    console.log("no giusto");

    window.location.href ="loginAdmin.html";
  }

}

