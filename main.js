var send_data=new Array();
var send_url=new Array();
var send_answ=new Array();
var curstate="none";

var cur_screen="";

var lboard_vis=0;

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

var uid=0;
var myid="";
var speed_limit=70;
var unid="";

var old_takers="";



function draw_players(){
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
				animation: google.maps.Animation.DROP
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
	if (lboard_vis==1)	{
		show_leaders();
		}

}

function show_leaders(){
	var takers=targets[0]["takers"];
	if (takers!=old_takers){
		var a=new Array();
		a=takers.split(";");

		document.getElementById("leaderboard_txt").innerHTML="";
		for (i=0;i<a.length-1 ;i++ )		{
			document.getElementById("leaderboard_txt").innerHTML+=(i+1)+": "+a[i]+"<BR>";
		}
	old_takers=takers;
	}
}

function display_leaderboard(mdata){
	document.getElementById("leaderboard_info").innerHTML="";
	for (i=0;i<mdata.length;i++){
		document.getElementById("leaderboard_info").innerHTML+="<div class='led_bot_div led_div_1'><a>"+(i+1)+"</a><a></a><a>"+mdata[i]["uname"]+" <br></a><a>"+mdata[i]["mpoints"]+"</a></div>";
	
	}
	
}

function draw_targets(){
	if (mdebug==1){console.log("drawing targets");}
	var  bounds;
	var myLatLng = {lat:  MyLat, lng: MyLong};
	bounds = new google.maps.LatLngBounds();
	bounds.extend(myLatLng);

	if (targets.length>0){
		for (i=0;i<targets.length ;i++ ) {	
			var myLatLng =  {lat:  parseFloat(targets[i]["lat"]), lng: parseFloat(targets[i]["lng"])};
			t_circle[i].setCenter(myLatLng);
			minimap_circle[i].setPosition(myLatLng);
			bounds.extend(myLatLng);
			t_circle[i].setRadius(parseFloat(targets[i]["radius"]));
			if (targets[i]["taken"]==1)	{
				t_circle[i].setOptions({strokeColor: '#00FF00'});
			}else {
				t_circle[i].setOptions({strokeColor: '#FF0000'});
			}	
		}
		
		if (meters_old!=targets[0]["dist"])	{
			var ctext=targets[0]["name"]+"<BR>distance: "+targets[0]["dist"]+" meters";
			document.getElementById("pinfo").innerHTML=ctext;
			meters_old=targets[0]["dist"];
		}
		var myLatLng =  {lat:  parseFloat(targets[0]["lat"]), lng: parseFloat(targets[0]["lng"])};
		Target_marker.setPosition(myLatLng);
		Target_marker.setVisible(true);
		t_circle[0].setOptions({strokeOpacity:0.8});
		
	} else {
		Target_marker.setVisible(false);

		t_circle[0].setOptions({strokeOpacity:0});
	}
	//	MyMap2.fitBounds(bounds);
}
var mydata=new Array();
var sync_url="";
var sync_data="";
var sync_answ=0;
var meters_old=0;
var brainhttp;
var b_recv;
if (window.XMLHttpRequest) {brainhttp=new XMLHttpRequest();}
else if (window.ActiveXObject) {brainhttp=new ActiveXObject('Microsoft.XMLHTTP');}
else {alert('Your browser does not support XMLHTTP!');}

brainhttp.onreadystatechange=brain_recv;

