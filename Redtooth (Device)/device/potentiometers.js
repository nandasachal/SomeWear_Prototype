//@module
/*
  Copyright 2011-2014 Marvell Semiconductor, Inc.

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

exports.pins = {
    hanger1: { type: "A2D" },
    hanger2: { type: "A2D" },
    hanger3: { type: "A2D" },
    hanger4: { type: "A2D" },
    hanger5: { type: "A2D" },
    hanger6: { type: "A2D" },
    hanger7: { type: "A2D" },
    hanger8: { type: "A2D" },
};

exports.configure = function(){
	this.hanger1.init();
	this.hanger2.init();
	this.hanger3.init();
	this.hanger4.init();
	this.hanger5.init();
	this.hanger6.init();
	this.hanger7.init();
	this.hanger8.init();
}

exports.read = function() {
    return { hanger1: this.hanger1.read(), hanger2: this.hanger2.read(), 
    hanger3: this.hanger3.read(), hanger4: this.hanger4.read(), hanger5: this.hanger5.read(),
    hanger6: this.hanger6.read(), hanger7: this.hanger1.read(), hanger8: this.hanger8.read(),};
}

