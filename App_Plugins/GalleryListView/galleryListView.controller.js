(function () {
    "use strict";

    function GalleryListViewController($scope, listViewHelper, $location, mediaResource, mediaHelper) {

        var vm = this;

        vm.selectItem = selectItem;
        vm.clickItem = clickItem;

        function activate() {
            angular.forEach($scope.items, function (item) {
                setImage(item);
            });
        }

        function setImage(item) {
            if (item.thumbnail) {
                getImage(item, item.thumbnail);
            } else if (item.image) {
                getImage(item, item.image);
            }
        }

        function getImage(item, id) {
            mediaResource.getById(id)
                .then(function (media) {
                    item.thumbnailImage = mediaHelper.resolveFile(media, true);
                });
        }

        function selectItem(selectedItem, $event, index) {
            listViewHelper.selectHandler(selectedItem, index, $scope.items, $scope.selection, $event);
            $event.stopPropagation();
        }

        function clickItem(item) {
            $location.path($scope.entityType + '/' + $scope.entityType + '/edit/' + item.id);
        }

        activate();
    }
    angular.module("umbraco").controller("Jaywing.GalleryListView.GalleryListViewController", GalleryListViewController);
})();