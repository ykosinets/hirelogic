import $ from "jquery";
import {datepicker} from "bootstrap-datepicker";

export default function RangeDatepicker(element) {
	if(!element) return;
	Date.prototype.addDays = function (days) {
		let date = new Date(this.valueOf());
		date.setDate(date.getDate() + days);
		return date;
	};
	window.isDevice = {
		width: 800,
		Android: () => !!navigator.userAgent.match(/Android/i),
		BlackBerry: () =>  !!navigator.userAgent.match(/BlackBerry/i),
		iOS: () => !!navigator.userAgent.match(/iPhone|iPad|iPod/i),
		Opera: () => !!navigator.userAgent.match(/Opera Mini/i),
		Windows: () => !!navigator.userAgent.match(/IEMobile/i) || !!navigator.userAgent.match(/WPDesktop/i),
		any: () => (isDevice.Android() || isDevice.BlackBerry() || isDevice.iOS() || isDevice.Opera() || isDevice.Windows()),
		mobile: () =>
			(!!navigator.userAgent.match(/Android/i) && window.innerWidth < isDevice.width)
			|| isDevice.BlackBerry()
			|| !!navigator.userAgent.match(/iPhone|iPod/i)
			|| isDevice.Opera()
			|| isDevice.Windows(),
		tablet: () =>
			(!!navigator.userAgent.match(/Android/i) && window.innerWidth > (isDevice.width - 1))
			|| (isDevice.BlackBerry() && window.innerWidth > (isDevice.width - 1))
			|| !!navigator.userAgent.match(/iPad/i)
			|| (isDevice.Opera() && window.innerWidth > (isDevice.width - 1))
			|| (isDevice.Windows() && window.innerWidth > (isDevice.width - 1))
	};

	let datesArray = [];

	let dp = $(element).datepicker({
		autoclose: false,
		Readonly: true,
		weekStart: 1,
		disableTouchKeyboard: true,
		keepEmptyValues: true,
		clearBtn: isDevice.mobile(),
		multidate: 2,
		multidateSeparator: " - ",
		beforeShowMonth: clearClose,
		beforeShowYear: clearClose,
		beforeShowDecade: clearClose,
		beforeShowCentury: clearClose,
		beforeShowDay: function (date) {
			function isInArray(array, value) {
				return !!array.find(item => {
					return item.getTime() == value.getTime()
				});
			}

			let classes = 'in-range ';

			if (isInArray(datesArray, date) && datesArray.length > 1) {

				let isLast = datesArray[datesArray.length - 1].getTime() === date.getTime();
				let isFirst = datesArray[0].getTime() === date.getTime();
				let isWeekDelta = (datesArray[0].addDays(7).getTime() === datesArray[datesArray.length - 1].getTime());
				let isTop = isWeekDelta && isFirst;
				let isBottom = isWeekDelta && isLast;

				classes += isFirst ? ' start' : '';
				classes += isLast ? ' end' : '';
				classes += isTop ? ' top' : '';
				classes += isBottom ? ' bottom' : '';
				return {
					classes: classes
				};
			}

			clearClose();
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

			datesArray = getDates(e.dates);

			dp.datepicker('update');
			clearClose();

			let currentDates = this.value.split(' - ').map((d) => new Date(d));

			if (currentDates.length > 1) {
				this.value = new Date(Math.min.apply(null, currentDates)).toLocaleDateString('en-US') + ' - ' + new Date(Math.max.apply(null, currentDates)).toLocaleDateString('en-US')
			}
		})
		.on('show', function () {
			clearClose();
			$('.datepicker-dropdown')
				.on('click', '.clear', function (e) {
					e.preventDefault();
					e.stopPropagation();
					dp.datepicker('hide');
				});
		});

	function clearClose() {
		$('.datepicker-dropdown .clear').html('CLOSE');
	}
}
