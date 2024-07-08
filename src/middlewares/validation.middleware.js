import { body, validationResult } from "express-validator";

// HoistedDeclaration => a function
// class
// assignment declaration

const validateRequest = async (req, res, next) => {
    // validate data
    // const { name, price, imageUrl } = req.body;
    // let errors = [];
    // if (!name || name.trim() == '') {
    //     errors.push('Name is required');
    // }
    // if (!price || parseFloat(price) < 1) {
    //     errors.push(
    //         'Price must be a positive value'
    //     );
    // }
    // try {
    //     const validUrl = new URL(imageUrl);
    // } catch (err) {
    //     errors.push('URL is invalid');
    // }

    // 1. Setup rules for validation.
    const rules = [
        body('name').notEmpty().withMessage('Name is required'),
        body('price').isFloat({ gt: 0 }).withMessage('Price should be a positive value'),
        body('imageUrl').isURL().withMessage('Invalid url'),
    ];

    // 2. run those rules.
    await Promise.all(rules.map(rule => rule.run(req)));
    
    // 3. check if there are any errors after running the rules
    var validationErrors = validationResult(req);

    // 4. if errors, return the error message
    if (!validationErrors.isEmpty()) {
        return res.render('new-product', {
            errorMessage: validationErrors.array()[0].msg,
        });
    }
    next();
};

export default validateRequest;