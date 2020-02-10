var players=new Array();
var max_players=0;

var p_marker= new Array();
var curmenu=0;
var targets=new Array(); 

var max_targets=0;


var last_coord_time=0;
var lbut_vis=0;
var mouse_coords=1;
var Mouse_Lat=41.7120788;
var Mouse_Lng=44.7491408;

var selobj=0;


var myid="";
var speed_limit=70;
var unid="";
var server_id=0;


function draw_players()
	{
	if (players.length>max_players)
		{
		// new player came
		for (i=max_players;i<players.length ;i++ )
			{
			p_marker[i] = new google.maps.Marker({
				position: just_latlng,
				map: MyMap,
				icon: micon,
				label: {text: "gamarjoba", color: "white"},
				animation: google.maps.Animation.DROP,
				});
			}
		max_players=players.length;
		}

	for (i=0;i<players.length ;i++ )
		{	
		var mlabel=p_marker[i].getLabel();
		mlabel.text=players[i]["uname"];
		mlabel.color="red";


		p_marker[i].setIcon(micon);
		p_marker[i].setLabel(mlabel);
		var myLatLng = {lat:  parseFloat(players[i]["lat"]), lng: parseFloat(players[i]["lng"])};
		p_marker[i].setPosition(myLatLng);


		}
	if (lboard_vis==1)
		{
		show_leaders();
		}
	
	}


function show_leaders()
	{

	var takers=targets[0]["takers"];

	var a=new Array();
	a=takers.split(";");

	document.getElementById("leaderboard_txt").innerHTML="";
	for (i=0;i<a.length-1 ;i++ )
		{
		document.getElementById("leaderboard_txt").innerHTML+=(i+1)+": "+a[i]+"<BR>";
		}
	}

function draw_targets()
	{
		console.log("drawing targets");
	var  bounds;
	var myLatLng = {lat:  MyLat, lng: MyLong};
	bounds = new google.maps.LatLngBounds();
	bounds.extend(myLatLng);

	if (targets.length>0)
		{
		for (i=0;i<targets.length ;i++ )
			{	
			var myLatLng =  {lat:  parseFloat(targets[i]["lat"]), lng: parseFloat(targets[i]["lng"])};
			t_circle[i].setCenter(myLatLng);
			minimap_circle[i].setPosition(myLatLng);
			

			bounds.extend(myLatLng);

			t_circle[i].setRadius(parseFloat(targets[i]["radius"]));
			
			if (targets[i]["taken"]==1)
				{
				t_circle[i].setOptions({strokeColor: '#00FF00'});
				}
			else
				{
					t_circle[i].setOptions({strokeColor: '#FF0000'});
				}
			
			}

		document.getElementById("pinfo").innerHTML=targets[0]["name"]+"<BR>distance: "+targets[0]["dist"]+" meters";;
		var myLatLng =  {lat:  parseFloat(targets[0]["lat"]), lng: parseFloat(targets[0]["lng"])};
	//	logo_marker.setPosition(myLatLng);
		Target_marker.setPosition(myLatLng);
		}
//	MyMap2.fitBounds(bounds);
	

	}

var curstate="none";

function req_players()
	{

	if (server_id==0)
		{
		show_screen("login");

			
		}
	else
		{
		url='https://www.smartgps.ge/letsmove/?update_lat=1';
		console.log("req players: "+url);
		brainhttp.open('GET',url,true);
		brainhttp.send(null);
		
	
	//console.log("background mode: "+cordova.plugins.backgroundMode.isActive());
	
		setTimeout("req_players();",1000);
		}
	document.getElementById("time_data").innerHTML=Date.now()-last_gps_time;

	}
var cur_screen="";

function show_screen(scrname)
	{
	if (scrname!=cur_screen)
		{
		document.getElementById("login_screen").style.display="none";
		document.getElementById("loading_screen").style.display="none";
		if (scrname=="login")
			{
			document.getElementById("login_screen").style.display="block";



			}
		cur_screen=scrname;
		}




	}