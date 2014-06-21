	
	function getTabs(orgId){
		//   /Application/Tabs?orgId=1
		$.ajax({
			type:'get',
			url:'proxy.php',
			data:{path:'/Application/Tabs?orgId='+orgId},
			cache:false,
			async:true,
			error:err,
			success:function(data){
				//error?
				if($(data).find('error').length!=0){
					//give some feedback!

				}else{
					//<data><row><Tab>General</Tab></row><row><Tab>Locations</Tab></row><row><Tab>Treatment</Tab></row><row><Tab>Training</Tab></row><row><Tab>Facilities</Tab></row><row><Tab>Physicians</Tab></row><row><Tab>People</Tab></row></data>
					var x='<select onchange="window[\'get\'+$(this).val()]('+orgId+')">';
					$('Tab',data).each(function(){
						//this?
						//console.log($(this).text());
						x+='<option value="'+$(this).text()+'">'+$(this).text()+'</option>';
					});
					$('#dump').html(x+'</select>');
					getGeneral(orgId); //trigger for first time
				}
			}
		});
	}
	
	
	function getGeneral(id){
		$.ajax({
			type:'get',
			data:{path:'/'+id+'/General'},
			url:'proxy.php',
			success:function(data){
				//test for error?
				//<data><name>Some Ambulance</name><description>Something cool about the ambulance</description><email>flug@rit.edu</email><website>http://www.something.com</website><nummembers>500</nummembers><numcalls>400</numcalls><servicearea>500 miles</servicearea></data>
				var x='<h3>General - </h3>';
				x+='<tr><td>Name:</td><td>'+$(data).find('name').text()+'</td></tr>';
				x+='<tr><td>Description:</td><td>'+$(data).find('description').text()+'</td></tr>';
				x+='<tr><td>Email:</td><td>'+$(data).find('email').text()+'</td></tr>';
				x+='<tr><td>Website:</td><td>'+$(data).find('website').text()+'</td></tr>';
				x+='<tr><td>Number of Members:</td><td>'+$(data).find('nummembers').text()+'</td></tr>';
				x+='<tr><td>Number of Calls:</td><td>'+$(data).find('numcalls').text()+'</td></tr>';
				x+='<tr><td>Service Area:</td><td>'+$(data).find('servicearea').text()+'</td></tr>';
				$('#tableOutputPopUp').html(x);
			}
		});
	}
	
	function getTabs(orgId){
		//   /Application/Tabs?orgId=1
		$.ajax({
			type:'get',
			url:'proxy.php',
			data:{path:'/Application/Tabs?orgId='+orgId},
			cache:false,
			async:true,
			error:err,
			success:function(data){
				//error?
				if($(data).find('error').length!=0){
					//give some feedback!
				}else{

					
					var x = '<div id="SearchForm"><ul>';
					$('Tab',data).each(function(){
						//this?
						//console.log($(this).text());
						x+='<li onclick="get'+$(this).text()+'('+orgId+')"><a href="#" data-reveal-id="myModal" data-animation="none">' + $(this).text() + '</a></li>';
						//window.alert('get'+$(this).text()+'('+orgId+')');
					
					});
					//$('#dump').html(x+'</select>');
					$('#navigation').html(x+'</ul></div>');
					getGeneral(orgId); //trigger for first time

				}
			}
		});
	}

	
	
