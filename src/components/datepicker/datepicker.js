import $ from "jquery";
import {datepicker} from "bootstrap-datepicker";

export default function RangeDatepicker() {
	Date.prototype.addDays = function (days) {
		let date = new Date(this.valueOf());
		date.setDate(date.getDate() + days);
		return date;
	};

	window.datesArray = [];
	let dp = $('.input-daterange input').datepicker({
		keepEmptyValues: true,
		multidate: 2,
		multidateSeparator: " - ",
		beforeShowDay: function (date) {
			function isInArray(array, value) {
				return !!array.find(item => {
					return item.getTime() == value.getTime()
				});
			}

			let classes = 'in-range ';


			if (isInArray(datesArray, date) && datesArray.length > 1) {
				classes += datesArray[0].toString() === date.toString() ? 'start' : '';
				classes += datesArray[datesArray.length - 1].toString() === date.toString() ? 'end' : '';
				return {
					classes: classes
				};
			}
			return;
		}
	})
		.on('changeDate', function (e) {
			function getDates(dates) {
				let startDate = dates ? new Date(Math.min.apply(null, dates)) : new Date();
				let stopDate = dates ? new Date(Math.max.apply(null, dates)) : new Date();
				let dateArray = [];
				let currentDate = startDate;

				while (currentDate <= stopDate) {
					dateArray.push(new Date(currentDate));
					currentDate = currentDate.addDays(1);
				}
				return dateArray;
			}

			window.datesArray = getDates(e.dates);

			dp.datepicker('update');

			let currentDates = this.value.split(' - ').map((d) => new Date(d));

			if (currentDates.length > 1) {
				this.value = new Date(Math.min.apply(null, currentDates)).toLocaleDateString('en-US') + ' - ' + new Date(Math.max.apply(null, currentDates)).toLocaleDateString('en-US')
			}
		});
}
