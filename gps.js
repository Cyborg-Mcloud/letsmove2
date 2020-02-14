var old_tar_lat=0;
var old_tar_lng=0;

var nogps=0;
var auto_sender=0;
var last_gps_time=0;

var MyMap;
var MyMarker;
var MyMarker_Circle;
var Target_marker;

var micon;
var old_lat=0;
var old_lng=0;
var old_head=0;
var sent_lat=0;
var sent_lng=0;

var new_lat=0;
var new_lng=0;

var spd_lat=0;
var spd_lng=0;
var spd_steps=0;


var MyLat=41.7120788;
var MyLong=44.7491408;
var MyAlt;
var MyHead;
var MySpeed;
var MyAcc;


function init_gps() 
	{

	//	cordova.plugins.backgroundMode.enable();

//cordova.plugins.backgroundMode.setEnabled(true);
	

	console.log("device ready 2, getting position");
	
	navigator.geolocation.getCurrentPosition(onSuccess, onError, opts);
	
	watchID = navigator.geolocation.watchPosition(onSuccess, onError, opts);
	//window.addEventListener("devicemotion", handleMotion, true);



//	if (window.DeviceOrientationAbsoluteEvent) {
//      window.addEventListener("DeviceOrientationAbsoluteEvent", handleOrientation, true);
//    } // If not, check if the device sends any orientation data
  //  else if(window.DeviceOrientationEvent){
//      window.addEventListener("deviceorientation", handleOrientation, true);
//    } // Send an alert if the device isn't compatible
//    else {
//      alert("Sorry, try again on a compatible mobile device!");
//    }
//	 window.addEventListener('compassneedscalibration', function(event) {
//               alert('Compass needs calibrating! Wave your device in a figure-eight motion');
//            });
	console.log("device orientation handle set");
	//setTimeout("StartWebView();",200); 
	if (MyLat>0)
		{
//		send_data();
		}


	


    }




var acc_set=0;
function handleMotion(event) {
	acc_set=1;
    // Process event.acceleration, event.accelerationIncludingGravity,
    // event.rotationRate and event.interval
//	console.log("data movida");
//	console.log(event);
//	console.log(event.accelerationIncludingGravity);
var accx=parseInt(event.accelerationIncludingGravity.x*1000)/1000;
var accy=parseInt(event.accelerationIncludingGravity.y*1000)/1000;
var accz=parseInt(event.accelerationIncludingGravity.z*1000)/1000;
//console.log( accx + ";" +  accy + ";" + accz ) ;
//	console.log(event.rotationRate);
//	console.log(event.interval);
document.getElementById("txtdata").innerHTML = accx + "<BR>" +  accy + "<BR>" + accz  ;
if (accx>=0)
	{
	document.getElementById("xdiv").style.width=accx*5+"px";
	document.getElementById("xdiv").style.left="50%";
	}
else
	{
	document.getElementById("xdiv").style.left=100+accx*5+"px";
	document.getElementById("xdiv").style.width=-1*accx*5+"px";

	}
if (accy>=0)
	{
	document.getElementById("ydiv").style.width=accy*5+"px";
	document.getElementById("ydiv").style.left="50%";
	}
else
	{
	document.getElementById("ydiv").style.left=100+accy*5+"px";
	document.getElementById("ydiv").style.width=-1*accy*5+"px";

	}

if (accz>=0)
	{
	document.getElementById("zdiv").style.width=accz*5+"px";
	document.getElementById("zdiv").style.left="50%";
	}
else
	{
	document.getElementById("zdiv").style.left=100+accz*5+"px";
	document.getElementById("zdiv").style.width=-1*accz*5+"px";

	}

}


function handleOrientation(event) {
  var absolute = event.absolute;
  var alpha    = event.alpha;
  var beta     = event.beta;
  var gamma    = event.gamma;


if (typeof event.webkitCompassHeading !== "undefined") {
        alpha = event.webkitCompassHeading; //iOS non-standard
       
      }
      else {
     //   console.log("Your device is reporting relative alpha values, so this compass won't point north! ");

      }

//console.log(event);
  if (old_head!=alpha )
		{
		alpha=parseInt(alpha);
		console.log("heading: "+alpha);
		var icon = MyMarker_pointer.getIcon();
		icon.rotation =360-alpha-90;
		MyMarker_pointer.setIcon(icon);
		
		var icon = Myminimap_marker.getIcon();
		icon.rotation =360-alpha-90;
		Myminimap_marker.setIcon(icon);
		
		
		old_head=alpha;


		}

  // Do stuff with the new orientation data
}