//added a bit more here - you all need to finish each one (and remember to put a map in locations)
	function getLocations(orgId){
		
	      	$.ajax({
			type:'get',
			data:{path:'/'+orgId+'/Locations'},
			url:'proxy.php',
			success:function(data){
			  
			  var x = "<h2>Locations</h2>Location Type: <select id='locationType' onchange='listLocation("+orgId+")'><option>-- Select a Type --</option>";
			  
			  var table = '<table>';
			  
			  $('location',data).each(function(){
			      x += '<option value='+$(this).find('siteId').text()+'>'+ $(this).find('type').text() +'</option>';
			//      if ($(this).find('type').text() == "main"){
			//	
			//	table += '<tr><td>Type:</td><td>'+checkForError($(this).find('type').text())+'</td></tr>';
			//	table += '<tr><td>Address:</td><td>'+checkForError($(this).find('address1').text())+'</td></tr>';
			//	table += '<tr><td>City:</td><td>'+checkForError($(this).find('city').text())+'</td></tr>';
			//	table += '<tr><td>State:</td><td>'+checkForError($(this).find('state').text())+'</td></tr>';
			//	table += '<tr><td>County:</td><td>'+checkForError($(this).find('county').text())+'</td></tr>';
			//	table += '<tr><td>Zip:</td><td>'+checkForError($(this).find('zip').text())+'</td></tr>';
			//	table += '<tr><td>Phone:</td><td>'+checkForError($(this).find('phone').text())+'</td></tr>';
			//	table += '<tr><td>TTY Phone:</td><td>'+checkForError($(this).find('ttyPhone').text())+'</td></tr>';
			//	table += '<tr><td>Fax:</td><td>'+checkForError($(this).find('fax').text())+'</td></tr>';
			//	table += '<tr><td>Latitude:</td><td>'+checkForError($(this).find('latitude').text())+'</td></tr>';
			//	table += '<tr><td>Longitude:</td><td>'+checkForError($(this).find('longitude').text())+'</td></tr>';
			//      }
			      
       	 		  });
			  
			  $('#tableOutputPopUp').html(x+'</select><div id="peopleList"></div>');//+table+'</table><div id="map"></div>');

			}	
		});	 		
	}
	
	
	
	function listLocation(orgId) {
	  //code
	  
	      	$.ajax({
			type:'get',
			data:{path:'/'+orgId+'/Locations'},
			url:'proxy.php',
			success:function(data){
			  
    			  var table = '<table>';
			  
			  $('location',data).each(function(){
			      if (parseInt($(this).find('siteId').text()) == $('#locationType').val()){
				
				table += '<tr><td>Type:</td><td>'+checkForError($(this).find('type').text())+'</td></tr>';
				table += '<tr><td>Address:</td><td>'+checkForError($(this).find('address1').text())+'</td></tr>';
				table += '<tr><td>City:</td><td>'+checkForError($(this).find('city').text())+'</td></tr>';
				table += '<tr><td>State:</td><td>'+checkForError($(this).find('state').text())+'</td></tr>';
				table += '<tr><td>County:</td><td>'+checkForError($(this).find('county').text())+'</td></tr>';
				table += '<tr><td>Zip:</td><td>'+checkForError($(this).find('zip').text())+'</td></tr>';
				table += '<tr><td>Phone:</td><td>'+checkForError($(this).find('phone').text())+'</td></tr>';
				table += '<tr><td>TTY Phone:</td><td>'+checkForError($(this).find('ttyPhone').text())+'</td></tr>';
				table += '<tr><td>Fax:</td><td>'+checkForError($(this).find('fax').text())+'</td></tr>';
				table += '<tr><td>Latitude:</td><td>'+checkForError($(this).find('latitude').text())+'</td></tr>';
				table += '<tr><td>Longitude:</td><td>'+checkForError($(this).find('longitude').text())+'</td></tr>';
			      }
			      
       	 		  });
			  
			  $('#peopleList').html(table+'</table>');

			}	
		});	 			  
	  
	}

	function getTraining(orgId){
		// $('#output').html('going to get Training of '+orgId);
				$.ajax({
			type:'get',
			data:{path:'/'+orgId+'/Training'},
			url:'proxy.php',
			success:function(data){
			  var x='<h3>Training - </h3>';
			  
			  $('data',data).each(function(){

			    if(parseInt($(this).find('count').text(), 10) > 0){
			      x+='<table><tr><th>Type</th><th>Abbreviation</th></tr>';
			      $('training',data).each(function(){

				 x+='<tr><td>'+checkForError($(this).find('type').text()) +'</td><td>'+ checkForError($(this).find('abbreviation').text()) +' </td></tr>';

			      });
			  
			     x +='</table>'; 
			    } else {
			      x+= '<h4>Traninings are currently unavailable at this organization.</h4>';
			    }
			    
			    $('#tableOutputPopUp').html(x);
			  });
			      
			      

			}
		});
	}


	function getTreatment(orgId){
		$.ajax({
			type:'get',
			data:{path:'/'+orgId+'/Treatments'},
			url:'proxy.php',
			success:function(data){
			  
			  var x='<h3>Treatment - </h3>';
			  
			  $('data',data).each(function(){

			    if(parseInt($(this).find('count').text(), 10) > 0){
			        x+='<table><tr><th>Type</th><th>Abbreviation</th></tr>';
			  
			      $('treatment',data).each(function(){
    
				x+='<tr><td>'+checkForError($(this).find('type').text())+'</td><td>'+checkForError($(this).find('abbreviation').text()) +'</td></tr>';
    
			      });
			      
			      x += '</table>';
			      
			    } else {
			      x+= "<h4>Treatments are currently unavailable at this organization.</h4>";
			    }			  
	
			    $('#tableOutputPopUp').html(x);
			  });
			}
		  });
	}

	function getFacilities(orgId){
		$.ajax({
			type:'get',
			data:{path:'/'+orgId+'/Facilities'},
			url:'proxy.php',
			success:function(data){
			  
			  var x='<h3>Facilities - </h3>';
			  
			  $('data',data).each(function(){

			    if(parseInt($(this).find('count').text(), 10) > 0){
			        x+='<table><tr><th>Name</th><th>Quantity</th><th>Description</th></tr>';
			  
			      $('facility',data).each(function(){
    
				x+='<tr><td>'+checkForError($(this).find('type').text())+'</td><td>'+checkForError($(this).find('abbreviation').text()) +'</td></tr>';
    
			      });
			      
			      x += '</table>';
			      
			    } else {
			      x+= '<h4>Facilities are currently unavailable at this organization.</h4>';
			    }			  
	
			    $('#tableOutputPopUp').html(x);
			  });			  
			  
			}
			  
		});
	}

	function getEquipment(orgId){
				$.ajax({
			type:'get',
			data:{path:'/'+orgId+'/Equipment'},
			url:'proxy.php',
			success:function(data){
			  
			  var x='<h3>Equipment - </h3>';
			  
			  $('data',data).each(function(){

			    if(parseInt($(this).find('count').text(), 10) > 0){
			        x+='<table><tr><th>Type</th><th>Quantity</th><th>Description</th></tr>';
			  
			      $('equipment',data).each(function(){
    
				x+='<tr><td>'+checkForError($(this).find('type').text()) +'</td><td>'+checkForError($(this).find('quantity').text()) +'</td><td>'+checkForError($(this).find('description').text()) +' </td></tr>';
    
			      });
			      
			      x += '</table>';
			      
			    } else {
			      x+= '<h4>Equipments are currently unavailable at this organization.</h4>';
			    }			  
	
			    $('#tableOutputPopUp').html(x);
			  });			  
			  
			}
			  
		});
	}

	function getPhysicians(orgId){
		$.ajax({
			type:'get',
			data:{path:'/'+orgId+'/Physicians'},
			url:'proxy.php',
			success:function(data){
			  
			  var x='<h3>Physicians - </h3>';
			  
			  $('data',data).each(function(){

			    if(parseInt($(this).find('count').text(), 10) > 0){
			       x+='<table><tr><th>Name</th><th>License</th><th>Contact</th></tr>';
			  
			      $('physician',data).each(function(){
    
				x+='<tr><td>'+checkForError($(this).find('fName').text()) +' '+checkForError($(this).find('lName').text()) +'</td><td>'+checkForError($(this).find('license').text()) +' </td><td>'+checkForError($(this).find('phone').text()) +' </td></tr>';
    
			      });
			      
			      x += '</table>';
			      
			    } else {
			      x+= '<h4>Physicians are currently unavailable in this organization.</h4>';
			    }

			  });

			  $('#tableOutputPopUp').html(x);
			}
		});
	}

	function getPeople(orgId){
		$.ajax({
			type:'get',
			data:{path:'/'+orgId+'/People'},
			url:'proxy.php',
			success:function(data){
			  var x = "<h3>People - </h3>";
			  var peopleTable = '';
			  var menu = 'Please select a site: <select id="addressList" onchange="listPeople('+orgId+')"><option>-- Choose a Site --</option>';
			  
			  $('site',data).each(function(){
			    menu += '<option value="'+$(this).attr('siteType') +'">'+ $(this).attr('address') + '</option>';
			    
			//    var personCount = parseInt($(this).find('personCount').text());
			//    
			//    if ($(this).attr('siteType') == "main") {
			//      if (personCount > 0) {
			//	peopleTable += '<table><tr><th>Site: '+$(this).attr('address')+'</th></tr><tr><th>Name</th><th>Role</th></tr>';
			//	//code
			//	$('person', $(this)).each(function(){
			//	  
			//	  peopleTable += '<tr><td>' + $(this).find('fName').text() + ' ' + $(this).find('lName').text() + '</td><td>'+$(this).find('role').text()+ '</td></tr>';
			//
			//	  
			//	});
			//	peopleTable += '</table>';
			//      }
			//   }
			    
			  });
			  menu += '</select><div id="peopleTable"></div>';
			  $('#tableOutputPopUp').html(x + '' +menu);// + '' + peopleTable);
			}
		});
	}
	
	function err(d){
		alert(d);
	}
	
	//NEW!/////////////////////////////////////
	//building the search functionality.
	
	//onload, get the cities for the state.
	$(document).ready(function(){
		getCities('NY');
		getOrgTypes();
	});
	
	function getCities(whichState){
		//make ajax call to get the cities from the given State
		if(whichState == ''){
    			$('#orgCitySearch').html('City/Town<input id="cityTown" type="text"/>');
    		}else{
    		$.ajax({
  				type: "GET",
  				async: true,
  				cache:false,
  				url: "proxy.php",
  				data: {path: '/Cities?state='+whichState},//Need code here!  
  				dataType: "xml",
  				success: function(data, status){ 
       	 			var x='';
       	 			if($(data).find('error').length != 0){
	       	 			//do nothing?
       	 			}else if($(data).find('row').length==0 && whichState != ''){
       	 				$('#orgCitySearch').html('City/Town<input id="cityTown" type="text" value="No cities/Towns in "'+which+'"/>');
       	 			}else{
       	 				x+='<select id="city" name="town">';
       	 				x+='<option value="">--select a town--</option>';
       	 				$('city',data).each(function(){
       	 					x+='<option value="'+$(this).text()+'">'+$(this).text()+'</option>';
       	 				});
       	 				/*
       	 				$('row',data).each(function(){
       	 					$(this).find('city').text();
       	 				});
       	 				*/
       	 				$('#orgCitySearch').html(x+'</select>');
       	 			}
		   		}
			});
			}
	}
	
	//go get the orgTypes (Ambulance, Hospital, etc) - how would these change?  How often?
	function getOrgTypes(){ 
		$.ajax({
			type:'get',
			async:true,
			cache:false,
			url:'proxy.php',
			data:{path:'/OrgTypes'},
			dataType:'xml',
			success:function(data){
				//check for errors...
				var x='<option value="">--select org type--</option>';
				$('type',data).each(function(){
					x+='<option value="'+ $(this).text() +'">'+ $(this).text() +'</option>';
				});
				$('#orgType').html(x);
			},
			error:err
		});
	}
	
	//do a search.  Results of this should hook in directly with what we built in 7a so when
	//an org is clicked it will create the select and getGeneral().
	function checkSearch(){
		$.ajax({
			type:'get',
			async:true,
			cache:false,
			url:'proxy.php',
			data:{path:'/Organizations?'+$('#searchForm').serialize()},
			dataType:'xml',
			success:function(data){
				//check for errors...
				/*				
				<row>
					<OrganizationID>2098</OrganizationID>
					<type>Nursing Home</type>
					<Name>Absolut Center For Nursing and Rehabilitation at Endicott, LLC</Name>
					<Email>amandajean57@yahoo.com</Email>
					<city>Endicott</city>
					<zip>13760</zip>
					<CountyName>Broome</CountyName>
					<State>NY</State>
				</row>*/
				if(document.getElementById("orgType").selectedIndex == 1) {
					var x = '<table id="myTable" border="1"><thead><tr><th>Name</th><th>Hospital</th><th>Phone</th><th>City</th><th>State</th><th>Zip</th><th>County</th></tr></thead><tbody>';
					$('row', data).each(function(){
						x += '<tr onclick="getTabs('+$(this).find('OrganizationID').text()+')"><td>'+$(this).find('fName').text()+" "+$(this).find('mName').text()+" "+$(this).find('lName').text()+'</td>';
						x += '<td><a href="#" data-reveal-id="myModal">'+$(this).find('Name').text()+'</a></td>';
						x += '<td>'+$(this).find('phone').text()+'</td>';
						x += '<td>'+$(this).find('city').text()+'</td>';
						x += '<td>'+$(this).find('State').text()+'</td>'; 
						x += '<td>'+$(this).find('zip').text()+'</td>';
						x += '<td>'+$(this).find('CountyName').text()+'</td></tr>';
					});
				}else{
					var x = '<table id="myTable" border="1"><thead><tr><th>Type:</th><th>Name:</th><th>Email</th><th>City</th><th>Zip</th><th>County</th><th>State</th></tr></thead><tbody>';
					$('row',data).each(function(){
						x += '<tr onclick="getTabs('+$(this).find('OrganizationID').text()+')"><td>'+$(this).find('type').text()+'</td>';
						x += '<td><a href="#" data-reveal-id="myModal">'+$(this).find('Name').text()+'</a></td>';
						x += '<td>'+$(this).find('Email').text()+'</td>';
						x += '<td>'+$(this).find('city').text()+'</td>';
						x += '<td>'+$(this).find('zip').text()+'</td>';
						x += '<td>'+$(this).find('CountyName').text()+'</td>';
						x += '<td>'+$(this).find('State').text()+'</td></tr>';
					});
				}
				
				x += '</tbody></table>';
				$('#tableOutput').html(x);
				$('#myTable').dataTable();
			},
			error:err
		});
	}
	// 		success:function(data){

	// 			if($(data).find('row').length == 0){
	// 				var x = '<h2>Results:</h2> &nbsp; I\'m sorry, but there were no data matches found in our database. '+$(this).find('Name').text();

					
						
	// 			}else{
	// 					// alert('Console: it works.');

	// 				x='<table border="1" id="example"><tr><th>Type:</th><th>Name:</th><th>Email</th><th>City</th><th>Zip</th><th>County</th><th>State</th></tr>';
	// 			$('row',data).each(function(){
	// 				x+='<tr><td>'+$(this).find('type').text()+'</td>';
	// 				x+='<a href="#" data-reveal-id="myModal"><td style="color:blue;cursor:pointer;" onclick="getTabs('+$(this).find('OrganizationID').text()+')"><a href="#" data-reveal-id="myModal">'+$(this).find('Name').text()+'</a></td>';
	// 				x+='<td>'+$(this).find('Email').text()+'</td>';
	// 				x+='<td>'+$(this).find('city').text()+'</td>';
	// 				x+='<td>'+$(this).find('zip').text()+'</td>';
	// 				x+='<td>'+$(this).find('CountyName').text()+'</td>';
	// 				x+='<td>'+$(this).find('State').text()+'</td></tr>';
	// 			});
						

					
	// 			}
				
	// 				$('#tableOutput').html(x+'</table>');


	// 		},
	// 		error:err
	// 	});
	// }

	function checkForError(data) {
	  if ((data == "null") || (data == "")){
	    return "N/A";
	  } else {
	    return data;
	  }
	}