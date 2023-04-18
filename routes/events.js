const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/fields-validator');
const { validateJWT } = require('../middlewares/validate-jwt');
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');
const { isDate } = require('../helpers/isDate');
const router = Router();

router.use(validateJWT);

// Get events
router.get('/', getEvents);

// Create event
router.post('/', [
    check('title', 'Title is required').not().isEmpty(),
    check('start', 'Start date is required').custom(isDate),
    check('end', 'End date is required').custom(isDate),
    validateFields
], createEvent);

// Update event
router.put('/:id', [
    check('title', 'Title is required').not().isEmpty(),
    check('start', 'Start date is required').custom(isDate),
    check('end', 'End date is required').custom(isDate),
    validateFields
], updateEvent);

// Delete event
router.delete('/:id', deleteEvent);

module.exports = router;