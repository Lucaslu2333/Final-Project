var globalName;
var globalCal;
var globalFat;
var globalChole;
var globalSodium;
var globalPro;
var globalVa;
var globalVc;

function reloadPage(){
      location.reload();
}

$(function checkInputAction() {
    $("#searchbar").bind('input propertychange', function() {
        var wordGuess = $("#searchbar").val();
        if(wordGuess === "") {
            $(".guess-word").html("");
            $('.guess-word').css({"opacity":"0","transition":"all 0.5s ease-in-out"});
        } else {
            guess.initialize(wordGuess);
        }
    })
})

var guess = {
    route: "https://api.nutritionix.com/v1_1/search/",
    key: "?results=0:20&fields=item_name,brand_name,item_id,nf_calories&appId=e8846db3&appKey=440190142e56f349fa188e54ece2446e",

    initialize(wordGuess) {
        guess.contentPush(wordGuess);
    },

    contentPush(wordGuess) {
        $.ajax ({
            url: this.route + wordGuess + this.key,
            type: 'GET',
            dataType: 'json',
            success: function(data) {
                var guess1 = (data.hits[0].fields.item_name);
                var guess2 = (data.hits[1].fields.item_name);
                var guess3 = (data.hits[2].fields.item_name);
                console.log(guess1,guess2,guess3);
                typingGuess(guess1,guess2,guess3)
            },
            error: function(data){
                console.log(data.status);
            },
        });
    }
}

var app = {
    route: "https://api.nutritionix.com/v1_1/search/",
    key: "?results=0:20&fields=nf_total_fat,nf_saturated_fat,nf_monounsaturated_fat,nf_cholesterol,nf_sodium,nf_total_carbohydrate,nf_dietary_fiber,nf_sugars,nf_protein,nf_vitamin_a_dv,nf_vitamin_c_dv,item_name,brand_name,item_id,nf_calories&appId=e8846db3&appKey=440190142e56f349fa188e54ece2446e",

    initialize(userInput,searchCheck) {
        if (searchCheck === "yes") {
            app.contentPush(userInput);
        }
    },

    contentPush(userInput) {
        console.log(userInput)
        $.ajax ({
            url: this.route + userInput + this.key,
            type: 'GET',
            dataType: 'json',
            success: function(data) {
                globalName = data.hits[0].fields.item_name;
                globalCal = data.hits[0].fields.nf_calories;
                globalFat = data.hits[0].fields.nf_total_fat;
                globalChole = data.hits[0].fields.nf_cholesterol;
                globalSodium = data.hits[0].fields.nf_sodium;
                globalPro = data.hits[0].fields.nf_protein;
                globalVa = data.hits[0].fields.nf_vitamin_a_dv;
                globalVc = data.hits[0].fields.nf_vitamin_c_dv;
                console.log(globalName,globalCal)
                dataPresent();
            },
            error: function(data){
                console.log(data.status);
            },
        });
    },
}


// Presenting data
function dataPresent() {
    $("#cal-box-ex").append(globalName);
    $("#pro-box-ex").append(globalName);
    $("#fat-box-ex").append(globalName);
};

// begin searching
if (matchMedia) {
    const mq = window.matchMedia("(max-width: 850px)");
    mq.addListener(WidthChange);
    WidthChange(mq);
    }

function WidthChange(mq) {
    if (mq.matches) {
        $("#search").click(function() {
            $(this).attr({id:"search-clicked"},{class:"search-action"});
            $(this).css({"transform":"translateX(35vw) scale(0.7,0.7)","transition":"all 0.6s ease-in-out"});
            $("#searchbar").fadeIn(1200);
            $(".hamburger-part img").css({"margin-bottom":"50px","transition":"all 1s ease-in-out","transform":"rotate(-10deg)"});
            $("#hamburger-self").css({"animation":"floating ease-in-out 3s forwards infinite"});
        });
    } else {
        $("#search").click(function() {
            $(this).attr({id:"search-clicked"},{class:"search-action"});
            $(this).css({"transform":"translateX(17vw) scale(0.8,0.8)","transition":"all 0.6s ease-in-out"});
            $("#searchbar").fadeIn(1200);
            $(".hamburger-part img").css({"margin-bottom":"50px","transition":"all 1s ease-in-out","transform":"rotate(-10deg)"});
            $("#hamburger-self").css({"animation":"floating ease-in-out 3s forwards infinite"});
        });
    }
}


