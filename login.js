

 

  
function myreg()
	{
	console.log("fb reg: aq var2");

	FB.login(function(response) 
		{
	  	console.log(response);
		if (response["status"]=="connected")
			{
			FB.api('/me', {  fields: 'name, email' }, function(response) {
			console.log(response);
		   
			document.getElementById("fbid").value=response.id;
			document.getElementById("reg_uname").value=response.name;
			document.getElementById("reg_email").value=response.email;
				
			document.getElementById("reg_pass1").style.display="none";
			document.getElementById("reg_pass2").style.display="none";
			document.getElementById("fbregbut").style.display="none";

//			submit_form();
			});
		}

	}, {scope: 'public_profile,email'});
		 
	}



function fbdatasuccess(response){
	console.log(response);
	console.log(response.id + " | " + response.name + " | " + response.email + " | ");
	fbid=response.id;
	email=response.email;
	document.getElementById("email").value=email;

	var mdata="login=1&fblogin=1&email="+email + "&fbid="+ fbid;
	data_send("https://www.smartgps.ge/letsmove/api.php",mdata, false);
        
	
}

function fbLoginSuccess(userData) {
	console.log("UserInfo: ", userData);
	if (userData["status"]=="connected"){
		facebookConnectPlugin.api("/me?fields=id,name,email", ["public_profile", "email"], fbdatasuccess, fberror);
	}
	
}
	  
		

function mylogin(){
	console.log("fb login, aq var");

	facebookConnectPlugin.login(["public_profile", "email"], fbLoginSuccess, fberror );

		  	
}

function mylogout()
	{

	if (fblogged==1)
		{
		
		
		FB.logout(function(response) {
		   // Person is now logged out
//		   fb_logged_out();
			fblogged=0;
			 fb_logged_out()
			});
		}

	if (fblogged==0 && gmlogged==0)
		{
		fb_logged_out();
		}
	}
		  

function fberror(response){
	console.log("fb error");
	console.log(response);
}

function fb_logged_out()
	{
	//window.location.href='?logout=1';
	}


function fbstatus(response)
	{
	console.log("aq var 1");

	console.log(response);
	if (response["status"]=="connected")
		{
		fblogged=1;

		if (logged==0 && force_logout==0)
			{
			FB.api('/me', {  fields: 'name, email' }, function(response) {
			  console.log(response);
			
			window.location.href='?fblogin=1&fbid='+response.id + "&email="+response.email;
		
			});
			}
		else if (force_logout==1)		
			{
			fbid=1;
			mylogout();
			}
		}
	}


var hideKeyboard = function() 
{  document.activeElement.blur(); 
var inputs = document.querySelectorAll('input');  for(var i=0; i < inputs.length; i++) {   inputs[i].blur();  } };

function send_login_info(){
	var mdata="login=1&logme=1&email="+document.getElementById("email").value + "&pass="+ document.getElementById("pass").value;
	data_send("https://www.smartgps.ge/letsmove/api.php",mdata, false);
        
}

function send_reg_info(){
	var mdata="login=1&reg=1&fbid="+document.getElementById("fbid").value + "&referal="+document.getElementById("referal").value + "&reg_pass2="+document.getElementById("reg_pass2").value + "&reg_uname="+document.getElementById("reg_uname").value + "&reg_tel="+document.getElementById("reg_tel").value + "&reg_email="+document.getElementById("reg_email").value + "&reg_pass="+ document.getElementById("reg_pass1").value;
	data_send("https://www.smartgps.ge/letsmove/api.php",mdata, false);
}

function signin()
	{
	//document.getElementById("loginForm").submit();
	if (document.getElementById("email").value=='' || document.getElementById("pass").value=='')
		{	
		alert("Both fields are required!");
		}
	else
		{
		send_login_info();
		}
	}

function checkregform()
	{
	if (document.getElementById("reg_email").value=='' || (( document.getElementById("reg_pass1").value=='' || document.getElementById("reg_tel").value=='') && document.getElementById("fbid").value=="")  )
		{	
		alert("All Fields are Required!");
		return false;
		

		}
	else
		{
        //document.getElementById("registerForm").submit();
        send_reg_info();

		return true;

		}

	}

function show_login()
	{
	document.getElementById("logindiv").style.display="block";
	document.getElementById("regdiv").style.display="none";
	document.getElementById("login_logo").style.height="200px";
	}
function show_reg()
	{
	document.getElementById("logindiv").style.display="none";
	document.getElementById("regdiv").style.display="block";
	document.getElementById("login_logo").style.height="180px";
	}

