//@module
//@line 17 "/Users/sachalnanda/Dropbox/cs160/Analog Drawing Toy/simulator/potentiometers.xml"
/* KPS2JS GENERATED FILE; DO NOT EDIT! */
//@line 19
var PinsSimulators = require('PinsSimulators');
//@line 21
var configure = exports.configure = function(configuration) {
	this.pinsSimulator = shell.delegate("addSimulatorPart", {
			header : { 
				label : "Weight Detectors", 
				name : "Analog Inputs", 
				iconVariant : PinsSimulators.SENSOR_MODULE 
			},
			axes : [
				new PinsSimulators.AnalogInputAxisDescription(
					{
						valueLabel : "Hanger 1",
						valueID : "hanger1",
						defaultControl : PinsSimulators.SLIDER,
						speed : 0
					}
				),
				new PinsSimulators.AnalogInputAxisDescription(
					{
						valueLabel : "Hanger 2",
						valueID : "hanger2",
						defaultControl : PinsSimulators.SLIDER,
						speed : 0
					}
				),
				new PinsSimulators.AnalogInputAxisDescription(
					{
						valueLabel : "Hanger 3",
						valueID : "hanger3",
						defaultControl : PinsSimulators.SLIDER,
						speed : 0
					}
				),
				new PinsSimulators.AnalogInputAxisDescription(
					{
						valueLabel : "Hanger 4",
						valueID : "hanger4",
						defaultControl : PinsSimulators.SLIDER,
						speed : 0
					}
				),
				new PinsSimulators.AnalogInputAxisDescription(
					{
						valueLabel : "Hanger 5",
						valueID : "hanger5",
						defaultControl : PinsSimulators.SLIDER,
						speed : 0
					}
				),
				new PinsSimulators.AnalogInputAxisDescription(
					{
						valueLabel : "Hanger 6",
						valueID : "hanger6",
						defaultControl : PinsSimulators.SLIDER,
						speed : 0
					}
				),
				new PinsSimulators.AnalogInputAxisDescription(
					{
						valueLabel : "Hanger 7",
						valueID : "hanger7",
						defaultControl : PinsSimulators.SLIDER,
						speed : 0
					}
				),
				new PinsSimulators.AnalogInputAxisDescription(
					{
						valueLabel : "Hanger 8",
						valueID : "hanger8",
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
			hanger1: { type: "A2D" },
			hanger2: { type: "A2D" },
			hanger3: { type: "A2D" },
			hanger4: { type: "A2D" },
			hanger5: { type: "A2D" },
			hanger6: { type: "A2D" },
			hanger7: { type: "A2D" },
			hanger8: { type: "A2D" }
		};