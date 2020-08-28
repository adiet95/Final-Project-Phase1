const { Member, Item, Transaction } = require("../models");
const currencyFormatIDR = require("../helpers/currencyFormatIDR");

class FreeController {
	static home(req, res) {
		const MemberId = +req.params.memberId;
		Member.findOne({
			where: {
				id: MemberId
			}
		})
			.then(data => {
				res.render("memberHome", { member: data, currencyFormatIDR });
			})
			.catch(err => res.send(err));
	}

	static editProfileForm(req, res) {
		const MemberId = +req.params.memberId;
		Member.findByPk(MemberId)
			.then(data => res.render("memberEditProfile", { member: data }))
			.catch(err => res.send(err));
	}

	static editProfile(req, res) {
		const MemberId = +req.params.memberId;
		const membership_status = req.body.membership_status;
		const updatedProfile = {
			username: req.body.username,
			email: req.body.email,
			first_name: req.body.first_name,
			last_name: req.body.last_name
		};
		Member.update(updatedProfile, {
			where: {
				id: MemberId
			}
		})
			.then(data => res.redirect(`/membership/${membership_status}/${MemberId}`))
			.catch(err => res.send(err));
	}

	static topUpForm(req, res) {
		const MemberId = +req.params.memberId;
		Member.findByPk(MemberId)
			.then(data => res.render("memberTopUp", { member: data }))
			.catch(err => res.send(err));
	}

	static topUp(req, res) {
		const MemberId = +req.params.memberId;
		const top_up_amount = +req.body.top_up_amount;
		const membership_status = req.body.membership_status;
		Member.findByPk(MemberId)
			.then(data => {
				const member = data;
				const updatedProfile = {
					emoney: member.emoney + top_up_amount
				};
				Member.update(updatedProfile, {
					where: {
						id: MemberId
					}
				})
			})
			.then(data => res.redirect(`/membership/${membership_status}/${MemberId}`))
			.catch(err => res.send(err));
	}

	static upgradeForm(req, res) {
		const MemberId = +req.params.memberId;
		res.render("memberUpgrade", { MemberId });
	}

	static upgrade(req, res) {
		const MemberId = +req.params.memberId;
		const membership_status = "pro";
		const updatedProfile = { membership_status };
		Member.update(updatedProfile, {
			where: {
				id: MemberId
			}
		})
			.then(data => res.redirect(`/membership/${membership_status}/${MemberId}`))
			.catch(err => res.send(err));
	}
}

module.exports = FreeController;