
const router = require( 'express' ).Router();


const apiRoutes = require( './api' );
const statsExerciseRoutes = require('./statsExerciseRoutes')

router.use( '/api', apiRoutes );
router.use('/', statsExerciseRoutes)

module.exports = router;
