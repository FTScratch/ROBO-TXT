
(function(ext) {
	
	// the current sensor values from the device
	ext.currentValues = null;
	
	// the previous values from the device (for change detection)
	ext.oldValues = null;
		
	// Cleanup function when the extension is unloaded
	ext._shutdown = function() {
		connection.close();
	};
	
	// Status reporting code
	// Use this to report missing hardware, plugin or unsupported browser
	ext._getStatus = function() {
    try {
		  connection.ping();
    } catch (err) {
      ;    // not yet connected. no problem
    }
		return connection.status;
	};
	
	// reset the device
	ext.reset = function() {
		connection.reset();
		ext.output.init();
	};
	
	
	// describes one motor (speed, direction, distance, sync)
	function Motor() {
		this.mod = false;		// motor was changed?
		this.speed = 0;
		this.dir = 1;			// -1 (back), 0 (stop), 1 (forward)
		this.sync = -10;		// -10 = no change, -1 = no-sync, [0-3] = sync with M1-M4
		this.dist = -10;		// -10 = no change, 0 = no distance limit, >0 = distance limit
		this.modified =			function() {this.mod = true;}
		this.transmitted =		function() {this.mod = false; this.sync = -10; this.dist = -10;}
		this.init =				function() {this.speed = 0; this.dir = 1; this.sync = -10; this.dist = -10;}
	};
	
	// describes one output (value)
	function Output() {
		this.mod = false;		// output was changed?
		this.val = 0;
		this.modified =			function() {this.mod = true;}
		this.transmitted =		function() {this.mod = false;}
		this.init = 			function() {this.val = 0;}
	};
	
	// describes one input-configuration (mode)
	function Input() {
		this.mod = false;		// input was changed?
		this.mode = -1;			// start with "unknown"
		this.setMode = function(newMode) {
			var changed = this.mode != newMode;
			this.mode = newMode;
			if (changed) {this.mod = true;}
			//console.log(this.mode + ":" + newMode + ":" + changed + " - " + this.mod);
		}
		this.transmitted = 	function() {this.mod = false;}
		this.init =			function() {this.mode = -1;}
	};
	
	// describes one counter-configuration
	function Counter() {
		this.mod = false;
		this.rst = false;
		this.doReset =		function() {this.rst = true; this.mod = true;}
		this.transmitted =	function() {this.mod = false;}
		this.init =			function() {this.rst = false;}
	}
	
	Motor.prototype.toString = function motorToString() {
		return "speed: " + this.speed + " dir: " + this.dir + " sync:" + this.syncWith + " dist:" + this.distance;
	};
	
	// describes the current state
	ext.output = {
		
		// outgoing state
		motors:		[new Motor(), new Motor(), new Motor(), new Motor()],
		outputs:	[new Output(), new Output(), new Output(), new Output(), new Output(), new Output(), new Output(), new Output()],
		inputs:		[new Input(), new Input(), new Input(), new Input(), new Input(), new Input(), new Input(), new Input()],
		counters:	[new Counter(), new Counter(), new Counter(), new Counter()],
		
		// mark the outgoing state as "transmitted"
		transmitted: function() {
			for (var i = 0; i < 4; ++i) {this.motors[i].transmitted();}
			for (var i = 0; i < 8; ++i) {this.outputs[i].transmitted();}
			for (var i = 0; i < 8; ++i) {this.inputs[i].transmitted();}
			for (var i = 0; i < 4; ++i) {this.counters[i].transmitted();}
		},
		
		needsUpdate: function() {
			var needsUpdate = false;
			for (var i = 0; i < 4; ++i) {needsUpdate |= this.motors[i].mod;}
			for (var i = 0; i < 8; ++i) {needsUpdate |= this.outputs[i].mod;}
			for (var i = 0; i < 8; ++i) {needsUpdate |= this.inputs[i].mod;}
			for (var i = 0; i < 4; ++i) {needsUpdate |= this.counters[i].mod;}
			return needsUpdate;
		},
		
		// reset to initial state
		init: function() {
			for (var i = 0; i < 4; ++i) {this.motors[i].init();}
			for (var i = 0; i < 8; ++i) {this.outputs[i].init();}
			for (var i = 0; i < 8; ++i) {this.inputs[i].init();}
			for (var i = 0; i < 4; ++i) {this.counters[i].init();}
		},
		
	};
	
	// received state
	ext.input = {
		curValues:	{},
		oldValues:	{},
	}
	
	// convert Output name to array index: '04' -> 3
	ext._outputNameToIdx = function(outputName) {
		return outputName[1] - 1;
	};
	
	// convert Input name to array index: 'I4' -> 3
	ext._inputNameToIdx = function(inputName) {
		return inputName[1] - 1;
	};
	
	// convert Motor name to array index: 'M4' -> 3
	ext._motorNameToIdx = function(motorName) {
		return motorName[1] - 1;
	};
	
	// convert counter-name to array index: 'C4' -> 3
	ext._counterNameToIdx = function(counterName) {
		return counterName[1] - 1;
	};
	
	// convert direction-name to value 'backward' -> -100
	ext._dirNameToValue = function(dirName) {
		if (dirName == Lang.getMotorDir('forward'))		{return +1;}
		if (dirName == Lang.getMotorDir('backwards'))	{return -1;}
	};
	
	// convert input-mode to value 'd10v' -> 0
	ext._inputModeToIdx = function(inputMode) {
		//console.log(inputMode);
		if (inputMode == Lang.getMode('d10v'))			{return 0;}
		if (inputMode == Lang.getMode('d5k'))			{return 1;}
		if (inputMode == Lang.getMode('a10v'))			{return 2;}
		if (inputMode == Lang.getMode('a5k'))			{return 3;}
		if (inputMode == Lang.getMode('ultrasonic'))	{return 4;}
		console.log("err");
	};
	
	
	// set the given Output 'Ox' to the provided value [0:8];
	ext._setOutput08 = function(outputName, value) {
		var idx = ext._outputNameToIdx(outputName);
		var val = value * 100 / 8;						// [0:8] -> [0:100];
		ext.output.outputs[idx].val = Math.round(val);	// ensure integer
		ext.output.outputs[idx].modified();
		//alert("set output " + val);
	};
	
	// set the given Motor 'Mx' speed [0:8]
	ext._setMotorSpeed08 = function(motorName, speed) {
		var idx = ext._motorNameToIdx(motorName);
		var val = speed * 100 / 8;						// [0:8] -> [0:100];
		ext.output.motors[idx].speed = Math.round(val);	// ensure integer
		ext.output.motors[idx].modified();
	};
	
	// set the given Motor 'Mx' direction
	ext._setMotorDir = function(motorName, dirName) {
		var idx = ext._motorNameToIdx(motorName);
		var dir = ext._dirNameToValue(dirName);
		ext.output.motors[idx].dir = dir;
		ext.output.motors[idx].modified();
	};
	
	// set the given Motor 'Mx' number of steps
	ext._setMotorDist = function(motorName, steps) {
		var idx = ext._motorNameToIdx(motorName);
		ext.output.motors[idx].dist = steps;
		ext.output.motors[idx].modified();
	};
	
	// let motor2 run in sync with motor1
	ext._setMotorSync = function(motor1Name, motor2Name) {
		var idx1 = ext._motorNameToIdx(motor1Name);
		var idx2 = ext._motorNameToIdx(motor2Name);
		ext.output.motors[idx1].sync = idx2;
		ext.output.motors[idx1].modified();
	};
	
	// let the given motor run unsynced
	ext._setMotorSyncNone = function(motorName) {
		var idx = ext._motorNameToIdx(motorName);
		ext.output.motors[idx].sync = -1;
		ext.output.motors[idx].modified();
	};
	
	// set the given Input's mode: 0=DIGITAL_10V, 1=DIGITAL_5KOHM, 2=ANALOG_10V, 3=ANALOG_5KOHM, 4=ULTRASONIC
	ext._setSensorMode = function(inputName, mode) {
		var idx = ext._inputNameToIdx(inputName);
		ext.output.inputs[idx].setMode(mode);
		//console.log("set input " + inputName + " to " + mode);
	};
	
	// set the given input's mode according to the given type
	ext._adjustInputModeAnalog = function(inputName, sensorType) {
		//console.log("configuring " + inputName + " for analog " + sensorType);
		if		(sensorType === Lang.getSensor('color'))		{ext._setSensorMode(inputName, 2);}		// ANALOG_10V
		else if	(sensorType === Lang.getSensor('distance'))		{ext._setSensorMode(inputName, 4);}		// ultrasonic
		else if	(sensorType === Lang.getSensor('ntc'))			{ext._setSensorMode(inputName, 3);}		// ANALOG_5K
		else if	(sensorType === Lang.getSensor('photo'))		{ext._setSensorMode(inputName, 3);}		// ANALOG_5K
		else													{alert("unsupported sensor type");}
	};
	
	// set the given input's mode according to the given type
	ext._adjustInputModeDigital = function(inputName, sensorType) {
		//console.log("configuring " + inputName + " for digital " + sensorType);
		if		(sensorType === Lang.getSensor('button'))		{ext._setSensorMode(inputName, 1);}		// DIGITAL_5KOHM
		else if	(sensorType === Lang.getSensor('reed'))			{ext._setSensorMode(inputName, 1);}		// DIGITAL_5KOHM
		else if	(sensorType === Lang.getSensor('lightBarrier'))	{ext._setSensorMode(inputName, 1);}		// DIGITAL_5KOHM
		else													{alert("unsupported sensor type");}
	};
		
	

	ext.updateIfNeeded = function() {
		if (ext.output.needsUpdate()) {
			connection.send("ACTU", ext.output);
			ext.output.transmitted();
		}
	};
		
	
	
	/** commands */
	
	

	/** play the given sound */
	ext.doPlaySound = function(sndIdx) {
		connection.playSound(sndIdx);
	};
	
	/** play the given sound and call the callback as soon as it finished */
	ext.doPlaySoundWait = function(sndIdx, callback) {
		connection.playSound(sndIdx);
		var id = window.setInterval(function() {
			if (!ext.input.curValues.isPlaying) {
				window.clearInterval(id);
				callback();
			}			
		}, 200);
	};
	
	/** set the lamp at the given output to the provided value [0:8] */
	ext.doSetLamp = function(outputName, value) {
		ext._setOutput08(outputName, value);
		ext.updateIfNeeded();
	};
	
	/** set the given Output 'Ox' to the provided value [0:8] */
	ext.doSetOutput = function(outputName, value) {
		ext._setOutput08(outputName, value);
		ext.updateIfNeeded();
	};
	
	
	/** adjust the given motor's speed */
	ext.doSetMotorSpeed = function(motorName, value) {
		ext._setMotorSpeed08(motorName, value);
		ext.updateIfNeeded();
	};
	
	/** adjust the given motor's direction */
	ext.doSetMotorDir = function(motorName, dirName) {
		ext._setMotorDir(motorName, dirName);
		ext.updateIfNeeded();
	};
	
	
	/** adjust the given motor's speed and direction */
	ext.doSetMotorSpeedDir = function(motorName, value, dirName) {
		ext._setMotorDir(motorName, dirName);
		ext._setMotorSpeed08(motorName, value);
		ext.updateIfNeeded();
	};
	
	/** let the given motor move "steps" steps into the given direction with the provided speed */
	ext.doSetMotorSpeedDirDist = function(motorName, steps, value, dirName) {
		// do NOT change sync-constraint
		ext._setMotorDist(motorName, steps);
		ext._setMotorDir(motorName, dirName);
		ext._setMotorSpeed08(motorName, value);
		ext.updateIfNeeded();
	};
	
	/** synchronize the two given motors */
	ext.doSetMotorSpeedDirSync = function(motor1Name, motor2Name, value, dirName) {
		// do NOT chang distance-limit
		ext._setMotorSync(motor1Name, motor2Name);
		ext._setMotorDir(motor1Name, dirName);
		ext._setMotorDir(motor2Name, dirName);
		ext._setMotorSpeed08(motor1Name, value);
		ext._setMotorSpeed08(motor2Name, value);
		ext.updateIfNeeded();
	};
	
	/** synchronize the two given motors with distance */
	ext.doSetMotorSpeedDirDistSync = function(motor1Name, motor2Name, steps, value, dirName) {
		ext._setMotorSync(motor1Name, motor2Name);
		ext._setMotorDist(motor1Name, steps);
		ext._setMotorDist(motor2Name, steps);
		ext._setMotorDir(motor1Name, dirName);
		ext._setMotorDir(motor2Name, dirName);
		ext._setMotorSpeed08(motor1Name, value);
		ext._setMotorSpeed08(motor2Name, value);
		ext.updateIfNeeded();
	};
	
		
	/** stop the given motor [remove distance and sync constraints] */
	ext.doStopMotor = function(motorName) {
		ext._setMotorSpeed08(motorName, 0);		// set speed to 0
		ext._setMotorDist(motorName, 0);		// remove distance limits
		ext._setMotorSyncNone(motorName);		// remove sync constraints
		ext.updateIfNeeded();
	};
	
	/** reset the given counter to zero */
	ext.doResetCounter = function(counterName) {
		var idx = ext._counterNameToIdx(counterName);
		ext.output.counters[idx].doReset();
		ext.updateIfNeeded();
	};
	
	/** expert config: input -> mode */
	ext.doConfigureInput = function(inputName, inputMode) {
		var idx = ext._inputModeToIdx(inputMode);
		ext._setSensorMode(inputName, idx);
		ext.updateIfNeeded();
	};
	
	
	
	
	
	
	
	
	
	/** get the given counter's current value */
	ext.getCounter = function(counterName) {
		var idx = ext._counterNameToIdx(counterName);
		return ext.input.curValues.counters[idx];
	};
	
	/** get the current value for the given sensor-type connected to the provided input */
	ext.getSensor = function(sensorType, inputName) {
		
		// ensure correct (analog) working mode
		ext._adjustInputModeAnalog(inputName, sensorType);
		ext.updateIfNeeded();
		
		// get value
		var idx = ext._inputNameToIdx(inputName);
		return ext.input.curValues.inputs[idx];
		
	};
	
	/** button/lightBarrier/reed is closed */
	ext.isClosed = function(sensorType, inputName) {
		
		// ensure inputName uses the correct configuration
		ext._adjustInputModeDigital(inputName, sensorType);
		ext.updateIfNeeded();
		
		// fetch
		var idx = ext._inputNameToIdx(inputName);
		return ext.input.curValues.inputs[idx] === 1;		// TODO light barrier?
		
	};
	
	
	/** sensor X on input 'Ix' >,<,= value */
	ext.onInput = function(sensorType, inputName, operator, value) {
				
		// ensure correct working mode
		ext._adjustInputModeAnalog(inputName, sensorType);
		ext.updateIfNeeded();
		
		// get index
		var idx = ext._inputNameToIdx(inputName);
			
		// compare
		if (operator === '>') {
			return !(ext.input.oldValues.inputs[idx]  >  value) && (ext.input.curValues.inputs[idx]  >  value);
		} else if (operator === '<') {
			return !(ext.input.oldValues.inputs[idx]  <  value) && (ext.input.curValues.inputs[idx]  <  value);
		} else if (operator === '=') {
			return !(ext.input.oldValues.inputs[idx] === value) && (ext.input.curValues.inputs[idx] === value);
		}
		
	};
	
	/** button/light-barrier/reed opens/closes */
	ext.onOpenClose = function(sensorType, inputName, direction) {
		
		// TODO: if schalter/reed/lichtschranke all need DIGITAL_5KOHM and have the same direction effect
		// then there is no need to distinguish between those three sensor types!
		
		// ensure inputName uses the correct configuration
		//ext._setSensorMode(inputName, 1);		// DIGITAL_5KOHM
		ext._adjustInputModeDigital(inputName, sensorType);
		ext.updateIfNeeded();
		
		// check both directions
		var idx = ext._inputNameToIdx(inputName);
		if (direction === Lang.getOpenClose('opens')) {
			return ext.input.oldValues.inputs[idx] === 1 && ext.input.curValues.inputs[idx] === 0;	// TODO light barrier?
		} else if (direction === Lang.getOpenClose('closes')) {
			return ext.input.oldValues.inputs[idx] === 0 && ext.input.curValues.inputs[idx] === 1;	// TODO light barrier?
		} else {
			alert('invalid open/close mode');
		}
		
	};
	
	
	/** counter 'Cx' >,<,= value */
	ext.onCounter = function(counterName, operator, value) {
		
		var idx = ext._counterNameToIdx(counterName);
		if (operator === '>') {
			return !(ext.input.oldValues.counters[idx]  >  value) && (ext.input.curValues.counters[idx]  >  value);
		} else if (operator === '<') {
			return !(ext.input.oldValues.counters[idx]  <  value) && (ext.input.curValues.counters[idx]  <  value);
		} else if (operator === '=') {
			return !(ext.input.oldValues.counters[idx] === value) && (ext.input.curValues.counters[idx] === value);
		} else {
			alert('invalid operator');
		}
		
	};
	
	


	
	// Block and block menu descriptions
	var descriptor = {
		
		blocks: [
			
			// events
			['h', Lang.get('onOpenClose'),					'onOpenClose',					Lang.getSensor('button'), 'I1', Lang.getOpenClose('opens')],
			['h', Lang.get('onCounter'),					'onCounter',					'C1', '>', 0],
			['h', Lang.get('onInput'),						'onInput',						Lang.getSensor('color'), 'I1', '>', 0],
				
			// gets
			['r', Lang.get('getCounter'),					'getCounter',					'C1'],
			['r', Lang.get('getSensor'),					'getSensor',					Lang.getSensor('color'), 'I1'],
			
			['b', Lang.get('isClosed'),						'isClosed',						Lang.getSensor('button'), 'I1'],
			
			
			// sets
			[' ', Lang.get('doPlaySound'),					'doPlaySound',					1],
			['w', Lang.get('doPlaySoundWait'),				'doPlaySoundWait',				1],
			
			[' ', Lang.get('doSetLamp'),					'doSetLamp',					'O1', 0],
			[' ', Lang.get('doSetOutput'),					'doSetOutput',					'O1', 0],
			[' ', Lang.get('doResetCounter'),				'doResetCounter',				'C1'],
			
			[' ', Lang.get('doSetMotorSpeed'),				'doSetMotorSpeed',				'M1', 8],
			[' ', Lang.get('doSetMotorSpeedDir'),			'doSetMotorSpeedDir',			'M1', 8, Lang.getMotorDir('forward')],			
			[' ', Lang.get('doSetMotorDir'),				'doSetMotorDir',				'M1', Lang.getMotorDir('forward')],
			[' ', Lang.get('doSetMotorSpeedDirDist'),		'doSetMotorSpeedDirDist',		'M1', 100, 8, Lang.getMotorDir('forward')],
			[' ', Lang.get('doSetMotorSpeedDirSync'),		'doSetMotorSpeedDirSync',		'M1', 'M2', 8, Lang.getMotorDir('forward')],
			[' ', Lang.get('doSetMotorSpeedDirDistSync'),	'doSetMotorSpeedDirDistSync',	'M1', 'M2', 100, 8, Lang.getMotorDir('forward')],
			
			[' ', Lang.get('doStopMotor'),					'doStopMotor',					'M1'],

			[' ', Lang.get('doConfigureInput'),				'doConfigureInput',				'I1', Lang.getMode('d10v')],

			
			[' ', Lang.get('reset'),						'reset'],
			
		],
		
		menus: {
			
			compares:			['<', '>'],
			
			inputSensors:		[Lang.getSensor('color'), Lang.getSensor('distance'), Lang.getSensor('ntc'), Lang.getSensor('photo')],
			
			openCloseSensors:	[Lang.getSensor('button'), Lang.getSensor('reed'), Lang.getSensor('lightBarrier')],
			openClose:			[Lang.getOpenClose('opens'), Lang.getOpenClose('closes')],
			
			inputs:				['I1', 'I2', 'I3', 'I4', 'I5', 'I6', 'I7', 'I8'],
			//buttonStates:		[getButtonState('pressed'), getButtonState('released')],
			//lightBarrierStates:	[getLightBarrierState('opens'), getLightBarrierState('closes')],
			motors:				['M1', 'M2', 'M3', 'M4'],
			motorDirections:	[Lang.getMotorDir('forward'), Lang.getMotorDir('backwards')],
			
			
			counters:			['C1', 'C2', 'C3', 'C4'],
			
			outputs:			['O1', 'O2', 'O3', 'O4', 'O5', 'O6', 'O7', 'O8'],
			outputValues:		[0, 1, 2, 3, 4, 5, 6, 7, 8],
			
			inputModes:			[Lang.getMode('d10v'), Lang.getMode('d5k'), Lang.getMode('a10v'), Lang.getMode('a5k'), Lang.getMode('ultrasonic')],
	
		},
		
		url: 'http://www.fischertechnik.de/home/info/Computing/ROBOTICS-TXT-Controller.aspx/usetemplate-1_column_no_pano/',
		
	};
	
	// connected to FTScratchTXT.exe
	ext.onConnect = function() {
		
		// ensure the ROBO LT is reset
		ext.reset();
	
	};
	
	// connected to a TXT
	ext.onConnectTXT = function() {
	
		// ensure the internal state is reset as the TXT's state is also reset!
		ext.output.init();
	
	};
	
	var connection = new ScratchConnection("ws://127.0.0.1:8001/api", ext);	// edge/ie need the IP here
	connection.connect();
 
  // Register the extension
	ScratchExtensions.register('fischertechnik ROBO-TXT', descriptor, ext);

})({});

