module.exports = func => {  // pass in a func
	return (req, res, next) => {  // return a new func
		func(req, res, next).catch(next)    //that execute it, and catches any err and pass it to the next
	}
}