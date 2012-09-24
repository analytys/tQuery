/**
 * 
 *  debug
	error
	info
	log
	warn
	trace 
	timestamp
 */

exports.console = {
		    debug : typeof Ti !== "undefined" ? Ti.API.debug : 
		    	( typeof console.debug === "undefined" ? console.log : console.debug )  ,  
			error : typeof Ti !== "undefined" ? Ti.API.error : console.error  ,
			info : typeof Ti !== "undefined" ?  Ti.API.info : console.info  ,
			log : typeof Ti !== "undefined" ?   Ti.API.log : console.log  ,
			warn : typeof Ti !== "undefined" ?  Ti.API.warn : console.warn  ,
			trace : typeof Ti !== "undefined" ? Ti.API.trace : console.trace  ,
			timestamp : typeof Ti !== "undefined" ? Ti.API.timestamp : 
				( typeof console.timestamp === "undefined" ? console.log : console.timestamp)  ,
};