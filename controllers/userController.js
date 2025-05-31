const { User } = require('../models/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.ServeLoginPage = (req, res) => {
    res.render('login', {
        data: {
            title: 'Login Page',
        }
    });
}
exports.ServeSignUpPage = (req, res) => {
    res.render('signup', {
        data: {
            title: 'Sign Up Page',
        }
    });
};
exports.ServeHomePage = (req, res) => {
    res.render('home', {
        data: {
            title: 'Home Page',
        }
    });
};



// function for handling login functionality
exports.handleLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email});
        if (!user)
            return res.render("login", {
                data: {
                    title: "Login Page",
                    error: "Invalid email or password",
                },
            });
            // console.log(user);

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.render("login", {
                data: {
                    title: "Login Page",
                    error: "Invalid email or password",
                },
            });

        if (user.email == process.env.AdminEmail) {
            const token = jwt.sign({ id: user._id, name: user.name, email: user.email, isAdmin: true }, process.env.SECRET_KEY, { expiresIn: '1h' });
            res.cookie('token', token, {
                httpOnly: true, maxAge: 360000
            });
        }
        else {
            const token = jwt.sign({ id: user._id, name: user.name, email: user.email, isAdmin: false }, process.env.SECRET_KEY, { expiresIn: '1h' });
            res.cookie('token', token, {
                httpOnly: true, maxAge: 360000
            });
        }

        res.redirect('/home');

    } catch (error) {
        console.error(error);
        res.render("login", {
            data: {
                title: "Login Page",
                error: "Invalid email or password",
            },
        });
    }

}

// function to handle signup
exports.handleSignUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        console.log(req.body);

        const user = await User.findOne({ email });

        if (user) {
            res.render("signup", {
                data: {
                    title: "Sign Up Page",
                    error: "Email already exists",
                },
            });
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            await User.create({ name, email, password: hashedPassword });
            res.redirect("/home");
        }
    }
    catch (err) {
        console.log(err);
        res.render("signup", {
            data: {
                title: "Sign Up Page",
                error: "Something went wrong. Please try again.",
            },
        });
    }
};
