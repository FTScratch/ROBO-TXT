
function getButtonState(state) {
	return Lang.get(state);
}

function getLightBarrierState(state) {
	return Lang.get(state);
}


var Lang = {
	
	// browser's language code
	langCode: (navigator.language || navigator.userLanguage).substr(0,2),
	
	trans: {
		
		// german translation
		de: {
			
			onOpenClose:				'Wenn %m.openCloseSensors %m.inputs %m.openClose',
			onCounter:					'Wenn Zähler %m.counters %m.compares %n',
			onInput:					'Wenn Wert von %m.inputSensors %m.inputs %m.compares %n',

			isClosed:					'%m.openCloseSensors %m.inputs geschlossen?',
			getCounter:					'Lese Wert von Zähler %m.counters',
			getSensor:					'Lese Wert von %m.inputSensors %m.inputs',
			
			doPlaySound:				'Sound %n abspielen',
			doPlaySoundWait:			'Sound %n abspielen und warten',
			
			doSetLamp:					'Setze Lampe %m.outputs auf %n',
			doSetOutput:				'Setze Ausgang %m.outputs auf %n',
			doResetCounter:				'Setze Zähler %m.counters zurück',
			
			doSetMotorSpeed:			'Setze Motor %m.motors auf %n',
			doSetMotorSpeedDir:			'Setze Motor %m.motors auf %n %m.motorDirections',
			doSetMotorDir:				'Setze Motor %m.motors auf %m.motorDirections',
			doSetMotorSpeedDirDist:		'Verfahre Motor %m.motors um %n Schritte mit %n %m.motorDirections',
			doSetMotorSpeedDirSync:		'Verfahre Motor %m.motors mit %m.motors mit %n %m.motorDirections',
			doSetMotorSpeedDirDistSync:	'Verfahre Motor %m.motors mit %m.motors um %n Schritte mit %n %m.motorDirections',
			
			doStopMotor:				'Stoppe Motor %m.motors',
			
			doConfigureInput:			'Setze Eingang %m.inputs auf %m.inputModes',
			
			dir_forward:				'vorwärts',
			dir_backwards:				'rückwärts',
			
			sens_color:					'Farbsensor',
			sens_distance:				'Abstandssensor',
			sens_ntc:					'NTC-Widerstand',
			sens_photo:					'Fotowiderstand',
			sens_lightBarrier:			'Lichtschranke',
			sens_button:				'Schalter',
			sens_reed:					'Reed-Kontakt',
			
			openclose_opens:			'öffnet',
			openclose_closes:			'schließt',
			
			mode_a5k:					'Widerstand analog',
			mode_d5k:					'Widerstand digital',
			mode_a10v:					'Spannung analog',
			mode_d10v:					'Spannung digital',
			mode_ultrasonic:			'Ultraschall',
			
			reset:						'zurücksetzen',

		},
				
	},	
	
	// get a translated version for the given constant
	get: function(what) {
		var codes = this.trans[this.langCode];		// requested language
		if (!codes) { codes = this.trans['en']; }	// fallback
		return codes[what];
	},
	
	getSensor: function(name) {
		return this.get('sens_' + name);
	},
	
	getMotorDir: function(dir) {
		return this.get('dir_' + dir);
	},
	
	getOpenClose: function(dir) {
		return this.get('openclose_' + dir);
	},
	
	getMode: function(mode) {
		return this.get('mode_' + mode);
	}
	
};
