(function () {
    'use strict';

    angular.module('cpc.pikaday', [])
        .directive('cpcPikaday', [function () {
            return {
                require: 'ngModel',
                restrict: 'A',
                link: function (scope, element, attrs, ngModel) {
                    var inputFormat = attrs.inputFormat || 'DD/MM/YYYY',
                        modelFormat = attrs.modelFormat || 'YYYY-MM-DD',
                        picker;

                    picker = new Pikaday({
                        field: element[0],
                        format: inputFormat,
                        onSelect: function () {
                            var date = this.getMoment().format(inputFormat);

                            scope.$apply(function () {
                                ngModel.$setViewValue(date);
                            });
                        }
                    });

                    ngModel.$render = function () {
                        if (ngModel.$viewValue) {
                            picker.setMoment(moment(ngModel.$viewValue, inputFormat));
                        }
                    };

                    ngModel.$parsers.push(function (value) {
                        if (value) {
                            return moment(value, inputFormat).format(modelFormat);
                        }
                    });

                    ngModel.$formatters.push(function (value) {
                        if (value) {
                            return moment(value).format(inputFormat);
                        }
                    });

                    element.on('$destroy', function () {
                        picker.destroy();
                    });
                }
            };
        }])
}());