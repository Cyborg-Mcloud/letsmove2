
 var last = {time : new Date(),   
    x    : -100,          
    y    : -100};         
var period = 100; 
var space  = 2;   
         

var t_circle=new Array();
var minimap_circle=new Array();
var types_open=0;
var curgametype=1;


function leader_close()
	{
	document.getElementById("leaderboard").style.display="none";
	lboard_vis=0;	
	}

function small_grats_close()
	{
	document.getElementById("small_grats_div").style.display="none";
	mapset(2);
	}

function grats_close()
	{
	document.getElementById("grats_div").style.display="none";
	document.getElementById("leaderboard").style.display="block";
	lboard_vis=1;
	show_leaders();
	}

function show_game_menu()
	{
	document.getElementById("game_menu").style.display="block";
	}

function change_game_mode(newmode)
	{
	curgametype=newmode;
	players=[];
	targets=[];
	draw_targets();
	send_data();
	players=[];
	targets=[];
	
	document.getElementById("game_menu").style.display="none";
	window.plugins.insomnia.keepAwake();
	setTimeout("mapset(2);",300);
	}


function back_to_home()
	{
	
	players=[];
	targets=[];
	draw_targets();
	document.getElementById("game_menu").style.display="block";
	window.plugins.insomnia.allowSleepAgain();
	}
function open_types(seltype)
	{
	if (types_open==0)
		{
		document.getElementById("ptichka").style.display="none";
		document.getElementById("types_div").style.right="-10px";
		document.getElementById("type_time_attack").style.left="25px";
		document.getElementById("type_campaign").style.left="85px";		
		types_open=1;
		}
	else if (types_open==1)
		{
		document.getElementById("types_div").style.right="-70px";
		document.getElementById("ptichka").style.display="inline";
		if (seltype==1)
			{
			document.getElementById("type_time_attack").style.left="25px";
			document.getElementById("type_campaign").style.left="85px";
			}
		else if(seltype==2)
			{
			document.getElementById("type_campaign").style.left="25px";
			document.getElementById("type_time_attack").style.left="85px";
			}
		curgametype=seltype;
		send_data();
		types_open=0;
		
		}
	
	}

	
function hide_data(){
	document.getElementById("acc_data").style.display="none";
}

function show_data(){
	document.getElementById("acc_data").style.display="block";
}



function show_screen(scrname) {
	if (scrname!=cur_screen) {
		document.getElementById("login_screen").style.display="none";
		document.getElementById("loading_screen").style.display="none";
		document.getElementById("profile_screen").style.display="none";
		document.getElementById("home_screen").style.display="none";
		document.getElementById("leaderboard_screen").style.display="none";
		if (scrname=="login") {
			document.getElementById("login_screen").style.display="block";
		} else if (scrname=="home") {
			document.getElementById("home_screen").style.display="block";
		} else if (scrname=="profile") {
			document.getElementById("profile_screen").style.display="block";
			request_mydata();
		} else if (scrname=="leaderboard") {
			document.getElementById("leaderboard_screen").style.display="block";
		}
		cur_screen=scrname;
	}

}

function show_edit(){
	document.getElementById("login_logo").style.display="inline-block";
	document.getElementById("prof_edit").style.display="block";
	document.getElementById("prof_logo").style.display="none";
	document.getElementById("langli").style.display="none";
	document.getElementById("prof_main").style.display="none";
	document.getElementById("footer").style.background="#2b2c4d";
	var link = document.getElementById("pop_left");
	link.setAttribute("href", "Javascript: hide_edit();");
}
function hide_edit()	{
	document.getElementById("login_logo").style.display="none";
	document.getElementById("prof_edit").style.display="none";
	document.getElementById("langli").style.display="inline-block";
	document.getElementById("prof_logo").style.display="inline-block";
	document.getElementById("prof_main").style.display="inline-block";
	document.getElementById("footer").style.background="#3e406a";
	var link = document.getElementById("pop_left");
	link.setAttribute("href", "Javascript: show_screen('home');");
}

function show_leaderboard(){
	var mdata="leaderboard=1";
	data_send("https://www.smartgps.ge/letsmove/api.php",mdata, true);
        
	show_screen("leaderboard");
}


function copy_referal(){
	var copyText = document.getElementById("prof_referal");
	copyText.select();
	copyText.setSelectionRange(0, 99999); /*For mobile devices*/
	document.execCommand("copy");
}

function open_subscribe(){
	var win=window.open( "https://smartgps.ge/letsmove/pay.php?myid="+myid, "_blank");
	win.addEventListener( "loadstop", function(){
       var loop = window.setInterval(function(){
           win.executeScript({
                   code: "window.shouldClose"
               },
               function(values){
                   if(values[0]){
                     win.close();
                     window.clearInterval(loop);
                   }
               }
           );
       },100);
   });
}

 