const router = require( 'express' ).Router();
const db = require( '../../models' );
 console.log("testing")
// Get all the workout data and add a totalDuration field
router.get( '/', async ( req, res ) => {
	try {
		const workoutsData = await db.Workout.aggregate( [
			{
				$addFields: {
					totalDuration: {
						$sum: '$exercises.duration'
					}
				}
			}
		] );

		res.status( 200 ).json( workoutsData );

	} catch ( err ) {
		res.status( 400 ).json( err );
	}
} );

// Push a new exercise to workout
router.put( '/:id', async ( req, res ) => {
	try {
		const workoutData = await db.Workout.updateOne(
			{
				_id: req.params.id
			},
			{
				$push: {
					exercises: { ...req.body }
				}
			}
		);

		res.status( 200 ).json( workoutData );

	} catch ( err ) {
		res.status( 400 ).json( err );
	}
} );

// Create workout
router.post( '/', async ( req, res ) => {
	try {
		const workoutData = await db.Workout.create( req.body );

		res.status( 200 ).json( workoutData );

	} catch ( err ) {
		res.status( 400 ).json( err );
	}
} );
// last 7 workouts
router.get( '/range', async ( req, res ) => {
	try {
		const workoutData = await db.Workout.aggregate( [
			{
				$sort: {
					day: -1
				}
			},
			{
				$limit: 7
			},
			{
				$addFields: {
					totalDuration: {
						$sum: '$exercises.duration'
					}
				}
			}
		] );

		res.status( 200 ).json( workoutData );

	} catch ( err ) {
		res.status( 400 ).json( err );
	}
} );

console.log("testing2")


module.exports = router;