var keyboard = new Keyboard();
var krSpeech = new SpeechSynthesisUtterance();
krSpeech.lang = "ko-KR";

var hangulNames = {
	ㄱ: "기역",
	ㄴ: "니은",
	ㄷ: "디근",
	ㄹ: "리을",
	ㅁ: "미음",
	ㅂ: "비읍",
	ㅅ: "시옷",
	ㅇ: "이응",
	ㅈ: "지읒",
	ㅊ: "치읓",
	ㅋ: "키읔",
	ㅌ: "티읕",
	ㅍ: "피읖",
	ㅎ: "히읗"
};

function speak(word){
	var a = [
		"가구",
		"노란",
		"도장",
		"시골",
		"반찬",
		"어름",
		"전차",
		"아침",
		"저녁",
		"병원",
		"골목",
		"라면",
		"만두",
		"안경",
		"파전",
		"향기",
		"달력",
		"신문",
		"감자",
		"풍속"
	]
	word = a[Math.round(19*Math.random())];
	$("#deletethis").text(word);
	krSpeech.text = word;
	//$("#speaker").toggleClass("stop-icon");
	$("#textbox").val('');
	$("#textbox").focus();
	window.speechSynthesis.speak(krSpeech);
	window.speechSynthesis.speak(krSpeech);
	window.speechSynthesis.speak(krSpeech);
};

function Keyboard(){
	var keys = {
		65: "ㅁ", 66: "ㅠ", 67: "ㅊ", 68: "ㅇ", 69: "ㄸ", 70: "ㄹ", 71: "ㅎ",
		72: "ㅗ", 73: "ㅑ", 74: "ㅓ", 75: "ㅏ", 76: "ㅣ", 77: "ㅡ", 78: "ㅜ",
		79: "ㅒ", 80: "ㅖ", 81: "ㅃ", 82: "ㄲ", 83: "ㄴ", 84: "ㅆ", 85: "ㅕ",
		86: "ㅍ", 87: "ㅉ", 88: "ㅌ", 89: "ㅛ", 90: "ㅋ", 97: "ㅁ", 98: "ㅠ",
		99: "ㅊ", 100: "ㅇ", 101: "ㄷ", 102: "ㄹ", 103: "ㅎ", 104: "ㅗ",
		105: "ㅑ", 106: "ㅓ", 107: "ㅏ", 108: "ㅣ", 109: "ㅡ", 110: "ㅜ",
		111: "ㅐ", 112: "ㅔ", 113: "ㅂ", 114: "ㄱ", 115: "ㄴ",116: "ㅅ",
		117: "ㅕ", 118: "ㅍ", 119: "ㅈ", 120: "ㅌ", 121: "ㅛ", 122: "ㅋ"
	};

	var initial = {
		ㄱ: 0, ㄲ: 1, ㄴ: 2, ㄷ: 3, ㄸ: 4, ㄹ: 5, ㅁ: 6, ㅂ: 7, ㅃ: 8, ㅅ: 9,
		ㅆ: 10, ㅇ: 11, ㅈ: 12, ㅉ: 13, ㅊ: 14, ㅋ: 15, ㅌ: 16, ㅍ: 17, ㅎ: 18
	};

	var medial = {
		ㅏ: 0, ㅐ: 1, ㅑ: 2, ㅒ: 3, ㅓ: 4, ㅔ: 5, ㅕ: 6, ㅖ: 7, ㅗ: 8, ㅗㅏ: 9,
		ㅗㅐ: 10, ㅗㅣ: 11, ㅛ: 12, ㅜ: 13, ㅜㅓ: 14, ㅜㅔ: 15, ㅜㅣ: 16, ㅠ: 17,
		ㅡ: 18, ㅡㅣ: 19, ㅣ: 20
	};

	var final = {
		ㄱ: 1, ㄲ: 2, ㄱㅅ: 3, ㄴ: 4, ㄴㅈ: 5, ㄴㅎ: 6, ㄷ: 7, ㄹ: 8, ㄹㄱ: 9,
		ㄹㅁ: 10, ㄹㅂ: 11, ㄹㅅ: 12, ㄹㅌ: 13, ㄹㅍ: 14, ㄹㅎ: 15, ㅁ: 16,
		ㅂ: 17, ㅂㅅ: 18, ㅅ: 19, ㅆ: 20, ㅇ: 21, ㅈ: 22, ㅊ: 23, ㅋ: 24,
		ㅌ: 25, ㅍ: 26, ㅎ: 27
	};

	var stack = [];

	this.getSyllable = (stack) => {
		if (stack.length <= 1){
			return "";
		}
		var i = stack[0],
		    m = this.isHangul(stack[1]+stack[2]) == 0 ?  
		    	stack[1]+stack[2] : 
		    	stack[1],
		    f = this.isHangul(stack[stack.length-2]+
		    	stack[stack.length-1]) == 1 ?
		    	stack[stack.length-2]+
		    	stack[stack.length-1] :
		    	stack[stack.length-1];
		return String.fromCharCode(
			(initial[i]*588) + (medial[m]*28) + (final[f]||0) + 44032);
	};

	this.getKey = function(keyCode){
		return keys.hasOwnProperty(keyCode) ? 
		       keys[keyCode] : String.fromCharCode(keyCode);
	};

	this.clearStack = function(){
		stack.length = 0;
	};

	this.isHangul = function(c, isInitial=false){
		var isVowel = medial.hasOwnProperty(c);
		var isConsonant = isInitial ? initial.hasOwnProperty(c) : final.hasOwnProperty(c);
		if (isVowel){return 0;}
		else if (isConsonant){return 1;}
		else {return -1}
	};

	this.push = c => {
		var isHangul = this.isHangul(c,isInitial=true);

		if (isHangul == -1){
			stack.length = 0;
			return;
		}

		var clearStack = (c, isHangul) => {
			if (isHangul == 0){
				var last = stack[stack.length-1]
				if (this.isHangul(last, isInitial=true) == 1){
					stack.length = 0;
					stack.push(last);
					stack.push(c);
				} else
					stack.length = 0;
			} else{
				stack.length = 0;
				if (isHangul == 1)
					stack.push(c);
			}
		}

		switch (stack.length){
			case 0:
				if (isHangul == 1)
					stack.push(c);
				break;
			case 1:
				if (isHangul == 0)
					stack.push(c);
				else
					clearStack(c, isHangul);
				break;
			case 2:
				if (this.isHangul(c) == 1 || this.isHangul(stack[1]+c) == 0)
					stack.push(c);
				else
					clearStack(c, isHangul);
				break;
			case 3:
				isHangulDouble = this.isHangul(stack[2]+c);
				if ((this.isHangul(stack[2]) == 0 && this.isHangul(c) == 1) || isHangulDouble == 1)
					stack.push(c);
				else
					clearStack(c, isHangul);
				break;
			case 4:
				if (this.isHangul(stack[3]+c) == 1)
					stack.push(c);
				else
					clearStack(c, isHangul);
				break;
			default:
				clearStack(c, isHangul);
		}
	};

	this.pop = ()=>{
		return stack.pop();
	}

	this.toggleLayout = () => {
		this.isKoreanLayout = !this.isKoreanLayout;
	};

	this.isKoreanLayout = true;

	this.stack = function(){
		return stack;
	}
	this.isEmpty = function(){
		return stack.length == 0;
	}
}

