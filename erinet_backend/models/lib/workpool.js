function Workpool(targetFunc, callback) {
	this._dataPools = {};
    this._targetFunc = targetFunc;
    this._finishedFunc = 0;
    this._callback = callback;
}

Workpool.prototype.done = function(tag, data) {
	this._dataPools[tag] = data;   
    this._finishedFunc++;

    if(this._finishedFunc == this._targetFunc){
    	this._callback(this._dataPools);
    }

};


module.exports = Workpool;