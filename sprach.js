// toto 2014
// ripped off from http://www.html5rocks.com/en/tutorials/webaudio/intro/

var context;
var bufferLoader;

function init() {
	try {
		// Fix up for prefixing
		window.AudioContext = window.AudioContext || window.webkitAudioContext;
		context = new AudioContext();
	} catch (e) {
		alert('Web Audio API is not supported in this browser');
	}
	bufferLoader = new BufferLoader(
		context, [
			'./sounds/0.wav',
			'./sounds/1.wav',
			'./sounds/2.wav',
			'./sounds/3.wav',
			'./sounds/4.wav',
			'./sounds/5.wav',
			'./sounds/6.wav',
			'./sounds/7.wav',
			'./sounds/8.wav',
			'./sounds/9.wav',
			'./sounds/achtung.wav',
			'./sounds/trennung.wav',
			'./sounds/ende.wav',
		],
		finishedLoading
	);
	bufferLoader.load();
}

function playSound(key, time) {
	if (key === ' ') key = 'BADBEEF';

	if (isNaN(key)) {
		if (key == '*') key = 10;
		if (key == '/') key = 11;
		if (key == '+') key = 12;
	}

	if (!isNaN(key)) {
		var source = context.createBufferSource();
		source.buffer = window.sounds[key];
		source.connect(context.destination);
		source.start ? source.start(time) : source.noteOn(time);
	}
}

function finishedLoading(returnedBuffer) {
	window.sounds = returnedBuffer;
}
window.onload = function () {
	init();
	document.forms[0].onsubmit = function (e) {
		e.preventDefault();
		sendMessage()
	};
	document.getElementById("keyboard").onkeypress = function (e) {
		e = e || event;
		key = String.fromCharCode(e.keyCode);
		playSound(key, 0);
	}
}

function sendMessage() {

	var callRepeat = 4;
	var delay = 4;
	var speed = 0.6;

	call = document.getElementById("call").value;

	for (var i = 0; i < callRepeat; i++) {

		for (var j = 0; j < call.length; j++) {
			playSound(call[j], speed * j + (delay * i));
		}

	}

	playSound(10, delay * callRepeat);

	body = document.getElementById("body").value;

	for (var k = 0; k < body.length; k++) {
		playSound(body[k], speed * k + (delay * callRepeat) + 2);
	}

	playSound(12, speed * k + (delay * callRepeat) + 3);
}