function typeKey(event){
	if (keyboard.isKoreanLayout){
		var char = keyboard.getKey(event.which);

		var hanArr1 = keyboard.stack().slice();
		keyboard.push(char);
		var hanArr2 = keyboard.stack();

		var hangul = hanArr1.slice(0,hanArr1.length-1);

		hangul = hangul.concat(hanArr2).join("") == hanArr1.concat(hanArr2[hanArr2.length-1]).join("") ? 
				 keyboard.getSyllable(hangul)+keyboard.getSyllable(hanArr2) : 
				 keyboard.getSyllable(hanArr2);

		var textarea = $("#textbox"),
			val = textarea[0].value,
		    start = textarea[0].selectionStart,
		    end = textarea[0].selectionEnd;

		textarea.val(val.substring(0,start-(1*!!keyboard.getSyllable(hanArr2))) +
			         (hangul||char) +
			         val.substring(end,val.length));

		textarea[0].selectionStart = start+1;
		textarea[0].selectionEnd = start+1;
		event.preventDefault();
	}
};

function backspace(event){
	keyboard.pop();

	var textarea = $("#textbox"),
			val = textarea[0].value,
		    start = textarea[0].selectionStart,
		    end = textarea[0].selectionEnd;

    var hangul = keyboard.stack();
    hangul = hangul.length == 1 ? 
    		 hangul[0] :
    		 keyboard.getSyllable(hangul);

	textarea.val(val.substring(0,start) +
		         hangul +
		         val.substring(end,val.length));

	event.preventDefault();
};


$("#textbox").keypress(function(e){
	typeKey(e);

	var a = $("#deletethis").text();
		if (this.value.startsWith(a)){
			window.speechSynthesis.speak(new SpeechSynthesisUtterance("correct!"));
			return;
		}
});

$("#textbox").keyup(function(e){
	if (e.which == 8)
		backspace(e);
	else if ((e.which < 65 || e.which > 90) && e.which != 16){
		keyboard.clearStack();}
});

$("input, textarea").bind("click focus", function(e){
	keyboard.clearStack();
});

$(".keyboard").click(function(e){
	e.preventDefault();
	$("#textbox").focus();
});

/*
$(".key").mousedown(function (e){
	e.which = /k_(\d+)/.exec(this.id)[1];
	typeKey(e);
});
*/


$("body").keydown(function(e){
	$("#k_"+e.which).addClass("key-active");
});


$("body").keyup(function(e){
	$("#k_"+e.which).removeClass("key-active");
});


$(".minimize").click(function(){
	$(".keyboard").toggleClass("minimize");
});