function onSuccess(position) 
	{
	console.log("on GPS success");
	console.log("sxvaoba: "+(Date.now()-last_gps_time))
	document.getElementById("time_data").innerHTML=Date.now()-last_gps_time;
	last_gps_time = Date.now();
	nogps=0;
	document.getElementById("nogps").style.display="none";

//console.log(position);
	//if (mouse_coords<2)
//		{
	console.log(position.coords.latitude + " / " + position.coords.longitude + " | "+MyAcc);
		new_lat=position.coords.latitude ;
		new_lng=position.coords.longitude ;
		MyAlt=position.coords.altitude ;
		MyHead=parseInt(position.coords.heading) ;
		MySpeed=position.coords.speed ;
		MyAcc=parseInt(position.coords.accuracy);


	
		MySpeed=parseInt((MySpeed*36/10 ));
		if (MySpeed>speed_limit){alert("დაფიქსირდა სიჩქარის გადამეტება!");}

	document.getElementById("gpsdata").innerHTML="Speed: "+MySpeed+"<br>Heading: "+MyHead;

	document.getElementById("accuracy_data").innerHTML=MyAcc;

	//	if (mouse_coords==1)
	//		{
	//		mouse_coords=2;
	//		}
	//	}
//document.getElementById("myinfo").innerHTML=MyHead + " | "+MySpeed;



	if (old_lat!=new_lat || old_lng!=new_lng)
		{
		console.log("lat change to new ");
		var d = new Date();
		var new_coord_time=d.getTime();
		if (old_lat>0)
			{
			
			spd_steps=parseInt((new_coord_time-last_coord_time)/100);
			if (spd_steps>10)
				{
				spd_steps=20;
				}
			if (spd_steps==0){spd_steps=1;	}

			spd_lat=(new_lat-MyLat)/spd_steps;
			spd_lng=(new_lng-MyLong)/spd_steps;
			console.log("steps: "+spd_steps + " | "+spd_lat+" : "+spd_lng);
			}
		else
			{
			var myLatLng = {lat:  new_lat, lng: new_lng};
			MyMap.panTo(myLatLng);
			MyMap2.panTo(myLatLng);
			}

		old_lat=new_lat;
		old_lng=new_lng;
		move_marker();


		console.log("sxvaoba: "+ Math.abs(MyLat-sent_lat));
		last_coord_time= new_coord_time;

		if ( Math.abs(new_lat-sent_lat)>0.00005 || Math.abs(new_lng -sent_lng)>0.00005)
			{
			sent_lng=new_lng;
			sent_lat=new_lat;
			send_data();
			}
		}
	if (MyHead==0 || MyHead==null)
		{MyMarker_pointer.setVisible(false);}

	else if (old_head!=MyHead && MyHead!=null)
		{
		MyMarker_pointer.setVisible(true);
		console.log("heading: "+MyHead);

		var icon = MyMarker_pointer.getIcon();
		icon.rotation =MyHead;
		MyMarker_pointer.setIcon(icon);
		
		var icon = Myminimap_marker.getIcon();
		icon.rotation =MyHead;
		Myminimap_marker.setIcon(icon);
		
		
		old_head=MyHead;
		}

	//console.log(MyLat+ " - "+MyLong);

    }

function move_marker()
	{

	MyLat=MyLat+spd_lat;
	MyLong=MyLong+spd_lng;

	
	if (spd_steps>0)
		{
		var myLatLng = {lat:  MyLat, lng: MyLong};
		MyMarker.setPosition(myLatLng);
		MyMarker_pointer.setPosition(myLatLng);
		Myminimap_marker.setPosition(myLatLng);
		MyMap2.panTo(myLatLng);
		console.log("move marker");
		spd_steps--;
		setTimeout("move_marker();",10);
		}
	else
		{
		MyLat=new_lat;
		MyLong=new_lng;

		var myLatLng = {lat:  MyLat, lng: MyLong};
		MyMarker.setPosition(myLatLng);
		MyMarker_pointer.setPosition(myLatLng);
		Myminimap_marker.setPosition(myLatLng);
		MyMap2.panTo(myLatLng);
		console.log("move marker");
		spd_steps--;

		}
	}

function send_data()
	{
	data_send('https://www.smartgps.ge/letsmove/api.php', "update_lat=1&lat="+MyLat+"&lng="+MyLong+"&cur_game_mode="+curgametype);	

	//console.log("update lat: "+url);
	
	if (auto_sender==0)
		{
		auto_sender=1;
		setTimeout("data_sender_loop();",30000);
		}
	
	navigator.geolocation.getCurrentPosition(onSuccess, onError, opts);
	}

function data_sender_loop()
	{
		auto_sender=1;
	send_data();

	setTimeout("data_sender_loop();",30000);
	}



function onError(error)
	{
	console.log("error getting location ");
	console.log(error);
	nogps++;
	if (nogps>0)
		{
		document.getElementById("nogps").style.display="block";
		document.getElementById("nogps").innerHTML="GPS";
		}
	var error_str="ვერ ხერხდება ლოკაციის მიღება";
	
	switch(error.code) {
	   case error.PERMISSION_DENIED:
		   error_str+="<BR>გთხოვთ დაუშვათ ლოკაცია";
		   break;
	   case error.POSITION_UNAVAILABLE:
		   error_str+= "<BR>ლოკაცია მიუწვდომელია";
		   break;
	   case error.TIMEOUT:
		   error_str+= "<BR>ლოკაციის მოთხოვნას ვადა გაუვიდა";
		   navigator.geolocation.getCurrentPosition(onSuccess, onError, {timeout: 10000, enableHighAccuracy: true,  maximumAge:0});
		   break;
	   case error.UNKNOWN_ERROR:
		   error_str+="<BR>უცნობი ლოკაციის მოთხოვნის პრობლემა";
		   break;
		   }
   document.getElementById("nogps").innerHTML=error_str;
   document.getElementById("infodiv").innerHTML=error_str;
   console.log("ლოკაციის ერორი: "+error_str);
    

	}