function brain_recv(){
	if (brainhttp.readyState==4 && brainhttp.status==200) {
		b_recv=brainhttp.responseText;
		if (b_recv!="") {
			obj=JSON.parse(b_recv);
			if (obj["checksum"]==sync_answ)	{
				sync_data="";sync_url="";sync_answ=0;
			}
			if (mdebug==1){console.log(obj);}
			if (typeof obj["login_data"] !== 'undefined') {
				if (typeof obj["error"] !== 'undefined') {
					alert(obj["error"]);
				} else {
					uid=obj["uid"];
					setCookie("uid",uid, 365);
					setTimeout("req_players();",1000);
					show_screen("home");
				}
			}

			if (obj["subscribed"]==0 && document.getElementById("subscribe_but").style.display!="block"){
				document.getElementById("subscribe_but").style.display="block";
			} else if (obj["subscribed"]==1 && document.getElementById("subscribe_but").style.display!="none"){
				document.getElementById("subscribe_but").style.display="none";	
			}

			if (typeof obj["leaderboard_data"] !== 'undefined') {
				display_leaderboard(obj["leaderboard"]);
			}

			if (typeof obj["profile_data"] !== 'undefined') {
				
				mydata=obj["mydata"];
				document.getElementById("prof_uname").value=mydata["uname"];
				document.getElementById("prof_email").value=mydata["email"];
				document.getElementById("prof_tel").value=mydata["tel"];
				document.getElementById("prof_referal").value=mydata["referal_id"];

				if (mydata["referal"]!=""){
					document.getElementById("my_referer_div").innerHTML="invited by <b>"+mydata["referal"]+"</b>";
					document.getElementById("my_referer_div").style.display="block";
				}
				
				if (mydata["subscribed"]!=1){
					document.getElementById("subscribtion_div").style.display="block";
				}else{
					document.getElementById("subscribtion_div").style.display="none";
				}
				
			
			}
		
			if (typeof obj["user_data"] !== 'undefined') {
				players=obj["users"];
				
				if (curmenu==1)	{
		
				}
			}

			if (typeof obj["close_pay"] !== 'undefined') {
				win.close();
				console.log("pay window close");
			}

			if (typeof obj["timer_data"] !== 'undefined') {
				if (obj["data"]["timer"]!=document.getElementById("timer").innerHTML){
					document.getElementById("timer").innerHTML=obj["data"]["timer"];
					document.getElementById("timer2").innerHTML=obj["data"]["timer"];
				}
				document.getElementById("qulebi").innerHTML=obj["data"]["mpoints"];
				document.getElementById("rating").innerHTML=obj["data"]["rating"];
			}
				
			if (typeof obj["targets"] !== 'undefined') {
				var new_tars=new Array();
				new_tars=obj["targets"];
				if (new_tars.length<targets.length)	{
					for (i=new_tars.length;i<targets.length ;i++ ) {
						t_circle[i].setCenter(just_latlng);
						minimap_circle[i].setPosition(just_latlng);
					}
					max_targets=0;
					targets.length=0;
					tartgets=[];
				}

				targets=obj["targets"];
				if (targets[0]["taken"]==1 && lbut_vis==0) {
					document.getElementById("show_leaderb_but").style.display="block";
					if (mdebug==1){console.log("showing");}
					lbut_vis=1;
				} else if (targets[0]["taken"]==0 &&  lbut_vis==1) {
					document.getElementById("show_leaderb_but").style.display="none";
					if (mdebug==1){console.log("hiding");}
					lbut_vis=0;
				}

				if (typeof targets[0]["new_take"] !== 'undefined' && targets[0]["new_take"]==1)	{
					if (mdebug==1){console.log("axalio!");}
					document.getElementById("grats_div").style.display='block';
				}
			} else {
				document.getElementById("timer").innerHTML="not started";
			}
			if (typeof obj["anim"] !== 'undefined')
				{
				if (typeof obj["anim"]["take"] !== 'undefined' && obj["anim"]["take"]==1)
					{
					if (mdebug==1){console.log("axalio small!");}
					document.getElementById("small_grats_div").style.display='block';
					}
				}
			draw_players();
			draw_targets();
		}
	}
}


function req_players(){
	if (uid==0)	{
		show_screen("login");
		var a=getCookie("first_start");
		if (a!=999) {
			setCookie("first_start",999,365);
			location.reload(); 
		}		
	} else {
		data_send('https://www.smartgps.ge/letsmove/api.php', "update_lat=1&myid="+myid);
		setTimeout("req_players();",1000);
	}
	document.getElementById("time_data").innerHTML=Date.now()-last_gps_time;
}


function data_send(url, data, async=true) {
	if (sync_data=="") {
		if (async==false) {
			sync_answ=Math.floor(Math.random() * 10000000) + 1;
		} else {sync_answ=0;}
		brainhttp.open('GET',url+"?"+data+"&checksum="+sync_answ,true);
		brainhttp.send(null);
		if (mdebug==1){console.log("data send: "+url+ "?" +data+"&checksum="+sync_answ+ " / "+async);}
		if (async==false) {
			sync_data=data;
			sync_url=url;
			setTimeout("sync_sender();",500);
		}
	} else {
		var sl=send_data.length;
		send_data[sl]=data;
		send_url[sl]=url;
		if (async==true) {
			send_answ[sl]=0;
		} else {
			send_answ[sl]=Math.floor(Math.random() * 10000000) + 1;
		}	
	}
}

function sync_sender() {
	if (sync_data!="" && sync_url!="") {
		brainhttp.open('GET',url+"?"+data+"&checksum="+sync_answ,true);
		brainhttp.send(null);
		if (mdebug==1){console.log("sync data sender: "+sync_url+ "?" +sync_data);}
		setTimeout("sync_sender();",500);
	}
}

function request_mydata(){
	var mdata="mydata=1";
	data_send("https://www.smartgps.ge/letsmove/api.php",mdata, true);
}