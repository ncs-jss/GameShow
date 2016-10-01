var valLogin=1;
var valPass=1;

function initLogin()
{
	login();
	passwordLogin();
}

$("#emailOrNumber").blur(function()
{
	login();
});


$("#pass").blur(function()
{
	passwordLogin();
});


function validate_email(val)
{
	var re=/^\S+@\w+\.\w+$/;
	return re.test(val);
}

$("#login").click(function() {
	var login=$("#emailOrNumber").val();
	var password=$("#pass").val();
	initLogin();
	// console.log(login);
	if(valLogin==0 && valPass==0)
	{
		var q={"login":login,"password":password};
	  	q="q="+JSON.stringify(q);
	  	// console.log(q);
	  	var xmlhttp = new XMLHttpRequest();
	  	xmlhttp.onreadystatechange = function()
	  	{
		    if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
		    {
		      	result=JSON.parse(xmlhttp.responseText);
		        if(result['location'])
		        {
		        	location.href=result['location'];
		        }
		        if(result['login'])
		        {
		        	$("#emailOrNumberLabel span").remove("span");
					showLoginError(result['login']);
		        }
		        if(result['password'])
		        {
		        	$("#passLabelLogin span").remove("span");
					showPassErrorLogin(result['password']);
		        }
		    }
	  	};
		xmlhttp.open("POST", "ajax/validate_login.php", true);
		xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xmlhttp.send(q);
	}
	else
	{
		// alert("Enter correct details");
		$("#myModal").modal()

	}
});

function showLoginError(txt)
{
	$("#emailOrNumberLabel span").remove('span');
	$("#emailOrNumber").css({"outline":"none","border-color":"red"});
	var txt1=$("<span></span>").text(txt).css({'font-size':'8px','color':'red','display':'inline-block',"padding": "5px"});
	$("#emailOrNumberLabel").append(txt1);
}

function showPassErrorLogin(txt)
{
	$("#passLoginLabel span").remove('span');
	$("#pass").css({"outline":"none","border-color":"red"});
	var txt1=$("<span></span>").text(txt).css({'font-size':'8px','color':'red','display':'inline-block',"padding": "5px"});
	$("#passLoginLabel").append(txt1);
}

function login()
{
	var re=/^[0-9]{10}$/;
	var mo = /^[0-9]+$/;
	var val=$("#emailOrNumber").val();
	$("#emailOrNumberLabel span").remove("span");
	// console.log(val);
	if(val=="")
	{
		valLogin=1;
		showLoginError(" *Enter email or mobile No.");
	}
	else if(!re.test(val))
	{
		var ret=validate_email(val);

		if(mo.test(val))
			showLoginError(" *Invalid Mobile");
		else if(!ret)
		{
			valLogin=1;
			showLoginError(" *Invalid Email");
		}
		else
		{
			$("#emailOrNumber").css({"outline":"none","border-color":"white"});
			valLogin=0;
		}
	}
	else
	{
		$("#emailOrNumber").css({"outline":"none","border-color":"white"});
		valLogin=0;
	}
}

function passwordLogin()
{
	var val=$("#pass").val();
	$("#passLoginLabel span").remove("span");
	if(val=="")
	{
		valLogin=1;
		showPassErrorLogin(" *Enter Password");
	}
	else
	{
		$("#pass").css({"outline":"none","border-color":"white"});
		valPass=0;
	}
}