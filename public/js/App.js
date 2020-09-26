class App {
	constructor() {
		this.purchasesList = [];
		this.myStorage = window.localStorage;
	}
	
	initialLoad() {
		console.log("#App initialLoad.. Start");
		
		this.myStorage.setItem('balance', 0);
		this.myStorage.setItem('purchases', 0);
		this.myStorage.setItem('purchases_list', "");
		document.getElementById('balance').innerHTML = this.myStorage.getItem('balance');
		document.getElementById('purchases').innerHTML = this.myStorage.getItem('purchases');

		console.log("#App initialLoad.. End");
	}

	/**
	 * Onkeydown event for buttons
	 * 
	 * @param {*} ev 
	 * @param {*} element 
	 */
	keyDown(ev, element){
		if (ev.keyCode === 13) {
			this.btnClick(element);
		}
	}

	/**
	 * Action with a button is pressed
	 * 
	 * @param {*} ev 
	 */
	btnClick(ev) {
		console.log("#App btnClick.. Start");
		
		const target = ev;

		let targetType = target.getAttribute('data-type');
		let opts = {};

		if (targetType == 'soda') {
			// Soda actions
			opts.optId = target.getAttribute('data-id');
			opts.optName = target.getAttribute('data-name');
			opts.optPrice = target.getAttribute('data-price');
			opts.optType = target.getAttribute('data-type');
			opts.optQuantity = target.getAttribute('data-quantity');
			opts.optApiType = 'purchase';

			let getBalance = this.myStorage.getItem('balance');

			if (opts.optQuantity == 0) {
				document.getElementById('vending-error').style.display = 'block';
				document.getElementById('vending-error-message').innerHTML = 'Sorry, ' + opts.optName + ' is sold out :(';

				setTimeout(function () {
					document.getElementById('vending-error').style.display = 'none';
				}, 2000);
			} else if (getBalance == 0) {
				document.getElementById('vending-error').style.display = 'block';
				document.getElementById('vending-error-message').innerHTML = 'No balance to purchase. Please insert 25&cent;.';

				setTimeout(function () {
					document.getElementById('vending-error').style.display = 'none';
				}, 3000);
			} else if (getBalance < Number(opts.optPrice)) {
				document.getElementById('vending-error').style.display = 'block';
				document.getElementById('vending-error-message').innerHTML = 'Not enough balance to make this purchase.';

				setTimeout(function () {
					document.getElementById('vending-error').style.display = 'none';
				}, 2000);
			} else {
				// Purchase Made
				this.purchaseMade(target, opts);
			}
		} else if (targetType == 'coin') {
			// Coin actions
			opts.optShift = target.getAttribute('data-shift');
			opts.optType = target.getAttribute('data-type');
			opts.optValue = target.getAttribute('data-value');
			opts.optApiType = 'shift';
			if (opts.optShift == 'bounce') {
				// Show vendor error message
				document.getElementById('vending-error').style.display = 'block';
				document.getElementById('vending-error-message').innerHTML = 'Not a quarter';

				setTimeout(function () {
					document.getElementById('vending-error').style.display = 'none';
				}, 2000);
			} else if (opts.optShift == 'add') {
				// Add to local storage balance
				this.myStorage.setItem('balance', Number(this.myStorage.getItem('balance')) + .25);
				document.getElementById('balance').innerHTML = this.myStorage.getItem('balance');
			} else if (opts.optShift == 'remove') {
				// Remove from local storage balance
				if (this.myStorage.getItem('balance') == 0) {
					// Show vendor error message
					document.getElementById('vending-error').style.display = 'block';
					document.getElementById('vending-error-message').innerHTML = 'There is no balance to return a coin from.';

					setTimeout(function () {
						document.getElementById('vending-error').style.display = 'none';
					}, 2000);
				} else {
					this.myStorage.setItem('balance', Number(this.myStorage.getItem('balance')) - .25);
					document.getElementById('balance').innerHTML = this.myStorage.getItem('balance');
				}
			}
		}

		console.log("#App btnClick.. End");
	}

	/**
	 * API for all calls
	 * 
	 * @param {*} target 
	 * @param {*} opts 
	 */
	purchaseMade(target, opts) {
		console.log("#App purchaseMade.. Start");

		// Update balance
		this.myStorage.setItem('balance', Number(this.myStorage.getItem('balance')) - Number(opts.optPrice));
		document.getElementById('balance').innerHTML = this.myStorage.getItem('balance');

		// Update purchases count
		this.myStorage.setItem('purchases', Number(this.myStorage.getItem('purchases')) + 1);
		document.getElementById('purchases').innerHTML = this.myStorage.getItem('purchases');

		// Update purchases list
		this.purchasesList.push(opts);
		this.myStorage.setItem('purchases_list', this.purchasesList);
		document.getElementById('purchase-list').innerHTML = "";

		// Write the list reversed in the Purchases list section
		this.purchasesList.slice().reverse().forEach((element) => {
			document.getElementById('purchase-list').innerHTML += element.optName + " (" + element.optPrice + ") <br />";
		});

		// Modify Quantity
		target.setAttribute('data-quantity', Number(target.getAttribute('data-quantity')) - 1);

		// Set soda to disabled when quantity reaches zero
		if (target.getAttribute('data-quantity') == 0) {
			target.setAttribute('disabled', 'disabled');
		}

		// Show success message
		document.getElementById('success').style.display = 'block';
		document.getElementById('success-message').innerHTML = 'Enjoy your ' + opts.optName + '!';

		setTimeout(function () {
			document.getElementById('success').style.display = 'none';
		}, 2000);

		console.log("#App purchaseMade.. End");
	}
}

var app = new App;
app.initialLoad();