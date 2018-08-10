function USK_CodeMirror($scope) {

	$scope.uniqueId = "uskCodeMirror" + (Date.now() + Math.random().toString().slice(2));

	if (!$scope.model.value) {
		$scope.model.value = "<!-- HTML Code -->"
	}

	// Listen to updates from Code Mirror through messaging API
	window.addEventListener("message", function (event) {
		if (event.data.uskCodeMirror.length > 0) {
			$scope.model.value = event.data.uskCodeMirror;
			$scope.$apply();
		}

		if (event.data.uskCodeMirror.length == 0) {
			console.log("initialized");
			event.source.postMessage({
				uskCodeMirror: $scope.model.value
			}, "*");
		}

	});

	// Send the current value to Code Mirror
	if ($scope.model.value) {
		var iframe = document.querySelector("." + $scope.uniqueId + " iframe");
		if (iframe)
			iframe.addEventListener("load", function () {
				iframe.contentWindow.postMessage({
					uskCodeMirror: $scope.model.value
				}, "*");
			});
	}

}

angular.module('umbraco').controller('CodeMirror', USK_CodeMirror);