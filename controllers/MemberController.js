const { Member, Item, Transaction } = require("../models");
const bcrypt = require("bcryptjs");

class MemberController {
	static loginForm(req, res) {
		const errors = req.app.locals.errors;
		delete req.app.locals.errors;
		res.render("loginForm", { errors });
	}

	static login(req, res) {
		const sample = {
			username: req.body.username,
			password: req.body.password
		}
		Member.findOne({
			where: {
				username: sample.username
			}
		})
			.then(data => {
				if (data) {
					const MemberId = data.id;
					const membership_status = data.membership_status;
					const password_matched = bcrypt.compareSync(sample.password, data.password);
					if (password_matched) {
						req.session.user = data.username;
						console.log(req.session.user, `Session`);
						console.log(`/membership/${membership_status}/${MemberId}`)
						res.redirect(`/membership/${membership_status}/${MemberId}`);
					} else {
						req.app.locals.errors = `Username / Password Salah`;
						res.redirect("/login");
					}
				} else {
					req.app.locals.errors = `Username / Password Salah`;
					res.redirect("/login");
				}
			})
			.catch(err => res.send(err));
	}

	static registerForm(req, res) {
		res.render("registerForm");
	}

	static register(req, res) {
		const newMember = {
			username: req.body.username,
			password: req.body.password,
			email: req.body.email,
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			membership_status: req.body.membership_status
		};
		Member.create(newMember, {
            individualHooks: true
        })
            .then((data) => res.redirect("/login"))
            .catch(err => res.send(err));
	}

	static logout(req, res) {
		req.session.destroy(err => {
			if (err) {
			  res.send(err);
			} else {
			  res.redirect("/");
			}
		  });
	}
}

module.exports = MemberController;