//@module
//@line 17 "/Users/sachalnanda/Dropbox/cs160/Analog Drawing Toy/simulator/potentiometers.xml"
/* KPS2JS GENERATED FILE; DO NOT EDIT! */
//@line 19
var PinsSimulators = require('PinsSimulators');
//@line 21
var configure = exports.configure = function(configuration) {
	this.pinsSimulator = shell.delegate("addSimulatorPart", {
			header : { 
				label : "RFID Sensors", 
				name : "", 
				iconVariant : PinsSimulators.SENSOR_MODULE 
			},
			axes : [
				new PinsSimulators.AnalogInputAxisDescription(
					{
						valueLabel : "Clothing 1",
						valueID : "xPos",
						defaultControl : PinsSimulators.SLIDER,
						speed : 0
					}
				),
				new PinsSimulators.AnalogInputAxisDescription(
					{
						valueLabel : "Clothing 2",
						valueID : "yPos",
						defaultControl : PinsSimulators.SLIDER,
						speed : 0
					}
				),
				new PinsSimulators.AnalogInputAxisDescription(
					{
						valueLabel : "Clothing 3",
						valueID : "zPos",
						defaultControl : PinsSimulators.SLIDER,
						speed : 0
					}
				),
				new PinsSimulators.AnalogInputAxisDescription(
					{
						valueLabel : "Clothing 4",
						valueID : "aPos",
						defaultControl : PinsSimulators.SLIDER,
						speed : 0
					}
				),
				new PinsSimulators.AnalogInputAxisDescription(
					{
						valueLabel : "Clothing 5",
						valueID : "bPos",
						defaultControl : PinsSimulators.SLIDER,
						speed : 0
					}
				),
				new PinsSimulators.AnalogInputAxisDescription(
					{
						valueLabel : "Clothing 6",
						valueID : "cPos",
						defaultControl : PinsSimulators.SLIDER,
						speed : 0
					}
				),
				new PinsSimulators.AnalogInputAxisDescription(
					{
						valueLabel : "Clothing 7",
						valueID : "dPos",
						defaultControl : PinsSimulators.SLIDER,
						speed : 0
					}
				),
				new PinsSimulators.AnalogInputAxisDescription(
					{
						valueLabel : "Clothing 8",
						valueID : "ePos",
						defaultControl : PinsSimulators.SLIDER,
						speed : 0
					}
				),
			]
		});
}
//@line 49
var close = exports.close = function() {
	shell.delegate("removeSimulatorPart", this.pinsSimulator);
}
//@line 53
var read = exports.read = function() {
	return this.pinsSimulator.delegate("getValue");
}
//@line 58
exports.pins = {
			xPos: { type: "A2D" },
			yPos: { type: "A2D" },
			zPos: { type: "A2D" },
			aPos: { type: "A2D" },
			bPos: { type: "A2D" },
			cPos: { type: "A2D" },
			dPos: { type: "A2D" },
			ePos: { type: "A2D" }
		};