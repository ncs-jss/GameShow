var valName=1;
var valEmail=1;
var valUser=1;
var valMob=1;
var valpassword=1;
var valcpassword=1;
var valyear=1;

function initRegister()
{
	name();
	email();
	referenceNo();
	mob();
	passwordRegister();
	passwordConfirm();
	year();
}

// Name validation

$("#name").blur(function()
{
	name();
});

// Email validation

$("#email").keyup(function() {
	email();
});

$("#email").blur(function() {
	email();
});


// referenceNo validation

$("#referenceNo").blur(function() {
	referenceNo();
});

// Mobile validation

$("#mob").blur(function() {
	mob();
});

//Password validation

$("#password").blur(function() {
	passwordRegister();

});

$("#cpassword").blur(function() {
	passwordConfirm();
});

$("#year").blur(function() {
	year();
})

$("#submit").click(function() {

	var name=$("#name").val();
	var email=$("#email").val();
	var referenceNo=$("#referenceNo").val();
	var mob=$("#mob").val();
	var password=$("#password").val();
	var cpassword=$("#cpassword").val();
	var year = $("#year").val();

	initRegister();

	if(valName==0 && valEmail==0 && valUser==0 && valMob==0 && valpassword==0 && valcpassword==0 && valyear==0)
	{
		var q={"name":name,"email":email,"referenceNo":referenceNo,"mob":mob,"password":password};
  		q="q="+JSON.stringify(q);
  		// console.log(q);
  		var xmlhttp = new XMLHttpRequest();
  		xmlhttp.onreadystatechange = function()
  		{
		    if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
		    {
		      	result=JSON.parse(xmlhttp.responseText);
		      	// console.log(result);
		        if(result['location'])
		        {
		        	location.href=result['location'];
		        }
		        if(result['name'])
		        {
					showNameError(result['name']);
		        }
		        if(result['password'])
		        {
					showPassErrorRegister(result['password']);
		        }
		        if(result['email'])
		        {
		        	showEmailError(result['email']);
		        }
		        if(result['referenceNo'])
		        {
		        	showReferenceError(result['referenceNo']);
		        }
		        if(result['mob'])
		        {
		        	showMobError(result['mob']);
		        }
		    }
  		};
		xmlhttp.open("POST", "ajax/validate_register.php", true);
		xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xmlhttp.send(q);
	}
	else
	{
		// alert("Please Fill correct details");
		$("#myModal").modal()
	}
});

function showNameError(txt)
{
	$("#nameLabel span").remove("span");
	$("#name").css({"outline":"none","border-color":"red"});
	var txt1=$("<span></span>").text(txt).css({'font-size':'8px','color':'red','display':'inline-block',"padding": "5px"});
	$("#nameLabel").append(txt1);
}

function showEmailError(txt)
{
	$("#emailLabel span").remove("span");
	$("#email").css({"outline":"none","border-color":"red"});
	var txt1=$("<span></span>").text(txt).css({'font-size':'8px','color':'red','display':'inline-block',"padding": "5px"});
	$("#emailLabel").append(txt1);
}
function showReferenceError(txt)
{
	$("#referenceLabel span").remove("span");
	$("#referenceNo").css({"outline":"none","border-color":"red"});
	var txt1=$("<span></span>").text(txt).css({'font-size':'8px','color':'red','display':'inline-block',"padding": "5px"});
	$("#referenceLabel").append(txt1);
}

function showMobError(txt)
{
	$("#mobLabel span").remove("span");
	$("#mob").css({"outline":"none","border-color":"red"});
	var txt1=$("<span></span>").text(txt).css({'font-size':'8px','color':'red','display':'inline-block',"padding": "5px"});
	$("#mobLabel").append(txt1);
}

function showPassErrorRegister(txt)
{
	$("#passLabelRegister span").remove("span");
	$("#password").css({"outline":"none","border-color":"red"});
	var txt1=$("<span></span>").text(txt).css({'font-size':'8px','color':'red','display':'inline-block',"padding": "5px"});
	$("#passLabelRegister").append(txt1);
}

function showPassErrorConfirm(txt)
{
	$("#passLabelConfirm span").remove("span");
	$("#cpassword").css({"outline":"none","border-color":"red"});
	var txt1=$("<span></span>").text(txt).css({'font-size':'8px','color':'red','display':'inline-block',"padding": "5px"});
	$("#passLabelConfirm").append(txt1);
}

function showYearError(txt)
{
	$("#yearLabel span").remove("span");
	$("#year").css({"outline":"none","border-color":"red"});
	var txt1=$("<span></span>").text(txt).css({'font-size':'8px','color':'red','display':'inline-block',"padding": "5px"});
	$("#yearLabel").append(txt1);
}


function name()
{
	var name=$("#name").val();
	$("#nameLabel span").remove("span");
	if(name=="")
	{
		valName=1;
		showNameError(" *Please input your name");
	}
	else
	{
		$("#name").css({"outline":"none","border-color":"white"});
		valName=0;
	}
}

function email()
{
	var val=$("#email").val();
	var ret=validate_email(val);
	$("#emailLabel span").remove("span");
	if(val=="")
	{
		valEmail=1;
		showEmailError(" *Enter Your email address");
	}
	else if(!ret)
	{
		valEmail=1;
		showEmailError(" *Invalid Email");
	}
	else
	{
		$("#email").css({"outline":"none","border-color":"white"});
		valEmail=0;
	}
}

function referenceNo()
{
	var val=$("#referenceNo").val();
	var re=/^\S+@/;

	$("#referenceLabel span").remove("span");
	if(val=="")
	{
		valUser=1;
		showReferenceError(" *Enter Your referenceNo");
	}
	else if(re.test(val))
	{
		valUser=1;
		showReferenceError(" *Invalid referenceNo");
	}
	else
	{
		$("#referenceNo").css({"outline":"none","border-color":"white"});
		valUser=0;
	}
}

function mob()
{
	var mob=$("#mob").val();
	var re=/^[0-9]{10}$/;
	$("#mobLabel span").remove("span");
	if(mob=="")
	{
		valMob=1;
		showMobError(" *Enter your mobile no.");
	}
	else if(!re.test(mob))
	{
		valMob=1;
		showMobError(" *Enter 10 digit mobile no.");
	}
	else
	{
		$("#mob").css({"outline":"none","border-color":"white"});
		valMob=0;
	}
}

function passwordRegister()
{
	var pass=$("#password").val();
	$("#passLabelRegister span").remove("span");
	if(pass=="")
	{
		valpassword=1;
		showPassErrorRegister(" *Enter your password");
	}
	else
	{
		$("#password").css({"outline":"none","border-color":"white"});
		valpassword=0;
	}
}

function passwordConfirm()
{
	var pass=$("#password").val();
	var cpass = $("#cpassword").val();
	$("#passLabelConfirm span").remove("span");
	if(cpass=="")
	{
		valcpassword=1;
		showPassErrorConfirm(" *Enter your confirm password");
	}
	else if(cpass!=pass)
	{
		valcpassword=1;
		showPassErrorConfirm(" *Password is not matched");
	}
	else
	{
		$("#cpassword").css({"outline":"none","border-color":"white"});
		valcpassword=0;
	}
}

function year()
{
	var year=$("#year").val();
	$("#yearLabel span").remove("span");
	if(year=="")
	{
		valyear=1;
		showYearError(" *Please input your year");
	}
	else
	{
		$("#year").css({"outline":"none","border-color":"white"});
		valyear=0;
	}

}

function validate_email(val)
{
	var re=/^\S+@\w+\.\w+$/;
	return re.test(val);
}
