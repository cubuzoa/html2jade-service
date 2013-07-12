function apiCtrl($scope, $http) {
    $scope.jadeText = "";
    $scope.htmlText = "<html>\n<body>\nNodeJS Türkiye\n</body>\n</html>";
    $scope.getJadeOfHtml = function() {
        var html = $scope.htmlText;
        $http({
            method: 'POST',
            url: '/api/convert',
            data: {html: html}
        }).success(function(data, status, headers, config) {
                if (!/<html>/.test(html)) {
                    data.jade = data.jade
                        .replace('html\n', '')
                        .replace(/^\s\s/, '')
                        .replace(/\n\s\s/, '\n');
                }

                if (!/<body>/.test(html)) {
                    data.jade = data.jade
                        .replace(/.*body\n/, '')
                        .replace(/^\s\s/, '')
                        .replace(/\n\s\s/, '\n');
                };
            $scope.jadeText = data.jade;
        }).error(function(data, status, headers, config) {

        });
    }
}