// typing
function typingGuess(guess1,guess2,guess3) {
    console.log(guess1,guess2,guess3);
    $("#guess1").html(guess1);
    $("#guess2").html(guess2);
    $("#guess3").html(guess3);
};

// suggest
$('#searchbar').on('focus', function() {
    $('.guess-word').css({"opacity":"1","transition":"all 0.5s ease-in-out"});
}).on('blur', function() {
    $('.guess-word').css({"opacity":"0","transition":"all 0.5s ease-in-out"});
});

$('#guess1').on('mousedown', function(event) {
    event.preventDefault();
    $("#searchbar").val($("#guess1").text());
    searchReady(this.value);
}).on('click', '.guess-word', function() {
    $('#searchbar').val(this.textContent).blur();
});

$('#guess2').on('mousedown', function(event) {
    event.preventDefault();
    $("#searchbar").val($("#guess2").text());
    searchReady(this.value);
}).on('click', '.guess-word', function() {
    $('#searchbar').val(this.textContent).blur();
});

$('#guess3').on('mousedown', function(event) {
    event.preventDefault();
    $("#searchbar").val($("#guess3").text());
    searchReady(this.value);
}).on('click', '.guess-word', function() {
    $('#searchbar').val(this.textContent).blur();
});


// search
function searchReady() {
    $("#search-clicked").click(function() {
        console.log("clicked");
        $(".homepage").css({"transform":"translateX(-100vw)","transition":"all 2s ease-in-out"});
        $(".loading").css({"transform":"translateX(-100vw)","transition":"all 2s ease-in-out"});
        userInput = $(" #searchbar ").val();

        //app
        if (userInput !== "") {
            console.log(userInput);
            app.initialize(userInput, "yes");
        }
        
        //End loading
        setTimeout(function() {
            $(".loading").css({"transform":"translate(-100vw,-50vh)","transition":"all 2s ease-in-out"});
        }, 5200);

        setTimeout(function() {
            $(".content").css({"transform":"translateY(-100vh)","transition":"all 2s ease-in-out"});
        }, 5200);
    })
}

$('#searchbar').bind('keypress',function(){       
    if(event.keyCode == 13) {
        $(".homepage").css({"transform":"translateX(-100vw)","transition":"all 2s ease-in-out"});
        $(".loading").css({"transform":"translateX(-100vw)","transition":"all 2s ease-in-out"});
        userInput = $(" #searchbar ").val();

        //app
        if (userInput !== "") {
            console.log(userInput);
            app.initialize(userInput, "yes");
        }

        //finish loading
        setTimeout(function() {
            $(".loading").css({"transform":"translate(-100vw,-50vh)","transition":"all 2s ease-in-out"});
        }, 5200);

        //end loading
        setTimeout(function() {
            $(".content").css({"transform":"translateY(-100vh)","transition":"all 2s ease-in-out"});
        }, 5200);
    }
});

















function infoSelect(info) {
    if (info === 'cal') {
        clearPresent(1)
        infoPresent(1)
    } else if (info === 'vit') {
        clearPresent(2)
        infoPresent(2)
    } else if (info === 'pro') {
        clearPresent(3)
        infoPresent(3)
    } else if (info === 'fat') {
        clearPresent(4)
        infoPresent(4)
    } else if (info === 'oth') {
        clearPresent(5)
        infoPresent(5)
    }
};

