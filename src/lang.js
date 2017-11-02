
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
			
			doSetMotorSpeedDirDist:		'Verfahre Motor %m.motors für %n Schritte mit %n %m.motorDirections',
			doSetMotorSpeedDirSync:		'Verfahre Motor %m.motors %m.motorDirections und %m.motors %m.motorDirections mit %n',
			doSetMotorSpeedDirDistSync:	'Verfahre Motor %m.motors %m.motorDirections und %m.motors %m.motorDirections mit %n für %n Schritte',
			
			doStopMotor:				'Stoppe Motor %m.motors',
			doStopMotorAdv:				'Stoppe Verfahren %m.motors',

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
		
		en: {
			onOpenClose: 'If %m.openCloseSensors %m.inputs %m.openClose',
			onCounter: 'If counter %m.counters %m.compares %n',
			onInput: 'If value of %m.inputSensors %m.inputs %m.compares %n',
			isClosed: 'Is %m.openCloseSensors %m.inputs closed?',
			getCounter: 'Read value of counter %m.counters',
			getSensor: 'Read value of %m.inputSensors %m.inputs',
			doPlaySound: 'Play sound %n',
			doPlaySoundWait: 'Play and maintain sound %n',
			doSetLamp: 'Set lamp %m.outputs to %n',
			doSetOutput: 'Set output %m.outputs to %n',
			doResetCounter: 'Reset counter %m.counters',
			doSetMotorSpeed: 'Set motor %m.motors to %n',
			doSetMotorSpeedDir: 'Set motor %m.motors to %n %m.motorDirections',
			doSetMotorDir: 'Set motor %m.motors to %m.motorDirections',
			doSetMotorSpeedDirDist: 'Move motor %m.motors by %n steps with %n %m.motorDirections',
			doSetMotorSpeedDirSync: 'Move motor %m.motors %m.motorDirections and %m.motors %m.motorDirections with %n ',
			doSetMotorSpeedDirDistSync: 'Move motor %m.motors %m.motorDirections and %m.motors %m.motorDirections with %n by %n steps',
			doStopMotor: 'Stop motor %m.motors',
			doStopMotorAdv: 'Stop move %m.motors',
			doConfigureInput: 'Set input %m.inputs to %m.inputModes',
			dir_forward: 'forward',
			dir_backwards: 'back',
			sens_color: 'Colour sensor',
			sens_distance: 'Distance sensor',
			sens_ntc: 'NTC resistance',
			sens_photo: 'Photo resistance',
			sens_lightBarrier: 'Light barrier',
			sens_button: 'Switch',
			sens_reed: 'Reed contact',
			openclose_opens: 'opens',
			openclose_closes: 'closes',
			mode_a5k: 'Analogue resistance',
			mode_d5k: 'Digital resistance',
			mode_a10v: 'Analogue voltage',
			mode_d10v: 'Digital voltage',
			mode_ultrasonic: 'Ultrasound',
			reset: 'reset'
		},
		
		/*
		fr: {
			onOpenClose: 'Si %m.openCloseSensors %m.inputs %m.openClose',
			onCounter: 'Si compteur %m.counters %m.compares %n',
			onInput: 'Si valeur de %m.inputSensors %m.inputs %m.compares %n',
			isClosed: '%m.openCloseSensors %m.inputs fermé?',
			getCounter: 'Si lecture de valeur de compteur %m.counters',
			getSensor: 'Si lecture de valeur %m.inputSensors %m.inputs',
			doPlaySound: 'Jouer sound %n',
			doPlaySoundWait: 'Jouer sound %n et attendre',
			doSetLamp: 'Si lumière %m.outputs mise sur %n',
			doSetOutput: 'Si sortie %m.outputs mise sur %n',
			doResetCounter: 'Si compteur %m.counters réinitialisé',
			doSetMotorSpeed: 'Si moteur %m.motors mis sur %n',
			doSetMotorSpeedDir: 'Si moteur %m.motors mis sur %n %m.motorDirections',
			doSetMotorDir: 'Si moteur %m.motors mis sur %m.motorDirections',
			doSetMotorSpeedDirDist: 'Si moteur %m.motors ajusté aux étapes %n avec %n %m.motorDirections',
			doSetMotorSpeedDirSync: 'Si moteur %m.motors ajusté avec %m.motors avec %n %m.motorDirections',
			doSetMotorSpeedDirDistSync: 'Si moteur %m.motors ajusté avec %m.motors aux étapes %n avec %n %m.motorDirections',
			doStopMotor: 'Si moteur %m.motors stoppé',
			doConfigureInput: 'Si entrée %m.inputs mise sur %m.inputModes',
			dir_forward: 'vers l‘avant',
			dir_backwards: 'vers l‘arrière',
			sens_color: 'Capteur de couleur',
			sens_distance: 'Capteur de distance',
			sens_ntc: 'Résistance NTC',
			sens_photo: 'Résistance photo',
			sens_lightBarrier: 'Barrière lumineuse',
			sens_button: 'Interrupteur',
			sens_reed: 'Contact Reed',
			openclose_opens: 'ouvre',
			openclose_closes: 'ferme',
			mode_a5k: 'Résistance analogique',
			mode_d5k: 'Résistance numérique',
			mode_a10v: 'Tension analogique',
			mode_d10v: 'Tension numérique',
			mode_ultrasonic: 'Ultrason',
			reset: 'réinitialiser'
		},
		
		es: {
			onOpenClose: 'Cuando %m.openCloseSensors %m.inputs %m.openClose',
			onCounter: 'Cuando el contador %m.counters %m.compares %n',
			onInput: 'Cuando el valor de %m.inputSensors %m.inputs %m.compares %n',
			isClosed: '¿%m.openCloseSensors %m.inputs cerrado?',
			getCounter: 'Leer el valor del contador %m.counters',
			getSensor: 'Leer el valor de %m.inputSensors %m.inputs',
			doPlaySound: 'Reproducir sonido %n',
			doPlaySoundWait: 'Reproducir sonido %n y esperar',
			doSetLamp: 'Fijar la lámpara %m.outputs a %n',
			doSetOutput: 'Fijar la salida %m.outputs a %n',
			doResetCounter: 'Reiniciar el contador %m.counters',
			doSetMotorSpeed: 'Fijar el motor %m.motors a %n',
			doSetMotorSpeedDir: 'Fijar el motor %m.motors a %n %m.motorDirections',
			doSetMotorDir: 'Fijar el motor %m.motors a %m.motorDirections',
			doSetMotorSpeedDirDist: 'Arrancar el motor %m.motors %n pasos con %n %m.motorDirections',
			doSetMotorSpeedDirSync: 'Arrancar el motor %m.motors con %m.motors con %n %m.motorDirections',
			doSetMotorSpeedDirDistSync: 'Arrancar el motor %m.motors con %m.motors %n pasos con %n %m.motorDirections',
			doStopMotor: 'Detener el motor %m.motors',
			doConfigureInput: 'Fijar la entrada %m.inputs a %m.inputModes',
			dir_forward: 'adelante',
			dir_backwards: 'atrás',
			sens_color: 'sensor de colores',
			sens_distance: 'sensor de distancia',
			sens_ntc: 'resistencia NTC',
			sens_photo: 'fotorresistencia',
			sens_lightBarrier: 'sensor fotoeléctrico',
			sens_button: 'conmutador',
			sens_reed: 'contacto magnético',
			openclose_opens: 'abre',
			openclose_closes: 'cierra',
			mode_a5k: 'resistencia analógica',
			mode_d5k: 'resistencia digital',
			mode_a10v: 'tensión analógica',
			mode_d10v: 'tensión digital',
			mode_ultrasonic: 'ultrasonido',
			reset: 'restablecer'
		},
		
		nl: {
			onOpenClose: 'Wanneer %m.openCloseSensors %m.inputs %m.openClose',
			onCounter: 'Wanneer teller %m.counters %m.compares %n',
			onInput: 'Wanneer waarde van %m.inputSensors %m.inputs %m.compares %n',
			isClosed: '%m.openCloseSensors %m.inputs gesloten?',
			getCounter: 'Lees waarde van teller %m.counters',
			getSensor: 'Lees waarde van %m.inputSensors %m.inputs',
			doPlaySound: 'Geluid %n afspelen',
			doPlaySoundWait: 'Geluid %n afspelen en wachten',
			doSetLamp: 'Stel lamp %m.outputs in op %n',
			doSetOutput: 'Stel uitgang %m.outputs in op %n',
			doResetCounter: 'Reset teller %m.counters',
			doSetMotorSpeed: 'Stel motor %m.motors in op %n',
			doSetMotorSpeedDir: 'Stel motor %m.motors in op %n %m.motorDirections',
			doSetMotorDir: 'Stel motor %m.motors in op %m.motorDirections',
			doSetMotorSpeedDirDist: 'Verplaats motor %m.motors met behulp van %n %m.motorDirections in %n stappen',
			doSetMotorSpeedDirSync: 'Verplaats motor %m.motors met %m.motors met behulp van %n %m.motorDirections',
			doSetMotorSpeedDirDistSync: 'Verplaats motor %m.motors met %m.motors met behulp van %n %m.motorDirections in %n stappen',
			doStopMotor: 'Stop motor %m.motors',
			doConfigureInput: 'Stel ingang %m.inputs in op %m.inputModes',
			dir_forward: 'vooruit',
			dir_backwards: 'achteruit',
			sens_color: 'kleurensensor',
			sens_distance: 'afstandssensor',
			sens_ntc: 'NTC-weerstand',
			sens_photo: 'fotoweerstand',
			sens_lightBarrier: 'fotocel',
			sens_button: 'schakelaar',
			sens_reed: 'Reed-contact',
			openclose_opens: 'opent',
			openclose_closes: 'sluit',
			mode_a5k: 'weerstand analoog',
			mode_d5k: 'weerstand digitaal',
			mode_a10v: 'spanning analoog',
			mode_d10v: 'spanning digitaal',
			mode_ultrasonic: 'ultrasoon',
			reset: 'resetten'
		},
		
		pt: {
			onOpenClose: 'Quando %m.openCloseSensors %m.inputs %m.openClose',
			onCounter: 'Quando o contador %m.counters %m.compares %n',
			onInput: 'Quando o valor de %m.inputSensors %m.inputs %m.compares %n',
			isClosed: '%m.openCloseSensors %m.inputs fechado?',
			getCounter: 'A ler valor do contador %m.counters',
			getSensor: 'A ler valor do %m.inputSensors %m.inputs',
			doPlaySound: 'Reproduzir som %n',
			doPlaySoundWait: 'Reproduzir som %n e aguardar',
			doSetLamp: 'A definir lâmpada %m.outputs para %n',
			doSetOutput: 'A definir saída %m.outputs para %n',
			doResetCounter: 'A repor contador %m.counters',
			doSetMotorSpeed: 'A definir motor %m.motors para %n',
			doSetMotorSpeedDir: 'A definir motor %m.motors para %n %m.motorDirections',
			doSetMotorDir: 'A definir motor %m.motors para %m.motorDirections',
			doSetMotorSpeedDirDist: 'A deslocar motor %m.motors em incrementos de %n com %n %m.motorDirections',
			doSetMotorSpeedDirSync: 'A deslocar motor %m.motors com %m.motors com %n %m.motorDirections',
			doSetMotorSpeedDirDistSync: 'A deslocar motor %m.motors com %m.motors em incrementos de %n com %n %m.motorDirections',
			doStopMotor: 'A parar motor %m.motors',
			doConfigureInput: 'A definir entrada %m.inputs para %m.inputModes',
			dir_forward: 'para a frente',
			dir_backwards: 'para trás',
			sens_color: 'Sensor de cor',
			sens_distance: 'Sensor de distância',
			sens_ntc: 'Resistência NTC',
			sens_photo: 'Fotorresistência',
			sens_lightBarrier: 'Célula fotoelétrica',
			sens_button: 'Interruptor',
			sens_reed: 'Contacto Reed',
			openclose_opens: 'abre',
			openclose_closes: 'fecha',
			mode_a5k: 'Resistência analógica',
			mode_d5k: 'Resistência digital',
			mode_a10v: 'Tensão analógica',
			mode_d10v: 'Tensão digital',
			mode_ultrasonic: 'Ultrassons',
			reset: 'repor'
		},
		
		he: {
			onOpenClose: 'אם %m.openCloseSensors %m.inputs %m.openClose',
			onCounter: 'אם ערכו של מונה %m.counters %m.compares %n',
			onInput: 'אם ערכו של %m.inputSensors %n %m.compares %m.inputs',
			isClosed: 'האם %m.openCloseSensors %m.inputs סגור',
			getCounter: 'קרא ערכו של מונה %m.counters',
			getSensor: 'קרא ערכו של %m.inputSensors %m.inputs',
			doPlaySound: 'נגן צליל %n',
			doPlaySoundWait: 'נגן צליל %n עד לסיומו',
			doSetLamp: 'קבע עוצמת נורה %m.outputs ל %n',
			doSetOutput: 'הגדר פלט %m.outputs לעוצמה %n',
			doResetCounter: 'אפס מונה %m.counters',
			doSetMotorSpeed: 'קבע מהירות מנוע %m.motors ל %n',
			doSetMotorSpeedDir: 'קבע מהירות מנוע %m.motors ל %n %m.motorDirections',
			doSetMotorDir: 'קבע כיוון מנוע %m.motors ל %m.motorDirections',
			doSetMotorSpeedDirDist: 'הזז מנוע %m.motors למרחק %n צעדים במהירות %n %m.motorDirections',
			doSetMotorSpeedDirSync: 'הזז מנועים %m.motors וגם  %m.motors במהירות %n %m.motorDirections',
			doSetMotorSpeedDirDistSync: 'הזז מנועים %m.motors וגם %m.motors למרחק %n צעדים במהירות %n %m.motorDirections',
			doStopMotor: 'עצור מנוע %m.motors',
			doConfigureInput: 'הגדר סוג קלט %m.inputs ל %m.inputModes',
			dir_forward: 'קדימה',
			dir_backwards: 'אחורה',
			sens_color: 'חיישן צבע',
			sens_distance: 'חיישן מרחק',
			sens_ntc: 'חיישן טמפרטורה',
			sens_photo: 'חיישן אור',
			sens_lightBarrier: 'מחסום אור',
			sens_button: 'מתג',
			sens_reed: 'חיישן מגנטיות',
			sens_IR: 'חיישן אינפרה-רד',
			openclose_opens: 'נפתח',
			openclose_closes: 'נסגר',
			mode_a5k: 'התנגדות אנלוגית',
			mode_d5k: 'התנגדות דיגיטלית',
			mode_a10v: 'מתח אנלוגי',
			mode_d10v: 'מתח דיגיטלי',
			mode_ultrasonic: 'אולטרהסוניק',
			reset: 'איפוס'
} 
	*/
				
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
