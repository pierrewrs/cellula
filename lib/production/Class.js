/**
 * User: hanyee
 * Date: 2012-4-17
 * Time: 17:41
 * To change this template use File | Settings | File Templates.
 */

(function(){
    this.Class = function(){
        "use strict";

        var _class = function(){
            if(!this.__initializing__){
                if(this.init){
                    this.init.apply(this,arguments);
                }
                this.__cid__ = this.__className__ + '_instance_' + parseInt((new Date()).getMilliseconds()+Math.random()*1e6).toString(16);
            }else{
                delete this.constructor.prototype.__initializing__;
            }
        };

        var toString = Object.prototype.toString, objTest = /\bObject\b/, _args = arguments, prototype = _class.prototype, fnTest = /xyz/.test(function(){var xyz;}) ? /\b_super\b/ : /.*/ ;

        _class.prototype = objTest.test(toString.call(_args[0])) ? _args[0] : ( objTest.test(toString.call(_args[1])) ? _args[1] : {} );
        _class.prototype.__className__ = typeof _args[0] === 'string' ? _args[0] : 'unnamed';
        _class.prototype.constructor = prototype.constructor;

        _class.inherits = function(parent){
            if(typeof parent === 'function' && parent.prototype.__className__){

                parent.prototype.__initializing__ = true;

                var _super = parent.prototype, proto = new parent(), prop = this.prototype;

                for(var name in prop){
                    proto[name] = name !== 'constructor' && typeof prop[name] === "function" && typeof _super[name] === "function" && fnTest.test(prop[name]) ?
                        (function(name,fn){
                            return function() {
                                var tmp = this._super;
                                this._super = _super[name];
                                var ret = fn.apply(this, arguments);
                                this._super = tmp;

                                return ret;
                            };
                        })(name, prop[name]) : prop[name];
                }

                this.prototype = proto;
            }else{
                // TODO:
                throw 'parent class type error!';
            }

            return this;
        };

        return _class;
    };
})();