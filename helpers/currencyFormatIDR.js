"use strict";

function currencyFormatIDR(num) {
	return num.toLocaleString("id", { style: "currency", currency: "IDR" });
}

module.exports = currencyFormatIDR;