function clearPresent(number) {
    if (number !== 1) {
        $("#cal-box").css({"background-color":"black","max-height":"0vh","transition":"max-height 0.4s ease-out"});
        $("#cal-apple-box").css({"background-color":"black","max-height":"0vh","transition":"max-height 0.4s ease-out"});
        $("#cal-box-ex").css({'opacity':'0','transition':'all 0.4s ease-in-out'});
        $("#cal-apple-box-ex").css({'opacity':'0','transition':'all 0.4s ease-in-out'})
        $("#cal-hover").css({'opacity':'0','transition':'all 0.3s ease-in-out'})
        $("#cal-hover").hide();
        $("#cal-box-in").hide();
        $("#cal-apple-box-in").hide();
    }
    if (number !== 2) {
        $("#vit-a-box").css({"background-color":"black","max-height":"0vh","transition":"max-height 0.4s ease-out"});
        $("#vit-c-box").css({"background-color":"black","max-height":"0vh","transition":"max-height 0.4s ease-out"});
        $("#vit-a-box-ex").css({'opacity':'0','transition':'all 0.4s ease-in-out'});
        $("#vit-c-box-ex").css({'opacity':'0','transition':'all 0.4s ease-in-out'})
        $("#vit-hover").css({'opacity':'0','transition':'all 0.3s ease-in-out'})
        $("#vit-hover").hide();
        $("#vit-a-box-in").hide();
        $("#vit-c-box-in").hide();
    }
    if (number !== 3) {
        $("#pro-box").css({"background-color":"black","max-height":"0vh","transition":"max-height 0.4s ease-out"});
        $("#pro-egg-box").css({"background-color":"black","max-height":"0vh","transition":"max-height 0.4s ease-out"});
        $("#pro-box-ex").css({'opacity':'0','transition':'all 0.4s ease-in-out'});
        $("#pro-egg-box-ex").css({'opacity':'0','transition':'all 0.4s ease-in-out'})
        $("#pro-hover").css({'opacity':'0','transition':'all 0.3s ease-in-out'})
        $("#pro-hover").hide();
        $("#pro-box-in").hide();
        $("#pro-egg-box-in").hide();
    }
    if (number !== 4) {
        $("#fat-box").css({"background-color":"black","max-height":"0vh","transition":"max-height 0.4s ease-out"});
        $("#fat-egg-box").css({"background-color":"black","max-height":"0vh","transition":"max-height 0.4s ease-out"});
        $("#fat-box-ex").css({'opacity':'0','transition':'all 0.4s ease-in-out'});
        $("#fat-egg-box-ex").css({'opacity':'0','transition':'all 0.4s ease-in-out'})
        $("#fat-hover").css({'opacity':'0','transition':'all 0.3s ease-in-out'})
        $("#fat-hover").hide();
        $("#fat-box-in").hide();
        $("#fat-egg-box-in").hide();
    }
    if (number !== 5) {
        $("#sod-box").css({"background-color":"black","max-height":"0vh","transition":"max-height 0.4s ease-out"});
        $("#cho-box").css({"background-color":"black","max-height":"0vh","transition":"max-height 0.4s ease-out"});
        $("#sod-box-ex").css({'opacity':'0','transition':'all 0.4s ease-in-out'});
        $("#cho-box-ex").css({'opacity':'0','transition':'all 0.4s ease-in-out'})
        $("#oth-hover").css({'opacity':'0','transition':'all 0.3s ease-in-out'})
        $("#oth-hover").hide();
        $("#sod-box-in").hide();
        $("#cho-box-in").hide();
    }
}

