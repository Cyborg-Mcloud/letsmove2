
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
	send_data();
	players=[];
	targets=[];
	document.getElementById("game_menu").style.display="none";
	console.log(document.getElementById("game_menu").style.display);
	setTimeout("mapset(2);",300);
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