function infoPresent(number) {
    $("#instruction").fadeOut(300);

    if (number === 1) {
        $("#cal-box-in").show();
        $("#cal-apple-box-in").show();
        $("#cal-hover").show();
        $("#cal-box-ex").css({'opacity':'1','transition':'all 0.5s ease-in-out'});
        $("#cal-apple-box-ex").css({'opacity':'1','transition':'all 0.5s ease-in-out'})
        $("#cal-hover").css({'opacity':'1','transition':'all 0.5s ease-in-out'})
        changeCal();
        $("#cal-apple-box").css({"max-height":"100vh","transition":"max-height 3s ease-in-out"})
        $("#cal-box").css({"max-height":"100vh","transition":"max-height 3s ease-in-out"})
    } else if (number === 2) {
        $("#vit-a-box-in").show();
        $("#vit-c-box-in").show();
        $("#vit-hover").show();
        $("#vit-a-box-ex").css({'opacity':'1','transition':'all 0.5s ease-in-out'});
        $("#vit-c-box-ex").css({'opacity':'1','transition':'all 0.5s ease-in-out'})
        $("#vit-hover").css({'opacity':'1','transition':'all 0.5s ease-in-out'})
        changeVit();
        $("#vit-a-box").css({"max-height":"100vh","transition":"max-height 3s ease-in-out"})
        $("#vit-c-box").css({"max-height":"100vh","transition":"max-height 3s ease-in-out"})
    } else if (number === 3) {
        $("#pro-box-in").show();
        $("#pro-egg-box-in").show();
        $("#pro-hover").show();
        $("#pro-box-ex").css({'opacity':'1','transition':'all 0.5s ease-in-out'});
        $("#pro-egg-box-ex").css({'opacity':'1','transition':'all 0.5s ease-in-out'})
        $("#pro-hover").css({'opacity':'1','transition':'all 0.5s ease-in-out'})
        changePro();
        $("#pro-egg-box").css({"max-height":"100vh","transition":"max-height 3s ease-in-out"})
        $("#pro-box").css({"max-height":"100vh","transition":"max-height 3s ease-in-out"})
    } else if (number === 4) {
        $("#fat-box-in").show();
        $("#fat-egg-box-in").show();
        $("#fat-hover").show();
        $("#fat-box-ex").css({'opacity':'1','transition':'all 0.5s ease-in-out'});
        $("#fat-egg-box-ex").css({'opacity':'1','transition':'all 0.5s ease-in-out'})
        $("#fat-hover").css({'opacity':'1','transition':'all 0.5s ease-in-out'})
        changeFat();
        $("#fat-egg-box").css({"max-height":"100vh","transition":"max-height 3s ease-in-out"})
        $("#fat-box").css({"max-height":"100vh","transition":"max-height 3s ease-in-out"})
    } else if (number === 5) {
        $("#sod-box-in").show();
        $("#cho-box-in").show();
        $("#oth-hover").show();
        $("#sod-box-ex").css({'opacity':'1','transition':'all 0.5s ease-in-out'});
        $("#cho-box-ex").css({'opacity':'1','transition':'all 0.5s ease-in-out'})
        $("#oth-hover").css({'opacity':'1','transition':'all 0.5s ease-in-out'})
        changeOth();
        $("#sod-box").css({"max-height":"100vh","transition":"max-height 3s ease-in-out"})
        $("#cho-box").css({"max-height":"100vh","transition":"max-height 3s ease-in-out"})
    }
}

function changeCal() {
    var appleCal = 95;
    var cal= globalCal;
    let index = cal/appleCal*40;
    $("#cal-box-in").html(cal+" Cal")
    if (index < 5) {
        index = 5;
    } else if (index > 80) {
        index = 80;
    };
    if (index <=40 ) {
        $("#cal-box").css({"background-image":"linear-gradient(to top right, rgb(192, 255, 75), rgb(122, 255, 173))"})
    };
    console.log(index);
    $("#cal-box").css("height",index+"vh")
}

function changeVit() {
    var vita = globalVa;
    var vitc = globalVc;
    let indexA = vita;
    let indexC = vitc
    $("#vit-a-box-in").html(indexA+"%")
    $("#vit-c-box-in").html(indexC+"%")
    if (indexA < 5) {
        indexA = 5;
    } else if (indexA > 80) {
        indexA = 80;
    };
    if (indexC < 5) {
        indexC = 5;
    } else if (indexC > 80) {
        indexC = 80;
    };
    console.log(indexA,indexC);
    $("#vit-a-box").css({"height":indexA+"vh"})
    $("#vit-c-box").css({"height":indexC+"vh"})
}

function changePro() {
    var eggPro = 7;
    var pro = globalPro;
    let index = pro/eggPro*40;
    $("#pro-box-in").html(pro+"g")
    if (index < 5) {
        index = 5;
    } else if (index > 80) {
        index = 80;
    };

    if (index >=40 ) {
        $("#pro-box").css({"background-image":"linear-gradient(to top right, rgb(192, 255, 75), rgb(122, 255, 173))"})
    };
    console.log(index);
    $("#pro-box").css("height",index+"vh")
}

function changeFat() {
    var eggFat = 5;
    var fat = globalFat;
    let index = fat/eggFat*40;
    $("#fat-box-in").html(fat+"g")
    if (index < 5) {
        index = 5;
    } else if (index > 80) {
        index = 80;
    };

    if (index <=40 ) {
        $("#fat-box").css({"background-image":"linear-gradient(to top right, rgb(192, 255, 75), rgb(122, 255, 173))"})
    };
    console.log(index);
    $("#fat-box").css("height",index+"vh")
}

function changeOth() {
    var sod = globalSodium;
    var cho = globalChole;
    let indexS = sod/2;
    let indexC = cho/1.5;
    $("#sod-box-in").html(sod +"mg")
    $("#cho-box-in").html(cho +"mg")
    if (indexS < 5) {
        indexS = 5;
    } else if (indexS > 80) {
        indexS = 80;
    };
    if (indexC < 5) {
        indexC = 5;
    } else if (indexC > 80) {
        indexC = 80;
    };
    console.log(indexS,indexC);
    $("#sod-box").css({"height":indexS+"vh"})
    $("#cho-box").css({"height":indexC+"vh"})
}

//Cal hover info
$("#cal-box").hover(function(){
    $("#cal-box-in").css({"opacity":1,'transition':'all 0.3s ease-in-out'});
    }, function(){
    $("#cal-box-in").css({"opacity":0,'transition':'all 0.3s ease-in-out'});
});
$("#cal-apple-box").hover(function(){
    $("#cal-apple-box-in").css({"opacity":1,'transition':'all 0.3s ease-in-out'});
    }, function(){
    $("#cal-apple-box-in").css({"opacity":0,'transition':'all 0.3s ease-in-out'});
});
$("#cal-hover").hover(function(){
    $("#cal-hover-info").fadeIn(400);
    }, function(){
    $("#cal-hover-info").fadeOut(400);
});


//Vit hover info
$("#vit-a-box").hover(function(){
    $("#vit-a-box-in").css({"opacity":1,'transition':'all 0.3s ease-in-out'});
    }, function(){
    $("#vit-a-box-in").css({"opacity":0,'transition':'all 0.3s ease-in-out'});
});
$("#vit-c-box").hover(function(){
    $("#vit-c-box-in").css({"opacity":1,'transition':'all 0.3s ease-in-out'});
    }, function(){
    $("#vit-c-box-in").css({"opacity":0,'transition':'all 0.3s ease-in-out'});
});
$("#vit-hover").hover(function(){
    $("#vit-hover-info").fadeIn(400);
    }, function(){
    $("#vit-hover-info").fadeOut(400);
});

//Pro hover info
$("#pro-box").hover(function(){
    $("#pro-box-in").css({"opacity":1,'transition':'all 0.3s ease-in-out'});
    }, function(){
    $("#pro-box-in").css({"opacity":0,'transition':'all 0.3s ease-in-out'});
});
$("#pro-egg-box").hover(function(){
    $("#pro-egg-box-in").css({"opacity":1,'transition':'all 0.3s ease-in-out'});
    }, function(){
    $("#pro-egg-box-in").css({"opacity":0,'transition':'all 0.3s ease-in-out'});
});
$("#pro-hover").hover(function(){
    $("#pro-hover-info").fadeIn(400);
    }, function(){
    $("#pro-hover-info").fadeOut(400);
});

//Fat hover info
$("#fat-box").hover(function(){
    $("#fat-box-in").css({"opacity":1,'transition':'all 0.3s ease-in-out'});
    }, function(){
    $("#fat-box-in").css({"opacity":0,'transition':'all 0.3s ease-in-out'});
});
$("#fat-egg-box").hover(function(){
    $("#fat-egg-box-in").css({"opacity":1,'transition':'all 0.3s ease-in-out'});
    }, function(){
    $("#fat-egg-box-in").css({"opacity":0,'transition':'all 0.3s ease-in-out'});
});
$("#fat-hover").hover(function(){
    $("#fat-hover-info").fadeIn(400);
    }, function(){
    $("#fat-hover-info").fadeOut(400);
});

//other hover info
$("#sod-box").hover(function(){
    $("#sod-box-in").css({"opacity":1,'transition':'all 0.3s ease-in-out'});
    }, function(){
    $("#sod-box-in").css({"opacity":0,'transition':'all 0.3s ease-in-out'});
});
$("#cho-box").hover(function(){
    $("#cho-box-in").css({"opacity":1,'transition':'all 0.3s ease-in-out'});
    }, function(){
    $("#cho-box-in").css({"opacity":0,'transition':'all 0.3s ease-in-out'});
});
$("#oth-hover").hover(function(){
    $("#oth-hover-info").fadeIn(400);
    }, function(){
    $("#oth-hover-info").fadeOut(400);
});























$(document).ready(function () {

    $('.first-button').on('click', function () {
  
      $('.animated-icon1').toggleClass('open');
    });
    $('.second-button').on('click', function () {
  
      $('.animated-icon2').toggleClass('open');
    });
    $('.third-button').on('click', function () {
  
      $('.animated-icon3').toggleClass('open');
    });
  });